const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const validateJWT = (req = request, res = response, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'Usuario no autenticado'
    })
  }

  try {
    const { id, name } = jwt.verify(token, process.env.SECRET_JWT_SEED)

    req.uid = id
    req.name = name
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: 'Token no valido'
    })
  }

  next()
}

module.exports = {
  validateJWT
}
