const db = require('../../database/configDB');
const usuarioService = require('../services/usuarioService')
const { validationResult } = require('express-validator');

//create main model

const Usuario = db.usuarios

// main work

const getUsuariosOld = async (req, res) => {
   
    try{

        let usuarios = await Usuario.findAll({
            attributes: ['nombres', 'age']
        })
        res.status(200).send(usuarios)
      

    } catch (error){

        res.status(500);
        res.send(error.message);

    }
}


const getUsuarios = async (req, res) => {

    try {
        let usuarios = await usuarioService.getAllUsers();
        res.status(200).send(usuarios);
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }

}

const getUserByDoc = async (req, res) => {
    
        let doc = req.params.id;

        if (!doc) {
            res
              .status(400)
              .send({
                status: "FAILED",
                data: { error: "Parameter ':doc' can not be empty" },
              });
        }

        try{

            let user = await usuarioService.getUserByDoc(doc); 

            if(user.length !== 0){
                res.status(200).send(user)
            }else{
                res
                .status(400)
                .send({
                  status: "FAILED",
                  data: { error: "user isn´t exists" },
                });
            }

        } catch (error){
    
            res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    
        }

    
}

const createUser = async (req, res) => {

    const { body } = req;

    if (
        !body.nombres ||
        !body.numero_doc ||
        !body.age ||
        !body.height ||
        !body.telefono ||
        !body.pass ||
        !body.rol ||
        !body.estado_usuario
      ) {
        res
          .status(400)
          .send({
            status: "FAILED",
            data: {
              error:
                "One of the following keys is missing or is empty in request body: 'nombres', 'numero_doc', 'age', 'height', 'telefono', 'pass', 'rol' or 'estado_usuario'",
            },
          });
        return;
      }


    let newUser = {
        nombres: body.nombres,
        docu: body.numero_doc,
        age: body.age,
        height: body.height,
        telefono: body.telefono,
        pass: body.pass,
        rol: body.rol,
        estado: body.estado_usuario
    }

    try{

        const createdUser = await usuarioService.createUser(newUser);
        res.status(201).send(createdUser);

    } catch (error){

        res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });

    }
}

const updateUser = async (req, res) => {

    const { body } = req;

    let idUser = req.params.id;

    if (!idUser) {
        res
            .status(400)
            .send({
            status: "FAILED",
            data: { error: "Parameter ':id' can not be empty" },
            });
    }

    let changes = {
        nombres: body.nombres,
        docu: body.numero_doc,
        age: body.age,
        height: body.height,
        telefono: body.telefono,
        pass: body.pass,
        rol: body.rol,
        estado: body.estado_usuario
    }

    try{

        const updateUser = await usuarioService.updateUser(idUser, changes);
        res.status(204).send(updateUser);

    } catch (error){

        res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });

    }
}

const deleteUser = async (req, res) => {
    
    let idUser = req.params.id;

        if (!idUser) {
            res
              .status(400)
              .send({
                status: "FAILED",
                data: { error: "Parameter ':id' in deleteUser can not be empty" },
              });
        }

        try{

            await usuarioService.deleteUser(idUser);
            res
              .status(204)
              .send();
    
        } catch (error){
    
            res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    
        }

}

const authUser = async (req, res) => {

  try {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ mensaje: errors.array() });
    }

    const {document, password} = req.body;

    const authenticatedUser = await usuarioService.authUser(document, password);

    res.status(200).send(authenticatedUser);
    
  } catch (error) {
    
    res
    .status(error?.status || 500)
    .send({ status: "FAILED", data: { error: error?.message || error } });

  }
}

module.exports = {
    getUsuarios,
    getUsuariosOld,
    getUserByDoc,
    createUser,
    updateUser,
    deleteUser,
    authUser
}