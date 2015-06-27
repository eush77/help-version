'use strict';

var getHelpVersion = require('..'),
    getOutput = require('./lib/get-output');

var test = require('tape'),
    concat = require('concat-stream'),
    through = require('through2');

var path = require('path');


var output = {
  noNewline: getOutput.bind(null, path.join(__dirname, 'custom/no_newline.js')),
  newline: getOutput.bind(null, path.join(__dirname, 'custom/newline.js'))
};


var compareHelpVersion = function (t, helpVersion, expectedHelpVersion) {
  var actualHelpVersion = {
    help: helpVersion.help(),
    version: helpVersion.version()
  };
  t.deepEqual(actualHelpVersion, expectedHelpVersion);
};


test('help, no newline', function (t) {
  t.equal(getHelpVersion('no newline').help(), 'no newline');

  output.noNewline(['--help'], function (output) {
    t.equal(output, 'no newline\n');
    t.end();
  });
});


test('help, with newline', function (t) {
  t.equal(getHelpVersion('newline\n', 'newline\n').help(), 'newline\n');

  output.newline(['--help'], function (output) {
    t.equal(output, 'newline\n');
    t.end();
  });
});


test('options', function (t) {
  var opts = {
    argv: ['there', 'is', 'some', '--help', 'in', 'argv'],
    exit: function exit(code) { exit.code = code || 0 },
    stdout: through(),
    stderr: through()
  };

  getHelpVersion('usage', opts);
  opts.stdout.end();
  opts.stderr.end();

  t.plan(3);
  t.equal(opts.exit.code, 0);

  opts.stdout.pipe(concat({ encoding: 'string' }, function (output) {
    t.equal(output, 'usage\n');
  }));

  opts.stderr.pipe(concat({ encoding: 'string' }, function (output) {
    t.equal(output, '');
  }));
});
