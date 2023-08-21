import ArchiveWebpackPlugin from "archive-webpack-plugin"
import CrxPackWebpackPlugin from "crx-pack-webpack-plugin"
import GenerateIconWebpackPlugin from "generate-icon-webpack-plugin"
import path from "path"
import { Configuration } from "webpack"
import { merge } from "webpack-merge"
import WebpackBar from "webpackbar"

import baseConfig from "./config/webpack.base"
import devConfig from "./config/webpack.dev"
import prodConfig from "./config/webpack.prod"

const mergeConfig: (env: any, argv: any) => Configuration = (env: any, argv: any): Configuration => {
  if (env.WEBPACK_WATCH) {
    const packageDir: string = "serve"

    const watchConfig: Configuration = {
      plugins: [
        new WebpackBar({
          name: "webpack Watch",
          basic: true,
          reporters: ["basic"],
        }),
        new GenerateIconWebpackPlugin({
          original: path.resolve(__dirname, "./public/icon.png"),
          outputDir: path.resolve(__dirname, "./build/", packageDir, "./icons/"),
          size: [128, 64, 48, 32, 16],
          log: false,
          grayscale: true,
        }),
      ],
    }

    return merge(merge(watchConfig, baseConfig(packageDir)), devConfig)
  }

  if (argv.mode === "development") {
    const packageDir: string = "dev"

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
        new GenerateIconWebpackPlugin({
          original: path.resolve(__dirname, "./public/icon.png"),
          outputDir: path.resolve(__dirname, "./build/", packageDir, "./icons/"),
          size: [128, 64, 48, 32, 16],
          log: true,
          grayscale: true,
        }),
      ],
    }

    return merge(merge(optionConfig, baseConfig(packageDir)), devConfig)
  }

  if (argv.mode === "production") {
    const packageDir: string = "bilibili-bangumi"

    const optionConfig: Configuration = {
      plugins: [
        new GenerateIconWebpackPlugin({
          original: path.resolve(__dirname, "./public/icon.png"),
          outputDir: path.resolve(__dirname, "./build/", packageDir, "/icons/"),
          size: [128, 64, 48, 32, 16],
          log: true,
          grayscale: false,
        }),
      ],
    }

    if (env.package) {
      const packageConfig: Configuration = {
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

      return merge(merge(optionConfig, merge(packageConfig, baseConfig(packageDir))), prodConfig)
    }

    if (env.zip) {
      const zipConfig: Configuration = {
        plugins: [
          new ArchiveWebpackPlugin({
            source: path.resolve(__dirname, "./build/bilibili-bangumi"),
            destination: path.resolve(__dirname, "./build/bilibili-bangumi.zip"),
            format: "zip",
          }),
        ],
      }

      return merge(merge(optionConfig, merge(zipConfig, baseConfig(packageDir))), prodConfig)
    }

    return merge(merge(optionConfig, baseConfig(packageDir)), prodConfig)
  }
}

export default mergeConfig
