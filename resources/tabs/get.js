dpd.playlists.get({"id": { $in : this.playlists }}, function(playlists) {
    /*this.playlists.forEach(function(pl){ 
        var playlistData = playlists.filter(function(plD) { return plD.id === pl.id;})[0];
        if (playlistData) {
            pl = {
                name: playlistData.name
            };
        }
    });*/
    this.playlistsData = playlists;
    //console.log(playlists.filter(function(pl) { return pl.id === "bdd25a2af45769c3";}));
    //this.playlistsData = playlists;
});