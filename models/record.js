// Include modules
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const enumCategory = ['household', 'traffic', 'entertainment', 'food', 'other']
const categoryInfo = {
  household: {
    label: '居家物業',
    icon: 'fa-home'
  },
  traffic: {
    label: '交通出行',
    icon: 'fa-shuttle-van'
  },
  entertainment: {
    label: '休閒娛樂',
    icon: 'fa-grin-beam'
  },
  food: {
    label: '餐飲食品',
    icon: 'fa-utensils'
  },
  other: {
    label: '其他',
    icon: 'fa-pen'
  }
}

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
    type: String,
    required: true
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
    required: true
  }
})

module.exports.Record = mongoose.model('Record', recordSchema)
module.exports.enumCategory = enumCategory
module.exports.categoryInfo = categoryInfo