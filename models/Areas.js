var mongoose = require('mongoose');

var AreaSchema = new mongoose.Schema({
    nombre: String
});

mongoose.model('Area', AreaSchema);