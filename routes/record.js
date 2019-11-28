// Include modules
const express = require('express')
const route = express.Router()
const { authenticated } = require('../config/auth')

// Import models
const Record = require('../models/record').Record

route.get('/', authenticated, (req, res) => {
  Record.find((err, records) => {
    if (err) console.error(err)
    res.render('index', { records })
  })
})

route.get('/new', authenticated, (req, res) => {
  const record = req.body
  res.render('new')
})

route.post('/new', authenticated, (req, res) => {
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

route.get('/:id/edit', authenticated, (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)
    res.render('edit', { record })
  })
})

route.put('/:id', authenticated, (req, res) => {
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

route.delete('/:id/delete', authenticated, (req, res) => {
  Record.findByIdAndDelete(req.params.id, (err, record) => {
    if (err) return console.error(err)
    res.redirect('/')
  })
})

module.exports = route