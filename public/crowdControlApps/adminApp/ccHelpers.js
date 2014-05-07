CCAdmin.getResource = function(resource, query) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
        var searchLimit = Fixtures.get('searchLimit');
        dpd(resource).get(query, function(result, error) {
            if (!Ember.isNone(result)) {
                console.log(result)
                resolve({
                    items: result.slice(0, searchLimit),
                    hasNext: result.length === searchLimit + 1
                });
            } else if (!Ember.isNone(error)) {
                reject(error);
            }
        });
    });
}