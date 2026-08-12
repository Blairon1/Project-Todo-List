import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  mode: "development",

  entry: "./src/index.js",

  output: {
    filename: "main.js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: "./src/index.html",
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      filename: 'completed.html',
      template: "./src/pages/completed.html",
      chunks: ['completed']
    }),
    new HtmlWebpackPlugin({
      filename: 'filter.html',
      template: "./src/pages/filter.html",
      chunks: ['filter']
    }),
    new HtmlWebpackPlugin({
      filename: 'today.html',
      template: "./src/pages/today.html",
      chunks: ['today']
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};