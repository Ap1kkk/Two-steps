const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
	mode: 'development',
	devtool: 'eval-source-map',
	devServer: {
		historyApiFallback: true,
		static: path.resolve(__dirname, './dist'),
		port: 8080,
		open: true,
		hot: true,
	},
	plugins: [new VueLoaderPlugin],
};
