var mongoose = require('mongoose');

var PostareaSchema = new mongoose.Schema({
    title: String,
    link: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    //area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    file: String

});



mongoose.model('Postarea', PostareaSchema);