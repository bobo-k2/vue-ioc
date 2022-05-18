// according to https://github.com/polkadot-js/api/issues/4778
module.exports = {

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.js$/,
          // test: /node_modules[/\\]@polkadot*.js$/,
          loader: require.resolve('@open-wc/webpack-import-meta-loader'),
          // loader: '@open-wc/webpack-import-meta-loader',
          exclude: /\.vue$/
        },

        {
          test: /\.m?js$/,
          include: /node_modules[/\\|]@polkadot/i,
          // exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@vue/cli-plugin-babel/preset'
              ],
              plugins: [
                '@babel/plugin-proposal-private-methods',
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread'
              ]
            }
          }
        }

      ]
    }
  }

}
