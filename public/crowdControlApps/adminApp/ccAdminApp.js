// Kick off Ember
CCAdmin = Ember.Application.create({
    rootElement: '#application',
});

// Components
CCAdmin.Select2Component = Ember.TextField.extend({
    didInsertElement: function() {
        this.$().select2({
            width: 'element',
            tags: [],
            tokenSeparators: [',']
        });
    }
});

// Views
CCAdmin.MainView = Ember.View.extend({
    click: function() {
        this.get('controller').send('clearEdits');
    }
});

// Controllers
CCAdmin.MainController = Ember.ObjectController.extend({

});

CCAdmin.SongsController = Ember.ArrayController.extend({

});

CCAdmin.ArtistController = Ember.ObjectController.extend({
    actions: {
        clickEdit: function() {
            if (this.get('isNew') !== true) {
                this.send('clearEdits');
                this.setProperties({
                    isEdit: true,
                    nameEdit: this.get('name'),
                    tagsEdit: !Ember.isNone(this.get('tags')) ? this.get('tags').join(',') : []
                });
            }
        },
        clickDone: function() {
            var self = this;
            this.setProperties({
                isEdit: undefined,
                isNew: undefined,
                name: this.get('nameEdit'),
                tags: !Ember.isEmpty(this.get('tagsEdit')) ? this.get('tagsEdit').split(',') : undefined
            });

            if (!Ember.isNone(this.get('id'))) {
                dpd.artists.put(this.get('content'));
            } else {
                dpd.artists.post(this.get('content'), function(result, error) {
                    if (!Ember.isNone(result)) {
                        self.set('id', result.id);
                    }
                });
            }
        },
        clickDelete: function(obj) {
            var self = this;
            dpd.artists.del(this.get('id'), function(result, error) {
                if (!Ember.isNone(result)) {
                   self.get('parentController').removeObject(obj);
                }
            });
        }
    }
});


// Routes
CCAdmin.MainRoute = Ember.Route.extend({
    model: function() {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            var coupleData = Ember.Object.create();
            dpd.users.me(function(result, error) {
                console.log(result)
                var emberObject = Ember.Object.create(result);
                resolve(emberObject);
            });
        });
    },
    afterModel: function() {
        this.transitionTo('artists');
    }
});

CCAdmin.ArtistsRoute = Ember.Route.extend({
    model: function() {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            dpd.artists.get(function(result, error) {
                if (!Ember.isNone(result)) {
                    resolve(result);
                } else if (!Ember.isNone(error)) {
                    reject(error);
                }
            });
        });
    },
    actions: {
        clearEdits: function() {
            var artists = this.get('controller');
            artists.removeObject(artists.findBy('isNew'));
            artists.setEach('isEdit', undefined);
        },
        clickAdd: function() {
            this.get('controller').addObject({
                name: '',
                tags: [],
                isEdit: true,
                isNew: true
            });
        }
    }
});

CCAdmin.SongsRoute = Ember.Route.extend({
    model: function() {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            dpd.songs.get(function(result, error) {
                if (!Ember.isNone(result)) {
                    resolve(result);
                } else if (!Ember.isNone(error)) {
                    reject(error);
                }
            });
        });
    }
});

// Router
CCAdmin.Router.map(function() {
    this.resource('main', { path: '/' }, function() {
        this.resource('artists', { path: '/artists'});
        this.resource('songs', { path: '/songs'});
        this.resource('playlists', { path: '/playlists'});
        this.resource('tabs', { path: '/tabs'});
        this.resource('users', { path: '/users'});
    });
});

// This setting disables the detail routing from showing up in the navbar.
CCAdmin.Router.reopen( {
    location: 'none'
});