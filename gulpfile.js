var gulp = require('gulp'),
  minifycss = require('gulp-minify-css'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  uglify = require('gulp-uglify'),
  usemin = require('gulp-usemin'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  changed = require('gulp-changed'),
  rev = require('gulp-rev'),
  browserSync = require('browser-sync'),
  del = require('del');

var ngannotate = require('gulp-ng-annotate');

var htmlfile = "index.html";

gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// Clean
gulp.task('clean', function () {
  return del(['dist']);
});

// Default task
gulp.task('default', ['clean'], function () {
  gulp.start('copyhtml', 'usemin', 'imagemin', 'copyfonts');
});

gulp.task('copyhtml', ['clean'], function () {
  gulp.src('./app/**/*.html')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('usemin', ['jshint'], function () {
  return gulp.src('./app/' + htmlfile)
    .pipe(usemin({
      css:[minifycss(),rev()],
      js: [ngannotate(),uglify(),rev()]
      //css:[rev()],
      //js: [ngannotate(),rev()]
    }))
    .pipe(gulp.dest('dist/'));
});

// Images
gulp.task('imagemin', function () {
  return del(['dist/images']), gulp.src('app/images/**/*')
    //.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    //.pipe(notify({ message: 'Images task completed at ' + new Date() }))
  ;
});

gulp.task('copyfonts', ['clean'], function () {
  gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/fonts'));
  gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/fonts'));
});

// Watch
gulp.task('watch', ['browser-sync'], function () {
  // Watch .js files
  gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html}', ['usemin']);
  // Watch image files
  gulp.watch('app/images/**/*', ['imagemin']);

});

gulp.task('browser-sync', ['default'], function () {
  var files = [
      'app/**/*.html',
      'app/styles/**/*.css',
      'app/images/**/*.png',
      'app/scripts/**/*.js',
      'dist/**/*'
   ];

  browserSync.init(files, {
    server: {
      baseDir: "dist",
      index: htmlfile
    }
  });
  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', browserSync.reload);
});
