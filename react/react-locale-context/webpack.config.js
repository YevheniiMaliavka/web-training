const {join, resolve} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: join(__dirname, "src", "index.jsx"),
  output: {
    filename: "index.bundle.js",
    path: join(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["env", "react"]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: join(__dirname, "src", "index.html") })
  ]
};
