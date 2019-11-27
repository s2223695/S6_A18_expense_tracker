// Include modules
const express = require('express')
const router = express.Router()

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  res.send('post register')
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  res.send('post login')
})

router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router