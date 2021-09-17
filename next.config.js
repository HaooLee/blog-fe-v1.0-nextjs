
const path = require('path')
// next.config.js

module.exports = {
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
