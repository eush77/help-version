'use strict';

var callsites = require('callsites'),
    findRoot = require('find-root');

var path = require('path');


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
    console.log(help);
    process.exit();
  }
  if (argv == '--version') {
    console.log(version);
    process.exit();
  }

  return {
    help: help,
    version: version
  };
};
