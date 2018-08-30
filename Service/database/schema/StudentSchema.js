const mongoose = require('mongoose') // 引入Mongoose
const Schema = mongoose.Schema
let studentSchema = new Schema({
  username: String
}, {
  collection: 'student'
})
mongoose.model('StudentSchema', studentSchema)
