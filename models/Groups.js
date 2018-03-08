const mongoose = require('mongoose')
const Schema = mongoose.Schema

var groupSchema = new Schema({
    title : String,
    language :String
})

module.exports = mongoose.model('Group',groupSchema)