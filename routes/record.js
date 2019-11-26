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
  const record = req.body
  res.render('new')
})

route.post('/new', (req, res) => {
  const record = new Record({
    name: req.body.name,
    category: req.body.category,
    date: req.body.date,
    amount: req.body.amount,
    totalAmount: req.body.amount
  })
  record.save(err => {
    if (err) console.error(err)
    res.redirect('/')
  })
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