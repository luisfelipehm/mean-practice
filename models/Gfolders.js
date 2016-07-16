var mongoose = require('mongoose');

var GfolderSchema = new mongoose.Schema({
    nombre: String,
    author: String,
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
    carpetas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Folder' }],
    padre: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' },
    corporacion: String



});

mongoose.model('Gfolder', GfolderSchema);