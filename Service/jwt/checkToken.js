const jwt = require('jsonwebtoken')
module.exports = async (ctx, next) => {
  const authorization = ctx.get('Authorization')
  if (authorization === '') {
    ctx.throw(401, 'no token detected in http headerAuthorization')
  }
  try {
    await jwt.verify(authorization, 'chanjoey') // 如果token过期或验证失败，将抛出错误
  } catch (err) {
    ctx.throw(402, 'invalid token')
  }
  await next()
}
