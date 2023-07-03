const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SVGSpriteMapPlugin = require("svg-spritemap-webpack-plugin");
const autoprefixer = require("autoprefixer");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const html = [];
const pages = glob.sync(__dirname + "/src/html/*.html");

pages.forEach((file) => {
  const base = path.basename(file, ".html");

  html.push(
    new HtmlWebpackPlugin({
      filename: base + ".html",
      template: "./src/html/" + base + ".html",
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
      },
      minify: false
    })
  );
});

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./src/index.js",
  devServer: {
    open: true,
    watchFiles: ["src/**/*"],
    static: "./src",

    host: 'local-ip',
    port: process.env.PORT || 9000,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              context: "src",
              publicPath: (url) => {
                return url
              },
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: "html-loader",
            options: { minimize: false, sources: false },
          },
        ],
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: "svg-sprite-loader",
            options: {
              publicPath: "",
            },
          },
        ],
      },
      {
        test: /\.(jsx)$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: "defaults",
                  },
                ],
                "@babel/preset-react",
              ],
            },
          },
        ],
      },
      { test: /\.(js)$/, use: "babel-loader" },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/",
              esModule: false,
            },
          },

          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
      chunkFilename: "[id].css",
    }),
    new SVGSpriteMapPlugin("src/svg/*.svg", {
      output: {
        filename: "./spritemap.svg",
      },
      sprite: {
        prefix: "icon-",
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/img",
          to: "img/",
        },
      ],
    }),
  ].concat(html),
};

