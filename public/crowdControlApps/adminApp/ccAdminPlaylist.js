CCAdmin.PlaylistController = Ember.ObjectController.extend({
    noSongsText: function() {
        return Ember.isEmpty(this.get('songs')) ? 'No songs added yet' : undefined;
    }.property('songs'),
    songCount: function() {
        return !Ember.isEmpty(this.get('songs')) ? this.get('songs').length : 0;
    }.property('songs'),
    songList: function() {
        return !Ember.isEmpty(this.get('songs')) ? this.get('songs').getEach('displayText') : [];
    }.property('songs'),
    songIds: function() {
        return !Ember.isEmpty(this.get('songs')) ? this.get('songs').getEach('id') : [];
    }.property('songs'),
    actions: {
        clickEdit: function() {
            if (this.get('isNew') !== true) {
                this.send('clearEdits');
                this.setProperties({
                    isEdit: true,
                    displayTextEdit: this.get('displayText'),
                    nameEdit: this.get('name'),
                    tagsEdit: !Ember.isNone(this.get('tags')) ? this.get('tags').join(',') : ''
                });
            }
        },
        clickDone: function() {
            if (Ember.isEmpty(this.get('nameEdit'))) {
                this.setProperties({
                    'has-error' : true,
                    doneError : 'Playlist name can not be blank'
                });
            } else {
                var self = this;

                dpd.playlists.post({
                    id: this.get('id'),
                    name: this.get('nameEdit'),
                    songs: [],
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
            dpd.playlists.del(this.get('id'), function(result, error) {
                if (!Ember.isNone(result)) {
                    
                    parentController.removeObject(obj);

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