'use strict'

var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var ResenasSchema = Schema({
    restaurante: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    puntuacion: { type: Number, min: 1, max: 5 },
    comentario: String,
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('resenas',ResenasSchema);