var mongoose = require('mongoose');

var PostareaSchema = new mongoose.Schema({
    title: String,
    link: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    comentarios: [{ type: mongoose.Schema.Types.Mixed }],
    //area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    file: String,
    areaf:String

});



mongoose.model('Postarea', PostareaSchema);