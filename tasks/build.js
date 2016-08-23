var gulp = require('gulp');

function build() {
  var argv = require('yargs').reset()
    .usage('Usage: gulp build -p')
    .alias('p', 'prod')
    .boolean('p')
    .describe('p', 'Build for Production Environment')

    .alias('s', 'support')
    .help('s')
    .argv;

  if (argv.prod)
    gulp.start('build.prod');
  else
    gulp.start('webpack.build.dev');
}

build.description = 'Build for either Development or the requested environment';

build.flags = {
  '-p, --prod': 'Build for Production Environment',
  '-s, --support': 'Show help'
};

gulp.task('build', build);
