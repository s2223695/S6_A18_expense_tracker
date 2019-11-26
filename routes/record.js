// Include modules
const express = require('express')
const route = express.Router()

route.get('/', (req, res) => {
  res.send('record')
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