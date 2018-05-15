const path = require("path");

module.exports = {
  entry: "./src/scripts/script.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  watch: false
};
