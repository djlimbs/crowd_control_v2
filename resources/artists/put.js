var self = this;

dpd.songs.get({artist : previous.name}, function(songs) {
    songs.forEach(function(song, index, songs) {
        dpd.songs.put(song.id, { artists : { $pull : previous.name, $push : self.name}});
    });
});