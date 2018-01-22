var path = require('path');

module.exports = {
    entry: path.join(__dirname,'index.jsx'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.bundle.js'
    }, 
    devServer: {
        contentBase: path.join(__dirname, "/dist"),
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options:{
                        presets: ['react']
                    }
                }
            }
        ]
    }    
}