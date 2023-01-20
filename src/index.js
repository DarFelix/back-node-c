const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();


let corsOptions = {
    origin: 'http://localhost:3000'
}

//middleware

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended: true}))

//routers

const routerUsuarios = require('./v1/routes/usuarioRoutes')
app.use('/api/v1/usuarios', routerUsuarios)

const routerCitas = require('./v1/routes/citaRoutes')
app.use('/api/v1/citas', routerCitas)

// *** documentation ***
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");

//testing api

app.get('/', (req, res) => {
    res.json({message: 'hello from api'})
})

//port

const port = process.env.PORT || 8080

//server

app.listen(port, () => {
    console.log('Server ON on port', port);
    V1SwaggerDocs(app, port);
});

module.exports = app;