process.env.NODE_ENV = 'development'
process.env.BABEL_ENV = 'development'

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const paths = require('../config/paths')
const configFactory = require('../config/webpack.config')

const config = configFactory('development')
const compiler = webpack(config)
const host = process.env.HOST || '0.0.0.0'

const devServer = new WebpackDevServer(
  {
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    },
    compress: true,
    static: {
      directory: paths.appPublic,
      publicPath: [paths.publicUrlOrPath],
      watch: {
        // ignored: ignoredFiles(paths.appSrc),
      },
    },
    client: {
      // webSocketURL: {
      //   hostname: sockHost,
      //   pathname: sockPath,
      //   port: sockPort,
      // },
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    devMiddleware: {
      publicPath: paths.publicUrlOrPath.slice(0, -1),
    },
    // https: getHttpsConfig(),
    host,
    port: 3000,
    historyApiFallback: {
      disableDotRule: true,
      index: paths.publicUrlOrPath,
    },
  },
  compiler
)
devServer.startCallback(() => {
  console.log('success')
  // openBrowser(urls.localUrlForBrowser)
})
