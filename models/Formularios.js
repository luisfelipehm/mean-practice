var mongoose = require('mongoose');

var FormularioSchema = new mongoose.Schema({
    nombre: String,
    author: String,
    descripcion: String,
    habilitado: Boolean,
    fecha:Date,
    preguntas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pregunta' }],
    respuestas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Respuesta' }]

});

mongoose.model('Formulario', FormularioSchema);