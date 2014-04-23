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
            var searchLimit = Fixtures.get('searchLimit');
            dpd.artists.get({$sort: {name: 1}, $limit: searchLimit + 1}, function(result, error) {
                if (!Ember.isNone(result)) {
                    var model = {
                        artists: result.slice(0, searchLimit)
                    };
                    result.length === searchLimit + 1 ? model.hasNext = true : model.hasNext = false;
                    resolve(model);
                } else if (!Ember.isNone(error)) {
                    reject(error);
                }
            });
        });
    },
    setupController: function(controller, model) {
        controller.setProperties({
            model: model.artists,
            hasNext: model.hasNext
        });
    },
    actions: {
        clearEdits: function() {
            var controller = this.get('controller');
            controller.removeObject(controller.findBy('isNew'));
            controller.setEach('isEdit', undefined);
        }
    }
});

CCAdmin.SongsRoute = Ember.Route.extend({
    model: function() {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            dpd.songs.get({$sort: {name: 1 }, $limit: 20}, function(result, error) {
                if (!Ember.isNone(result)) {
                    console.log(result)
                    resolve(result);
                } else if (!Ember.isNone(error)) {
                    reject(error);
                }
            });
        });
    },
    actions: {
        clearEdits: function() {
            var controller = this.get('controller');
            controller.removeObject(controller.findBy('isNew'));
            controller.setEach('isEdit', undefined);
        }
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