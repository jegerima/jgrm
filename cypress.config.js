const {defineConfig} = require('cypress');

module.exports = defineConfig({
  video: false,
  e2e: {
    baseUrl: 'http://localhost:8011',
    supportFile: false,
    specPattern: 'cypress/integration/app.js',
  },
});
