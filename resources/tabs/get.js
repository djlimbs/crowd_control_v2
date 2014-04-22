dpd.playlists.get({"id": { $in : this.playlists }, $sort: {$natural: 1}}, function(playlists) {
    this.playlists = playlists;
});