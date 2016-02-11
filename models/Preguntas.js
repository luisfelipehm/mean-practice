var mongoose = require('mongoose');

var PreguntaSchema = new mongoose.Schema({
    pregunta: String,
    tipo: String
});

mongoose.model('Pregunta', PreguntaSchema);