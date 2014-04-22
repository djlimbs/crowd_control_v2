var self = this;
var voters = (me.guests) ? me.guests.push(me.id) : [me.id];
if (me.userType === 'couple') {
    dpd.playlists.get({'owner' : { $in : [null, me.id]}, $limitRecursion : 10}, function(playlists) {
        playlists.forEach(function(playlist) {
            self[playlist.name] = playlist;
        });
    });
    
    dpd.votes.get({'voter' : { $in : voters}}, function(votes) {
        self.votes = votes;
    });
}