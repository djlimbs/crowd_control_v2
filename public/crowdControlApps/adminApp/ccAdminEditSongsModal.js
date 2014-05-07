CCAdmin.EditSongsModalView = Ember.View.extend({
    classNames: ['modal', 'fade'],
    templateName: "editSongsModal",
    
    didInsertElement: function() {
        var self = this;
        var controller = this.get('controller');
        this.$().modal().on('hidden.bs.modal', function() {
            controller.send('closeModal');
        });
    },

    actions: {
        clickRemoveSong: function(song) {
            var controller = this.get('controller');
            dpd.playlists.put(controller.get('id'), {songs : {$pull : song.id}}, function(result, error) {
                if (!Ember.isNone(result)) {
                    controller.get('songs').removeObject(song);
                    controller.notifyPropertyChange('songs');
                    if ($('[data-id="' + song.id + '"]').length > 0) {
                        $('[data-id="' + song.id + '"]').remove();
                    }
                }

                if (!Ember.isNone(error)) {
                    console.log(error);
                }
            });
        },
        clickAddSong: function() {
            var self = this;
            var controller = this.get('controller');
            var selectedSong = controller.get('selectedSong');
            var selectedObj = controller.get('selectedObject');

            if (Ember.isEmpty(selectedSong)) {
                controller.set('selectionError', 'Please select a song');
            } else {
                dpd.playlists.put(controller.get('id'), {songs: {$push : selectedSong}}, function(result, error) {
                    if (!Ember.isNone(result)) {
                        controller.getWithDefault('songs', []).addObject({
                            id: selectedSong,
                            displayText: selectedObj.text
                        });
                        controller.setProperties({
                            selectionError: undefined,
                            selectedSong: undefined,
                            selectedObject: undefined
                        });
                        controller.set('songs', controller.get('songs').sortBy('displayText'));
                        controller.notifyPropertyChange('songs');
                        $('[data-dev="song-select"]').select2('val', '');
                    }

                    if (!Ember.isNone(error)) {
                        console.log(error);
                    }
                });  
            }
        }
    }
});