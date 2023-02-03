const {queryUser} = require('../../database/queries');
const db = require('../../database/configDB');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../../helpers/jwt')

// logic

const getAllUsers = async () => {
    
    try {
        let usuarios = await db.sequelize.query( queryUser.getAllUsers);
        return usuarios[0];
    } catch (error) {
        throw error;
    }
};

const getUserByDoc = async (UserId) => {

    try {

        let user = await db.sequelize.query(queryUser.getUserByDoc,
            {
                replacements: { doc: UserId }
            }
        )
        
        if( user[0].length === 1 ){
            return user[0][0];
        }else{
            throw {
                status: 400,
                message: `Usuario no existe`,
              };
        }

    } catch (error) {
        throw error;
    }
}

const getUserById = async (Id) => {

    try {

        let user = await db.sequelize.query(queryUser.getUserById,
            {
                replacements: { idUser: Id }
            }
        )

        return user[0];

    } catch (error) {
        throw error;
    }
}

const createUser = async (newUser) => {

    try {

        const userExists = await getUserByDoc(newUser.docu);

        if(!userExists){

            let user = await db.sequelize.query(queryUser.createUser,
                {
                    replacements: {
                        nombres: newUser.nombres,
                        docu: newUser.docu,
                        age: newUser.age,
                        height: newUser.height,
                        tel: newUser.telefono,
                        pas: newUser.pass,
                        rol: newUser.rol,
                        estado: newUser.estado
                    }
                })
    
            return user[0];

        }else{
            throw {
                status: 400,
                message: `User with the document number '${newUser.docu}' already exists`,
              };
        }

    } catch (error) {
        throw error;
    }
}

const updateUser = async (idUser, updateUser) => {

    try {

        const userExists = await getUserById(idUser);
    
        if(userExists){

            let user = await db.sequelize.query(queryUser.updateUser,
                {
                    replacements: {
                        id: idUser,
                        nombres: updateUser.nombres,
                        docu: updateUser.docu,
                        age: updateUser.age,
                        height: updateUser.height,
                        tel: updateUser.telefono,
                        pas: updateUser.pass,
                        rol: updateUser.rol,
                        estado: updateUser.estado
                    }
                })
    
            return user[0];

        }else{
            throw {
                status: 400,
                message: `User with id: '${idUser}' not exists`,
              };
        }

    } catch (error) {
        throw error;
    }
}

const deleteUser = async (id) => {

    try {

        const userExists = await getUserById(id);
    
        if(userExists){

            await db.sequelize.query(queryUser.deleteUser,
            {
                replacements: { idUser: id }
            })

        }else{
            throw {
                status: 400,
                message: `User with id: '${idUser}' not exists`,
              };
        }

    } catch (error) {
        throw error;
    }
}

const authUser = async (docu, pass) => {
    
    try {

        const usuario = await getUserByDoc(docu);
        if (!usuario) {
            throw {
                status: 400,
                message: `Datos incorrectos`,
              };
        }

        if(!usuario.pass){
            throw {
                status: 400,
                message: `Usuario no tiene contraseña, contacte al admin`,
              };
        }

        const passOk = bcrypt.compareSync(pass, usuario.pass);
        
        if (!passOk) {
            throw {
                status: 400,
                message: `Datos incorrectos`,
              };
        }

        const token = generarJWT(usuario);

        let result = {
            id: usuario.usuario_id,
            nombre: usuario.nombres,
            rol: usuario.rol,
            email: usuario.numero_doc,
            access_token: token
        }

        return result;
        
    } catch (error) {
        throw error;
    }
}

module.exports={
getAllUsers,
getUserByDoc,
createUser,
updateUser,
deleteUser,
authUser
}
  