var mongoose = require('mongoose');

var GfileSchema = new mongoose.Schema({
    adjunto: String,
    author: String,
    nombre: String,
    tamano: String,
    fecha: String,
    folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' },
    corporacion: String
});

mongoose.model('Gfile', GfileSchema);