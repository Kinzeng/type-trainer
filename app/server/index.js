import express from 'express'
import config from '../../config'
import middleware from './middleware'

// set the middleware, which returns the app with the middleware applied
let app = middleware(express())

// render the base view
// the app uses client side rendering through react-router
app.all('*', (req, res) => {
  res.render('index')
})

app.listen(config.port, function () {
  console.log('App listening on port ' + config.port)
})

module.exports = app
