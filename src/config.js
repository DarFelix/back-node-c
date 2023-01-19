require('dotenv').config()

const variables = {
    port:process.env.PORT,
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
    dbServer: process.env.DB_SERVER || '',
    dbDatabase: process.env.DB_DATABASE || '',
}

module.exports = variables