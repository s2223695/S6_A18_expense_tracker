// Include modules
const express = require('express')
const route = express.Router()
const { authenticated } = require('../config/auth')

// Import models
const Record = require('../models/record').Record

route.get('/', authenticated, (req, res) => {
  Record.find({ userId: req.user._id })
    .sort({ name: 'asc' })
    .exec((err, records) => {
      if (err) console.error(err)
      res.render('index', { records })
    })
})

route.get('/new', authenticated, (req, res) => {
  res.render('new')
})

route.post('/new', authenticated, (req, res) => {
  const record = new Record({
    name: req.body.name,
    category: req.body.category,
    date: req.body.date,
    amount: req.body.amount,
    totalAmount: req.body.amount,
    userId: req.user._id
  })
  record.save(err => {
    if (err) return console.error(err)
    res.redirect('/')
  })
})

route.get('/:id/edit', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    res.render('edit', { record })
  })
})

route.put('/:id', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    record.name = req.body.name
    record.date = req.body.date
    record.category = req.body.category
    record.amount = req.body.amount
    record.totalAmount = req.body.amount
    record.userId = req.user._id
    record.save(err => {
      if (err) return console.error(err)
      res.redirect('/')
    })
  })
})

route.delete('/:id/delete', authenticated, (req, res) => {
  Record.findOneAndDelete({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    res.redirect('/')
  })
})

module.exports = route