const dbConfig = require('../config');
const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.dbDatabase,
  dbConfig.dbUser,
  dbConfig.dbPassword,
  {
    host: dbConfig.dbServer,
    dialect: 'mssql'
  }
)

sequelize.authenticate()
  .then(()=>{
    console.log('Conectado a la BD');
  })
  .catch(err => {
    console.log("Error"+err);
  })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.usuarios = require('./models/usuarioModel')(sequelize, DataTypes)
db.citas = require('./models/citaModel')(sequelize, DataTypes)

db.sequelize.sync()
  .then(()=>{
    console.log('sincronizacion ok!');
  })


// One to many relation


db.citas.belongsTo(db.usuarios, {
  foreignKey: 'usuario_id'
})

db.usuarios.hasMany(db.citas,{
  foreignKey: 'usuario_id'
})

module.exports = db