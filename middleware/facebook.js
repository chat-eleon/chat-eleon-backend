const FB = require('fb');

function getFbData(req, res, next){
  const token = req.body.token;

  FB.api('me', { fields: ['id', 'name', 'email', 'gender', 'picture.width(150).height(150)'],
    access_token: token,}, function(response){
      req.response = response;
      next()
    })

}

module.exports = getFbData;
