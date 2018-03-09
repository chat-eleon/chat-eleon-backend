// const User = require('../models/users.js');
const FB = require('fb');
const User = require('../models/User')
class TokenController {

  static tokenToClient(req, res){


    User.find({email: req.response.email})
      .exec()
      .then(foundUser => {
        if (foundUser) {
          let data = {
            token:req.token,
            fbData: req.response,
            userData: foundUser,
            message:'jwt login succesful'
          }
          return res.status(200).send(data)
        } else {
          let newUser = new User({
            userName: req.response.name,
            email: req.response.email,
            profile_pic_URL: req.response.picture.data.url
          })

          newUser.save((err,createdUser)=>{
            if (err) {
              return res.status(500).json({
                message: "User failed to be created"
              })
            }
            let data = {
              token:req.token,
              fbData: req.response,
              userData: createdUser,
              message:'jwt login succesful'
            }
            return res.status(200).send(data)
          })
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
