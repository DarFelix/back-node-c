const { Sequelize } = require('sequelize');
require('dotenv').config();

const getConnection = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD,
     {
    host: process.env.DB_SERVER,
    dialect:  'mssql' 
  });


module.exports = {
    getConnection
}