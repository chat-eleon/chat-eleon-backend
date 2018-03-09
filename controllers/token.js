// const User = require('../models/users.js');
const FB = require('fb');
const User = require('../models/User')
class TokenController {

  static tokenToClient(req, res){
    let data = {
      token:req.token,
      fbData: req.response,
      message:'jwt login succesful'
    }

    User.find({email: req.response.email})
      .exec()
      .then(foundUser => {
        if (foundUser) {
          let newUser = new User({
            userName: req.response.name,
            email: req.response.email
          })

          newUser.save((err,createdUser)=>{
            if (err) {
              return res.status(500).json({
                message: "User failed to be created"
              })
            }
            return res.status(200).send(data)
          })
        } else {
          return res.status(200).send(data)
        }
      })
      .catch(err => {
        res.status(500).json({
          message: 'Something went wrong'
        })
      })
  }

}

module.exports = TokenController;
