module.exports = {
    devtool: 'source-map',
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            importLoaders: 2
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devServer: {
        contentBase: './dist',
        port: 3000,
    }
}