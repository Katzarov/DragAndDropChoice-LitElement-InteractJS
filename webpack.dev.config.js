const path = require("path");
const dist = path.resolve(__dirname, "dist");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  watch: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: "tsconfig.json"
        }
      },
      {
        test: /\.css|\.s(c|a)ss$/,
        use: [{
          loader: 'lit-scss-loader',
          options: {
            minify: true, // defaults to false
          },
        }, 'extract-loader', 'css-loader', 'sass-loader'],
      },
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css", ".scss"]
  },
  output: {
    filename: "bundle.js",
    path: dist
  },
  devServer: {
    contentBase: dist,
    compress: true,
    port: 8080
  },
  devtool: 'eval-cheap-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: "LitHTML Typescript Example",
      filename: "index.html",
      template: "src/index.html",
      alwaysWriteToDisk: true,
      minify: false
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath: path.resolve(__dirname, "dist")
    })
  ]
};
