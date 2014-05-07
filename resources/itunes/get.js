var options = {
    method: 'GET',
    timeout: 5000
};

if (query.id) {
    options.uri = 'http://itunes.apple.com/lookup?id=' + query.id ;
} else if (query.displayText) {
    var songString = query.displayText.replace('- ', '').replace('& ', '').replace(/ /g, '+');
    options.uri = 'http://itunes.apple.com/search?term=' + songString + '&media=music&entity=song&limit=1';
}

ajax(options);