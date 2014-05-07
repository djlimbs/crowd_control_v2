dpd.artists.get({name: this.name}, function(artists) {
    cancelIf(artists.length > 0 && artists[0].id !== this.id, 'This artist already exists in the database.');
});

this.name = this.name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});