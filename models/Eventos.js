var mongoose = require('mongoose');

var EventoSchema = new mongoose.Schema({
    nombre: String,
    horainicio: Date,
    horafinal: Date,
    fechainicio: Date,
    fechafinal: Date,
    descripcion: String
});

mongoose.model('Evento', EventoSchema);