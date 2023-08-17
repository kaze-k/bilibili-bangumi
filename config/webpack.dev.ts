import { Configuration } from "webpack"

const config: Configuration = {
  mode: "development",
  devtool: "source-map",
  watchOptions: {
    aggregateTimeout: 100,
    poll: 1000,
    ignored: ["node_modules"],
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(css|s[ac]ss)$/,
            use: [
              { loader: require.resolve("style-loader") },
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
}

export default config
