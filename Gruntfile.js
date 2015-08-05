module.exports = function(grunt) {
  grunt.initConfig({
    babel: {
      options: {},
      dist: {
        files: {
          'bin/client.js': 'bin/client.src.js',
          'views/MainView.js': 'views/MainView.src.js',
          'views/PlayersView.js': 'views/PlayersView.src.js',
          'views/LiveScoringView.js': 'views/LiveScoringView.src.js'
        }
      }
    },
    browserify: {
      options: {},
      dist: {
        files: {
          '.tmp/client.pre.js': [
            'bin/client.js',
            'views/MainView.js',
            'views/PlayersView.js',
            'views/LiveScoringView.js',
            'views/Store.js'
          ]
        }
      }
    },
    uglify: {
      dist: {
        options: {
          beautify: {
            indent_level: 2,
            width: 80,
            quote_style: 0,
            max_line_len: 1000,
            bracketize: true,
            semicolons: true
          },
          compress: {
            unsafe: true,
            drop_console: true,
            keep_fargs: false,
            join_vars: true,
            if_return: true,
            hoist_funs: true,
            unused: true,
            negate_iife: true,
            comparisons: true,
            conditionals: true,
            dead_code: true,
            sequences: true,
            cascade: true
          },
          screwIE8: true,
          wrap: false,
          mangle: true,
          sourceMap: false
        },
        files: {
          'public/scripts/client.js': '.tmp/client.pre.js'
        }
      },
      dev: {
        options: {
          compress: false,
          screwIE8: false,
          beautify: true,
          mangle: false,
          wrap: false,
          sourceMap: false
        },
        files: {
          'public/scripts/client.js': '.tmp/client.pre.js'
        }
      }
    },
    purifycss: {
      options: {},
      target: {
        src: ['public/index.html', 'public/scripts/client.js'],
        css: [
          'lib/skeleton/css/normalize.css',
          'lib/skeleton/css/skeleton.css',
          'views/stylesheets/style.css'
        ],
        dest: '.tmp/style.pure.css'
      }
    },
    cssmin: {
      options: {
        roundingPrecision: -1,
        processImport: false,
        keepSpecialComments: 1
      },
      dist: {
        files: {
          'public/stylesheets/style.css': '.tmp/style.pure.css'
        }
      }
    },
    watch: {
      configFiles: {
        options: {
          debounceDelay: 25,
          reload: true
        },
        files: ['Gruntfile.js']
      },
      css: {
        options: {
          debounceDelay: 25,
          spawn: false,
          atBegin: false
        },
        files: ['views/stylesheets/*.css', 'lib/skeleton/css/*.css'],
        tasks: ['purifycss', 'cssmin']
      },
      scripts: {
        options: {
          debounceDelay: 25,
          spawn: false,
          atBegin: true
        },
        files: ['bin/client.src.js', 'views/*.src.js', 'views/Store.js'],
        tasks: ['babel:dist', 'browserify:dist', 'uglify:dev', 'purifycss', 'cssmin']
      }
    }
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-purifycss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['babel:dist', 'browserify:dist', 'uglify:dist', 'purifycss', 'cssmin']);
  grunt.registerTask('dev', ['babel:dist', 'browserify:dist', 'uglify:dev', 'purifycss', 'cssmin']);
};
