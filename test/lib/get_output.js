'use strict';

var concat = require('concat-stream');

var spawn = require('child_process').spawn;


module.exports = function (filename, argv, cb) {
  var app = spawn('node', [filename].concat(argv),
                  { stdio: ['ignore', 'pipe', 'inherit'] });
  app.on('exit', function (code, signal) {
    code |= !!signal;
    if (code) {
      process.exit(code);
    }
  });

  app.stdout.pipe(concat({ encoding: 'string' }, cb));
};
