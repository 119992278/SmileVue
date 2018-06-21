const jwt = require('jsonwebtoken')
module.exports = (username) => {
  return jwt.sign({userName: username}, 'chanjoey', {expiresIn: '60s'})
}
