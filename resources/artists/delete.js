var self = this;

dpd.songs.get({artist : this.name}, function(songs) {
    songs.forEach(function(song, index, songs) {
        if (song.artists.length === 1) {
            dpd.songs.del(song);    
        } else {
            dpd.songs.put(song.id, { artists : { $pull : self.name}});
        }
    });
});