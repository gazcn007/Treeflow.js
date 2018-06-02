const fsPath = require('fs-path');

const webpackSettings="var debug = process.env.NODE_ENV !== 'production';\n\
var webpack = require('webpack');\n\
var path = require('path');\n\
module.exports = {\n\
    context: path.join(__dirname, '/'),\n\
    devtool: debug ? 'inline-sourcemap' : null,\n\
    entry: [\n\
        'webpack/hot/dev-server',\n\
        'webpack-hot-middleware/client',\n\
        './Main.js',\n\
    ],\n\
    module: {\n\
        loaders: [\n\
            {\n\
                test: /\.js$/,\n\
                exclude: /(node_modules|bower_components)/,\n\
                loader: 'babel-loader',\n\
                query: { presets: ['es2015','react','stage-0'], plugins: ['transform-decorators-legacy', 'transform-class-properties'] }\n\
            },\n\
            {\n\
                test: /\.css$/,\n\
                loader: 'style!css'\n\
            },{\n\
                test: /\.less$/,\n\
                loader:'style!css!less'\n\
            },\n\
            {\n\
                test: /\.(png|jpg|gif|svg)$/i,\n\
                loaders: [\n\
                    'url-loader?limit=4000&name=[name]-[hash:5].[ext]',\n\
                    'image-webpack-loader'\n\
                ]\n\
            }\n\
        ]\n\
    },\n\
    devServer:{\n\
        historyApiFallback: true\n\
    },\n\
    resolve:{\n\
        root:[path.resolve(__dirname, 'lib'),path.resolve(__dirname,'node_modules')],\n\
        extensions:['','.js']\n\
    },\n\
    output: {\n\
        path: path.join(__dirname, '/'),\n\
        filename: 'main.min.js',\n\
        publicPath:'/'\n\
    },\n\
    plugins: debug ? [] : [\n\
        new webpack.optimize.DedupePlugin(),\n\
        new webpack.optimize.OccurenceOrderPlugin(),\n\
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),\n\
    ]\n\
};"

module.exports = (path) => {
    fsPath.writeFile(path+'/webpack.config.js', webpackSettings, function(err){
        if (err) throw err;
    });
}
