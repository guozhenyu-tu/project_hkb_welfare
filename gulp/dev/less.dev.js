/**样式翻译合并
 * 开发*/

var gulp = require('gulp'),

    less = require('gulp-less'),//less解码

    autoprefixer = require('gulp-autoprefixer'),//css兼容性

    concatDir = require('gulp-concat-dir'),//按文件夹合并

    concat = require("gulp-concat"),//文件合并

    connect = require('gulp-connect'),//服务器

    rename = require("gulp-rename");//重命名


function devLess() {

    gulp.src(['src/component/**/*.less']) //该任务针对的文件7

        .pipe(less()) //编译less

        .pipe(autoprefixer({
            browsers: ['Android >= 4.0', 'IOS >=7', 'Firefox >= 20', 'ie >= 8'],//兼容设备

            cascade: true, //是否美化属性值 默认：true 像这样：

            remove: true //是否去掉不必要的前缀 默认：true
        }))

        .pipe(concat('hkb_welfare.css'))  // 合并匹配到的css文件

        .pipe(gulp.dest('build/css')) //将会在build/css下生成index.css

        .pipe(connect.reload());



}

module.exports = devLess;