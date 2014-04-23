dpd.artists.get({id : {$in : this.artists}, $sort : { name : 1}}, function(artists) {
    this.artists = artists;
});