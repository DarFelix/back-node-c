const express = require('express');
const cors = require('cors');

const { doubleCsrf } = require("csrf-csrf");
const cookieParser = require("cookie-parser");

require('dotenv').config();

const app = express();


let corsOptions = {
    credentials: true,
    origin: 'http://localhost:4200',
    methods:['GET','POST','PUT','DELETE']
}


//middleware

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true}))

//protection csrf

const {
    invalidCsrfTokenError, // This is just for convenience if you plan on making your own middleware.
    generateToken, // Use this in your routes to provide a CSRF hash cookie and token.
    validateRequest, // Also a convenience if you plan on making your own middleware.
    doubleCsrfProtection, // This is the default CSRF protection middleware.
  } = doubleCsrf({
    getSecret: () => "Secret", // A function that optionally takes the request and returns a secret
    secret: "super csrf secret",
    cookieName: "__Host-darw.x-csrf-token", // The name of the cookie to be used, recommend using Host prefix.
    cookieOptions: { 
      httpOnly : false,
      sameSite : "lax",  // Recommend you make this strict if posible
      path : "/",
      secure : true,
      signed : false
    },
    size: 64, // The size of the generated tokens in bits
    ignoredMethods: [ "HEAD", "OPTIONS"], // A list of request methods that will not be protected.
  });

  app.use(cookieParser("super cookie secret"));

  const csrfErrorHandler = (error, req, res, next) => {
    if (error == invalidCsrfTokenError) {
      res.status(403).json({
        error: "csrf validation error",
      });
    } else {
      next();
    }
  };

  /*
  app.get("/csrf-token",
  (req, res) => {
    return res.json({
      token: generateToken(res, req),
    });
  });
  */
  
  app.get("/csrf-token",
  function(req,res,next){
    const token = generateToken(res, req);
    res.cookie("XSRF-TOKEN",token,{httpOnly:false,secure:false, sameSite: 'lax'});
    //res.set('XSRF-TOKEN', token);
    res.status(200).send();
    }
  );
  


//routers

const routerUsuarios = require('./v1/routes/usuarioRoutes')
app.use('/api/v1/usuarios',
doubleCsrfProtection,
csrfErrorHandler,
routerUsuarios)

const routerCitas = require('./v1/routes/citaRoutes')
app.use('/api/v1/citas',
doubleCsrfProtection,
csrfErrorHandler,
routerCitas)

// *** documentation ***
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");

//testing api

app.get('/', (req, res) => {
    res.json({message: 'hello from api'})
});


//port

const port = process.env.PORT || 8080

//server

app.listen(port, () => {
    console.log('Server ON on port', port);
    V1SwaggerDocs(app, port);
});

module.exports = app;