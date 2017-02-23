module.exports = {
  entry: './lib/index.js',
  module: {
    loaders: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    filename: 'index.js',
    path: './',
    library: 'SSNFormatter',
    libraryTarget: 'umd',
    umbNamedDefine: true,
  }
};

