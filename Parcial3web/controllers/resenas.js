'use strict'

const Resenas = require('../models/resenas'); 
// Si el modelo se llama Resenas, deberías usar este nombre, no Review

// Crear reseña
async function crearResena(req, res) {
    try {
        // Crear una nueva reseña con los datos proporcionados y asociada al usuario autenticado
        const nuevaResena = new Resenas({
            restaurante: req.body.restaurante,
            puntuacion: req.body.puntuacion,
            comentario: req.body.comentario,
            userId: req.user.id  // Asegúrate de que el 'userId' es el del usuario autenticado
        });

        // Guardar la reseña en la base de datos
        const resenaGuardada = await nuevaResena.save();

        // Devolver la reseña creada con el estado 201
        res.status(201).json(resenaGuardada);
    } catch (error) {
        // Manejo de errores
        res.status(400).json({ message: error.message });
    }
}


// Obtener todas las reseñas
async function obtenerResenas(req, res) {
    try {
        
        const resenasEncontradas = await Resenas.find().populate('userId', 'username');

        // Si no se encuentran reseñas, enviar un mensaje de error
        if (!resenasEncontradas || resenasEncontradas.length === 0) {
            return res.status(404).send({ message: 'No se encontraron reseñas.' });
        }

        // Devolver las reseñas encontradas
        res.status(200).json(resenasEncontradas);
    } catch (error) {
        // Manejo de errores
        console.error(error);
        res.status(500).send({ message: 'Error al obtener las reseñas.' });
    }
}


// Modificar reseña (solo usuario autenticado)
async function modificarResena(req, res) {
    try {
        console.log(req.body);  // Verifica los datos que estás enviando para la actualización
        const resenaModificada = await Resenas.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id }, 
            req.body,
            { new: true }
        );

        if (!resenaModificada) {
            return res.status(404).json({ message: 'Reseña no encontrada o no autorizada para modificar.' });
        }

        res.status(200).json(resenaModificada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Eliminar reseña (solo usuario autenticado)
async function eliminarResena(req, res) {
    try {
        const resenaEliminada = await Resenas.findOneAndDelete({ _id: req.params.id, userId: req.user.id }); 

        if (!resenaEliminada) {
            return res.status(404).json({ message: 'Reseña no encontrada o no autorizada para eliminar.' });
        }

        res.status(200).json({ message: 'Reseña eliminada correctamente.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/////////////////////////////

module.exports = {
    crearResena,
    obtenerResenas,
    modificarResena,
    eliminarResena
};
