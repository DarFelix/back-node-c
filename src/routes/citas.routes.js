const citaController = require('../controllers/citas.controller')
const router = require('express').Router()

router.get('/allCitas', citaController.getCitas)
router.get('/citasUsuario', citaController.getCitasUsuario)
router.get('/citasUsuarioNew', citaController.getCitasUsuarioNew)
router.post('/createCita', citaController.createCita)

module.exports = router
