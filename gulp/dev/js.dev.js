/**脚本合并
 * 开发*/

var gulp = require('gulp'),

    concatDir = require('gulp-concat-dir'),//按文件夹合并

    connect = require('gulp-connect'),//服务器

    concat = require("gulp-concat"),//文件合并

    rename = require("gulp-rename");//重命名


function devJs() {

    //主要依赖模块

    gulp.src('src/component/**/*.js')

        .pipe(concat('hkb_welfare.js'))

        .pipe(gulp.dest('build/js'))

        .pipe(connect.reload());


    gulp.src(['src/js/*.js']) //最基本的脚本文件

        .pipe(gulp.dest('build/js'))

        .pipe(connect.reload());
}

module.exports = devJs;