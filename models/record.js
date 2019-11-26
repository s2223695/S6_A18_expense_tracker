// Include modules
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const enumCategory = ['household', 'traffic', 'entertainment', 'food', 'other']

const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: enumCategory,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    // required: true
  }
})

module.exports.Record = mongoose.model('Record', recordSchema)
module.exports.enumCategory = enumCategory