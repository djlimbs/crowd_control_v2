var self = this;
var voters = (me.guests) ? me.guests.push(me.id) : [me.id];
if (me.userType === 'couple') {
    dpd.tabs.get({'owner' : { $in : [null, me.id]}, $limitRecursion : 10, $sort: {order : 1}}, function(tabs) {
        this.tabs = tabs;
    });
    
    dpd.votes.get({'voter' : { $in : voters}}, function(votes) {
        this.votes = votes;
    });
}