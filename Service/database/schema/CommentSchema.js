const mongoose = require('mongoose')
const Schema = mongoose.Schema
let _Comment = new Schema({
  content: String,
  author: {type: mongoose.Schema.ObjectId, ref: 'StudentSchema'}
}, {
  collection: 'comment'
})
mongoose.model('CommentModel', _Comment)
