const jwt = require('jsonwebtoken')
module.exports = function(req, res, next){
  const auth = req.headers.authorization
  if(!auth) return res.status(401).send({ message:'No token' })
  const token = auth.split(' ')[1]
  try{
    const data = jwt.verify(token, process.env.JWT_SECRET)
    req.user = data
    next()
  }catch(e){ res.status(401).send({ message:'Invalid token' }) }
}
