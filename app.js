// Include modules
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Define server variables
const port = 3000

// Setting database
mongoose.connect('mongodb://localhost/expense_tracker', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!!!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// Setting express-handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

const Record = require('./models/record').Record

// Setting route middleware
app.use('/', require('./routes/home'))
app.use('/records', require('./routes/record'))

// Start listening on port
app.listen(port, () => {
  console.log('Express start listening')
})