var self = this;
var voters = (me.guests) ? me.guests.push(me.id) : [me.id];
if (me.userType === 'couple') {
    dpd.tabs.get({'owner' : { $in : [null, me.id]}, $limitRecursion : 10}, function(tabs) {
        tabs.forEach(function(tab) {
            self[tab.name] = tab;
        });
    });
    
    dpd.votes.get({'voter' : { $in : voters}}, function(votes) {
        self.votes = votes;
    });
}