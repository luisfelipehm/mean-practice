var mongoose = require('mongoose');

var PreguntaSchema = new mongoose.Schema({
    pregunta: String,
    tipo: String,
    opciones: Array
});

var a = {
    "_id":"56bdd126969889f416d4ef6e",
    "author":"ivantrips",
    "nombre":"Preguntas al azar",
    "__v":1,
    "preguntas":[
        {"_id":"56bdd155969889f416d4ef6f",
            "pregunta":"Intereses",
            "tipo":"checkbox",
            "__v":0,
            "opciones":["Musica","Deportes"]
        }
    ]};

mongoose.model('Pregunta', PreguntaSchema);