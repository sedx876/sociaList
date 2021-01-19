const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const fs = require('fs')
const cors = require('cors')
const chalk = require('chalk')
const dotenv = require('dotenv')
const colors = require('colors')

dotenv.config()

// configure db
mongoose.connect(
	process.env.MONGO_URI,
	{useNewUrlParser: true, useUnifiedTopology: true}
)
.then(() => console.log('DB Connected'.brightMagenta.inverse))

mongoose.connection.on('error', err => {
	console.log(`DB connection error: ${err.message}`.red.inverse)
})

const app = express()

//Middleware
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
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())



//Bring in Routes
const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')


app.use("/api", postRoutes)
app.use('/api', authRoutes)
app.use('/api', userRoutes)

app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
      res.status(401).json({ error: 'Unauthorized!' });
  }
})

const port = process.env.PORT || 8080

app.listen(port, () => 
{console.log(`NODE API is listening on port ${port}`.brightCyan.inverse)})