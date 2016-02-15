var mongoose = require('mongoose');

var PreguntaSchema = new mongoose.Schema({
    pregunta: String,
    tipo: String,
    opciones: Array
});



mongoose.model('Pregunta', PreguntaSchema);