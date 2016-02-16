var mongoose = require('mongoose');

var ConectadoSchema = new mongoose.Schema({
    username: String,
    sock: String,
    actual: Boolean
});

mongoose.model('Conectado', ConectadoSchema);