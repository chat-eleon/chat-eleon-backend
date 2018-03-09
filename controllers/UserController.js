const User = require('../models/User');
module.exports = {

  index : (req, res) => {
    User.find()
      .exec()
      .limit(30)
      .then(foundUsers => {
        res.status(200).json({
          message: 'found users',
          data: foundUsers
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  create : (req, res) => {
    let newUser = new User({
      userName: req.body.userName,
      email: req.body.email
    })

    newUser.save((err,createdUser)=>{
      if (err) {
        return res.status(500).json({
          message: "User failed to be created"
        })
      }
      return res.status(200).send(data)
    })
  },

  update : (req, res) => {
    const id = req.params.id;
    let updateData = {};
    if (req.body.userName) {updateData.userName = req.body.userName}
    if (req.body.email) {updateData.email = req.body.email}

    User.findByIdAndUpdate({ _id : id }, updateData, {new: true})
      .exec()
      .then(updatedUser => {
        res.status(200).json({
          message: 'Successfully updated User data.',
          data : updatedUser
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  destroy : (req, res) => {
    const id = req.params.id;
    User.findOneAndRemove({ _id: id})
      .exec()
      .then(User => {
        res.status(200).json({
          message: 'User Successfully removed'
        })
      }
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  }

};
