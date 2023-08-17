import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { Configuration } from "webpack"
import WebpackBar from "webpackbar"

const config: Configuration = {
  mode: "production",
  stats: {
    assets: true,
    chunks: true,
    modules: true,
    groupReasonsByOrigin: true,
    groupModulesByExtension: true,
    entrypoints: true,
    outputPath: true,
    hash: true,
    optimizationBailout: true,
    performance: true,
    builtAt: true,
    moduleTrace: true,
    errorDetails: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(css|s[ac]ss)$/,
            use: [
              { loader: MiniCssExtractPlugin.loader },
              {
                loader: require.resolve("css-loader"),
                options: { modules: { auto: true, localIdentHashDigestLength: 5 } },
              },
              { loader: require.resolve("postcss-loader") },
              { loader: require.resolve("sass-loader"), options: { implementation: require.resolve("sass") } },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/styles/[name].css",
      chunkFilename: "static/styles/[name].css",
    }),
    new WebpackBar({
      name: "webpack",
      color: "#b6abf5",
      basic: true,
      fancy: true,
      profile: true,
      reporters: ["fancy", "profile"],
    }),
  ],
}

export default config
