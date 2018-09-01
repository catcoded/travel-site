var gulp = require('gulp'),
    browserSync = require('browser-sync').create();

gulp.task('reload', function(done) {
  browserSync.reload();
  done();
});

gulp.task('inject-styles', function() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch('./app/index.html', gulp.task('reload'));

  gulp.watch('./app/assets/styles/**/*.css', gulp.series('styles', gulp.task('inject-styles')));
});