require("dotenv").config();
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HappyPack = require("happypack");
const path = require("path");
const { DefinePlugin } = require("webpack");

const apps = {
  currencyConverterConsole: "console"
}

function appendBaseCfgOpts(config) {
  const { argv } = yargs(hideBin(process.argv));
  const appName = argv.app || process.env.app;
  const app = apps[appName]
  if (!app)
  {
    console.error('Please specify an app!');
    process.exit(1);
  }
  console.log(`Building app ${app}...`);
  config.entry.main = [`./src/cmd/${app}.ts`];

  // Continue
  config.resolve = {
    extensions: [".ts", ".js", ".json"],
  };
  config.devtool = "source-map";
  config.optimization = {
    nodeEnv: false,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ],
  };
  return config;
}

function appendProductionCfgOpts(config) {
  // Change banner plugins to add version info
  // Important: this assumes that DefinePlugin is at index [0]
  config.plugins[0] = new DefinePlugin({
    "process.env.npm_package_version": `"${process.env.npm_package_version}"`,
  });
  config.module.rules.push({
    test: /\.ts$/,
    use: "ts-loader",
  });
  config.output.path = path.join(process.cwd(), "dist");
  return config;
}

function appendDevCfgOpts(config) {
  config.module.rules.push({
    test: /\.ts$/,
    use: "happypack/loader",
  });

  config.plugins = [
    ...config.plugins,
    new HappyPack({
      loaders: [
        {
          loader: "ts-loader",
          options: {
            happyPackMode: true,
            transpileOnly: true,
          },
        },
      ],
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
      eslint: {
        files: "./src/**/*.{ts,tsx,js,jsx}",
        options: { fix: true },
      },
    }),
  ];
  return config;
}

module.exports = {
  webpack: (config, options) => {
    // Perform customizations to config
    // Important: return the modified config
    config = appendBaseCfgOpts(config);

    // Here we stop with everything for production, and return config immediately
    switch (options.env)
    {
      case "production":
        console.log("Bundling for production...");
        return appendProductionCfgOpts(config);

      default:
        console.log("Starting hot-reloading dev server...");
        return appendDevCfgOpts(config);
    }
  },
};
