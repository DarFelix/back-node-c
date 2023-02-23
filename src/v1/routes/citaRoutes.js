const citaController = require('../controllers/citaController')
const router = require('express').Router()

const { verifyJWT } = require('../../middlewares/verifyJWT')
const { verifyRol } = require('../../middlewares/verifyRol')


router.get('/', [verifyJWT] , citaController.getCitasRawQuery)
router.get('/joinUsersSeq', [verifyJWT], citaController.getCitasJoinSeqUsuarios)
router.get('/citasCallSP', [verifyJWT, verifyRol], citaController.getCitasCallSP)
router.post('/createCita', [verifyJWT], citaController.createCita)

module.exports = router

/**
 * @openapi
 * /api/v1/citas/:
 *   get:
 *     tags:
 *       - Citas
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Cita"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */
