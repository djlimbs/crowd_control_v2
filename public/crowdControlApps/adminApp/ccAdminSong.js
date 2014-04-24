CCAdmin.SongsController = Ember.ArrayController.extend({

});

CCAdmin.SongController = Ember.ObjectController.extend({
    artistsDisplayText: function() {
        return this.get('artists').getEach('name');
    }.property('artists'),
    actions: {
        clickEdit: function() {
            if (this.get('isNew') !== true) {
                this.send('clearEdits');
                this.setProperties({
                    isEdit: true,
                    displayTextEdit: this.get('displayText'),
                    artistsEdit: this.get('artists'),
                    titleEdit: this.get('title'),
                    tagsEdit: !Ember.isNone(this.get('tags')) ? this.get('tags').join(',') : []
                });
            }
        },
        clickDone: function() {
            var displayTextEdit = this.get('displayTextEdit');
            var artistsEdit = this.get('artistsEdit');
            var titleEdit = this.get('titleEdit');
            var tagsEdit = this.get('tagsEdit');

            this.set('displayTextError', Ember.isEmpty(displayTextEdit));
            this.set('artistsError', Ember.isEmpty(artistsEdit));
            this.set('titleError', Ember.isEmpty(titleEdit));

            if (!Ember.isEmpty(displayTextEdit) && !Ember.isEmpty(artistsEdit) && !Ember.isEmpty(titleEdit)) {
                var self = this;

                this.setProperties({
                    isEdit: undefined,
                    isNew: undefined,
                    displayTextError: undefined,
                    artistsError: undefined,
                    titleError: undefined,
                });

                if (!Ember.isNone(this.get('id'))) {
                    dpd.songs.put({
                        id: this.get('id'),
                        displayText: displayTextEdit,
                        artists: artistsEdit.split(','),
                        title: titleEdit,
                        tags: !Ember.isEmpty(tagsEdit) ? tagsEdit.split(',') : []
                    }, function(result, error) {
                        if (!Ember.isNone(result)) {
                            self.setProperties({
                                id: result.id,
                                displayText: result.displayText,
                                title: result.title,
                                tags: result.tags
                            });
                        }
                    });
                } else {
                    dpd.songs.post({
                        displayText: displayTextEdit,
                        artists: artistsEdit,
                        title: titleEdit,
                        tags: !Ember.isEmpty(tagsEdit) ? tagsEdit.split(',') : []
                    }, function(result, error) {
                        if (!Ember.isNone(result)) {
                            self.setProperties({
                                id: result.id,
                                displayText: result.displayText,
                                title: result.title,
                                tags: result.tags
                            });
                        }
                    });
                }
            }
        }
    }
});