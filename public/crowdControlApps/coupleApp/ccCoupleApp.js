// Kick off Ember
CCCouple = Ember.Application.create({
    rootElement: '#application',
});

// Views
CCCouple.SongPreviewView = Ember.View.extend({
    tagName: 'audio',
    attributeBindings: ['src'],
    src: function() {
        return this.get('controller.songUrl');
    }.property(),
    didInsertElement: function() {
        var self = this;
        this.$().on('ended pause', function() {
            self.get('controller').set('songUrl', undefined)
                                  .send('finishedPreview');
        }).context.play();
    }
});



// Controllers
CCCouple.MainController = Ember.ObjectController.extend({
    actions: {
        selectTab: function(name) {
            this.set('selectedTab', this.get('tabs').findBy('name', name));
        }
    }
});


CCCouple.TabController = Ember.ObjectController.extend({
    needs: ['main'],
    votesBinding: 'controllers.main.votes',
    selectedTabBinding: 'controllers.main.selectedTab',
    active: function() {
        return this.get('name') === this.get('selectedTab').name;
    }.property('selectedTab'),
    allPlaylists: function() {
        var playlistsData = this.get('playlistsData');
        return Ember.isNone(playlistsData) ? [] : this.get('playlists').map(function(pl) { return playlistsData.findBy('id', pl); }).getEach('name');
    }.property('playlists', 'playlistsData'),
    displayedPlaylists: function() {
        var playlistsData = this.get('playlistsData');
        var playlists = this.get('playlists').map(function(pl) { return playlistsData.findBy('id', pl); });
        var playlistFilter = this.get('playlistFilter');
        var preferenceFilter = this.get('preferenceFilter');
        if (!Ember.isNone(playlistFilter)) {
            return playlists.filter(function(playlist) {
                return playlist.name === playlistFilter;
            });
        } else if (!Ember.isNone(preferenceFilter)) {
            var playVotes = this.get('votes').filterBy('score', preferenceFilter);

            return [{
                name: 'Your selected ' + preferenceFilter + 's',
                songs: playlists.getEach('songs').compact().reduce(function(a,b) { return a.concat(b); }).filter(function(song) {
                            return playVotes.anyBy('song', song.id);
                        })
            }];
        } else {
            return playlists;
        }
    }.property('playlists', 'playlistsData', 'playlistFilter', 'preferenceFilter', 'votes'),
    noSongsScored: function() {
        console.log(this.get('displayedPlaylists').getEach('songs'))
        if (!Ember.isEmpty(this.get('displayedPlaylists').getEach('songs'))) {
            return Ember.isEmpty(this.get('displayedPlaylists').getEach('songs').reduce(function(a,b) { return a.concat(b); }));
        }
    }.property('displayedPlaylists'),
    actions: {
        clickSelectTab: function() {
            this.send('selectTab', this.get('name'));
        },
        clickShowPlaylist: function(playlistName) {
            this.setProperties({
                playlistFilter: playlistName.valueOf(),
                preferenceFilter: undefined
            });
        },
        clickShowAllSongs: function() {
            this.setProperties({
                playlistFilter: undefined,
                preferenceFilter: undefined
            });
        },
        clickShowPlays: function() {
            this.setProperties({
                playlistFilter: undefined,
                preferenceFilter: 'play',
            });
        },
        clickShowNays: function(preference) {
            this.setProperties({
                categoryFilter: undefined,
                preferenceFilter: 'nay'
            });
        }
    }
});

CCCouple.SongController = Ember.ObjectController.extend({
    needs: ['main'],
    votesBinding: 'controllers.main.votes',
    userIdBinding: 'controllers.main.id',
    myVote: function() {
        var self = this;
        return this.get('votes').find(function(vote) {
            return vote.voter === self.get('userId') && vote.song === self.get('id');
        });
    }.property('votes'),
    score: function() {
        return !Ember.isNone(this.get('myVote')) ? this.get('myVote').score : 'either way';
    }.property('myVote'),
    isPlaying: function() {
        return !Ember.isNone(this.get('songUrl'));
    }.property('songUrl'),
    actions: {
        clickStop: function() {
            $('audio')[0].pause();
        },
        clickPreview: function() {
            if($('audio').length > 0) {
                $('audio')[0].pause();
            }
            var self = this;
            var callback = function(result, error) {
                console.log($.parseJSON(result.response.trim()));
                if (!Ember.isNone(result)) {
                    var responseObject = $.parseJSON(result.response.trim());
                    var songPreviewUrl = !Ember.isEmpty(responseObject.results) ? responseObject.results[0].previewUrl : undefined;
                    self.set('songUrl', songPreviewUrl).send('previewSong', self);
                }

                if (!Ember.isNone(error)) {
                    console.log(error);
                }
            }

            if (!Ember.isNone(this.get('itunesPreviewUrl'))) {
                this.set('songUrl', this.get('itunesPreviewUrl')).send('previewSong', this);
            } else if (!Ember.isNone(this.get('itunesId'))) {
                dpd.itunes.get({ id: this.get('itunesId')}, callback)
            } else {
                console.log('here')
                dpd.itunes.get({ displayText : this.get('displayText')}, callback);
            }
        },
        clickPlay: function() {
            var self = this;
            var vote = this.get('myVote');
            if (!Ember.isNone(vote)) {
                vote.score = 'play';
                dpd.votes.put(vote, function(result, error) {
                    self.notifyPropertyChange('votes');
                    self.get('parentController').notifyPropertyChange('votes');
                });
            } else {
                vote = {
                    voter: this.get('userId'),
                    song: this.get('id'),
                    score: 'play'
                };
                dpd.votes.post(vote, function(result, error) {
                    if (!Ember.isNone(result)) {
                        vote.id = result.id;
                        self.get('votes').addObject(vote);
                        self.notifyPropertyChange('votes');
                        self.get('parentController').notifyPropertyChange('votes');
                    }
                });
            }

            
        },
        clickNay: function() {
            var self = this;
            var vote = this.get('myVote');
            if (!Ember.isNone(vote)) {
                vote.score = 'nay';
                dpd.votes.put(vote, function(result, error) {
                    if (!Ember.isNone(result)) {
                        self.notifyPropertyChange('votes');
                        self.get('parentController').notifyPropertyChange('votes');
                    }
                });
            } else {
                vote = {
                    voter: this.get('userId'),
                    song: this.get('id'),
                    score: 'nay'
                };
                dpd.votes.post(vote, function(result, error) {
                    if (!Ember.isNone(result)) {
                        vote.id = result.id;
                        self.get('votes').addObject(vote);
                        self.notifyPropertyChange('votes');
                    }
                });
            }
        },
        clickEitherWay: function() {
            var vote = this.get('myVote');
            this.get('votes').removeObject(vote);
            if (!Ember.isNone(vote) && !Ember.isNone(vote.id)) { dpd.votes.del(vote.id); }
            this.notifyPropertyChange('votes');
        }
    }
});

// Routes
CCCouple.MainRoute = Ember.Route.extend({
    model: function() {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            var coupleData = Ember.Object.create();
            dpd.users.me(function(result, error) {
                var emberObject = Ember.Object.create(result);
                resolve(emberObject);
            });
        });
    },
    setupController: function(controller, model) {
        controller.setProperties({
            model: model,
            selectedTab: !Ember.isNone(model.get('tabs')) ? model.get('tabs')[0] : undefined
        });
    },
    actions: {
        previewSong: function(song) {
            this.render('songPreview', {
                into: 'main',
                outlet: 'songPreview',
                controller: song
            });
        },
        finishedPreview: function() {
            console.log('done');
            this.disconnectOutlet({
                outlet: 'songPreview',
                parentView: 'main'
            });
        },
        clickLogout: function() {
            dpd.users.logout(function(result, error) {
                if (!Ember.isNone(result)) {
                    window.location.href = '../crowdControlApps/login.html';
                }

                if (!Ember.isNone(error)) {
                    console.log(error);
                }
            });
        }
    }
});


// Router
CCCouple.Router.map(function() {
    this.resource('main', { path: '/' });
});

// This setting disables the detail routing from showing up in the navbar.
CCCouple.Router.reopen( {
    location: 'none'
});