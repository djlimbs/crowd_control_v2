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
    controllerName: 'items',
    model: function() {
        return CCAdmin.getResource('artists', {$sort: {name: 1}, $limit: Fixtures.get('searchLimit') + 1});
    },
    setupController: function(controller, model) {
        controller.setProperties({
            model: model.items,
            hasNext: model.hasNext,
            letterFilter: undefined
        });
    }
});

CCAdmin.SongsRoute = Ember.Route.extend({
    controllerName: 'items',
    model: function() {
        return CCAdmin.getResource('songs', {$sort: {title: 1}, $limit: Fixtures.get('searchLimit') + 1});
    },
    setupController: function(controller, model) {
        controller.setProperties({
            model: model.items,
            hasNext: model.hasNext,
            letterFilter: undefined,
            sortBy: 'title'
        });
    }
});

CCAdmin.ApplicationRoute = Ember.Route.extend({
    actions: {
        clearEdits: function() {
            var controller = this.controllerFor(this.get('controller.currentRouteName'));
            controller.removeObject(controller.findBy('isNew'));
            controller.setEach('isEdit', undefined);
        },
        clickClearFilter: function() {
            var controller = this.controllerFor(this.get('controller.currentRouteName'));
            controller.set('letterFilter', undefined);
            controller.send('getItems');
        },
        clickFilterByLetter: function(letter) {
            var controller = this.controllerFor(this.get('controller.currentRouteName'));
            controller.setProperties({
                skipValue: 0,
                letterFilter: controller.get('letterFilter') === letter.valueOf() ? undefined : letter.valueOf()
            }).send('getItems');
        },
        clickSortBy: function(header) {
            this.controllerFor(this.get('controller.currentRouteName')).set('sortBy', header).send('getItems');
        },
        clickAdd: function() {
            var controller = this.controllerFor(this.get('controller.currentRouteName'));
            controller.send('clearEdits');
            controller.addObject({
                isEdit: true,
                isNew: true
            });
        },
        clickNextPage: function() {
            var controller = this.controllerFor(this.get('controller.currentRouteName'));
            if (!controller.get('isNextDisabled')) {
                var newSkipValue = controller.getWithDefault('skipValue', 0) + Fixtures.get('searchLimit');
                controller.set('skipValue', newSkipValue);
                controller.send('getItems');
            }
        },
        clickPrevPage: function() {
            var controller = this.controllerFor(this.get('controller.currentRouteName'));
            if (!controller.get('isPrevDisabled')) {
                var newSkipValue = controller.getWithDefault('skipValue', 0) - Fixtures.get('searchLimit');
                if (newSkipValue < 0) { newSkipValue = 0; }
                controller.set('skipValue', newSkipValue);
                controller.send('getItems');
            }
        },
        getItems: function() {
            var itemType = this.get('controller.currentRouteName');
            var controller = this.controllerFor(itemType);
            var searchLimit = Fixtures.get('searchLimit');
            var letterFilter = controller.get('letterFilter');
            var queryBy = Fixtures.get('queryBy')[itemType];
            var query = {
                $sort : {},
                $limit: searchLimit + 1
            };

            query['$sort'][controller.getWithDefault('sortBy', queryBy)] = 1;

            if (!Ember.isNone(letterFilter)) {
                query[queryBy] = letterFilter !== 'T' ? { $regex : '^[' + letterFilter + ']|^The [' + letterFilter + ']'}
                                                        : { $regex : '^T[^h][^e]|\The T'};
            }

            if (!Ember.isNone(controller.get('skipValue'))) {
                query['$skip'] = controller.get('skipValue');
            }

            CCAdmin.getResource(itemType, query).then(function(result) {
                controller.setProperties({
                    content: result.items,
                    hasNext: result.hasNext
                });
            }, function(error) {
                console.log(error);
            });
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