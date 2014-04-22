// Kick off Ember
CCCouple = Ember.Application.create({
    rootElement: '#application',
});


Fixtures = Ember.Object.create({

});

CCCouple.CoupleData = Ember.Object.extend({

});

CCCouple.CoupleData.reopenClass({
    getData: function() {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            var coupleData = Ember.Object.create();
            dpd.users.me(function(result, error) {
                var emberObject = Ember.Object.create(result);
                console.log(emberObject)
                resolve(emberObject);
                //a = emberObject;
            });
           /* dpd.playlists.get(function(result, error) {
                console.log('*** result')
                console.log(result)
                console.log('*** error')
                console.log(error)
                a = result;
            });*/
            console.log(coupleData);
            //a = Ember.Object.create(PrototypeData);
            //resolve(a);
        });
    }
});

// Controllers
CCCouple.FoundationController = Ember.ObjectController.extend({
    allCategories: function() {
        return this.get('songcategories').getEach('name');
    }.property('songcategories'),
    displayedCategories: function() {
        return this.get('songcategories');
    }.property('songcategories', 'categoryFilter'),
    actions: {
        clickShowCategory: function(categoryName) {
            this.setProperties({
                categoryFilter: categoryName.valueOf(),
                preferenceFilter: undefined
            });
        },
        clickShowAllSongs: function() {
            this.setProperties({
                categoryFilter: undefined,
                preferenceFilter: undefined
            });
        },
        clickShowPlays: function() {
            this.setProperties({
                categoryFilter: undefined,
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
    actions: {
        clickPreview: function() {

        },
        clickPlay: function() {
            var self = this;
            var vote = this.get('myVote');
            if (!Ember.isNone(vote)) {
                vote.score = 'play';
                this.notifyPropertyChange('votes');
                dpd.votes.put(vote);
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
                    }
                });
            }

            
        },
        clickNay: function() {
            var self = this;
            var vote = this.get('myVote');
            if (!Ember.isNone(vote)) {
                vote.score = 'nay';
                this.notifyPropertyChange('votes');
                dpd.votes.put(vote);
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
            if (!Ember.isNone(vote.id)) { dpd.votes.del(vote.id); }
            this.notifyPropertyChange('votes');
        }
    }
});

// Routes
CCCouple.MainRoute = Ember.Route.extend({
    model: function() {
        return CCCouple.CoupleData.getData();
    },
    afterModel: function() {
        this.transitionTo('foundation');
    }
});

CCCouple.FoundationRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('main').get('Foundation List');
    }
});

CCCouple.GuestRequestsRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('main').get('guest');
    }
});

CCCouple.DjChartsRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('main');
    }
});

// Router
CCCouple.Router.map(function() {
    this.resource('main', { path: '/' }, function() {
        this.resource('foundation', { path: '/foundation'});
        this.resource('guestRequests', { path: '/guestRequests'});
        this.resource('djCharts', { path: '/djCharts'});
    });
});

// This setting disables the detail routing from showing up in the navbar.
CCCouple.Router.reopen( {
    location: 'none'
});