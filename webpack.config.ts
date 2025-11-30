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
  // watch模式
  if (env.WEBPACK_WATCH) {
    const packageDir: string = "watch"

    const watchConfig: Configuration = {
      plugins: [
        new WebpackBar({
          name: "webpack Watch",
          basic: true,
          reporters: ["basic"],
        }),
        new GenerateIconWebpackPlugin({
          logo: path.resolve(__dirname, "./public/icon.png"),
          dir: "icons",
          size: [128, 64, 48, 32, 16],
          log: false,
          grayscale: true,
        }),
      ],
    }

    const devMergedConfig: Configuration = merge(watchConfig, baseConfig(packageDir), devConfig)

    return devMergedConfig
  }

  // dev模式
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
          logo: path.resolve(__dirname, "./public/icon.png"),
          dir: "icons",
          size: [128, 64, 48, 32, 16],
          log: true,
          grayscale: true,
        }),
      ],
    }

    const devMergedConfig: Configuration = merge(optionConfig, baseConfig(packageDir), devConfig)

    return devMergedConfig
  }

  // build模式
  if (argv.mode === "production") {
    const packageDir: string = "bilibili-bangumi"

    const optionConfig: Configuration = {
      plugins: [
        new GenerateIconWebpackPlugin({
          logo: path.resolve(__dirname, "./public/icon.png"),
          dir: "icons",
          size: [128, 64, 48, 32, 16],
          log: true,
          grayscale: false,
        }),
      ],
    }

    const optionMergedConfig: Configuration = merge(optionConfig, baseConfig(packageDir))

    if (env.package) {
      const packageConfig: Configuration = {
        plugins: [
          new CrxPackWebpackPlugin({
            zip: true,
            xml: true,
            keyFile: path.resolve(__dirname, "./bilibili-bangumi.pem"),
            contentPath: path.resolve(__dirname, "./build/", packageDir),
            outputPath: path.resolve(__dirname, "./release"),
            name: packageDir,
          }),
        ],
      }

      const prodMergedConfig: Configuration = merge(optionMergedConfig, packageConfig, prodConfig)

      return prodMergedConfig
    }

    if (env.zip) {
      const zipConfig: Configuration = {
        plugins: [
          new ArchiveWebpackPlugin({
            source: path.resolve(__dirname, "./build/", packageDir),
            destination: path.resolve(__dirname, `./release/${packageDir}.zip`),
            format: "zip",
          }),
        ],
      }

      const prodMergedConfig: Configuration = merge(optionMergedConfig, zipConfig, prodConfig)

      return prodMergedConfig
    }

    const prodMergedConfig: Configuration = merge(optionConfig, baseConfig(packageDir), prodConfig)

    return prodMergedConfig
  }
}

export default mergeConfig
