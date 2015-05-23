'use strict';

var getHelpVersion = require('..'),
    getOutput = require('./lib/get_output');

var test = require('tape');

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


test('help and version, no newline', function (t) {
  t.plan(3);

  compareHelpVersion(t, getHelpVersion('no newline', 'no newline'),
                     { help: 'no newline', version: 'no newline' });

  output.noNewline(['--help'], function (output) {
    t.equal(output, 'no newline\n');
  });

  output.noNewline(['--version'], function (output) {
    t.equal(output, 'no newline\n');
  });
});


test('help and version, with newline', function (t) {
  t.plan(3);

  compareHelpVersion(t, getHelpVersion('newline\n', 'newline\n'),
                     { help: 'newline\n', version: 'newline\n' });

  output.newline(['--help'], function (output) {
    t.equal(output, 'newline\n');
  });

  output.newline(['--version'], function (output) {
    t.equal(output, 'newline\n');
  });
});
