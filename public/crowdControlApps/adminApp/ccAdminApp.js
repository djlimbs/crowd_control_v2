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
    attributeBindings: ['objectQuery'],
    didInsertElement: function() {
        var items = this.get('value');
        var objectQuery = this.get('objectQuery');
        var options = {
            width: 'element',
            tags: [],
            tokenSeparators: [',']
        };

        if (!Ember.isNone(objectQuery)) {
            options.query = function(query) {
                dpd(objectQuery).get({name: {$regex:  '(?i)' + query.term + '\w*'}}, function(result, error) {
                    if (!Ember.isEmpty(result)) {
                        query.callback({ results : result.map(function(item) { return { id: item.id, text: item.name }}) });

                    }

                    if (!Ember.isNone(error)) {
                        console.log(error);
                    }
                });
            };

            options.initSelection = function(e, callback) {
                callback(items.map(function(item) { return { id: item.id, text: item.name}}));
            };
        } else {
            options.dropdownCss = { display: 'none' };
        }

        this.$().select2(options);
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
    isFilter: function() { 
        return this.get('parentController').get('letterFilter') === this.get('content');
    }.property('parentController.letterFilter')
});