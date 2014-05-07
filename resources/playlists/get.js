dpd.songs.get({"id" : { $in : this.songs }, $sort : {displayText: 1}}, function(songs) {
    this.songs = songs;
});