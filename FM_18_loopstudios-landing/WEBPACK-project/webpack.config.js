const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = () => ({
  mode: 'production',
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(ttf|otf|woff2?)/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][hash][ext]',
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][hash][ext]',
        },
      },
      {
        test: /\.html$/i,
        use: ['html-loader'],
      },
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  devServer: {
    static: {
      directory: './src'
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ]
});
