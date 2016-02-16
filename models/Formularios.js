var mongoose = require('mongoose');

var FormularioSchema = new mongoose.Schema({
    nombre: String,
    author: String,
    preguntas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pregunta' }],
    respuestas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Respuesta' }]

});

mongoose.model('Formulario', FormularioSchema);