const usuarioController = require('../controllers/usuarios.controller')
const router = require('express').Router()

router.get('/', usuarioController.getUsuarios)
router.get('/allUsers', usuarioController.getUsuariosOld)
router.get('/:id', usuarioController.getUserByDoc)
router.post('/', usuarioController.createUser)
router.put('/:id', usuarioController.updateUser)
router.delete('/:id', usuarioController.deleteUser)

module.exports = router
