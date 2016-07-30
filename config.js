
const env = process.env.NODE_ENV || 'development'

const config = {
  production: {
    port: process.env.PORT || 8080,
    env: 'production'
  },

  development: {
    port: process.env.PORT || 8080,
    env: 'development'
  }
}

module.exports = config[env]
