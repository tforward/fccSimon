const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    app: "./src/scripts/script.js",
    css: "./src/css/styles.css"
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: "./dist"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
