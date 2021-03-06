/* eslint-disable no-undef */
const path = require('path');
const config = require('../config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// const createEslintRule = () => ({
// 	test: /\.(js|vue)$/,
// 	loader: 'eslint-loader',
// 	enforce: 'pre',
// 	include: [
// 		path.join(__dirname, '..', 'src'),
// 		path.join(__dirname, '..', 'test')
// 	],
// 	options: {
// 		// formatter: require('eslint-friendly-formatter'),
// 		emitWarning: !config.dev.showEslintErrorsInOverlay
// 	}
// });

module.exports = {
	context: path.resolve(__dirname, '../'), //entry的上下文,默认使用当前目录，但是推荐在配置中传递一个值。
	entry: {
		app: './src/main.js'
	},

	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'@': path.join(__dirname, '..', 'src'),
			'@components': path.join(__dirname, '..', 'src/components'),
			'@pages': path.join(__dirname, '..', 'src/pages'),
			'@styles': path.join(__dirname, '..', 'src/assets/styles'),
			'@utils': path.join(__dirname, '..', 'src/utils'),
			'@api': path.join(__dirname, '..', 'src/api'),
			'@types': path.join(__dirname, '..', 'src/store/mutation-types')
		}
	},
	module: {
		rules: [
			// ...(config.dev.useEslint ? [createEslintRule()] : []),
			{
				test: /\.vue$/,
				loader: 'vue-loader'
				// options:vueLoaderConfig
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/,
				loader: 'url-loader',
				options: {
					// outputPath: 'images/', // 图片输出的路径
					//   name: utils.assetsPath('img/[name].[hash:7].[ext]')
					limit: 10 * 1024
				}
			},
			{
				test: /\.less$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'less-loader',
					{
						loader: 'sass-resources-loader',
						options: {
							// Provide path to the file with resources
							// resources: './path/to/resources.scss',

							// Or array of paths
							resources: [
								path.join(
									__dirname,
									'..',
									'src/assets/styles/common.less'
								)
							]
						}
					}
				]
			},
			{
				test: /\.css$/,
				// use: ['vue-loader', 'css-loader']
				use: ['vue-style-loader', 'css-loader']
				// loader: 'vue-loader!css-loader'
			}
		]
	},
	plugins: [new CleanWebpackPlugin(), new VueLoaderPlugin()]
};
