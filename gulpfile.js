var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cp = require('child_process');
var pug = require('gulp-pug');
var minify = require('gulp-minify');
var concat = require('gulp-concat');

const express = require('express');
const fs = require('fs');
const webport = 4545;
// Initliaze express application
const app = new express();

// gulp.task('browser-sync', ['sass', 'js', 'pug'], function () {
//     browserSync({
//         server: {
//             baseDir: './',
//           },
//       });
//   });

gulp.task('sass',function(){
  return gulp.src('asset/sass/main.sass')
      .pipe(sass({ includePaths: ['asset/sass'], onError: browserSync.notify, }))
      .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true, }))
      .pipe(gulp.dest('src/asset/css'))
      .pipe(browserSync.reload({ stream: true, }));
});

gulp.task('js', function(){
  return gulp.src('asset/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
    }))
    .pipe(gulp.dest('src/asset/js'))
});

gulp.task('pug', function(){
    return gulp.src('asset/pugs/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('src/template'))
})

gulp.task('server',server());

gulp.task('watch', function(){
  gulp.watch('asset/sass/**/*.sass',['sass']);
  gulp.watch('asset/js/**/*.js',['js']);
  gulp.watch(['asset/pugs/*'], ['pug']);

});

gulp.task('default', ['pug','sass','js','watch','server']);





function server (){
  app.disable('x-powered-by');
  // Setting express port
  app.set('port', webport);
  // Start express server
  app.listen(app.set('port'), function() {
      console.log(`Server run on ${webport}`)
  });
  // Default index page
  app.get('/', function(req, res) {
      let index = fs.readFileSync('./src/template/index.html','utf8')
      res.end(index)
  });

  app.get('/typing',function (req,res) {
      let typing = fs.readFileSync('./src/template/typing.html','utf8')
      res.end(typing)
  });

  app.get('/', function(req, res) {
      let index = fs.readFileSync('./src/template/index.html','utf8')
      res.end(index)
  });

  app.get('/mainJs',function(req,res){
      let scriptv = fs.readFileSync('./src/asset/js/main.js','utf8')
      res.end(scriptv)
  });

  app.get('/main.css', function(req, res) {
      console.log("style loaded");
      let style = fs.readFileSync('./src/asset/css/main.css','utf8')
      res.end(style)
  });
}
