var mongoose = require('mongoose');

var ConversationSchema = new mongoose.Schema({
    usernameone: String,
    mensaje: String,
    usernametwo: Array,
    receptor: String,
    fecha: Date
});

mongoose.model('Conversation', ConversationSchema);