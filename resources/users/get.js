var self = this;
var voters = (me.guests) ? me.guests.push(me.id) : [me.id];
if (me.userType === 'couple') {
    dpd.tabs.get({'owner' : { $in : [null, me.id]}, $limitRecursion : 10, $sort: {order : 1}}, function(tabs) {
        self.tabs = tabs;
        /*tabs.forEach(function(tab) {
            self[tab.name] = tab;
        });*/
    });
    
    dpd.votes.get({'voter' : { $in : voters}}, function(votes) {
        self.votes = votes;
    });
}