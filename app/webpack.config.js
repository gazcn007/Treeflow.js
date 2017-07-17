var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var path = require('path');
module.exports = {
    context: path.join(__dirname, '/'),
    devtool: debug ? 'inline-sourcemap' : null,
    entry: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
        './Main.js',
    ],
    module: {
        loaders: [
            {
                test: /.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: { presets: ['react','es2015'], plugins: ['transform-decorators-legacy', 'transform-class-properties'] }
            },
            {
                test: /.css$/,
                loader: 'style!css'
            },{
                test: /.less$/,
                loader:'style!css!less'
            },
            { test: /.(jpe?g|png|gif|svg)$/i,loaders: [
                'file?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]}
        ]
    },
    devServer:{
        historyApiFallback: true
    },
    resolve:{
        root:[path.resolve(__dirname, 'lib'),path.resolve(__dirname,'node_modules')],
        extensions:['','.js']
    },
    output: {
        path: path.join(__dirname, '/'),
        filename: 'main.min.js',
        publicPath:'/'
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ]
};