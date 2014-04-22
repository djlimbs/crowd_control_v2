// Kick off Ember
CCCouple = Ember.Application.create({
    rootElement: '#application',
});


Fixtures = Ember.Object.create({

});

CCCouple.Foundation = Ember.Object.extend({

});

CCCouple.Foundation.reopenClass({
    getData: function() {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            var coupleData = Ember.Object.create();
            /*dpd.songcategories.get(function(result, error) {
                coupleData.set('allCategories', result)
            });
            dpd.songs.get({include: 'categories'}, function(result, error) {
                coupleData.set('songs', result);
            });
            dpd.votes.get(function(result, error) {
                coupleData.set('votes', result);
            });*/
            dpd.couples.login({
                username: 'test',
                password: 'tesssst'
            }, function(result, error) {
                console.log(result); 
                console.log(error)   
            });
            console.log(coupleData);
            resolve(PrototypeData);
        });
    }
});

// Controllers
CCCouple.FoundationController = Ember.ObjectController.extend({
    allCategories: function() {
        return this.get('songs').getEach('categories').reduce(function(a,b) { return a.concat(b); }).uniq();
    }.property('songs'),
    displayedCategories: function() {
        var songsData = this.get('songs');
        var categoriesData = this.get('categoriesData');
        var categoryFilter = this.get('categoryFilter');
        var preferenceFilter = this.get('preferenceFilter');
        var categoryList = !Ember.isNone(categoryFilter) ? Ember.A([categoryFilter]) : this.get('allCategories');
        var categories = [];
        categoryList.forEach(function(category) {
            categories.addObject({
                categoryName: category,
                categoryDescription: categoriesData.findBy('name', category).description,
                songs: songsData.filter(function(song) {
                    return !Ember.isNone(preferenceFilter) ? song.categories.indexOf(category) !== -1 && song.rating === preferenceFilter 
                                                                : song.categories.indexOf(category) !== -1;
                })
            });
        });

        return categories;
    }.property('songs', 'categoryFilter', 'preferenceFilter'),
    preferenceText: function() {
        return this.get('preferenceFilter') === 'play' ? 'Plays' : 'Nays';
    }.property('preferenceFilter'),
    noSongsRated: function() {
        return Ember.isEmpty(this.get('songs').filterBy('rating', this.get('preferenceFilter')));
    }.property('songs', 'preferenceFilter'),
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
    isPlay: function() {
        return this.get('rating') === 'play';
    }.property('rating'),
    isNay: function() {
        return this.get('rating') === 'nay';
    }.property('rating'),
    actions: {
        clickPreview: function() {

        },
        clickPlay: function() {
            this.set('rating', 'play');
            this.get('parentController').notifyPropertyChange('songs');
        },
        clickNay: function() {
            this.set('rating', 'nay');
            this.get('parentController').notifyPropertyChange('songs');
        },
        clickEitherWay: function() {
            this.set('rating', 'either-way');
            this.get('parentController').notifyPropertyChange('songs');
        }
    }
});

// Routes
CCCouple.MainRoute = Ember.Route.extend({
    beforeModel: function() {
        this.transitionTo('foundation');
    }
});

CCCouple.FoundationRoute = Ember.Route.extend({
    model: function() {
        return CCCouple.Foundation.getData();
    }
});

CCCouple.GuestRequestsRoute = Ember.Route.extend({
    model: function() {
        return CCCouple.Foundation.getData();
    }
});

CCCouple.DjSuggestionsRoute = Ember.Route.extend({
    model: function() {
        return CCCouple.Foundation.getData();
    }
});

// Router
CCCouple.Router.map(function() {
    this.resource('main', { path: '/' }, function() {
        this.resource('foundation', { path: '/foundation'});
        this.resource('guestRequests', { path: '/guestRequests'});
        this.resource('djSuggestions', { path: '/djSuggestions'});
    });
});

// This setting disables the detail routing from showing up in the navbar.
CCCouple.Router.reopen( {
    location: 'none'
});