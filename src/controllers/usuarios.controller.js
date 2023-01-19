const { citas } = require('../models/init-models')
const db = require('../models/init-models')

//create main model

const Usuario = db.usuarios

// main work

const getUsuariosOld = async (req, res) => {
    let usuarios = await Usuario.findAll({
        attributes: ['nombres', 'age']
    })
    res.status(200).send(usuarios)
}


const getUsuarios = async (req, res) => {
    let usuarios = await db.sequelize.query('EXECUTE sp_list_users', {
        model: Usuario
    })
    res.status(200).send(usuarios)
}

const getUserByDoc = async (req, res) => {
    let id = req.params.id;
    let user = await db.sequelize.query('EXECUTE sp_user_by_doc @docu =:doc',
        {
            replacements: { doc: id }
        })
    res.status(200).send(user)
}

const createUser = async (req, res) => {

    let info = {
        nombres: req.body.nombres,
        docu: req.body.numero_doc,
        age: req.body.age,
        height: req.body.height,
        telefono: req.body.telefono,
        pass: req.body.pass,
        estado: req.body.estado_usuario
    }

    let user = await db.sequelize.query('EXECUTE sp_create_user @nombres= :nombres, @docu= :docu, @age= :age, @height= :height, @telefono= :tel, @pass= :pas, @estado= :estado',
        {
            replacements: {
                nombres: info.nombres,
                docu: info.docu,
                age: info.age,
                height: info.height,
                tel: info.telefono,
                pas: info.pass,
                estado: info.estado
            }
        })

    res.status(201).send(user);
    console.log(user);
}

const updateUser = async (req, res) => {

    let info = {
        id: req.params.id,
        nombres: req.body.nombres,
        docu: req.body.numero_doc,
        age: req.body.age,
        height: req.body.height,
        telefono: req.body.telefono,
        pass: req.body.pass,
        estado: req.body.estado_usuario
    }

    let user = await db.sequelize.query('EXECUTE sp_update_user @id= :id, @nombres= :nombres, @docu= :docu, @age= :age, @height= :height, @telefono= :tel, @pass= :pas, @estado= :estado',
        {
            replacements: {
                id: info.id,
                nombres: info.nombres,
                docu: info.docu,
                age: info.age,
                height: info.height,
                tel: info.telefono,
                pas: info.pass,
                estado: info.estado
            }
        })

    res.status(204).send(user);
    console.log(user);
}

const deleteUser = async (req, res) => {
    let id = req.params.id;
    await db.sequelize.query('EXECUTE sp_delete_user @id= :idUser',
        {
            replacements: { idUser: id }
        })
    res.status(204).send('Usuario eliminado!')
}

module.exports = {
    getUsuarios,
    getUsuariosOld,
    getUserByDoc,
    createUser,
    updateUser,
    deleteUser
}