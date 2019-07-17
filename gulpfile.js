/*实现修改代码之后立马更新代码*/
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('default', () => {
    nodemon({
        script: 'app.js',
        ext: 'js html css',
        env: {
            'NODE_ENV': 'development'
        }
    })
})