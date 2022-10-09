import { resolve } from "path"
import type { Configuration } from "webpack"
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin"
import nodeExternals from "webpack-node-externals"

const nodeModulePath = resolve(__dirname, "../../node_modules")
const tsconfigPath = resolve(__dirname, "./tsconfig.json")

const config: Configuration = {
  entry: "./src/index.ts",
  mode: "production",
  output: {
    filename: "main.js",
    path: resolve(__dirname, "./dist"),
    library: "@ribrary/stepper",
    libraryTarget: "umd",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        loader: "ts-loader",
        options: {
          configFile: tsconfigPath,
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              modules: false,
            },
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "global",
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    plugins: [new TsconfigPathsPlugin({ configFile: tsconfigPath })],
  },
  externals: [
    nodeExternals(),
    nodeExternals({
      modulesDir: nodeModulePath,
    }),
    {
      react: {
        root: "React",
        commonjs: "react",
        commonjs2: "react",
        amd: "react",
      },
      "react-dom": "react-dom",
    },
  ],
}

export default config
