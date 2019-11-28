// Include modules
const express = require('express')
const router = express.Router()
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  res.redirect('/records')
})

module.exports = router