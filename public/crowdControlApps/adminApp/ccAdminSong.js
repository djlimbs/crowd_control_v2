CCAdmin.SongController = Ember.ObjectController.extend({
    artistsDisplayText: function() {
        return this.get('artists').getEach('name');
    }.property('artists'),
    displayTextEdit: function() {
        var artists = this.get('artistsEdit') || '';
        var title = this.get('titleEdit') || '';


        if (Ember.isEmpty(artists) && Ember.isEmpty(title)) {
            return '';
        } else {
            var artistText = '';
            var artistsArray = artists.split(',');

            artistsArray.forEach(function(artist, index, artists) {
                artist = artist.replace('(new)', '');
                if (index === 0) {
                    artistText += artist;
                } else if (index === 1) {
                    artistText += ' ft. ' + artist;
                } else if (index === artists.length - 1) {
                    artistText += ' and ' + artist;
                } else {
                    artistText += ', ' + artist;
                }
            });
            return artistText + ' - ' + title;
        }
    }.property('artistsEdit', 'titleEdit'),
    actions: {
        clickEdit: function() {
            if (this.get('isNew') !== true) {
                this.send('clearEdits');
                this.setProperties({
                    isEdit: true,
                    displayTextEdit: this.get('displayText'),
                    artistsEdit: !Ember.isNone(this.get('artists')) ? this.get('artists').join(',') : '',
                    titleEdit: this.get('title'),
                    tagsEdit: !Ember.isNone(this.get('tags')) ? this.get('tags').join(',') : ''
                });
            }
        },
        clickDone: function(addAnother) {
            var displayTextEdit = this.get('displayTextEdit');
            var artistsEdit = this.get('artistsEdit');
            var titleEdit = this.get('titleEdit');
            var tagsEdit = this.get('tagsEdit');

            this.setProperties({
                displayTextError: Ember.isEmpty(displayTextEdit),
                artistsError: Ember.isEmpty(artistsEdit),
                titleError: Ember.isEmpty(titleEdit),
                doneError: Ember.isEmpty(displayTextEdit) || Ember.isEmpty(artistsEdit) || Ember.isEmpty(titleEdit) ?
                                    'You\'re missing some info, see the red fields.' : undefined
            });

            if (!Ember.isEmpty(displayTextEdit) && !Ember.isEmpty(artistsEdit) && !Ember.isEmpty(titleEdit)) {
                var self = this;

                this.setProperties({
                    isEdit: undefined,
                    isNew: undefined,
                    displayTextError: undefined,
                    artistsError: undefined,
                    titleError: undefined,
                });

                dpd.songs.post({
                    id: this.get('id'),
                    displayText: displayTextEdit,
                    artists: artistsEdit.split(','),
                    title: titleEdit,
                    tags: !Ember.isEmpty(tagsEdit) ? tagsEdit.split(',') : []
                }, function(result, error) {
                    if (!Ember.isNone(error)) {
                        console.log(error);
                    }

                    if (!Ember.isNone(result)) {
                        self.setProperties({
                            id: result.id,
                            artists: result.artists,
                            displayText: result.displayText,
                            title: result.title,
                            tags: result.tags
                        });
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