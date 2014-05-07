CCAdmin.UserController = Ember.ObjectController.extend({
    isCouple: function() {
        return this.get('userType') === 'couple';
    }.property('userType'),
    actions: {
        clickEdit: function() {
            if (this.get('isNew') !== true) {
                this.send('clearEdits');
                this.setProperties({
                    isEdit: true,
                    usernameEdit: this.get('username'),
                    passwordEdit: this.get('password'),
                    userTypeEdit: this.get('userType'),
                    eventDateEdit: this.get('eventDate'),
                    guestsEdit: !Ember.isNone(this.get('guests')) ? this.get('guests').join(',') : []
                });
            }
        },
        clickDone: function() {
            var self = this;
            var usernameEdit = this.get('usernameEdit');
            var passwordEdit = this.get('passwordEdit');
            var userTypeEdit = this.get('userTypeEdit');
            var eventDateEdit = this.get('eventDateEdit');
            var guestsEdit = this.get('guestsEdit');

            this.setProperties({
                isEdit: undefined,
                isNew: undefined,
                usernameError: Ember.isEmpty(usernameEdit),
                passwordError: Ember.isEmpty(passwordEdit),
                eventDateError: Ember.isEmpty(eventDateEdit) && userTypeEdit === 'couple',
            });

            if (Ember.isEmpty(usernameEdit) || Ember.isEmpty(passwordEdit) || (Ember.isEmpty(eventDateEdit) && userTypeEdit === 'couple')) {
                this.set('doneError', 'You\'re missing some info, see the red fields.');
            } else {
                this.set('doneError', undefined);
            }

            if (Ember.isNone(this.get('doneError'))) {
                dpd.users.post({
                    id: this.get('id'),
                    username: usernameEdit,
                    password: passwordEdit,
                    userType: userTypeEdit,
                    eventDate: eventDateEdit,
                    guests: !Ember.isEmpty(guestsEdit) ? guestsEdit.split(',') : []
                }, function(result, error) {
                    if (!Ember.isNone(result)) {
                        self.setProperties(result);
                        self.notifyPropertyChange('guests');
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