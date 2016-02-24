var mongoose = require('mongoose');

var PqrsfSchema = new mongoose.Schema({
    nombre: String,
    tdocumento: String,
    ndocumento: String,
    empresa: String,
    cargo: String,
    ciudad2: String,
    tipopq: String,
    fase: Number,
    comentario:String,
    email: String,
    creadopor: String,
    celular: String,
    direccion: String,
    estado: String,
    fechainicio: Date,
    fechacierre: Date,
    comentarios: [{ type: mongoose.Schema.Types.Mixed }],
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pqrsffile' }],
    encargados: [String]


});

mongoose.model('Pqrsf', PqrsfSchema);