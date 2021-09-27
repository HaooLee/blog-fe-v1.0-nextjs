
const path = require('path')
// next.config.js


const dev = process.env.NODE_ENV == 'development'

module.exports = {
  // basePath: '',
  //http://127.0.0.1:6060 dev ? 'http://127.0.0.1:6060/':'/api/v1'


  webpack (config) {
    Object.assign(config.resolve.alias, {
      '@': path.resolve(__dirname)
    })
    return config
  },
  images: {
    domains: ['localhost'],
  }
  // webpack5: false
}






  // withPlugins([], );
