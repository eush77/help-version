'use strict';

var getHelpVersion = require('..'),
    getOutput = require('./lib/get-output');

var test = require('tape'),
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

  t.plan(6);

  opts.stdout.once('data', function (output) {
    t.equal(output.toString(), 'usage\n');
  });
  var helpVersion = getHelpVersion('usage', opts);
  t.equal(opts.exit.code, 0);

  opts.stderr.once('data', function (output) {
    t.equal(output.toString(), 'usage\n');
  });
  helpVersion.help(1);
  t.equal(opts.exit.code, 1);

  opts.stderr.once('data', function (output) {
    t.equal(output.toString(), 'v' + require('../package').version + '\n');
  });
  helpVersion.version(2);
  t.equal(opts.exit.code, 2);
});
