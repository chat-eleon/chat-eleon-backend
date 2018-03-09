const jwt = require('jsonwebtoken')

function getJWT (req, res, next) {
  const data = req.response;
  const token = jwt.sign(data, 'secret')
  req.token = token;
  next()
}

function authJWT (req, res, next) {
  if (localStorage.token !== undefined) {
    res.status(401).json({
      message:'You are not logged in. No token'
    })
  } else {
    next()
  }
}

module.exports = {
  getJWT: getJWT,
  authJWT: authJWT
}
