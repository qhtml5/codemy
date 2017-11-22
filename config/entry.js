const { resolve } = require('path');

module.exports = {
  app: resolve(__dirname, '..', 'app', 'main'),
  base: resolve(__dirname, '..', 'app', 'base')
};
