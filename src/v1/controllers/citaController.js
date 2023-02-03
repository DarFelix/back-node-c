const { queryCita } = require('../../database/queries')
const db = require('../../database/configDB')
const citaService = require('../services/citaService')


// main work

const getCitasRawQuery = async (req, res) => {
    try {
        let citas = await citaService.getCitasRawQuery();
        res.status(200).send(citas);
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }

}

const getCitasJoinSeqUsuarios = async (req, res) => {
    try {
        let citas = await citaService.getCitasJoinSeqUsuarios();
        res.status(200).send(citas);
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

const getCitasCallSP = async (req, res) => {
    try {
        let citas = await citaService.getCitasCallSP();
        res.status(200).send(citas);
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

const createCita = async (req, res) => {

    const { body } = req;

    if (
        !body.fecha_cita ||
        !body.especialidad ||
        !body.usuario.id
      ) {
        res
          .status(400)
          .send({
            status: "FAILED",
            data: {
              error:
                "One of the following keys is missing or is empty in request body: 'fecha', 'especialidad' or 'usuario'",
            },
          });
        return;
      }


    let newCita = {
        fecha: body.fecha_cita,
        especialidad: body.especialidad,
        usuario: body.usuario.id,
    }

    try{

        const createdCita = await citaService.createCita(newCita);
        res.status(201).send(createdCita);

    } catch (error){

        res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });

    }
}



module.exports = {
    getCitasRawQuery,
    getCitasJoinSeqUsuarios,
    getCitasCallSP,
    createCita
}