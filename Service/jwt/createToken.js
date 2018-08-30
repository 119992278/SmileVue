const jwt = require('jsonwebtoken')
module.exports = (username) => {
  return jwt.sign({userName: username}, 'chanjoey', {expiresIn: '7200s'})
}
