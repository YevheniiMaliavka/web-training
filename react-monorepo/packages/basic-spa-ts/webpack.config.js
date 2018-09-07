const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: join(__dirname, 'src', 'index.tsx'),
  output: {
    filename: 'index.bundle.js',
    path: join(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: 'awesome-typescript-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: join(__dirname, 'src', 'index.html') })
  ]
};
