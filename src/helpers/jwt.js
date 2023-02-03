const jwt = require('jsonwebtoken');

const generarJWT = (usuario) => {
    const payload = {
        id: usuario.usuario_id,
        nombre: usuario.nombres,
        rol: usuario.rol,
        docu: usuario.numero_doc
    };
    const token = jwt.sign(payload, 'c0oeÑrF3chr3KWC', { expiresIn: '2h' });
    return token
}

module.exports = {
    generarJWT
}