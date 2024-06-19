import CopyWebpackPlugin from "copy-webpack-plugin"
import EslintWebpackPlugin from "eslint-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import path from "path"
import StylelintWebpackPlugin from "stylelint-webpack-plugin"
import TerserWebpackPlugin from "terser-webpack-plugin"
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin"
import { Chunk, Configuration, PathData } from "webpack"
import WebpackExtensionManifestPlugin from "webpack-extension-manifest-plugin"

import pkg from "../package.json"

const config: (packageDir: string) => Configuration = (packageDir: string): Configuration => {
  return {
    stats: {
      preset: "minimal",
    },
    entry: {
      background: path.resolve(__dirname, "../src/background/", "index.ts"),
      popup: path.resolve(__dirname, "../src/pages/popup/", "index.tsx"),
      options: path.resolve(__dirname, "../src/pages/options/", "index.tsx"),
      panel: path.resolve(__dirname, "../src/pages/panel/", "index.tsx"),
      changelog: path.resolve(__dirname, "../src/pages/changelog/", "index.tsx"),
    },
    output: {
      filename(pathData: PathData): string {
        return pathData.chunk.name === "background" ? "[name].js" : "static/scripts/modules/[name].js"
      },
      chunkFilename: "static/scripts/imports/[name].js",
      path: path.resolve(__dirname, "../build/", packageDir),
      clean: true,
      asyncChunks: true,
    },
    cache: {
      type: "filesystem",
    },
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "../src/"),
      },
      extensions: [".ts", ".tsx", ".js", ".jsx", ".scss", ".json"],
      modules: ["node_modules"],
      plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, "../tsconfig.json") })],
    },
    optimization: {
      splitChunks: {
        chunks(chunk: Chunk): boolean {
          return chunk.name !== "background"
        },
        cacheGroups: {
          commons: {
            filename: "static/scripts/commons/common.[id].js",
          },
        },
      },
      minimizer: [
        new TerserWebpackPlugin({
          extractComments: {
            condition: "some",
            filename: "licenses.txt",
          },
        }),
      ],
    },
    performance: {
      maxAssetSize: 512000,
      maxEntrypointSize: 512000,
      assetFilter: (assetFilename: string): boolean => !/\.(txt)$/.test(assetFilename),
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.(ts|tsx)$/,
              exclude: /node_modules/,
              use: [
                { loader: require.resolve("thread-loader") },
                {
                  loader: require.resolve("babel-loader"),
                  options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                  },
                },
              ],
            },
            {
              test: /\.(png|jpe?g|gif|webp|svg)$/,
              type: "asset/resource",
              generator: {
                filename: "static/images/[name][ext]",
              },
            },
            {
              test: /\.(ttf|woff2?)$/,
              type: "asset/resource",
              generator: {
                filename: "static/fonts/[name][ext]",
              },
            },
            {
              test: /\.(md)$/,
              type: "asset/source",
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "../public/popup.html"),
        filename: path.resolve(__dirname, "../build/", packageDir, "./popup.html"),
        title: "Bilibili Bangumi",
        inject: "body",
        chunks: ["popup"],
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "../public/options.html"),
        filename: path.resolve(__dirname, "../build/", packageDir, "./options.html"),
        title: "设置选项",
        inject: "body",
        chunks: ["options"],
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "../public/panel.html"),
        filename: path.resolve(__dirname, "../build/", packageDir, "./panel.html"),
        title: "设置选项",
        inject: "body",
        chunks: ["panel"],
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "../public/CHANGELOG.html"),
        filename: path.resolve(__dirname, "../build/", packageDir, "./CHANGELOG.html"),
        title: "更新日志",
        inject: "body",
        chunks: ["changelog"],
      }),
      new EslintWebpackPlugin({
        cache: true,
        fix: false,
        context: path.resolve(__dirname, "../src"),
        extensions: ["js", "ts", "tsx"],
      }),
      new StylelintWebpackPlugin({
        context: "src",
        fix: false,
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "../public/", "icon.png"),
            to: path.resolve(__dirname, "../build/", packageDir, "./icon.png"),
          },
          {
            from: path.resolve(__dirname, "../locales/"),
            to: path.resolve(__dirname, "../build/", packageDir, "./_locales/"),
          },
        ],
        options: {
          concurrency: 100,
        },
      }),
      new WebpackExtensionManifestPlugin({
        config: {
          base: path.resolve(__dirname, "../manifest.config.js"),
          extend: {
            manifest_version: 3,
            name: `${pkg.displayName}`,
            background: {
              service_worker: "background.js",
            },
          },
        },
        pkgJsonProps: ["version", "author"],
      }),
    ],
  }
}

export default config
