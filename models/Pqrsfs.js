var mongoose = require('mongoose');

var PqrsfSchema = new mongoose.Schema({
    nombre: String,
    tdocumento: String,
    ndocumento: String,
    empresa: String,
    cargo: String,
    ciudad: String,
    tipopq: String,
    comentario:String,
    email: String,
    creadopor: String,
    celular: String,
    direccion: String,
    estado: String,
    fechainicio: Date,
    fechacierre: Date,
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pqrsffile' }],
    encargados: Array


});

mongoose.model('Pqrsf', PqrsfSchema);