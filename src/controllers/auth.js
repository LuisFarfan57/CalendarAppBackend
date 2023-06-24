const { response, request } = require('express')

const registerUsuario = (req = request, res = response) => {
  const { name, email, password } = req.body

  return res.status(201).json({ message: 'Hola' })
}

const loginUsuario = (req = request, res = response) => {
  const { email, password } = req.body

  return res.json({ message: 'Hola' })
}

const revalidarToken = (req = request, res = response) => {
  return res.json({ message: 'Hola' })
}

module.exports = {
  registerUsuario,
  loginUsuario,
  revalidarToken
}
