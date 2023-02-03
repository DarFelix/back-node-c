const usuarioController = require('../controllers/usuarioController')
const router = require('express').Router()
const { check } = require('express-validator');
const { verifyJWT } = require('../../middlewares/verifyJWT')

router.get('/', [verifyJWT],usuarioController.getUsuarios)
router.get('/allUsers', [verifyJWT], usuarioController.getUsuariosOld)
router.get('/:id', [verifyJWT], usuarioController.getUserByDoc)
router.post('/', [verifyJWT], usuarioController.createUser)
router.put('/:id', [verifyJWT], usuarioController.updateUser)
router.delete('/:id', [verifyJWT], usuarioController.deleteUser)

router.post('/auth', 
[
    check('document', 'Documento inválido').not().isEmpty(),
    check('password', 'Contraseña inválida').not().isEmpty()
]
,
usuarioController.authUser)

module.exports = router
