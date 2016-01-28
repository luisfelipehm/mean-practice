var mongoose = require('mongoose');

var FolderSchema = new mongoose.Schema({
    nombre: String,
    author: String,
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
    carpetas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Folder' }],
    padre: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' }



});

mongoose.model('Folder', FolderSchema);