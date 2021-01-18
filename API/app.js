const express = require('express')
const morgan = require('morgan')
const chalk = require('chalk')
const colors = require('colors')

const app = express()

//Morgan middleware
const morganMiddleware = morgan(function (tokens, req, res) {
  return [
      '\n\n\n',
      chalk.hex('#ff4757').bold('🍄  Morgan --> '),
      chalk.hex('#34ace0').bold(tokens.method(req, res)),
      chalk.hex('#ffb142').bold(tokens.status(req, res)),
      chalk.hex('#ff5252').bold(tokens.url(req, res)),
      chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms'),
      chalk.hex('#f78fb3').bold('@ ' + tokens.date(req, res)),
      chalk.yellow(tokens['remote-addr'](req, res)),
      chalk.hex('#fffa65').bold('from ' + tokens.referrer(req, res)),
      chalk.hex('#1e90ff')(tokens['user-agent'](req, res)),
      '\n\n\n',
  ].join(' ');
});

app.use(morganMiddleware)


//Bring in Routes
const { getPosts } = require('./routes/post')


app.get('/', getPosts)

const port = 8080

app.listen(port, () => 
{console.log(`A NODE API is listening on port ${port}`.magenta.inverse)})