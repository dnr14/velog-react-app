const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');
const dotenv = require('dotenv');

dotenv.config();

const DEV_PUBLIC_PATH = '/';
const PRODUCTION = 'production';
const DEVELOPMENT = 'development';
const PRODUCT_PUBLIC_PATH = '/build/';
// s3 api key와 버킷 이름 세팅
const apiKey = process.env.API_KEY || '';
const bucket = process.env.BUCKET || '';
const port = process.env.port || 3000;

module.exports = (_, argv) => {
  const publicPath =
    argv.mode === PRODUCTION ? PRODUCT_PUBLIC_PATH : DEV_PUBLIC_PATH;
  const nodeEnv = argv.mode === PRODUCTION ? PRODUCTION : DEVELOPMENT;
  const plugins =
    argv.mode === PRODUCTION
      ? ['@babel/plugin-transform-runtime']
      : ['@babel/plugin-transform-runtime', 'react-refresh/babel'];
  const mode = argv.mode === PRODUCTION ? PRODUCTION : DEVELOPMENT;

  const htmlWebpackPluginConfig = {
    template: './public/index.html',
    favicon: `./public/static/favicon.png`,
  };

  if (argv.mode === PRODUCTION) {
    htmlWebpackPluginConfig.filename = '../index.html';
  }

  const config = {
    entry: './index.js',
    output: {
      filename: '[name].[chunkhash].js',
      clean: true,
      path: path.join(__dirname, '/dist/build'),
      publicPath,
    },
    mode,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              ['@babel/preset-env', { modules: false }],
            ],
            plugins,
          },
        },

        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          exclude: [
            /\.(js|jsx|mjs)$/,
            /\.html$/,
            /\.json$/,
            /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
            /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/,
          ],
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[hash].[ext]',
                publicPath: `${publicPath}images`,
                outputPath: '/images',
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          exclude: [/ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/],
          use: ['css-loader'],
        },
        {
          test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
          use: [
            {
              loader: 'style-loader',
              options: {
                injectType: 'singletonStyleTag',
                attributes: {
                  'data-cke': true,
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: styles.getPostCssConfig({
                themeImporter: {
                  themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
                },
                minify: true,
              }),
            },
          ],
        },
        {
          test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
          use: ['raw-loader'],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin(htmlWebpackPluginConfig),
      new CleanWebpackPlugin(),
      new ReactRefreshWebpackPlugin(),
      new webpack.DefinePlugin({
        API_KEY: JSON.stringify(apiKey),
        BUCKET: JSON.stringify(bucket),
        NODE_ENV: JSON.stringify(nodeEnv),
      }),
      new UglifyJSPlugin(),
    ],

    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
      fallback: {
        util: require.resolve('util/'),
      },
    },

    devServer: {
      port,
      hot: true,
      open: true,
      historyApiFallback: true,
      devMiddleware: {
        publicPath,
      },
    },
  };

  if (argv.mode === DEVELOPMENT) {
    config.devtool = 'eval-cheap-module-source-map';
  }

  return config;
};
