const gulp = require('gulp');
const sass = require('gulp-sass');
const browsersync = require('browser-sync').create();

// compile scss into css
function style() {
    return gulp.src('./app/scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('./app/css/'))
        .pipe(browsersync.stream())
}

function watch() {
    browsersync.init({
        server: {
            baseDir: './app/'
        }
    })
    gulp.watch('./app/scss/**/*.scss', style)
    gulp.watch('./app/*.html').on('change', browsersync.reload)
    gulp.watch('./app/js/**/*.js').on('change', browsersync.reload)
}

exports.style = style
exports.watch = watch
