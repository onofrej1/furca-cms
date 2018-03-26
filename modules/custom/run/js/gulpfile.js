const gulp = require('gulp');                 
const babel = require('gulp-babel');          
const browserify = require('browserify');     
const source = require('vinyl-source-stream');  
                                            
gulp.task('default', () => {                  
  return browserify({                       
      entries: 'test.js',                
      extensions: ['.jsx'],                 
      debug: true                           
  })                                        
  .transform('babelify', {                  
      presets: ['es2015', 'react']          
  })                                        
  .bundle()                                 
  .pipe(source('test.js'))                  
  .pipe(gulp.dest('dist'));                 
});

gulp.watch('*.js', ['default']); 
