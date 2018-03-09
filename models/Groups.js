const mongoose = require('mongoose')
const Schema = mongoose.Schema

var groupSchema = new Schema({
    title : String,
    language :String,
    userid :{
        type : Schema.Types.ObjectId,
        ref : 'User' 
    }
})

module.exports = mongoose.model('Group',groupSchema)