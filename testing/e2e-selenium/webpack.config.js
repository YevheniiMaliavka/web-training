const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename:'index.bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'src/index.html'
        })
    ],
    watch:true
}