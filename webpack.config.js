const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');
const dotenv = require('dotenv');

dotenv.config();
// s3 api key와 버킷 이름 세팅
const apiKey = process.env.API_KEY || '';
const bucket = process.env.BUCKET || '';
const port = process.env.port || 3000;
const publicPath = '/images';

const RESOLVE = {
  extensions: ['.js', '.jsx'],
  alias: {
    '@': path.resolve(__dirname, 'src/'),
    'Components': path.resolve(__dirname, 'src/Components/views/'),
  },
  fallback: {
    util: require.resolve('util/'),
  },
};
const ENTRY = './index.js';

module.exports = {
  mode: 'development',
  entry: ENTRY,
  resolve: RESOLVE,

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime', 'react-refresh/babel'],
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
          path.resolve(__dirname, 'public/static/'),
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[hash].[ext]',
              limit: 1000,
              publicPath,
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
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/static/favicon.png',
    }),
    new CleanWebpackPlugin(),
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      API_KEY: JSON.stringify(apiKey),
      BUCKET: JSON.stringify(bucket),
      // product develop 자동으로 주입되도록 수정해야된다.
      NODE_ENV: JSON.stringify('development'),
    }),
    new CopyPlugin({
      patterns: [{ from: 'public/static/' }],
    }),
  ],

  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, 'build'),
    publicPath: '/',
  },

  devServer: {
    port,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
};
