'use strict';

var express = require('express');
var resenasController = require('../controllers/resenas');
var authenticationController = require("../controllers/autenticacion");

var token = require('../helpers/autenticacion');
/////////////////////////

var routes = express.Router();

routes.post('/api/usuario', authenticationController.registrarUsuario);
routes.post('/api/login', authenticationController.iniciarSesion);



// Crear una nueva reseña (requiere autenticación)
routes.post('/api/resenas',
    token.validarToken,
    resenasController.crearResena
);

// Obtener todas las reseñas (sin necesidad de autenticación)
routes.get('/api/resenas',
    resenasController.obtenerResenas
);

// Modificar una reseña existente (requiere autenticación)
routes.put('/api/resenas/:id',
    token.validarToken,
    resenasController.modificarResena
);

// Eliminar una reseña existente (requiere autenticación)
routes.delete('/api/resenas/:id',
    token.validarToken,
    resenasController.eliminarResena
);


module.exports = routes;
