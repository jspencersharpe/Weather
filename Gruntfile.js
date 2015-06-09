module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    autoprefixer: {
      main: {
        options: ['>1% in US'],
        src: 'src/css/main.css'
      }
    },
    bower_concat: {
      main: {
        src: 'bower_components/',
        dest: 'src/lib/build.js',
        cssDest: 'src/lib/build.css'
      }
    },
    clean: ['public'],
    connect: {
      main: {
        options: {
          port: 9000,
          base: 'src/',
          open: true,
          livereload: true
        }
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: [
              '**',
              '!**/*.scss',
              '!**/*.js'
            ],
            dest: 'public/',
            filter: 'isFile'
          }
        ]
      }
    },
    cssmin: {
      main: {
        files: {
          'src/lib/build.css': 'src/lib/build.css'
        }
      }
    },
    sass: {
      prod: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'src/css/main.css': 'src/styles/main.scss'
        }
      },
      dev: {
        options: {
          sourceMap: true,
          sourceMapEmbed: true
        },
        files: {
          'src/css/main.css': 'src/styles/main.scss'
        }
      }
    },
    watch: {
      livereload: {
        options: {
          livereload: true
        },

        files: [
          'public/css/main.css',
          'public/js/**/*.js',
          'public/**/*.html'
        ]
      },
      sass: {
        files: ['src/**/*.scss'],
        tasks: ['sass:dev', 'autoprefixer']
      }

    }
  });

  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.registerTask('default', []);
  grunt.registerTask('build', [
    'clean',
    'copy',
    'bower_concat',
    'sass:prod',
    'autoprefixer',
    'cssmin'
  ]);
  grunt.registerTask('build-dev', [
    'clean',
    'copy',
    'bower_concat',
    'sass:dev',
    'autoprefixer'
  ]);

  grunt.registerTask('serve', [
    'build-dev',
    'connect',
    'watch'
  ]);

};

