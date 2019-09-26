module.exports = {
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    public: '0.0.0.0',
    hotOnly: true,
    https: true,
    http2: true,
    compress: true,
    // open: process.platform === 'darwin',
    overlay: {
      errors: false,
      warnings: false,
    },
    port: 8080,
    progress: false,
  },

  parallel: true,

  css: {
    // extract: true,
    // modules: false,
    // localIdentName: '[name]_[local]_[hash:base64:5]',
    sourceMap: false,
    // loaderOptions: {}
  },

  productionSourceMap: false,
  runtimeCompiler: true,
  lintOnSave: false
};
