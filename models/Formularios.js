var mongoose = require('mongoose');

var FormularioSchema = new mongoose.Schema({
    nombre: String,
    author: String,
    preguntas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pregunta' }]

});

mongoose.model('Formulario', FormularioSchema);