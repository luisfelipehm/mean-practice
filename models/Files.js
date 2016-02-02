var mongoose = require('mongoose');

var FileSchema = new mongoose.Schema({
    adjunto: String,
    author: String,
    nombre: String,
    tamano: String,
    fecha: String,
    folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' }
});

mongoose.model('File', FileSchema);