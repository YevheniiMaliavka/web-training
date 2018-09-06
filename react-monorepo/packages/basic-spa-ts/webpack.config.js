const {join} = require('path');

module.exports = {
    entry: join(__dirname, 'src', 'index.tsx'),
    output:{
        filename: 'index.bundle.js',
        path: join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                use: 'awesome-typescript-loader'
            }
        ]
    }
}