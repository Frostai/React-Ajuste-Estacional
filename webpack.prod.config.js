var HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: {
        patentes: __dirname + '/app/patentes.index.js',
        publicaciones: __dirname + '/app/publicaciones.index.js',
        ventas_detal: __dirname + '/app/ventas_detal.index.js',
        empleo_desempleo: __dirname + '/app/empleo_desempleo.index.js',
        empleo_asalariado: __dirname + '/app/empleo_asalariado.index.js',
        vendor: ['react','react-dom','recharts']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/build'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin(
            { name: "vendor", filename: "vendor.bundle.js" }
        ),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
                drop_console: true
            },
            output: {
                comments: false
            }
        }),
    ]
};