// Include modules
const express = require('express')
const route = express.Router()
const { authenticated } = require('../config/auth')

// Import models
const { Record, categoryInfo } = require('../models/record')

function checkRecordInput(recordInput, errors) {
  if (!recordInput.name || !recordInput.date || !recordInput.category || !recordInput.amount) {
    errors.push({ message: '請輸入必填欄位' })
  }
  if (isNaN(recordInput.amount)) {
    errors.push({ message: '金額須為數字' })
  }
  if (Number(recordInput.amount) < 0) {
    errors.push({ message: '金額須大於零' })
  }
}

route.get('/', authenticated, (req, res) => {
  let filterCategory = req.query.filter

  let query = { userId: req.user._id }
  if (filterCategory in categoryInfo) {
    query.category = filterCategory
  } else {
    filterCategory = 'none'
  }

  Record.find(query)
    .sort({ name: 'asc' })
    .exec((err, records) => {
      if (err) console.error(err)
      let totalAmount = 0
      formatedRecords = records.map(record => {
        record.icon = categoryInfo[record.category].icon
        totalAmount += record.totalAmount
        return record
      })
      let category = JSON.parse(JSON.stringify(categoryInfo))
      category.none = {
        label: '過濾類別...',
        icon: ''
      }
      categorySel = category[filterCategory].label
      res.render('index', { categorySel, category, totalAmount, records: formatedRecords })
    })
})

route.get('/new', authenticated, (req, res) => {
  res.render('new', { category: categoryInfo })
})

route.post('/new', authenticated, (req, res) => {
  let recordInput = req.body

  let errors = []
  checkRecordInput(recordInput, errors)

  if (errors.length > 0) {
    let category = JSON.parse(JSON.stringify(categoryInfo))
    category[recordInput.category].selected = true
    res.render('new', { errors, category, record: recordInput })
  } else {
    const record = new Record({
      name: recordInput.name,
      category: recordInput.category,
      date: recordInput.date,
      amount: recordInput.amount,
      totalAmount: recordInput.amount,
      userId: req.user._id
    })
    record.save(err => {
      if (err) return console.error(err)
      res.redirect('/')
    })
  }
})

route.get('/:id/edit', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    let category = JSON.parse(JSON.stringify(categoryInfo))
    category[record.category].selected = true
    res.render('edit', { category, record })
  })
})

route.put('/:id', authenticated, (req, res) => {
  let recordInput = req.body

  let errors = []
  checkRecordInput(recordInput, errors)

  if (errors.length > 0) {
    let category = JSON.parse(JSON.stringify(categoryInfo))
    category[recordInput.category].selected = true
    res.render('edit', { errors, category, record: recordInput })
  } else {
    Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
      if (err) return console.error(err)
      Object.assign(record, recordInput)
      record.save(err => {
        if (err) return console.error(err)
        res.redirect('/')
      })
    })
  }
})

route.delete('/:id/delete', authenticated, (req, res) => {
  Record.findOneAndDelete({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    res.redirect('/')
  })
})

module.exports = route