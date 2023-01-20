const {queryUser} = require('../../database/queries');
const db = require('../../database/configDB');

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

        return user[0];

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
    
        if(userExists.length === 0){

            let user = await db.sequelize.query(queryUser.createUser,
                {
                    replacements: {
                        nombres: newUser.nombres,
                        docu: newUser.docu,
                        age: newUser.age,
                        height: newUser.height,
                        tel: newUser.telefono,
                        pas: newUser.pass,
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
    
        if(userExists.length !== 0){

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
    
        if(userExists.length !== 0){

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

module.exports={
getAllUsers,
getUserByDoc,
createUser,
updateUser,
deleteUser
}
  