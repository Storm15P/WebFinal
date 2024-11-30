'use strict';

// Importar dependencias
var application = require('./application'); // Archivo donde está la configuración de rutas
var mongoose = require('mongoose');
var express = require('express');
var cors = require('cors');

// Crear la aplicación de Express
var app = express();

// Middleware para procesar JSON
app.use(express.json());

// Habilitar CORS para todas las rutas (puedes ajustarlo para dominios específicos si deseas)
app.use(cors({
    origin: 'http://localhost:4200', // Permitir solo solicitudes desde Angular
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Configurar las rutas de la aplicación
app.use(application);

// Conectar a la base de datos MongoDB
mongoose.connect("mongodb://localhost:27017/parcial3web")
    .then(() => {
        console.log("Conexión con la base de datos establecida");

        // Iniciar el servidor en el puerto 9898
        app.listen(9898, function () {
            console.log("Aplicación iniciada en http://localhost:9898");
        });
    })
    .catch(err => {
        console.log("Conexión con la base de datos fallida:", err);
    });
