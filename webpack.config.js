
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
   contentBase: './src',
 },
 plugins: [
  new HtmlWebpackPlugin({
    template: 'src/index.html'
  }),
 ],
 module: {
   rules: [
     {
       test: /\.(js|jsx)$/,
       exclude: /node_modules/,
       use: [
         'babel-loader',
       ],
     },
     {
       test: /\.(css|sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
     }
   ],
 },
 resolve: {
  extensions: ['.js', '.jsx'],
}
};
