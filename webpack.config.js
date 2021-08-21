var HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
      },
      {
        test: /\.(sass|less|css)$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, "src", "styles")],
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    root:[path.resolve('./src')],
    extensions: [".js", ".jsx"],
    alias: {
      '@': path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: "http://localhost:4000",
    }),
  },
};
