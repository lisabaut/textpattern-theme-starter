const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLTemplates = require('./scripts/html-templates.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const CopyPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ThemeConfiguration = require('./theme-configuration.js');

const themeSrc = 'txp-theme';
const themeDist = ThemeConfiguration.themeFolderName;
const assetsPath = './public/assets';

module.exports = (env, argv) => {
  const isProductionMode = argv.mode === 'production';

  return {
    mode: isProductionMode ? argv.mode : 'development',
    ...(!isProductionMode ? { devtool: 'inline-source-map' } : {}),
    ...(!isProductionMode
      ? {
          devServer: {
            static: './',
          },
        }
      : {}),
    entry: ['./src/ts/index.ts', './src/sass/index.scss'],
    output: {
      filename: 'js/bundle.js',
      path: path.resolve(__dirname, assetsPath),
      assetModuleFilename: 'images/[hash][ext][query]',
    },
    module: {
      // Rules are read from right to left
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  ident: 'postcss',
                  plugins: () => [
                    postcssPresetEnv({
                      autoprefixer: { grid: true },
                    }),
                  ],
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(svg|png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: 'images',
            esModule: false,
          },
          type: 'javascript/auto',
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                publicPath: 'fonts',
                esModule: false,
              },
            },
          ],
          type: 'javascript/auto',
        },
      ],
    },
    plugins: [
      new WriteFilePlugin(),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
      }),
      // creates HTMLPlugins from each HTML file in folder "templates"
      ...HTMLTemplates.createPlugins(isProductionMode),
      new CopyPlugin({
        patterns: [
          {
            from: '**/*',
            context: path.resolve(__dirname, 'src', 'images'),
            to: path.resolve(__dirname, assetsPath, 'images'),
          },
          {
            from: '**/*',
            context: path.resolve(__dirname, 'src', 'fonts'),
            to: path.resolve(__dirname, assetsPath, 'fonts'),
          },
          {
            from: '**/*',
            context: path.resolve(__dirname, 'src', themeSrc),
            to: path.resolve(__dirname, 'public/themes', themeDist),
          },
        ],
      }),
    ],
  };
};
