Ember.TEMPLATES["main"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"container mt10\">\n	<div class=\"header clearfix\">\n        <ul class=\"nav nav-pills pull-right\">\n          	<li class=\"active\">\n            	<a href=\"#\">Login</a>\n          	</li>\n          	<li>\n            	<a href=\"#\">About</a>\n          	</li>\n          	<li>\n            	<a href=\"#\">Contact</a>\n          	</li>\n        </ul>\n        \n    </div>\n	<div class=\"login-form\">\n        <h2 class=\"form-signin-heading\">Come on in</h2>\n        ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control mb10"),
    'placeholder': ("Email address"),
    'value': ("username")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n        ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("password"),
    'class': ("form-control"),
    'placeholder': ("Password"),
    'value': ("password")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n        <label class=\"checkbox\">\n          	<input type=\"checkbox\" value=\"remember-me\"> Remember me\n        </label>\n        <button class=\"btn btn-lg btn-primary btn-block\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickSignIn", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Sign in</button>\n    </div>\n	<div class=\"footer\">\n		<p>&copy; Erika 2014</p>\n	</div>\n</div>");
  return buffer;
  
});