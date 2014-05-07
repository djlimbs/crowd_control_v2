CCAdmin.SongController = Ember.ObjectController.extend({
    displayTextEdit: function() {
        var artist = this.get('artistEdit') || '';
        var title = this.get('titleEdit') || '';

        return Ember.isEmpty(artist) && Ember.isEmpty(title) ? '' : artist.replace('(new)', '') + ' - ' + title;
    }.property('artistsEdit', 'titleEdit'),
    actions: {
        clickEdit: function() {
            if (this.get('isNew') !== true) {
                this.send('clearEdits');
                this.setProperties({
                    isEdit: true,
                    displayTextEdit: this.get('displayText'),
                    artistEdit: this.get('artist'),
                    titleEdit: this.get('title'),
                    tagsEdit: !Ember.isNone(this.get('tags')) ? this.get('tags').join(',') : ''
                });
            }
        },
        clickDone: function(addAnother) {
            var displayTextEdit = this.get('displayTextEdit');
            var artistEdit = this.get('artistEdit');
            var titleEdit = this.get('titleEdit');
            var tagsEdit = this.get('tagsEdit');

            this.setProperties({
                displayTextError: Ember.isEmpty(displayTextEdit),
                artistError: Ember.isEmpty(artistEdit),
                titleError: Ember.isEmpty(titleEdit),
                doneError: Ember.isEmpty(displayTextEdit) || Ember.isEmpty(artistEdit) || Ember.isEmpty(titleEdit) ?
                                    'You\'re missing some info, see the red fields.' : undefined
            });

            if (!Ember.isEmpty(displayTextEdit) && !Ember.isEmpty(artistEdit) && !Ember.isEmpty(titleEdit)) {
                var self = this;

                if (addAnother === true) {
                    $('[data-dev="new-btn"]').button('loading');
                } else {
                    $('[data-dev="done-btn"]').button('loading');
                }
                
                this.setProperties({
                    //isEdit: undefined,
                    //isNew: undefined,
                    displayTextError: undefined,
                    titleError: undefined
                });

                dpd.songs.post({
                    id: this.get('id'),
                    displayText: displayTextEdit,
                    artist: artistEdit,
                    title: titleEdit,
                    tags: !Ember.isEmpty(tagsEdit) ? tagsEdit.split(',') : []
                }, function(result, error) {
                    if (!Ember.isNone(error)) {
                        console.log(error);
                    }

                    if (!Ember.isNone(result)) {
                        self.setProperties({
                            id: result.id,
                            artist: result.artist,
                            displayText: result.displayText,
                            title: result.title,
                            tags: result.tags,
                            isEdit: undefined,
                            isNew: undefined
                        });
                        self.get('parentController').notifyPropertyChange('[]');
                    }

                    if (addAnother === "true") {
                        self.send('clickAdd');
                    }
                });
            }
        },
        clickDelete: function(obj) {
            var parentController = this.get('parentController');
            dpd.songs.del(this.get('id'), function(result, error) {
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