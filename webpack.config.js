var path = require("path");
const BrowserExtensionPlugin = require("extension-build-webpack-plugin");
var JavaScriptObfuscator = require("webpack-obfuscator");
const MinifyHtmlWebpackPlugin = require("minify-html-webpack-plugin");
//npm run build
module.exports = {
  mode: "production",
  // mode: "development",
  entry: {
    bkmks_popup: "./js/bkmks_panel_popup_start.js",
    bkmks_enj: "./js/bkmks_panel_enj_start.js",
    bkmks_panel_background: "./js/bkmks_panel_background.js",
    bkmks_panel_content_script: "./js/bkmks_panel_content_script.js",
    about: "./js/about.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./src/js/"),
  },
  devtool: "cheap-module-source",
  module: {},
  plugins: [
    new MinifyHtmlWebpackPlugin({
      src: "./html",
      dest: "./src",
      rules: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        minifyJS: true,
      },
    }),
    new BrowserExtensionPlugin({
      devMode: true,
      name: "bkmks.zip",
      directory: "src",
      updateType: "minor",
    }),
    new JavaScriptObfuscator(
      {
        rotateStringArray: true,
      },
      [
        "bkmks_enj",
        "bkmks_popup",
        "bkmks_panel_background",
        "bkmks_panel_content_script",
        "bkmks_panel_content_script",
      ]
    ),
  ],
};
