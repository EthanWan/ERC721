process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const configFactory = require('../config/webpack.config')
const config = configFactory('production')

const compiler = webpack(config)
compiler.run((err, stats) => {
  console.log(stats.toJson({ all: false, warnings: true, errors: true }))
  if (err) {
    console.error(err)
  }
})
