module.exports = {
  mode: 'development',
  entry: {
    carousel: './src/Carousel.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: require.resolve('babel-loader'),
      },
    ],
  },
};

// Using mode: ’development’ provides good defaults for running code locally, optimizing for ease of debugging at the expense of bundle size and runtime performance.
// By contrast, mode: ’production’ would give you a minified bundle.
// Each entry point defines a separate bundle for webpack to build. Here we’re telling webpack to build a bundle called carousel.js that contains src/Carousel.js and its dependencies.
// The module block is where we tell webpack how to treat different kinds of modules, via an array of rules.
// A “module” in webpack can be any kind of file—JSON, CSS, even images—but we’re only concerned with JS modules, so we have just one rule.
// This rule says “Use babel-loader for all .js files.”
// The loader will run each script through Babel with the config found in the root of our project.
