const { defineConfig } = require("eslint/config");
const universeConfig = require("eslint-config-universe/flat/default");

module.exports = defineConfig([
  universeConfig,
  {
    ignores: ["dist/*", "node_modules/*"],
  },
]);
