const config = require('./config').knex;

module.exports = (grunt) => {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      target: ['Gruntfile.js', 'client/**/*.js', 'db/**/*.js', 'server/**/*.js'],
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
        },
        src: ['server/test/**/*.js'],
      },
    },

    pgcreatedb: {
      default: {
        connection: config.connection,
        ssl: true,
      },
      name: config.connection.database,
    },
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-pg');

  grunt.registerTask('default', ['eslint']);
  grunt.registerTask('test', ['mochaTest']);
};
