const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const prod = process.env.NODE_ENV === 'production' ? 'true' : 'false' || false;

const commonConfig = {
	entry: ['babel-polyfill', './src/index.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	devServer: {
		contentBase: './src'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		})
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.(css|sass|scss)$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	},
	devServer: {
		historyApiFallback: true
	},
	resolve: {
		extensions: ['.js', '.jsx']
	}
};

if (prod) {
	module.exports = merge(commonConfig, {
		output: {
			publicPath: '/'
		}
	});
} else {
	module.exports = merge(commonConfig, {
		plugins: [new DashboardPlugin()]
	});
}
