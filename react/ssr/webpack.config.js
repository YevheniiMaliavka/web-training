module.exports = [
  {
    entry: './src/browser/index.js',
    module: {
      rules: [
        {
          test: /(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ["es2015", "react"]
          }
        }
      ]
    },
    output: {
      filename: 'index.bundle.js',
      path: __dirname + '/public'
    }
  },
  {
    entry: './src/server/index.js',
    target: 'node',
    module: {
      rules: [
        {
          test: /(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ["es2015", "react"]
          }
        }
      ]
    },
    output: {
      path: __dirname + '/dist',
      filename: 'index.js'
    }
  }
]