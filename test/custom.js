'use strict';

var getHelpVersion = require('..'),
    getOutput = require('./lib/get-output');

var test = require('tape'),
    through = require('through2');

var path = require('path');


var output = function (name) {
  name = path.resolve(__dirname, 'custom', name + '.js');
  return getOutput.apply(this, [name].concat([].slice.call(arguments, 1)));
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

  output('no_newline', ['--help'], function (output) {
    t.equal(output, 'no newline\n');
    t.end();
  });
});


test('help, with newline', function (t) {
  t.equal(getHelpVersion('newline\n', 'newline\n').help(), 'newline\n');

  output('newline', ['--help'], function (output) {
    t.equal(output, 'newline\n');
    t.end();
  });
});


test('help, as a function', function (t) {
  var timesCalled = 0;
  var helpFn = function () {
    timesCalled += 1;
    return 'foo';
  };
  var hv = getHelpVersion(helpFn);

  t.equal(hv.help(), 'foo');
  t.equal(hv.help(), 'foo');
  t.equal(timesCalled, 1);

  output('function', ['--help'], function (output) {
    t.equal(output, 'foo\n');
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
