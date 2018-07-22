const gulp = require('gulp');
const minjs = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const mincss = require('gulp-clean-css');
const amdOptimize = require("amd-optimize"); 
   
const jsSrc = './src/js/*.js';
const htmlSrc = './*.html';
const scssSrc = './src/scss/*.scss';
const jsDist = './dist/js';
const scssDist = './dist/scss'

//定义名为js的任务
gulp.task('js', function () {
    gulp.src(jsSrc)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(jsDist))
        .pipe(rename({suffix: '.min'}))
        .pipe(minjs())
        .pipe(gulp.dest(jsDist))
        .pipe(connect.reload())
});

//定义 requirejs 任务
gulp.task('rjs', function () {
    gulp.src(jsSrc)
        .pipe(amdOptimize("main", {
            paths: {
                "a": "./src/js/a",
                "b": "./src/js/b"
            }
        }))
        .pipe(concat("index.js"))           //合并
        .pipe(gulp.dest(jsDist))          //输出保存
        .pipe(rename("app.min.js"))          //重命名
        .pipe(minjs())                        //压缩
        .pipe(gulp.dest(jsDist));         //输出保存

    });

gulp.task('sass', function(){
  return gulp.src(scssSrc)
    .pipe(sass())
    .pipe(gulp.dest(scssDist))
    .pipe(rename({suffix: '.min'}))
    .pipe(mincss())
    .pipe(gulp.dest(scssDist))
    .pipe(connect.reload())
});

//定义html任务
gulp.task('html', function () {
    gulp.src(htmlSrc).pipe(connect.reload());

});

//定义livereload任务
gulp.task('connect', function () {
    connect.server({
        livereload: true
    });
});



//定义看守任务
gulp.task('watch', function () {
    gulp.watch('src/*.html', ['html']);

    gulp.watch('src/js/*.js', ['rjs']);

    gulp.watch('src/scss/*.scss', ['sass']);
});


//定义默认任务
gulp.task('default', [ 'rjs', 'html', 'sass','watch', 'connect']);
