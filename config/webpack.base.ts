import CopyWebpackPlugin from "copy-webpack-plugin"
import EslintWebpackPlugin from "eslint-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MarkedWebpackPlugin from "marked-webpack-plugin"
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
      popup: path.resolve(__dirname, "../src/popup/", "index.tsx"),
    },
    output: {
      filename(pathData: PathData): string {
        return pathData.chunk.name === "background" ? "[name].js" : "static/scripts/[name].js"
      },
      chunkFilename: "static/scripts/[name].js",
      path: path.resolve(__dirname, "../build/", packageDir),
      clean: true,
      asyncChunks: true,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".scss", ".json"],
      modules: ["node_modules"],
      plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, "../tsconfig.json") })],
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
        template: path.resolve(__dirname, "../public/popup.html"),
        filename: path.resolve(__dirname, "../build/", packageDir, "./popup.html"),
        title: "Bilibili Bangumi",
        inject: "body",
        chunks: ["popup"],
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
      new MarkedWebpackPlugin({
        input: path.resolve(__dirname, "../CHANGELOG.md"),
        output: path.resolve(__dirname, "../build/", packageDir, "CHANGELOG.html"),
        title: "更新日志",
        template: path.resolve(__dirname, "../public/", "CHANGELOG.html"),
      }),
    ],
  }
}

export default config
