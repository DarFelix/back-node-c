const { options } = require('..')
const db = require('../models/init-models')

//create main model

const Cita = db.citas
const Usuario = db.usuarios

// main work

const getCitas = async (req, res) => {
    let citas = await db.sequelize.query('EXECUTE sp_list_citas',{
        model: Cita
    })
    res.status(200).send(citas)
}

// connect one to many relation usuario-citas

const getCitasUsuario = async (req, res) => {
    let citas = await Cita.findAll({
        include:{
            model:  Usuario
        }
    })
    res.status(200).send(citas)
}

const getCitasUsuarioNew = async (req, res) => {
    let citas = await db.sequelize.query('EXECUTE sp_list_citas_join_usuarios',{
        nest: true
    })
    res.status(200).send(citas)
}

const createCita = async (req, res) => {

    let info = {
        fecha: req.body.fecha_cita,
        especialidad: req.body.especialidad,
        usuario: req.body.usuario.id
    }

    let cita = await db.sequelize.query('EXECUTE sp_create_cita @fecha= :fecha, @espe= :especialidad, @usuario= :usuario',
        {
            replacements: {
               fecha: info.fecha,
               especialidad: info.especialidad,
               usuario: info.usuario
            }
        })

    res.status(201).send(cita);
    console.log(cita);
}



module.exports = {
    getCitas,
    getCitasUsuario,
    getCitasUsuarioNew,
    createCita
}