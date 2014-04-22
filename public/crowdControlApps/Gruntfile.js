/*jshint camelcase: false */
/*global module:false */
module.exports = function(grunt) {

  grunt.initConfig({
    /* 
       A simple ordered concatenation strategy.
       This will start at app/app.js and begin
       adding dependencies in the correct order
       writing their string contents into
       'build/application.js'

       Additionally it will wrap them in evals
       with @ sourceURL statements so errors, log
       statements and debugging will reference
       the source files by line number.

       You would set this option to false for 
       production.
    */
    neuter: {
      options: {
        includeSourceURL: true
      },
      'builds/ccCouple.js': 'coupleApp/ccCoupleCompiler.js',
      'builds/ccLogin.js': 'loginApp/ccLoginCompiler.js',
      'builds/ccAdmin.js': 'adminApp/ccAdminCompiler.js',
    },

    /*
      Watch files for changes.

      Changes in dependencies/ember.js or application javascript
      will trigger the neuter task.

      Changes to any templates will trigger the ember_templates
      task (which writes a new compiled file into dependencies/)
      and then neuter all the files again.
    */
    watch: {
      application_code: {
        files: ['**App/*.js'],
        tasks: ['neuter']
      },

     // handlebars_templates: {
     //   files: ['app/**/*.hbs'],
     //   tasks: ['ember_templates', 'neuter']
     // }
     handlebars_templates: {
        files: ['**App/**/*.hbs'],
        tasks: ['ember_templates']
     }
    },

    /* 
      Finds Handlebars templates and precompiles them into functions.
      The provides two benefits:

      1. Templates render much faster
      2. We only need to include the handlebars-runtime microlib
         and not the entire Handlebars parser.

      Files will be written out to dependencies/compiled/templates.js
      which is required within the project files so will end up
      as part of our application.

      The compiled result will be stored in
      Ember.TEMPLATES keyed on their file path (with the 'app/templates' stripped)
    */
    ember_templates: {
      options: {
        templateName: function(sourceFile) {
          return sourceFile.replace(/\w*App\/templates\//, '');
        }
      },
      //'dependencies/compiled/templates.js': ["app/templates/**/*.hbs"]
      'coupleApp/templates.js': ["coupleApp/templates/**/*.hbs"],
      'loginApp/templates.js': ["loginApp/templates/**/*.hbs"],
      'adminApp/templates.js': ["adminApp/templates/**/*.hbs"]
    },

  });
  
  grunt.loadNpmTasks('grunt-neuter');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ember-templates');
  
  /*
    Default task. Compiles templates, neuters application code, and begins
    watching for changes.
  */
  //grunt.registerTask('default', ['ember_templates', 'neuter', 'watch']);
  //grunt.registerTask('default', ['ember_templates', 'watch']);
  grunt.registerTask('default', ['ember_templates', 'neuter', 'watch']);
};
