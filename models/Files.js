var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    adjunto: String,
    author: String,
    folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' }
});

mongoose.model('Comment', CommentSchema);