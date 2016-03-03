var mongoose = require('mongoose');

var RespuestaSchema = new mongoose.Schema({
    dato: Array,
    author: String,
    fecha: Date

});

mongoose.model('Respuesta', RespuestaSchema);