const { response, request } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')
const { generateJWT } = require('../helpers/jwt')

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

    const token = await generateJWT({ id: usuario.id, name: usuario.name })

    return res.status(201).json({ ok: true, id: usuario.id, email: usuario.email, name: usuario.name, token })
  } catch (error) {
    console.log(error)

    return res.status(500).json({ ok: false, message: 'Por favor hable con el administrador' })
  }
}

const loginUsuario = async (req = request, res = response) => {
  const { email, password } = req.body

  try {
    let usuario = await Usuario.findOne({ email })

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        message: 'No existe un usuario con el correo ingresado'
      })
    }

    const isValidPassword = bcrypt.compareSync(password, usuario.password)

    if (!isValidPassword) {
      return res.status(400).json({
        ok: false,
        message: 'Contraseña incorrecta'
      })
    }

    const token = await generateJWT({ id: usuario.id, name: usuario.name })

    return res.json({ ok: true, id: usuario.id, email, name: usuario.name, token })
  } catch (error) {
    console.log(error)

    return res.status(500).json({ ok: false, message: 'Por favor hable con el administrador' })
  }
}

const revalidarToken = async (req = request, res = response) => {
  const uid = req.uid
  const name = req.name

  const newToken = await generateJWT({ id: uid, name })

  return res.json({ ok: true, token: newToken })
}

module.exports = {
  registerUsuario,
  loginUsuario,
  revalidarToken
}
