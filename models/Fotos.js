var mongoose = require('mongoose');

var FotoSchema = new mongoose.Schema({
    nombre: String,
    author: String,
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Fotosfile' }]
});

mongoose.model('Foto', FotoSchema);