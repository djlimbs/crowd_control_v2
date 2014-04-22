// Kick off Ember
CCAdmin = Ember.Application.create({
    rootElement: '#application',
});

// Controllers
CCAdmin.MainController = Ember.ObjectController.extend({

});

CCAdmin.SongsController = Ember.ObjectController.extend({

});


// Routes
CCAdmin.MainRoute = Ember.Route.extend({
    model: function() {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            var coupleData = Ember.Object.create();
            console.log('herere')
            dpd.users.me(function(result, error) {
                console.log(result)
                var emberObject = Ember.Object.create(result);
                resolve(emberObject);
            });
        });
    },
    afterModel: function() {
        this.transitionTo('songs');
    }
});

CCAdmin.SongsRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('main');
    }
});

// Router
CCAdmin.Router.map(function() {
    this.resource('main', { path: '/' }, function() {
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