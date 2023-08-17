import ArchiverWebpackPlugin from "archive-webpack-plugin"
import CopyWebpackPlugin from "copy-webpack-plugin"
import CrxPackWebpackPlugin from "crx-pack-webpack-plugin"
import EslintWebpackPlugin from "eslint-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import path from "path"
import StylelintWebpackPlugin from "stylelint-webpack-plugin"
import TerserWebpackPlugin from "terser-webpack-plugin"
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin"
import { Chunk, Configuration, PathData } from "webpack"
import WebpackExtensionManifestPlugin from "webpack-extension-manifest-plugin"
import { merge } from "webpack-merge"
import WebpackBar from "webpackbar"

import devConfig from "./config/webpack.dev"
import prodConfig from "./config/webpack.prod"
import pkg from "./package.json"

const config: (packageDir: string) => Configuration = (packageDir: string): Configuration => {
  return {
    stats: {
      preset: "minimal",
    },
    entry: {
      background: path.resolve(__dirname, "./src/background", "index.ts"),
      popup: path.resolve(__dirname, "./src/popup", "index.tsx"),
    },
    output: {
      filename(pathData: PathData): string {
        return pathData.chunk.name === "background" ? "[name].js" : "static/scripts/[name].js"
      },
      chunkFilename: "static/scripts/[name].js",
      path: path.resolve(__dirname, "./build/", packageDir),
      clean: true,
      asyncChunks: true,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".scss", ".json"],
      modules: ["node_modules"],
      plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, "./tsconfig.json") })],
    },
    optimization: {
      splitChunks: {
        chunks(chunk: Chunk): boolean {
          return chunk.name !== "background"
        },
        name: "vendors",
      },
      minimizer: [
        new TerserWebpackPlugin({
          extractComments: true,
        }),
      ],
    },
    performance: {
      maxAssetSize: 512000,
      maxEntrypointSize: 512000,
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.(ts|tsx)$/,
              exclude: /node_modules/,
              use: [
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
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./public/popup.html"),
        filename: path.resolve(__dirname, "./build/", packageDir, "popup.html"),
        title: "Bilibili Bangumi",
        inject: "body",
        chunks: ["popup"],
      }),
      new EslintWebpackPlugin({
        cache: true,
        fix: false,
        context: path.resolve(__dirname, "./src"),
        extensions: ["js", "ts", "tsx"],
      }),
      new StylelintWebpackPlugin({
        context: "src",
        fix: false,
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "./public/icon.png"),
            to: path.resolve(__dirname, "./build/", packageDir, "icon.png"),
          },
          {
            from: path.resolve(__dirname, "./locales/"),
            to: path.resolve(__dirname, "./build/", packageDir, "_locales/"),
          },
          {
            from: path.resolve(__dirname, "./public/icons/"),
            to: path.resolve(__dirname, "./build/", packageDir, "icons/"),
          },
        ],
        options: {
          concurrency: 100,
        },
      }),
      new WebpackExtensionManifestPlugin({
        config: {
          base: path.resolve(__dirname, "./public/manifest.js"),
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

const mergeConfig: (env: any, argv: any) => Configuration = (env: any, argv: any): Configuration => {
  if (env.WEBPACK_WATCH) {
    const packageDir: string = "serve/"

    const optionConfig: Configuration = {
      plugins: [
        new WebpackBar({
          name: "webpack Watch",
          basic: true,
          reporters: ["basic"],
        }),
      ],
    }

    return merge(merge(optionConfig, config(packageDir)), devConfig)
  }

  if (argv.mode === "development") {
    const packageDir: string = "dev/"

    const optionConfig: Configuration = {
      plugins: [
        new WebpackBar({
          name: "webpack Development",
          color: "#76c5f7",
          basic: true,
          fancy: true,
          profile: true,
          reporters: ["fancy", "profile"],
        }),
      ],
    }

    return merge(merge(optionConfig, config(packageDir)), devConfig)
  }

  if (argv.mode === "production") {
    const packageDir: string = "bilibili-bangumi/"

    if (env.package) {
      const optionConfig: Configuration = {
        plugins: [
          new CrxPackWebpackPlugin({
            zip: true,
            xml: false,
            keyFile: path.resolve(__dirname, "./bilibili-bangumi.pem"),
            contentPath: path.resolve(__dirname, "./build/bilibili-bangumi"),
            outputPath: path.resolve(__dirname, "./release"),
            name: "bilibili-bangumi",
          }),
        ],
      }

      return merge(merge(optionConfig, config(packageDir)), prodConfig)
    }

    if (env.zip) {
      const optionConfig: Configuration = {
        plugins: [
          new ArchiverWebpackPlugin({
            source: path.resolve(__dirname, "./build/bilibili-bangumi"),
            destination: path.resolve(__dirname, "./build/bilibili-bangumi.zip"),
            format: "zip",
          }),
        ],
      }

      return merge(merge(optionConfig, config(packageDir)), prodConfig)
    }

    return merge(config(packageDir), prodConfig)
  }
}

export default mergeConfig
