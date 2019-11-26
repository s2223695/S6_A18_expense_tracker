// Include modules
const express = require('express')
const route = express.Router()

const Record = require('../models/record').Record

route.get('/', (req, res) => {
  Record.find((err, records) => {
    if (err) console.error(err)
    res.render('index', { records })
  })
})

route.get('/new', (req, res) => {
  res.send('new record')
})

route.post('/new', (req, res) => {
  res.send('post new record')
})

route.get('/:id/edit', (req, res) => {
  res.send('edit record')
})

route.post('/:id/edit', (req, res) => {
  res.send('post edit record')
})

route.post('/:id/delete', (req, res) => {
  res.send('delete record')
})

module.exports = route