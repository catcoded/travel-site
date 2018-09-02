var gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),
    rename = require('gulp-rename'),
    del = require('del');

var config = {
  mode: {
    css: {
      sprite: 'sprite.svg',
      render: {
        css: {
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
}

gulp.task('begin-clean', function() {
  return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

gulp.task('create-sprite', function() {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
});

gulp.task('copy-sprite-graphic', function() {
  return gulp.src('./app/temp/sprite/css/**/*.svg')
    .pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('copy-sprite-css', function() {
  return gulp.src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('end-clean', function() {
  return del('./app/temp/sprite');
});

gulp.task('icons',
  gulp.series('begin-clean', 
    gulp.series('create-sprite',
      gulp.series(
        gulp.parallel('copy-sprite-graphic', 'copy-sprite-css'),
        gulp.task('end-clean')
      )
    )
  )
);