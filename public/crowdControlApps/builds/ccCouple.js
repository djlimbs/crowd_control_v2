eval("(function() {\n\nEmber.TEMPLATES[\"main\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\nthis.compilerInfo = [4,'>= 1.0.0'];\nhelpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n  var buffer = '', stack1, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;\n\nfunction program1(depth0,data) {\n  \n  var buffer = '', stack1, hashContexts, hashTypes, options;\n  data.buffer.push(\"\\n                <li \");\n  hashContexts = {'class': depth0};\n  hashTypes = {'class': \"STRING\"};\n  options = {hash:{\n    'class': (\"active\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"bind-attr\", options))));\n  data.buffer.push(\" \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"clickSelectTab\", {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"><a href=\\\"#\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"name\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</a></li>\\n            \");\n  return buffer;\n  }\n\n  data.buffer.push(\"<div class=\\\"container\\\">\\n\t<div class=\\\"clearfix\\\">\\n\t\t<span class=\\\"pull-right main-label\\\">Crowd Control</span>\\n\t\t<ul class=\\\"nav nav-tabs\\\">\\n            \");\n  hashContexts = {'itemController': depth0};\n  hashTypes = {'itemController': \"STRING\"};\n  stack1 = helpers.each.call(depth0, \"tabs\", {hash:{\n    'itemController': (\"tab\")\n  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n\t    </ul>\\n\t</div>\\n\t\");\n  hashTypes = {};\n  hashContexts = {};\n  options = {hash:{},contexts:[depth0,depth0],types:[\"STRING\",\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers.render || (depth0 && depth0.render)),stack1 ? stack1.call(depth0, \"tab\", \"selectedTab\", options) : helperMissing.call(depth0, \"render\", \"tab\", \"selectedTab\", options))));\n  data.buffer.push(\"\\n\t<div class=\\\"footer\\\">\\n\t\t<p>&copy; Erika 2014</p>\\n\t</div>\\n</div>\");\n  return buffer;\n  \n});\n\nEmber.TEMPLATES[\"tab\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\nthis.compilerInfo = [4,'>= 1.0.0'];\nhelpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;\n\nfunction program1(depth0,data) {\n  \n  var buffer = '', hashTypes, hashContexts;\n  data.buffer.push(\"\\n                    <li><a href=\\\"#\\\" \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"clickShowPlaylist\", \"\", {hash:{},contexts:[depth0,depth0],types:[\"STRING\",\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</a></li>\\n                \");\n  return buffer;\n  }\n\nfunction program3(depth0,data) {\n  \n  var buffer = '', stack1, hashTypes, hashContexts;\n  data.buffer.push(\"\\n    \");\n  hashTypes = {};\n  hashContexts = {};\n  stack1 = helpers.each.call(depth0, \"displayedPlaylists\", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n\");\n  return buffer;\n  }\nfunction program4(depth0,data) {\n  \n  var buffer = '', stack1, hashTypes, hashContexts;\n  data.buffer.push(\"\\n        <div class=\\\"row text-center\\\">\\n            <div style=\\\"padding-bottom:10px;\\\">\\n                <h4 class=\\\"mb0\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"name\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</h4>\\n                <p><small><i class=\\\"text-muted\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"description\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</i></small></p>\\n            </div>\\n            \");\n  hashContexts = {'itemController': depth0};\n  hashTypes = {'itemController': \"STRING\"};\n  stack1 = helpers.each.call(depth0, \"songs\", {hash:{\n    'itemController': (\"song\")\n  },inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n        </div>\\n    \");\n  return buffer;\n  }\nfunction program5(depth0,data) {\n  \n  var buffer = '', stack1, hashContexts, hashTypes, options;\n  data.buffer.push(\"\\n                <div class=\\\"col-lg-3 col-md-4 col-sm-6 col-xs-6\\\">\\n                    <div class=\\\"song-choice\\\">\\n                        <span \");\n  hashContexts = {'class': depth0};\n  hashTypes = {'class': \"STRING\"};\n  options = {hash:{\n    'class': (\"score\")\n  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};\n  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, \"bind-attr\", options))));\n  data.buffer.push(\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"displayText\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</span>\\n                        <div class=\\\"rate\\\">\\n                            <span class=\\\"clickable glyphicon glyphicon-music\\\"></span> \\n                            &#8226; <small class=\\\"clickable\\\" \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"clickPlay\", {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\">Play</small> \\n                            &#8226; <small class=\\\"clickable\\\" \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"clickNay\", {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\">Nay</small> \\n                            &#8226; <small class=\\\"clickable\\\" \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"clickEitherWay\", {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\">Either Way</small>\\n                        </div>\\n                    </div>\\n                </div>\\n            \");\n  return buffer;\n  }\n\nfunction program7(depth0,data) {\n  \n  var buffer = '', stack1, hashTypes, hashContexts;\n  data.buffer.push(\"\\n    \");\n  hashTypes = {};\n  hashContexts = {};\n  stack1 = helpers.each.call(depth0, \"displayedPlaylists\", {hash:{},inverse:self.noop,fn:self.programWithDepth(8, program8, data, depth0),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n\");\n  return buffer;\n  }\nfunction program8(depth0,data,depth1) {\n  \n  var buffer = '', stack1, hashTypes, hashContexts;\n  data.buffer.push(\"\\n        <div class=\\\"row text-center\\\">\\n            <div style=\\\"padding-bottom:10px;\\\">\\n                <h4 class=\\\"mb0\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"name\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</h4>\\n                <p><small><i class=\\\"text-muted\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"description\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</i></small></p>\\n            </div>\\n        </div>\\n        \");\n  hashTypes = {};\n  hashContexts = {};\n  stack1 = helpers['if'].call(depth0, \"noSongsScored\", {hash:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth1],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n        <div class=\\\"row text-center\\\">\\n            \");\n  hashContexts = {'itemController': depth0};\n  hashTypes = {'itemController': \"STRING\"};\n  stack1 = helpers.each.call(depth0, \"songs\", {hash:{\n    'itemController': (\"song\")\n  },inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n        </div>\\n    \");\n  return buffer;\n  }\nfunction program9(depth0,data) {\n  \n  var buffer = '', hashTypes, hashContexts;\n  data.buffer.push(\"\\n            <div class=\\\"row text-center\\\">\\n                <p>Nothing picked yet! See them <a href=\\\"#\\\" \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"clickShowAllSongs\", {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\">all</a> to start rating songs!</p>\\n            </div>\\n        \");\n  return buffer;\n  }\n\nfunction program11(depth0,data) {\n  \n  var buffer = '', stack1, hashTypes, hashContexts;\n  data.buffer.push(\"\\n                <div class=\\\"song-choice\\\">\\n                    <span>\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"displayText\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</span>\\n                    <div class=\\\"rate\\\">\\n                        <span class=\\\"clickable glyphicon glyphicon-music\\\"></span> \\n                        \");\n  hashTypes = {};\n  hashContexts = {};\n  stack1 = helpers.unless.call(depth0, \"isPlay\", {hash:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n                        \");\n  hashTypes = {};\n  hashContexts = {};\n  stack1 = helpers.unless.call(depth0, \"isNay\", {hash:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n                        &#8226; <small class=\\\"clickable\\\" \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"clickEitherWay\", {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\">Either Way</small>\\n                    </div>\\n                </div>\\n            \");\n  return buffer;\n  }\nfunction program12(depth0,data) {\n  \n  var buffer = '', hashTypes, hashContexts;\n  data.buffer.push(\"&#8226; <small class=\\\"clickable\\\" \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"clickPlay\", {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\">Play</small> \");\n  return buffer;\n  }\n\nfunction program14(depth0,data) {\n  \n  var buffer = '', hashTypes, hashContexts;\n  data.buffer.push(\"&#8226; <small class=\\\"clickable\\\" \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"clickNay\", {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\">Nay</small> \");\n  return buffer;\n  }\n\n  data.buffer.push(\"<div class=\\\"header\\\" style=\\\"margin-top:19px;\\\">\\n    <div class=\\\"pull-right menu-items\\\">\\n        <div class=\\\"btn-group\\\">\\n            <button type=\\\"button\\\" class=\\\"btn btn-default dropdown-toggle\\\" data-toggle=\\\"dropdown\\\">\\n                Show <span class=\\\"caret\\\"></span>\\n            </button>\\n            <ul class=\\\"dropdown-menu\\\" role=\\\"menu\\\">\\n                <li><a href=\\\"#\\\" \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"clickShowAllSongs\", {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\">All Songs</a></li>\\n                \");\n  hashTypes = {};\n  hashContexts = {};\n  stack1 = helpers.each.call(depth0, \"allPlaylists\", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n                <li class=\\\"divider\\\"></li>\\n                <li><a href=\\\"#\\\" \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"clickShowPlays\", {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\">Just Plays</a></li>\\n                <li><a href=\\\"#\\\" \");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers.action.call(depth0, \"clickShowNays\", {hash:{},contexts:[depth0],types:[\"STRING\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\">Just Nays</a></li>\\n            </ul>\\n        </div>\\n        <button type=\\\"button\\\" class=\\\"btn btn-default\\\">Print</button>\\n    </div>\\n    <h3 class=\\\"pb0\\\">\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"header\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</h3>\\n    <p>\");\n  hashTypes = {};\n  hashContexts = {};\n  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, \"description\", {hash:{},contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));\n  data.buffer.push(\"</p>\\n</div>\\n\");\n  hashTypes = {};\n  hashContexts = {};\n  stack1 = helpers.unless.call(depth0, \"preferenceFilter\", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n\");\n  hashTypes = {};\n  hashContexts = {};\n  stack1 = helpers['if'].call(depth0, \"preferenceFilter\", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:[\"ID\"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});\n  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n  data.buffer.push(\"\\n\");\n  return buffer;\n  \n});\n\n})();//@ sourceURL=coupleApp/templates.js")

eval("(function() {\n\n// Kick off Ember\nCCCouple = Ember.Application.create({\n    rootElement: '#application',\n});\n\n// Controllers\nCCCouple.MainController = Ember.ObjectController.extend({\n    actions: {\n        selectTab: function(name) {\n            this.set('selectedTab', this.get('tabs').findBy('name', name));\n        }\n    }\n});\n\n\nCCCouple.TabController = Ember.ObjectController.extend({\n    needs: ['main'],\n    votesBinding: 'controllers.main.votes',\n    selectedTabBinding: 'controllers.main.selectedTab',\n    active: function() {\n        return this.get('name') === this.get('selectedTab').name;\n    }.property('selectedTab'),\n    allPlaylists: function() {\n        return Ember.isNone(this.get('playlists')) ? [] : this.get('playlists').getEach('name');\n    }.property('playlists'),\n    displayedPlaylists: function() {\n        var playlists = this.get('playlists');\n        var playlistFilter = this.get('playlistFilter');\n        var preferenceFilter = this.get('preferenceFilter');\n        if (!Ember.isNone(playlistFilter)) {\n            return playlists.filter(function(playlist) {\n                return playlist.name === playlistFilter;\n            });\n        } else if (!Ember.isNone(preferenceFilter)) {\n            var playVotes = this.get('votes').filterBy('score', preferenceFilter);\n\n            return [{\n                name: 'Your selected ' + preferenceFilter + 's',\n                songs: playlists.getEach('songs').compact().reduce(function(a,b) { return a.concat(b); }).filter(function(song) {\n                            return playVotes.anyBy('song', song.id);\n                        })\n            }];\n        } else {\n            return this.get('playlists');\n        }\n    }.property('playlists', 'playlistFilter', 'preferenceFilter', 'votes'),\n    noSongsScored: function() {\n        return Ember.isEmpty(this.get('displayedPlaylists').getEach('songs').reduce(function(a,b) { return a.concat(b); }));\n    }.property('displayedPlaylists'),\n    actions: {\n        clickSelectTab: function() {\n            this.send('selectTab', this.get('name'));\n        },\n        clickShowPlaylist: function(playlistName) {\n            this.setProperties({\n                playlistFilter: playlistName.valueOf(),\n                preferenceFilter: undefined\n            });\n        },\n        clickShowAllSongs: function() {\n            this.setProperties({\n                playlistFilter: undefined,\n                preferenceFilter: undefined\n            });\n        },\n        clickShowPlays: function() {\n            this.setProperties({\n                playlistFilter: undefined,\n                preferenceFilter: 'play',\n            });\n        },\n        clickShowNays: function(preference) {\n            this.setProperties({\n                categoryFilter: undefined,\n                preferenceFilter: 'nay'\n            });\n        }\n    }\n});\n\nCCCouple.SongController = Ember.ObjectController.extend({\n    needs: ['main'],\n    votesBinding: 'controllers.main.votes',\n    userIdBinding: 'controllers.main.id',\n    myVote: function() {\n        var self = this;\n        return this.get('votes').find(function(vote) {\n            return vote.voter === self.get('userId') && vote.song === self.get('id');\n        });\n    }.property('votes'),\n    score: function() {\n        return !Ember.isNone(this.get('myVote')) ? this.get('myVote').score : 'either way';\n    }.property('myVote'),\n    actions: {\n        clickPreview: function() {\n\n        },\n        clickPlay: function() {\n            var self = this;\n            var vote = this.get('myVote');\n            if (!Ember.isNone(vote)) {\n                vote.score = 'play';\n                dpd.votes.put(vote, function(result, error) {\n                    self.notifyPropertyChange('votes');\n                    self.get('parentController').notifyPropertyChange('votes');\n                });\n            } else {\n                vote = {\n                    voter: this.get('userId'),\n                    song: this.get('id'),\n                    score: 'play'\n                };\n                dpd.votes.post(vote, function(result, error) {\n                    if (!Ember.isNone(result)) {\n                        vote.id = result.id;\n                        self.get('votes').addObject(vote);\n                        self.notifyPropertyChange('votes');\n                        self.get('parentController').notifyPropertyChange('votes');\n                    }\n                });\n            }\n\n            \n        },\n        clickNay: function() {\n            var self = this;\n            var vote = this.get('myVote');\n            if (!Ember.isNone(vote)) {\n                vote.score = 'nay';\n                dpd.votes.put(vote, function(result, error) {\n                    if (!Ember.isNone(result)) {\n                        self.notifyPropertyChange('votes');\n                        self.get('parentController').notifyPropertyChange('votes');\n                    }\n                });\n            } else {\n                vote = {\n                    voter: this.get('userId'),\n                    song: this.get('id'),\n                    score: 'nay'\n                };\n                dpd.votes.post(vote, function(result, error) {\n                    if (!Ember.isNone(result)) {\n                        vote.id = result.id;\n                        self.get('votes').addObject(vote);\n                        self.notifyPropertyChange('votes');\n                    }\n                });\n            }\n        },\n        clickEitherWay: function() {\n            var vote = this.get('myVote');\n            this.get('votes').removeObject(vote);\n            if (!Ember.isNone(vote) && !Ember.isNone(vote.id)) { dpd.votes.del(vote.id); }\n            this.notifyPropertyChange('votes');\n        }\n    }\n});\n\n// Routes\nCCCouple.MainRoute = Ember.Route.extend({\n    model: function() {\n        return new Ember.RSVP.Promise(function(resolve, reject) {\n            var coupleData = Ember.Object.create();\n            dpd.users.me(function(result, error) {\n                var emberObject = Ember.Object.create(result);\n                resolve(emberObject);\n            });\n        });\n    },\n    setupController: function(controller, model) {\n        controller.setProperties({\n            model: model,\n            selectedTab: !Ember.isNone(model.get('tabs')) ? model.get('tabs')[0] : undefined\n        });\n    }\n});\n\n\n// Router\nCCCouple.Router.map(function() {\n    this.resource('main', { path: '/' });\n});\n\n// This setting disables the detail routing from showing up in the navbar.\nCCCouple.Router.reopen( {\n    location: 'none'\n});\n\n})();//@ sourceURL=coupleApp/ccCoupleApp.js")