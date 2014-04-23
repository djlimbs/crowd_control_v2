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
                    artistsEdit: !Ember.isNone(this.get('artists')) ? this.get('artists').getEach('name').join(',') : [],
                    titleEdit: this.get('title'),
                    tagsEdit: !Ember.isNone(this.get('tags')) ? this.get('tags').join(',') : []
                });
            }
        }
    }
});