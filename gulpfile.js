var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var contentInclude = require('gulp-content-includer');
// var replace = require('gulp-replace');

gulp.task('sass', function () {
    return sass('out/src/css/**/*.scss',{sourcemap:true})
    
        .on('error', sass.logError)

        // For inline sourcemaps
        .pipe(sourcemaps.write())
        // For file sourcemaps
        .pipe(sourcemaps.write('maps', {
            includeContent: false,
            sourceRoot: 'source'
        }))
        .pipe(gulp.dest('out/src/css'));
});

gulp.task('watch', function () {
    gulp.watch('out/src/css/**/*css', ['sass']);
    gulp.watch('dev/**/*.html',['concat']);
});

gulp.task('concat',function() {
    gulp.src("dev/**/[!_]*.html")
        .pipe(contentInclude({
            includerReg:/<!\-\-include\s+"([^"]+)"\-\->/g
        }))
        .pipe(gulp.dest('./out'));
});

gulp.task('default',['sass','watch','concat']);