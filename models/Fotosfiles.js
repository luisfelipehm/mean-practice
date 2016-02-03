var mongoose = require('mongoose');

var FotosfileSchema = new mongoose.Schema({
    adjunto: String,
    album: { type: mongoose.Schema.Types.ObjectId, ref: 'Foto' }
});

mongoose.model('Fotosfile', FotosfileSchema);