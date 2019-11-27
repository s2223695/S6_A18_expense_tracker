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
    if (err) return console.error(err)
    res.redirect('/')
  })
})

route.get('/:id/edit', (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)
    res.render('edit', { record })
  })
})

route.put('/:id', (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)
    record.name = req.body.name
    record.date = req.body.date
    record.category = req.body.category
    record.amount = req.body.amount
    record.totalAmount = req.body.amount
    record.save(err => {
      if (err) return console.error(err)
      res.redirect('/')
    })
  })
})

route.delete('/:id/delete', (req, res) => {
  Record.findByIdAndDelete(req.params.id, (err, record) => {
    if (err) return console.error(err)
    res.redirect('/')
  })
})

module.exports = route