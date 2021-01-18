const express = require('express')
const colors = require('colors')

const app = express()


app.get('/', (req, res) => {
  res.send('Hello from Node')
})

const port = 8080

app.listen(port, () => 
{console.log(`A NODE API is listening on port ${port}`.magenta.inverse)})