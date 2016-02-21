var mongoose = require('mongoose');

var RespuestaSchema = new mongoose.Schema({
    dato: Array,
    author: String

});

mongoose.model('Respuesta', RespuestaSchema);