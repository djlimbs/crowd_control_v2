CCAdmin.ArtistsController = Ember.ArrayController.extend({
    isNextDisabled: function() {
        return this.get('hasNext') === false;
    }.property('hasNext'),
    isPrevDisabled: function() {
        console.log(this.get('skipValue'));
        return Ember.isNone(this.get('skipValue')) || this.get('skipValue') <= 0;
    }.property('skipValue'),
    hasNew: function() {
        return this.anyBy('isNew', true);
    }.property('[]'),
    actions: {
        clickAdd: function() {
            this.send('clearEdits');
            this.addObject({
                name: '',
                tags: [],
                isEdit: true,
                isNew: true
            });
        },
        clickFilterByLetter: function(letter) {
            this.get('letterFilter') === letter.valueOf() ? 
                            this.set('letterFilter', undefined) : this.set('letterFilter', letter.valueOf());
            this.send('getArtists');
        },
        clickClearFilter: function() {
            this.set('letterFilter', undefined);
            this.send('getArtists');
        },
        clickNextPage: function() {
            if (!this.get('isNextDisabled')) {
                var newSkipValue = this.getWithDefault('skipValue', 0) + Fixtures.get('searchLimit');
                this.set('skipValue', newSkipValue);
                this.send('getArtists');
            }
        },
        clickPrevPage: function() {
            if (!this.get('isPrevDisabled')) {
                var newSkipValue = this.getWithDefault('skipValue', 0) - Fixtures.get('searchLimit');
                if (newSkipValue < 0) { newSkipValue = 0; }
                this.set('skipValue', newSkipValue);
                this.send('getArtists');
            }
        },
        getArtists: function() {
            var searchLimit = Fixtures.get('searchLimit');
            var self = this;
            var query = {
                $sort: { name : 1},
                $limit: searchLimit + 1
            };

            if (!Ember.isNone(this.get('letterFilter'))) {
                query.name = { $regex : '[' + this.get('letterFilter') + ']'}
            }

            if (!Ember.isNone(this.get('skipValue'))) {
                query['$skip'] = this.get('skipValue');
            }

            dpd.artists.get(query, function(result, error) {
                if (!Ember.isNone(result)) {
                    result.length === searchLimit + 1 ? self.set('hasNext', true) : self.set('hasNext', false);
                    self.set('content', result.slice(0, searchLimit));
                } else if (!Ember.isNone(error)) {
                    console.log(error)
                }
            });
        }
    }
});

CCAdmin.ArtistController = Ember.ObjectController.extend({
    actions: {
        clickEdit: function() {
            if (this.get('isNew') !== true) {
                this.send('clearEdits');
                this.setProperties({
                    isEdit: true,
                    nameEdit: this.get('name'),
                    tagsEdit: !Ember.isNone(this.get('tags')) ? this.get('tags') : []
                });
            }
        },
        clickDone: function(addAnother) {
            if (Ember.isEmpty(this.get('nameEdit'))) {
                this.set('has-error', true);
            } else {
                var self = this;
                this.setProperties({
                    nameError: undefined,
                    isEdit: undefined,
                    isNew: undefined,
                    name: this.get('nameEdit'),
                    tags: !Ember.isEmpty(this.get('tagsEdit')) ? this.get('tagsEdit').split(',') : []
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

                if (addAnother === "true") {
                    console.log('add another')
                    this.send('clickAdd');
                }
            }
        },
        clickDelete: function(obj) {
            var parentController = this.get('parentController');
            dpd.artists.del(this.get('id'), function(result, error) {
                if (!Ember.isNone(result)) {
                    
                    parentController.removeObject(obj);
                    console.log(parentController)
                    if (parentController.get('content').length === 0) {
                        if (parentController.get('isNextDisabled') === false) {
                            parentController.set('skipValue', parentController.getWithDefault('skipValue', 0) - Fixtures.get('searchLimit'));
                            parentController.send('clickNextPage');
                        } else if (parentController.get('isPrevDisabled') === false) {
                            parentController.send('clickPrevPage');
                        }
                    }
                }
            });
        }
    }
});