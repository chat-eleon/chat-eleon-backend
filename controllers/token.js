// const User = require('../models/users.js');
const FB = require('fb');

class TokenController {

  static tokenToClient(req, res){
    let data = {
      token:req.token,
      fbData: req.response,
      message:'jwt login succesful'
    }
    res.status(200).send(data)
  }

}

module.exports = TokenController;
