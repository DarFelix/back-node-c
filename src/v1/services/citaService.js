const {queryCita} = require('../../database/queries');
const db = require('../../database/configDB');

//create main model for query: getCitasJoinSeqUsuarios

const Cita = db.citas
const Usuario = db.usuarios

const getCitasRawQuery = async () => {
    
    try {
        
        let citas = await db.sequelize.query(queryCita.getCitasNest,{
            nest: true
        });

        return citas;
    } catch (error) {
        throw error;
    }
};

const getCitasJoinSeqUsuarios = async () => {
    
    try {
        
        let citas = await Cita.findAll({
            include:{
                model:  Usuario
            }
        })

        return citas;
    } catch (error) {
        throw error;
    }
};

const getCitasCallSP = async () => {
    
    try {
        
        let citas = await db.sequelize.query(queryCita.getCitasSP,{
            nest: true
        });

        return citas;
    } catch (error) {
        throw error;
    }
};

const createCita = async (newCita) => {

    try {

        let cita = await db.sequelize.query(queryCita.createCita,
            {
                replacements: {
                   fecha: newCita.fecha,
                   especialidad: newCita.especialidad,
                   usuario: newCita.usuario
                }
            })

        return cita;

    } catch (error) {
        throw error;
    }
}


module.exports={
    getCitasRawQuery,
    getCitasJoinSeqUsuarios,
    getCitasCallSP,
    createCita
}