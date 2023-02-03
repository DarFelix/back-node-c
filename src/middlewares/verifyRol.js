const verifyRol = (req, res, next) => {
    if (req.payload.rol == 'Cliente') {
        return res.status(401).json({ mensaje: 'Error de Autorizacion' })
    } next();
}

module.exports = { verifyRol }