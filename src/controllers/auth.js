const { response, request } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')

const registerUsuario = async (req = request, res = response) => {
  const { name, email, password } = req.body

  try {
    let usuario = await Usuario.findOne({ email })

    if (usuario) {
      return res.status(400).json({
        ok: false,
        message: 'Ya existe un usuario con ese correo'
      })
    }

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync()
    const hashedPassword = bcrypt.hashSync(password, salt)

    usuario = new Usuario({
      email,
      name,
      password: hashedPassword
    })

    await usuario.save()

    return res.status(201).json({ ok: true, id: usuario._id, email: usuario.email })
  } catch (error) {
    console.log(error)

    return res.status(500).json({ ok: false, message: 'Por favor hable con el administrador' })
  }
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
