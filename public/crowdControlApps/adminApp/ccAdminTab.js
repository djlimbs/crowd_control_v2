CCAdmin.TabController = Ember.ObjectController.extend({
    sortedPlaylists: function() {
        var self = this;
        return this.get('playlists').map(function(pl) {
            return self.get('playlistsData').findBy('id', pl);
        });
    }.property('playlists', 'playlistsData'),
    playlistsText: function() {
        return this.get('sortedPlaylists').getEach('name').join(', ');
    }.property('sortedPlaylists'),
    actions: {
        clickEdit: function() {
            if (this.get('isNew') !== true) {
                this.send('clearEdits');
                this.setProperties({
                    isEdit: true,
                    nameEdit: this.get('name'),
                    playlistsEdit: !Ember.isNone(this.get('sortedPlaylists')) ? this.get('sortedPlaylists').getEach('id').join(',') : '',
                    tagsEdit: !Ember.isNone(this.get('tags')) ? this.get('tags').join(',') : []
                });
            }
        },
        clickDone: function() {
            var self = this;
            var nameEdit = this.get('nameEdit');
            var playlistsEdit = this.get('playlistsEdit');
            var tagsEdit = this.get('tagsEdit');

            this.setProperties({
                isEdit: undefined,
                isNew: undefined,
                nameError: Ember.isEmpty(nameEdit),
                playlistsError: Ember.isEmpty(playlistsEdit),
                doneError: Ember.isEmpty(nameEdit) ? 'You\'re missing some info, see the red fields.' : undefined
            });

            if (!Ember.isEmpty(nameEdit) && !Ember.isEmpty(playlistsEdit)) {
                dpd.tabs.post({
                    id: this.get('id'),
                    name: nameEdit,
                    playlists: playlistsEdit.split(','),
                    tags: !Ember.isEmpty(tagsEdit) ? tags.split(',') : []
                }, function(result, error) {
                    if (!Ember.isNone(result)) {
                        self.setProperties(result);
                        self.notifyPropertyChange('playlists');
                        self.get('parentController').notifyPropertyChange('[]');

                    }

                    if (!Ember.isNone(error)) {
                        console.log(error);
                    }
                })
            }
        }
    }
});