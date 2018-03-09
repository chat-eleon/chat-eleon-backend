const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: String,
  email: String,
  createdAt: {
    type:  Date,
    default: Date.now
  }
});
module.exports = mongoose.model('User',UserSchema);
