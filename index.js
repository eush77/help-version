'use strict';

var callsites = require('callsites'),
    findRoot = require('find-root');

var path = require('path');


// Add newline if necessary.
var write = function (data, stream) {
  if (data.slice(-1) != '\n') {
    data += '\n';
  }
  (stream || process.stdout).write(data);
};


var maybeExit = function (data) {
  return function (code, stream) {
    if (code == null) {
      return data;
    }
    if (stream == null) {
      stream = !code ? process.stdout : process.stderr;
    }
    write(data, stream);
    process.exit(code);
  };
};


var getVersion = function (caller) {
  var pkgPath = path.join(findRoot(caller), 'package.json');
  return require(pkgPath).version;
};


module.exports = function (help, version) {
  if (version == null) {
    var caller = callsites()[1].getFileName();
    version = 'v' + getVersion(caller);
  }

  var argv = process.argv.slice(2);

  if (argv == '--help') {
    write(help);
    process.exit();
  }
  if (argv == '--version') {
    write(version);
    process.exit();
  }

  return {
    help: maybeExit(help),
    version: maybeExit(version)
  };
};
