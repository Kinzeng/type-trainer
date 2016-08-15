import express from 'express'
import config from '../../config'
import middleware from './middleware'

let app = middleware(express())

app.all('*', (req, res) => {
  res.render('index')
})

app.use((err, req, res, next) => {
  return res.json({
    error: err.status,
    message: err.message
  })
})

app.listen(config.port, function () {
  console.log('App listening on port ' + config.port)
})

module.exports = app
