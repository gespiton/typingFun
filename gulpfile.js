let gulp = require('gulp');
let browserSync = require('browser-sync');
let sass = require('gulp-sass');
let prefix = require('gulp-autoprefixer');
let cp = require('child_process');
let pug = require('gulp-pug');
let minify = require('gulp-minify');
let concat = require('gulp-concat');
let server = require('./src/asset/js/server');
let pump = require('pump');

// gulp.task('browser-sync', ['sass', 'js', 'pug'], function () {
//     browserSync({
//         server: {
//             baseDir: './',
//           },
//       });
//   });

gulp.task('sass', function (cb) {
    pump([
            gulp.src('asset/sass/main.sass'),

            sass({
                includePaths: ['asset/sass'],
                onError: browserSync.notify,
            }),

            prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
                cascade: true,
            }),

            gulp.dest('src/asset/css')
            // .pipe(browserSync.reload({
            //     stream: true,
            // }));
        ],
        cb
    )
});

gulp.task('js', function (cb) {
    pump(
        [
            gulp.src('asset/js/**/*.js'),

            concat('main.js'),

            minify({
                ext: {
                    src: '-debug.js',
                    min: '.js'
                },
            }),

            gulp.dest('src/asset/js')
        ],
        cb
    )
});

gulp.task('pug', function (cb) {
    pump([
            gulp.src('asset/pugs/**/*.pug'),
            pug(),
            gulp.dest('src/template')
        ],
        cb
    )
});

gulp.task('server', server.runServer());

gulp.task('watch', function () {
    gulp.watch('asset/sass/**/*.sass', ['sass']);
    gulp.watch('asset/js/**/*.js', ['js']);
    gulp.watch(['asset/pugs/*'], ['pug']);
});

gulp.task('default', ['pug', 'sass', 'js', 'watch', 'server']);
