'use strict';

var test = require('tape'),
    concat = require('concat-stream');

var spawn = require('child_process').spawn,
    path = require('path');


var getOutput = function (/* [argv] */ cb) {
  var argv = [].slice.call(arguments);
  cb = argv.pop();

  var app = spawn('node', [path.join(__dirname, 'app/bin/cli.js')].concat(argv),
                  { stdio: ['ignore', 'pipe', 'inherit'] });
  app.on('exit', function (code, signal) {
    code |= !!signal;
    if (code) {
      process.exit(code);
    }
  });

  app.stdout.pipe(concat({ encoding: 'string' }, cb));
};


var data = (function () {
  var help = 'Usage information.';
  var version = 'v10.130.209';
  return {
    help: help,
    version: version,
    bottomLine: '\n' + version + ' ' + help + '\n'
  };
}());


test('normal output', function (t) {
  t.plan(2);

  getOutput(function (output) {
    t.equal(output, 'Main output.\n' + data.bottomLine);
  });

  getOutput('--prefix', 'app', '--adj', 'Some other', function (output) {
    t.equal(output, '[app] Some other output.\n' + data.bottomLine);
  });
});


test('--help', function (t) {
  getOutput('--help', function (output) {
    t.equal(output, data.help + '\n');
    t.end();
  });
});


test('--version', function (t) {
  getOutput('--version', function (output) {
    t.equal(output, data.version + '\n');
    t.end();
  });
});
