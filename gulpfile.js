const {src, dest, series, parallel, watch} = require('gulp');

const less = require('gulp-less');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
var webserver = require('gulp-webserver'); 
var connect = require("gulp-connect");

const less_dir = './src/';
const dest_dir = './dist/';


//转换HTML文件路径位置
function html (){
     return src("./src/index.html")
        .pipe(connect.reload())
        .pipe(dest("./dist"))
        
}


// gulp.task("less",function(){
//     gulp.src("./src/css/*.less")
//         .pipe(less())
//         .pipe(connect.reload())
//         .pipe(gulp.dest("./dist/css"))
// })

function less_css() {
    return src('./src/css/*.less', {sourcemaps: true})
        .pipe(less())
        .pipe(connect.reload())
        .pipe(minifyCSS())
        .pipe(dest('./dist/css'))
        
}

function js() {
    //  return src('src/js/*.js', {sourcemaps: true})
    //     .pipe(concat('app.min.js'))
    //     .pipe(dest('./dist/js', {sourcemaps: true}))

     return src("./src/js/*.js")
        .pipe(connect.reload())
        .pipe(dest("./dist/js"))
}



function  server(){
    // return src('dist')
    // .pipe(webserver({
    //     port: 8080,//端口
    //     host: '172.20.0.235',//域名
    //     liveload: true,//实时刷新代码。不用f5刷新
    //     directoryListing: {
    //         path: './dist',
    //         enable: true
    //     }
    // }))
    return connect.server({
        port:8090,
        root:"./dist",
        livereload:true
    })
};

function watchit(){
    return watch(["./src/index.html"],html);
}
function watchit2(){
    return watch(["./src/css/*.less"],less_css);
}
function watchit3(){
    return watch(["./src/js/*.js"],js);
}

exports.html = html;
exports.less_css = less_css;
exports.js = js;

exports.default = parallel(html, server, less_css, js, watchit, watchit2, watchit3)