const queryUser = {
    getAllUsers: 'EXECUTE sp_list_users',
    getUserByDoc: 'EXECUTE sp_user_by_doc @docu =:doc',
    createUser: 'EXECUTE sp_create_user @nombres= :nombres, @docu= :docu, @age= :age, @height= :height, @telefono= :tel, @pass= :pas, @estado= :estado',
    updateUser: 'EXECUTE sp_update_user @id= :id, @nombres= :nombres, @docu= :docu, @age= :age, @height= :height, @telefono= :tel, @pass= :pas, @estado= :estado',
    deleteUser: 'EXECUTE sp_delete_user @id= :idUser',
    getUserById: 'EXECUTE sp_user_by_id @id = :idUser'
}

const queryCita = {
    getCitasSP: 'EXECUTE sp_list_citas',
    getCitasNest: 'EXECUTE sp_list_citas_join_usuarios',
    createCita: 'EXECUTE sp_create_cita @fecha= :fecha, @espe= :especialidad, @usuario= :usuario'
}

module.exports= {
    queryUser, 
    queryCita
};