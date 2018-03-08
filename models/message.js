const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  member: {
    type: String
    // type: Schema.Types.ObjectId,
    // ref: 'User'
  } ,
  text: String,
  grup: {
    type: String
    // type: Schema.Types.ObjectId,
    // ref: 'Grup'
  },
  createdAt: {
    type: Date,
    default : Date.now
  }
});
module.exports = mongoose.model('Message',messageSchema);
