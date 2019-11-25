// Include modules
const express = require('express')
const app = express()

// Define server variables
const port = 3000

// Setting route middleware
app.use('/', require('./routes/home'))

// Start listening on port
app.listen(port, () => {
  console.log('Express start listening')
})