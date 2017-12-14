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
		contentBase: './src',
		historyApiFallback: true
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['env', 'react', 'stage-3']
						}
					}
				]
			},
			{
				test: /\.(css|sass|scss)$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	},

	plugins: [
		new DashboardPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		})
	],

	resolve: {
		extensions: ['.js', '.jsx']
	}
};

if (prod) {
	module.exports = merge(commonConfig, {
		plugins: []
	});
} else {
	module.exports = merge(commonConfig, {
		plugins: [new DashboardPlugin()]
	});
}
