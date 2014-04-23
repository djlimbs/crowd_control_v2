// Kick off Ember
CCLogin = Ember.Application.create({
    rootElement: '#application',
});


// Routes
CCLogin.MainRoute = Ember.Route.extend({
    actions: {
    	clickSignIn: function() {
    		controller = this.controllerFor('main');
    		console.log(controller.get('username'));
    		dpd.users.login({
                username: controller.get('username'),
                password: controller.get('password')
            }, function(result, error) {
            	if (!Ember.isNone(error)) {
            		console.log('invalid');
            	} else if (!Ember.isNone(result)) {
            		dpd.users.get(result.uid, {'onlyUserType': true}, function(me) {
            			if (me.userType === 'couple') {
            				window.location.href = 'couples.html';
            			} else if (me.userType === 'admin') {
                            window.location.href = 'admin.html';
                        }
            		});
            	}
            });
    	}
    }
});

// Router
CCLogin.Router.map(function() {
    this.route('main', { path: '/' });
});

// This setting disables the detail routing from showing up in the navbar.
CCLogin.Router.reopen( {
    location: 'none'
});