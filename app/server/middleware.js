
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'

morgan.format('custom', function developmentFormatLine (tokens, req, res) {
  var status = res._header
    ? res.statusCode
    : undefined

  var color = status >= 500 ? 31
    : status >= 400 ? 33
    : status >= 300 ? 36
    : status >= 200 ? 32
    : 0

  var fn = developmentFormatLine[color]

  if (!fn) {
    fn = developmentFormatLine[color] =
      morgan.compile(`\x1b[90m:method :url \x1b[${color}m:status \x1b[90m:response-time ms \x1b[0m`)
  }

  return fn(tokens, req, res)
})

export default (app) => {
  app.use(express.static(path.join(__dirname, '..', 'public')))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(morgan('custom'))

  app.set('views', 'app/client/views')
  app.set('view engine', 'ejs')
  return app
}
