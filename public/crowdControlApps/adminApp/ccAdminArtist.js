
CCAdmin.ArtistController = Ember.ObjectController.extend({
    actions: {
        clickEdit: function() {
            if (this.get('isNew') !== true) { // To prevent weirdness when clicking on a new artist's row.
                this.send('clearEdits');
                this.setProperties({
                    isEdit: true,
                    nameEdit: this.get('name'),
                    tagsEdit: !Ember.isNone(this.get('tags')) ? this.get('tags').join(',') : ''
                });
            }
        },
        clickDone: function(addAnother) {
            if (Ember.isEmpty(this.get('nameEdit'))) {
                this.setProperties({
                    'has-error' : true,
                    doneError : 'Artist name can not be blank'
                });
            } else {
                var self = this;

                dpd.artists.post({
                    id: this.get('id'),
                    name: this.get('nameEdit'),
                    tags: !Ember.isEmpty(this.get('tagsEdit')) ? this.get('tagsEdit').split(',') : []
                }, function(result, error) {
                    if (!Ember.isNone(result)) {
                        self.setProperties(result);
                        self.setProperties({
                            'has-error': undefined,
                            isEdit: undefined,
                            isNew: undefined,
                        });
                        self.parentController.notifyPropertyChange('[]');
                        if (addAnother === "true") {
                            self.send('clickAdd');
                        }
                    }

                    if (!Ember.isNone(error)) {
                        self.setProperties({
                            'has-error' : true,
                            doneError: error.message,
                        });
                    }
                });
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