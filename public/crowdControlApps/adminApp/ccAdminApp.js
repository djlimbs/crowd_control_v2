// Kick off Ember
CCAdmin = Ember.Application.create({
    rootElement: '#application',
});

Fixtures = Ember.Object.create({
    letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    searchLimit: 15,
    queryBy: {
        artists: 'name',
        songs: 'title'
    },
    userTypes: ['admin', 'couple', 'dj', 'guest']
});

// Components
CCAdmin.Select2Component = Ember.TextField.extend({
    attributeBindings: ['objectQuery', 'data', 'selectedObject', 'playlistsData', 'data-dev', 'sortedPlaylists', 'type'],
    type: 'hidden',
    didInsertElement: function() {
        var self = this;
        var items;
        var objectQuery = this.get('objectQuery');
        var options;

        if (objectQuery === 'artists') {
            artist = this.get('value');
            console.log(artist);
            options = {
                placeholder: 'Pick an artist',
                width: 'element',
                query: function(query) {
                    dpd(objectQuery).get({name: {$regex:  '(?i)' + query.term + '\w*'}, $sort: { name: 1}}, function(result, error) {
                        if (!Ember.isEmpty(result)) {
                            query.callback({ results : result.map(function(item) { return { id: item.name, text: item.name }}) });
                        } else {
                            query.callback({ results : []});
                        }

                        if (!Ember.isNone(error)) {
                            console.log(error);
                        }
                    });
                },
                initSelection: function(e, callback) {
                    callback({id: artist, text: artist});
                },
                createSearchChoice: function(term, data) {
                    if ($(data).filter(function() { 
                        return this.text.localeCompare(term)===0; 
                    }).length===0) {
                        return {
                            id : '(new)' + term,
                            text : term
                        }
                    }
                }
            };
        } else if (objectQuery === 'songs') {
            options = {
                allowClear: true,
                width: '40%',
                placeholder: 'Search for a song',
                query: function(query) {
                    dpd(objectQuery).get({ id: {$nin : self.get('data')}, displayText: {$regex:  '(?i)' + query.term + '\w*'}}, function(result, error) {
                        if (!Ember.isEmpty(result)) {
                            query.callback({ results : result.map(function(item) { return { id: item.id, text: item.displayText }}) });
                        } else {
                            query.callback({ results : []});
                        }

                        if (!Ember.isNone(error)) {
                            console.log(error);
                        }
                    });
                }
            }
        } else if (objectQuery === 'playlists') {
            items = this.get('playlistsData');
            var sortedPlaylists = this.get('sortedPlaylists');
            options = {
                width: 'element',
                tags: [],
                query: function(query) {
                    dpd(objectQuery).get({name: {$regex:  '(?i)' + query.term + '\w*'}}, function(result, error) {
                        if (!Ember.isEmpty(result)) {
                            query.callback({ results : result.map(function(item) { return { id: item.id, text: item.name }}) });
                        } else {
                            query.callback({ results : []});
                        }

                        if (!Ember.isNone(error)) {
                            console.log(error);
                        }
                    });
                },
                initSelection: function(e, callback) {
                    callback(sortedPlaylists.map(function(pl) { return { id: pl.id, text: pl.name}}));
                }
            };
        } else {
            options = {
                width: 'element',
                tags: [],
                tokenSeparators: [','],
                dropdownCss: { display: 'none' }
            }
        }

        this.$().select2(options).on('change', function(e) {
            if (!Ember.isNone(e.added)) {
                if (objectQuery === 'playlists') {
                    self.get('playlistsData').addObject({
                        id: e.added.id,
                        name: e.added.text
                    });
                } else {
                    self.set('selectedObject', e.added);
                }
            } else if (!Ember.isNone(e.removed)) {
                if (objectQuery === 'playlists') {
                    self.get('playlistsData').removeObject(self.get('playlistsData').findBy('id', e.removed.id));
                } else {
                    self.set('selectedObject', e.removed);
                }
            }
        });

        /*if (objectQuery === 'playlists') {
            console.log('hereere?')
            var $e = this.$();
            this.$().select2('container').find('ul.select2-choices').sortable({
                containment: 'parent',
                start: function() { $e.select2("onSortStart"); },
                update: function() { $e.select2("onSortEnd"); }
            });
        }*/
    }
});

// Views
CCAdmin.MainView = Ember.View.extend({
    click: function(e) {
        this.get('controller').send('clearEdits');
    }
});



CCAdmin.MainController = Ember.ObjectController.extend({

});

CCAdmin.ItemsController = Ember.ArrayController.extend({
    isNextDisabled: function() {
        return this.get('hasNext') === false;
    }.property('hasNext'),
    isPrevDisabled: function() {
        return Ember.isNone(this.get('skipValue')) || this.get('skipValue') <= 0;
    }.property('skipValue'),
    hasNew: function() {
        return this.anyBy('isNew', true);
    }.property('[]'),
    isSortByArtist: function() {
        return this.get('sortType') === 'artist';
    }.property('sortType'),
    isSortByTitle: function() {
        return this.get('sortType') === 'title';
    }.property('sortType')
});

CCAdmin.LetterController = Ember.ObjectController.extend({
    isFilter: function() { 
        return this.get('parentController').get('letterFilter') === this.get('content');
    }.property('parentController.letterFilter')
});