var gulpInjectVersioningTranform = function (filepath, i, length, sourceFile, targetFile) {
    var extname = path.extname(filepath);
    if (extname === '.js' || extname === '.css') {
        filepath += '?v=' + version;
        return inject.transform.apply(inject.transform, [filepath, i, length, sourceFile, targetFile]);
    }
    else {
        return inject.transform.apply(inject.transform, arguments);
    }
};

var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    inject = require('gulp-inject'),
    bowerFiles = require('main-bower-files');

gulp.task('vet', function(){
    return gulp.src(['.src/**/**/*.js',
                     './*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
});
gulp.task('bowerMoves', function(){
    return gulp.src(bowerFiles(), {
        base: 'bower_components'
    })
        .pipe(gulp.dest('build/libs/js'))
});
gulp.task('indexSources', function(){
    return gulp.src('./src/client/index.html')
        .pipe(inject(
            gulp.src(bowerFiles(), {
                base: 'bower_components'
            }),
             { name: 'bower', relative: true, transform: gulpInjectVersioningTranform }))
        .pipe(gulp.dest('build'))
});
gulp.task('build', function(){
    return gulp.src(['./src/server/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build'))
});
gulp.task('watch', function(){
   gulp.watch('./src/server/app.js', ['build']);
});
gulp.task('default', function(){
    nodemon({
        script: './src/server/app.js',
        ext:'js',
        env:{
            PORT:8100
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function(){
        console.log('Restarting');
    });
});
<!--bower components-->
