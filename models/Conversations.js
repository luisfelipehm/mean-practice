var mongoose = require('mongoose');

var ConversationSchema = new mongoose.Schema({
    usernameone: String,
    mensaje: String,
    usernametwo: Array,
    receptor: String
});

mongoose.model('Conversation', ConversationSchema);