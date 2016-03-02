var mongoose = require('mongoose');

var AreaSchema = new mongoose.Schema({
    nombre: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Postarea' }]
});

mongoose.model('Area', AreaSchema);