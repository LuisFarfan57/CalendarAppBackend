/**
 * Rutas de usuarios / Auth
 * host + /api/auth
 */

const { Router } = require('express')
const { check } = require('express-validator')
const { loginUsuario, revalidarToken, registerUsuario } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/fieldValidator')
const { validateJWT } = require('../middlewares/validateJWT')

const router = Router()

router.post(
  '/register',
  [
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser mayor o igual a 6 caracteres').isLength(6),
    validarCampos
  ],
  registerUsuario
)

router.post(
  '/login',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser mayor o igual a 6 caracteres').isLength(6),
    validarCampos
  ],
  loginUsuario
)

router.get('/renew', validateJWT, revalidarToken)

module.exports = router
