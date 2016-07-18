var mongoose = require('mongoose');

var GfolderSchema = new mongoose.Schema({
    nombre: String,
    author: String,
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gfile' }],
    carpetas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gfolder' }],
    padre: { type: mongoose.Schema.Types.ObjectId, ref: 'Gfolder' },
    corporacion: String



});

mongoose.model('Gfolder', GfolderSchema);