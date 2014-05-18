var gulp = require('gulp');

var plugins = require('gulp-load-plugins')();
plugins.sass = require('gulp-ruby-sass');

var runSequence = require('run-sequence'); // needed for non-dependent ordered tasks

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

gulp.task('clean', function () {
    return gulp.src(['build/'], {read: false})
        .pipe(plugins.clean());
});

gulp.task('styles', function() {
  return gulp.src(app_files.sass)
        .pipe(plugins.sass({sourcemap:true}))
        .pipe(gulp.dest(destinations.css));
});

gulp.task('compile', function () {
    return gulp.src(app_files.coffee)
        .pipe(plugins.coffee({emitError: false}))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(destinations.js));
});

gulp.task('templates', function () {
    return gulp.src(app_files.atpl)
        .pipe(plugins.ngHtml2js({moduleName: 'templates'}))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(destinations.js));
});

gulp.task('vendors', function () {
    return gulp.src(vendor_files.js)
        .pipe(gulp.dest(destinations.libs));
});

gulp.task('assets', function () {
    return gulp.src(app_files.assets)
        .pipe(gulp.dest(destinations.assets));
});

gulp.task('index', function () {
    return gulp.src(app_files.html)
        .pipe(gulp.dest(destinations.html));
});

gulp.task('watch', function() {
  gulp.watch(app_files.sass, ['styles']);
  gulp.watch(app_files.coffee, ['compile']);
  gulp.watch([app_files.atpl, app_files.ctpl], ['templates']);
  gulp.watch(app_files.assets, ['assets']);
  gulp.watch(app_files.index, ['index']);
});

gulp.task('build', function() {
  runSequence('clean',
    ['styles', 'compile', 'templates', 'vendors', 'assets'],
    'index');
});

gulp.task('default', ['build'], function() {
  runSequence('watch');
});