CCAdmin.UsersController = Ember.ArrayController.extend({

});

CCAdmin.UserController = Ember.ObjectController.extend({
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