/**模板引擎合并
 * 开发*/

var gulp = require('gulp'),

    ejs = require('gulp-ejs'),//ejs模板

    cheerio = require('gulp-cheerio'),//批量更换html中的引用

    connect = require('gulp-connect'),//服务器

    rename = require("gulp-rename");//重命名

var bom = require('gulp-bom');//解决UTF-8文件是采用无BOM


function devEjs() {

    gulp.src('src/view/**/*.{ejs,html}')

        .pipe(ejs())

        //增加媒体查询，通用样式文件
        .pipe(cheerio({

            run: function ($) {

                var addHtml = "";

                addHtml += "<meta name='viewport' content='width=device-width,initial-scale=1,user-scalable=0,minimum-scale=1, maximum-scale=1'>\n";

                addHtml += "<meta name='apple-mobile-web-app-capable' content='yes' />\n";

                addHtml += "<meta name='apple-mobile-web-app-status-bar-style' content='black' />\n";

                addHtml += "<meta name='format-detection' content='telephone=no, email=no' />\n";

                addHtml += "<link rel='stylesheet'  href='../../css/hkb_welfare.css'/>\n";//第二版开发样式

                $('head').append(addHtml);

            },

            parserOptions: {
                // Options here
                decodeEntities: false
            }

        }))

        //顺序增加脚本文件
        .pipe(cheerio({

            run:function($){
                var addJsMain = '\n<script src="../js/fastclick.min.js"></script>\n<script src="../js/hkb_welfare.js"></script>\n';//主要的脚本文件

                var addJsHtml="";//保存用的业务脚本

                var addJsRun="<script>\n";//运行的脚本

                var addJsHtmlHead="<script src='";

                var addJSHtmlBottom = "'></script>\n";

                $('script').each(function(index,ele){

                    if($(this).attr('src')){

                        addJsHtml+=addJsHtmlHead+$(this).attr('src')+addJSHtmlBottom;

                    }else {
                        addJsRun += $(this).html() + '\n';
                    }

                })

                addJsRun += "\n</script>\n";

                $('script').remove();

                $('body').append(addJsMain);

                $('body').append(addJsHtml);

                $('body').append(addJsRun);


            },
            parserOptions: {
                // Options here
                decodeEntities: false
            }
        }))


        .pipe(rename({

            extname: ".html"

        }))

        .pipe(gulp.dest('build/html'))//输出为html

        .pipe(bom())

        .pipe(connect.reload());

}

module.exports = devEjs;