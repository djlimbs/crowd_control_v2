dpd.songs.get({"id" : { $in : this.songs }}, function(songs) {
    this.songs = songs;
});