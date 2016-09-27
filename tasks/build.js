var gulp = require('gulp');

function build(done) {
  var argv = require('yargs').reset()
    .usage('Usage: gulp build -p')
    .alias('p', 'prod')
    .boolean('p')
    .describe('p', 'Build for Production Environment')

    .alias('s', 'support')
    .help('s')
    .argv;

  if (argv.prod)
    return gulp.start('webpack.build.prod', () => done());
  else
    return gulp.start('webpack.build.dev', () => done());
}

build.description = 'Build for either Development or the requested environment';

build.flags = {
  '-p, --prod': 'Build for Production Environment',
  '-s, --support': 'Show help'
};

gulp.task('build', build);
