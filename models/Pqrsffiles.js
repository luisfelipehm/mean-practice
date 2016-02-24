var mongoose = require('mongoose');

var PqrsffileSchema = new mongoose.Schema({
    adjunto: String,
    pqrsf: { type: mongoose.Schema.Types.ObjectId, ref: 'Pqrsf' },
    fase: Number
});

mongoose.model('Pqrsffile', PqrsffileSchema);