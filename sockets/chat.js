module.exports = function(io) {

    var mongoose = require('mongoose');
    var Conectado = mongoose.model('Conectado');
    var Conversation = mongoose.model('Conversation');
    var User = mongoose.model('User');


    io.on('connection', function(socket){

        socket.on('chateando', function (msg) {

            function urlify(text) {
                var urlRegex = /(https?:\/\/[^\s]+)/g;
                return text.replace(urlRegex, function(url) {
                    return '<a target="_blank" href="' + url + '">' + url + '</a>';
                });
                // or alternatively
                // return text.replace(urlRegex, '<a href="$1">$1</a>')
            }

            var linkeando = urlify(msg.mesj);
            var conv = new Conversation({usernameone: msg.envia, usernametwo: msg.participan, mensaje: linkeando,receptor: msg.recibe, fecha: Date.now(),fotoperfil: msg.fotoperfil,adjunto: msg.adjunto });
            conv.save(function(){
                User.findOne({ username: msg.recibe }, function (err, name) {
                    name.conversaciones = (name.conversaciones ?  name.conversaciones + 1 : 1);
                    name.save(function (err,d) {

                    });
                    msg.conversaciones = name.conversaciones;
                    io.emit('chateando',msg);    
                });
                //var sabe = [{usernameone: msg.envia,usernametwo: msg.recibe},{usernametwo: msg.recibe,usernameone: msg.envia}];
                
            });

        });
        socket.on('pubs', function (user) {

                io.emit('pubs',user)

        });

        socket.on('leyonot', function (user) {

            User.findOne({ username: user.username }, function (err, name) {
                name.conversaciones = 0;
                name.save();


            });

        });

        socket.on('usuario', function (user) {

            User.findOne({ username: user }, function (err, name) {
                if(!name){return err}
                name.sock = socket.id;
                name.actual = true;
                name.ultimaconexion = Date.now();
                name.save();
                io.emit('usuario',user)
            });
            });
        socket.on('disusuario', function (user) {

            User.findOne({ username: user }, function (err, name) {
                if(!name){return err}
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