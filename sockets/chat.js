module.exports = function(io) {

    var mongoose = require('mongoose');
    var Conectado = mongoose.model('Conectado');
    var User = mongoose.model('User');


    io.on('connection', function(socket){
        //var clients = findClientsSocket() ;
        //console.log(clients);



        socket.on('usuario', function (user) {

            User.findOne({ username: user }, function (err, name) {
                name.sock = socket.id;
                name.actual = true;
                name.save();
                 io.emit('usuario',user)
            });

            //var conectado = new Conectado({username: user,sock:socket.id,actual:true});
            //conectado.save(function(){

            //}); });



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



            //Conectado.findOne({ sock:socket.id }, function (err, name) {
            //    name.sock = '';
            //    name.actual = false;
            //    name.save();
            //});
            //var query = Conectado.find().remove({ sock:socket.id });
            //query.exec();
            //io.emit('usuario', 'DC')

        });


        });




// receive from client (index.ejs) with socket.on



};