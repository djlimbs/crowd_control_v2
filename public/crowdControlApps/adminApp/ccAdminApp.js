// Kick off Ember
CCAdmin = Ember.Application.create({
    rootElement: '#application',
});

Fixtures = Ember.Object.create({
    letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    searchLimit: 15
});

// Components
CCAdmin.Select2Component = Ember.TextField.extend({
    didInsertElement: function() {
        this.$().select2({
            dropdownCss: {display: 'none'},
            width: 'element',
            tags: [],
            tokenSeparators: [',']
        });
    }
});

// Views
CCAdmin.MainView = Ember.View.extend({
    click: function() {
        this.get('controller').send('clearEdits');
    }
});

// Controllers
CCAdmin.MainController = Ember.ObjectController.extend({

});

CCAdmin.LetterController = Ember.ObjectController.extend({
    needs: ['artists'],
    letterFilterBinding: 'controllers.artists.letterFilter',
    isFilter: function() { 
        return this.get('letterFilter') === this.get('content');
    }.property('letterFilter')
});