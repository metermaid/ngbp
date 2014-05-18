var gulp = require('gulp');
var sass = require('gulp-ruby-sass');

// Build Config

var build_dir = 'build';


var app_files = {  
  sass: [ 'src/style/**/*.scss' ],

  coffee: [ 'src/**/*.coffee', '!src/**/*.spec.coffee' ],

  spec: [ 'src/**/*.spec.coffee' ],

  atpl: [ 'src/app/**/*.tpl.html' ],
  ctpl: [ 'src/common/**/*.tpl.html' ],

  html: [ 'src/index.html' ],

  assets: [ 'src/assets/**/*.*' ]
};

var destinations = {  
  css: build_dir + "/style",
  js: build_dir + "/src",
  libs: build_dir + "/vendor",
  html: build_dir,
  assets: build_dir + "/assets",
};

var vendor_files = {
  js: [
    'vendor/angular/angular.js',
    'vendor/angular-ui-router/release/angular-ui-router.js',
    'vendor/angular-ui-utils/modules/route/route.js'
  ],
  css: [
  ],
  assets: [
  ]
};

// Tasks

gulp.task('styles', function() {
  return gulp.src(app_files.sass)
        .pipe(sass({sourcemap:true}))
        .pipe(gulp.dest(destinations.css));
});

gulp.task('watch', function() {
  gulp.watch(app_files.sass, ['sass']);
});

gulp.task('build', function() {
  gulp.task('styles');
});

gulp.task('default', ['build'], function() {
  // place code for your default task here
});