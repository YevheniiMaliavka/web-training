const { join } = require('path');

module.exports = {
  mode: 'development',
  entry: join(__dirname, 'src', 'index.tsx'),
  output: {
    filename: 'index.bundle.js',
    path: join(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'awesome-typescript-loader'
          }
        ]
      }
    ]
  }
};
