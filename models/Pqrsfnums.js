var mongoose = require('mongoose');

var PqrsfnumSchema = new mongoose.Schema({
    peticion: String,
    queja: String,
    reclamo: String,
    solicitud: String,
    felicitacion: String
});

mongoose.model('Pqrsfnum', PqrsfnumSchema);