const { join } = require('path');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  entry: join(__dirname, 'src', 'index.tsx'),
  output: {
    filename: 'index.js',
    path: join(__dirname, 'dist'),
    libraryTarget: 'commonjs'
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: 'awesome-typescript-loader'
      }
    ]
  }
};
