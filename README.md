[![npm](https://nodei.co/npm/help-version.png)](https://nodei.co/npm/help-version/)

# help-version

[![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david]

Automatic handling of `--help` and `--version` arguments for CLI applications.

[travis]: https://travis-ci.org/eush77/help-version
[travis-badge]: https://travis-ci.org/eush77/help-version.svg
[david]: https://david-dm.org/eush77/help-version
[david-badge]: https://david-dm.org/eush77/help-version.png

## Example

```js
#!/usr/bin/env node

var helpVersion = require('help-version')(usage());

function usage() {
  return 'Usage:  my-app [file]';
}

helpVersion.version
//=> "v0.1.0"

console.log('main thing');
```

Catches `--help` and `--version` automatically.

```
$ ./app.js --help
Usage:  my-app [file]
$ ./app.js --version
v0.1.0
$ ./app.js
main thing
```

## API

### `helpVersion(help, [version])`

Checks `process.argv` for `--help` or `--version`, prints `help` or `version` if found one.

`version` defaults to `version` field from your local `package.json`.

Returns an object `{ help: help, version: version }`.

## Install

```
npm install help-version
```

## License

MIT
