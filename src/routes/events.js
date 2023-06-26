/**
 * Rutas de Eventos
 * host + /api/events
 */

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/fieldValidator')
const { validateJWT } = require('../middlewares/validateJWT')
const { getEventos, createEvento, updateEvento, deleteEvento } = require('../controllers/events')
const { isDate } = require('../helpers/validators')

const router = Router()

// Todas las rutas necesitan JWT
router.use(validateJWT)

router.get('/', getEventos)

router.post('/', [
  check('title', 'El título es requerido').notEmpty(),
  check('start', 'La fecha de inicio es requerida').notEmpty(),
  check('end', 'La fecha de fin es requerida').notEmpty(),
  check('start', 'Fecha de inicio no válida').custom(isDate),
  check('end', 'Fecha de fin no válida').custom(isDate),
  validarCampos
], createEvento)

router.put('/:id', [
  check('title', 'El título es requerido').notEmpty(),
  check('start', 'La fecha de inicio es requerida').notEmpty(),
  check('end', 'La fecha de fin es requerida').notEmpty(),
  check('start', 'Fecha de inicio no válida').custom(isDate),
  check('end', 'Fecha de fin no válida').custom(isDate),
  validarCampos
], updateEvento)

router.delete('/:id', deleteEvento)

module.exports = router
