const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = express();


let corsOptions = {
    origin: 'http://localhost:3000'
}

//middleware

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended: true}))

//routers

const routerUsuarios = require('./routes/usuarios.routes')
app.use('/api/usuarios', routerUsuarios)

const routerCitas = require('./routes/citas.routes')
app.use('/api/citas', routerCitas)

//testing api

app.get('/', (req, res) => {
    res.json({message: 'hello from api'})
})

//port

const port = process.env.PORT || 8080

//server

app.listen(port, () => {
    console.log('Server ON on port', port);
});

module.exports = app;