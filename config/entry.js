const { resolve } = require('path');

module.exports = {
  app: resolve(__dirname, '..', 'app', 'index'),
  vendor: resolve(__dirname, '..', 'app', 'vendor')
};
