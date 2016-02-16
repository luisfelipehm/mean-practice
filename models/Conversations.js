var mongoose = require('mongoose');

var ConversationSchema = new mongoose.Schema({
    usernameone: String,
    mensaje: String,
    usernametwo: String
});

mongoose.model('Conversation', ConversationSchema);