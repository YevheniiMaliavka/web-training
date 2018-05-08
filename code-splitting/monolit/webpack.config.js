const { join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: join(__dirname, "src", "index.js"),
    huge: join(__dirname, "src", "huge-file.js")
  },
  output: {
    path: join(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, "src", "index.html"),
      chunks: ["index"]
    })
  ]
};
