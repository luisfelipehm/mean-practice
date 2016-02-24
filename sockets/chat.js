module.exports = function(io) {

    var mongoose = require('mongoose');
    var Conectado = mongoose.model('Conectado');
    var Conversation = mongoose.model('Conversation');
    var User = mongoose.model('User');


    io.on('connection', function(socket){




        socket.on('chateando', function (msg) {
            var conv = new Conversation({usernameone: msg.envia, usernametwo: msg.participan, mensaje: msg.mesj,receptor: msg.recibe, fecha: Date.now(),fotoperfil: msg.fotoperfil });
            conv.save(function(){

                //var sabe = [{usernameone: msg.envia,usernametwo: msg.recibe},{usernametwo: msg.recibe,usernameone: msg.envia}];

                io.emit('chateando',msg);





            });




        });
        socket.on('pubs', function (user) {

                io.emit('pubs',user)

        });


        socket.on('usuario', function (user) {

            User.findOne({ username: user }, function (err, name) {
                name.sock = socket.id;
                name.actual = true;
                name.ultimaconexion = Date.now();
                name.save();
                 io.emit('usuario',user)
            });
            });
        socket.on('disusuario', function (user) {

            User.findOne({ username: user }, function (err, name) {
                name.sock = '';
                name.actual = false;
                name.save();
                io.emit('usuario',user)
            });
        });




        socket.on('sok', function(msg){
            io.emit('sok', msg);
        });

        socket.once('disconnect', function () {

            User.findOne({ sock: socket.id }).exec(function (err,document) {
                if (err) {
                    console.log(err);
                    return; }
                if (!document) { return; }
                User.findOne({ username: document.username }, function (err, name) {
                    name.sock = '';
                    name.actual = false;
                    name.save();
                });
            });





        });


        });








};