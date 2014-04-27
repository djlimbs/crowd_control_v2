// Kick off Ember
CCAdmin = Ember.Application.create({
    rootElement: '#application',
});

Fixtures = Ember.Object.create({
    letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    searchLimit: 15,
    queryBy: {
        artists: 'name',
        songs: 'title'
    }
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
                        query.callback({ results : result.map(function(item) { return { id: item.name, text: item.name }}) });
                    } else {
                        query.callback({ results : []});
                    }

                    if (!Ember.isNone(error)) {
                        console.log(error);
                    }
                });
            };

            options.initSelection = function(e, callback) {
                callback(items.split(',').map(function(item) { return { id: item, text: item}}));
            };

            options.createSearchChoice = function(term, data) {
                if ($(data).filter(function() { 
                    return this.text.localeCompare(term)===0; 
                }).length===0) {
                    return {
                        id : '(new)' + term,
                        text : term
                    }
                }
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

CCAdmin.ItemsController = Ember.ArrayController.extend({
    isNextDisabled: function() {
        return this.get('hasNext') === false;
    }.property('hasNext'),
    isPrevDisabled: function() {
        return Ember.isNone(this.get('skipValue')) || this.get('skipValue') <= 0;
    }.property('skipValue'),
    hasNew: function() {
        return this.anyBy('isNew', true);
    }.property('[]'),
    isSortByArtists: function() {
        return this.get('sortBy') === 'artists';
    }.property('sortBy'),
    isSortByTitle: function() {
        return this.get('sortBy') === 'title';
    }.property('sortBy')
});

CCAdmin.LetterController = Ember.ObjectController.extend({
    isFilter: function() { 
        return this.get('parentController').get('letterFilter') === this.get('content');
    }.property('parentController.letterFilter')
});