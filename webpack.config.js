const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Theme names
const themes = ['spectre', 'fluent', 'shadcn'];

// Generate entry points for each theme
// Assumes src/main-[theme].scss files will be created,
// where each imports its specific variables and then core components.
const themeEntries = themes.reduce((acc, theme) => {
  acc[theme] = `./src/main-${theme}.scss`;
  return acc;
}, {});

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  // Base configuration for theme CSS compilation
  const themeConfig = {
    name: 'themeConfig', // Added name
    mode: isProduction ? 'production' : 'development',
    entry: themeEntries,
    output: {
      path: path.resolve(__dirname, 'dist'),
      // filename: '[name].bundle.js', // We don't want JS output from SCSS entries
      // For SCSS entry points, the JS output is not the primary concern.
      // MiniCssExtractPlugin will handle CSS output.
      // Webpack might still generate empty JS files for SCSS entries if 'filename' is set.
      // To avoid empty JS files for SCSS entries, ensure 'filename' is not set here,
      // or set it to something that can be ignored/deleted.
      // A better approach is to let MiniCssExtractPlugin handle output naming.
      // If we had JS entries, we'd need filename. For pure SCSS to CSS, this can be tricky.
      // Let's remove filename for now, ensure plugins handle CSS output.
      // Webpack requires 'filename' if there's an 'entry'. If entry is SCSS, it still makes a JS chunk.
      // We can make these JS files minimal or delete them later.
      filename: 'js/[name].dummy.js', // Output dummy JS to a subdirectory
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader', // Translates CSS into CommonJS
            {
              loader: 'postcss-loader', // For autoprefixer
              options: {
                postcssOptions: {
                  plugins: [
                    'autoprefixer', // Uses browserslist from package.json
                  ],
                },
              },
            },
            'sass-loader', // Compiles Sass to CSS
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css', // Output: spectre.css, fluent.css, shadcn.css
      }),
    ],
    optimization: {
      minimizer: [
        new CssMinimizerPlugin(), // For minifying CSS
      ],
      minimize: isProduction, // Only minimize in production mode
    },
    devtool: isProduction ? false : 'source-map',
  };

  const docsConfig = {
    name: 'docsConfig', // Added name
    mode: isProduction ? 'production' : 'development',
    entry: {
      'docs': './docs/src/scss/docs.scss',
      'theme-switcher': './docs/src/js/theme-switcher.js',
    },
    output: {
      path: path.resolve(__dirname, 'docs/dist'),
      filename: 'js/[name].js',
    },
    module: {
      rules: [
        {
          test: /docs\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: { postcssOptions: { plugins: ['autoprefixer'] } }
            },
            'sass-loader',
          ],
        },
        // Example for JS rule (Babel can be configured here if needed)
        // {
        //   test: /\.js$/,
        //   include: [path.resolve(__dirname, 'docs/src/js')],
        //   use: 'babel-loader',
        // },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: '[name].css' }), // For docs.css
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'dist'), // Source: root dist/
            to: path.resolve(__dirname, 'docs/dist/themes'), // Destination for themes
            globOptions: {
              ignore: ['js/**', '*-exp.*', '*-icons.*', '*.js.map', '*.css.map']
            },
            noErrorOnMissing: true,
          },
          // We might need to copy other static assets for docs here too, e.g. images, if not handled by Pug
        ],
      }),
    ],
    optimization: {
      minimizer: [
        new CssMinimizerPlugin(),
        // TerserPlugin for JS minification is included by default in production mode
      ],
      minimize: isProduction,
    },
    devtool: isProduction ? false : 'source-map',
  };

  return [themeConfig, docsConfig];
};
