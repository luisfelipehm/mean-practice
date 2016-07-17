var mongoose = require('mongoose');

var ActaSchema = new mongoose.Schema({
    titulo: String,
    fecha: Date,
    adjunto: String,
    carpeta: String,
    comentarios: [{ type: mongoose.Schema.Types.Mixed }]
});

mongoose.model('Acta', ActaSchema);