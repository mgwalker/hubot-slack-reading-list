// Go get everything and require it.  This is just to make the
// coverage report more honest.

const fs = require('fs');
const path = require('path');

function scanDirectory(directory) {
  const objects = fs.readdirSync(directory);
  for (const obj of objects) {
    if (obj !== 'test') {
      const stats = fs.statSync(path.join(directory, obj));

      if (stats.isDirectory() && !obj.startsWith('.') && obj !== 'node_modules' && obj !== 'coverage') {
        scanDirectory(path.join(directory, obj));
      } else if (stats.isFile()) {
        if (obj.endsWith('.js')) {
          require(path.resolve(path.join(directory, obj))); // eslint-disable-line global-require, import/no-dynamic-require
        }
      }
    }
  }
}

scanDirectory('.');
