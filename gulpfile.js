/**
* ------------------------------------------
* gulp配置文件
* @version  1.0
* @update   2016/07/22
* @author   小木瓜Kimi(mrgaonju@gmail.com)
* ------------------------------------------
*/
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageResize = require('gulp-image-resize');
const pngquant = require('imagemin-pngquant');
const imagemagick = require('imagemagick');
const graphicsmagick2 = require('graphicsmagick2');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminOptipng = require('imagemin-optipng');

// 调整大小+压缩图片(横幅图片)
gulp.task('compress-heng', function () {
    const srcImage = 'public/img_github/imgInputHeng/*.+(jpeg|jpg|png)';
    const dstImage = 'public/img_github/imgOutput/';
    var jpgmin = imageminJpegRecompress({
            accurate: true,//高精度模式
            quality: "low",//图像质量:low, medium, high and veryhigh;
            method: "smallfry",//网格优化:mpe, ssim, ms-ssim and smallfry;
            min: 20,//最低质量
            loops: 0,//循环尝试次数, 默认为6;
            progressive: false,//基线优化
            subsample: "default"//子采样:default, disable;
        });
    var  pngmin = imageminOptipng({
            optimizationLevel: 4
        });
    gulp.src(srcImage)
        .pipe(imageResize({
            width: 1280
        }))
        .pipe(imagemin({
            verbose: true,
            use: [jpgmin, pngmin]
        }))
        .pipe(gulp.dest(dstImage));
});

// 调整大小+压缩图片(竖幅图片)
gulp.task('compress-shu', function () {
    return gulp.src('public/img_github/imgInputShu/*.+(jpeg|jpg|png)')
        .pipe(imageResize({
            width: 640
        }))
        .pipe(imagemin({
            verbose: true,
            optimizationLevel: 6, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('public/img_github/imgOutput/'));
});
