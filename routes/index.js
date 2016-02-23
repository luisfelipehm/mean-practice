var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var moment = require('moment');
var Post = mongoose.model('Post');
var Respuesta = mongoose.model('Respuesta');
var Comment = mongoose.model('Comment');
var Foto = mongoose.model('Foto');
var Area = mongoose.model('Area');
var Fotosfile = mongoose.model('Fotosfile');
var Pqrsf = mongoose.model('Pqrsf');
var Pqrsffile = mongoose.model('Pqrsffile');
var Conectado = mongoose.model('Conectado');
var Conversation = mongoose.model('Conversation');
var Pregunta = mongoose.model('Pregunta');
var File = mongoose.model('File');
var User = mongoose.model('User');
var Folder = mongoose.model('Folder');
var Formulario = mongoose.model('Formulario');





var jwt = require('express-jwt');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

 var titleize =function(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
};


router.get('/posts', function(req, res, next) {

  Post.find().populate('comments').exec(function (err,posts) {
    if(err){ return next(err); }
    res.json(posts);
  })
});


router.get('/documents', function(req, res, next) {

  Folder.find(function(err, documents){
    if(err){ return next(err); }
    res.json(documents);
  });

});

router.get('/formularios', function(req, res, next) {

  Formulario.find().populate('preguntas').exec(function(err, formularios){
    if(err){ return next(err); }
    res.json(formularios);
  });
});


router.post('/conectados',auth, function(req, res, next) {
  var conectado = new Conectado(req.body);
  //formulario.author = req.payload.username;
  conectado.save(function(err, conectado){
    if(err){ return next(err); }
    res.json(conectado);
  });
});

router.get('/conectados', function(req, res, next) {

  User.find(function(err, conectados){

    if(err){ return next(err); }
    res.json(conectados);
  });

});

router.get('/mensajes/:mes', function(req, res, next) {

var sabe = req.params.mes.split(',').sort();

      Conversation.find({ usernametwo: sabe }, function(err,mensa){
        if(err){ return next(err); }
        console.log(mensa);
        res.json(mensa);
          });
});




router.post('/formularios',auth, function(req, res, next) {
  var formulario = new Formulario(req.body);
  formulario.author = req.payload.username;
  formulario.preguntas = [];
  formulario.save(function(err, formulario){
    if(err){ return next(err); }
    res.json(formulario);
  });
});


// PARAMETRO DE FORMULARIO

router.param('formulario', function(req, res, next, id) {
  var query = Formulario.findById(id);

  query.exec(function (err, formulario){
    if (err) { return next(err); }
    if (!formulario) { return next(new Error('can\'t find post')); }

    req.formulario = formulario;
    return next();
  });
});


router.post('/formularios/:formulario/responder',auth, function(req, res, next) {
  var comment = new Respuesta(req.body);
  comment.author = req.payload.username;
  comment.save(function(err, comment){
    if(err){ return next(err); }
    req.formulario.respuestas.push(comment);
    req.formulario.save(function(err, formulario) {
      if(err){ return next(err); }
      res.json(comment);
    });
  });
});

// OBTENER UN FORMULARIO
router.get('/formularios/:formulario/results', function(req, res, next) {

  req.formulario.populate('respuestas', function(err, formulario) {
    if (err) { return next(err);   }


    res.json(formulario);
  });
});

router.get('/formularios/:formulario', function(req, res, next) {

  req.formulario.populate('preguntas', function(err, formulario) {
    if (err) { return next(err);   }


    res.json(formulario);
  });
});

// CREAR PREGUNTAS EN LOS FORMULARIOS


router.post('/formularios/:formulario/preguntas',auth, function(req, res, next) {
  var pregunta = new Pregunta(req.body);

  pregunta.save(function(err, comment){
    if(err){ return next(err); }

    req.formulario.preguntas.push(pregunta);
    req.formulario.save(function (err, formulario) {
      if(err){ return next(err); }

      res.json(req.body);
    })

  });
});


//INDEX DE PQRSF

router.get('/pqrsf', function(req, res, next) {

  Pqrsf.find(function(err, pqrsf){
    if(err){ return next(err); }
    res.json(pqrsf);
  });

});

// INDEX DE ALBUMS

router.get('/fotos', function(req, res, next) {

  Foto.find(function(err, fotos){
    if(err){ return next(err); }
    res.json(fotos);
  });

});

// CREAR ALBUMS

router.post('/fotos',auth, function(req, res, next) {
  var foto = new Foto(req.body);
  foto.author = req.payload.username;
  foto.save(function(err, post){
    if(err){ return next(err); }
    res.json(foto);
  });
});


// OBTENER LA CARPETA INICIAL DE DOCUMENTOS


router.post('/documents',auth, function(req, res, next) {
  var document = new Folder(req.body);
  document.author = req.payload.username;
  document.save(function(err, post){
    if(err){ return next(err); }

    res.json(document);
  });
});

// OBTENER UNA PUBLICACION

router.get('/posts/:post', function(req, res, next) {
  req.post.populate('comments', function(err, post) {
    if (err) { return next(err); }

    res.json(post);
  });
});

// PARAMETRO DE ALBUM PARA SHOW

router.param('foto', function(req, res, next, id) {
  var query = Foto.findById(id);

  query.exec(function (err, foto){
    if (err) { return next(err); }
    if (!foto) { return next(new Error('can\'t find post')); }

    req.foto = foto;
    return next();
  });
});
// PARAMETRO DE DOCUMENTO PARA SHOW

router.param('document', function(req, res, next, id) {
  var query = Folder.findById(id);

  query.exec(function (err, document){
    if (err) { return next(err); }
    if (!document) { return next(new Error('can\'t find post')); }

    req.document = document;
    return next();
  });
});

// OBTENER UN ALBUM

router.get('/fotos/:foto', function(req, res, next) {
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
  req.foto.populate('files').populate('adjunto','nombre', function(err, foto) {
    if (err) { return next(err);   }


    res.json(foto);
  });
});

// OBTENER UNA CARPETA

router.get('/documents/:document', function(req, res, next) {
  console.log(req.document);
  req.document.populate('files').populate('carpetas','nombre', function(err, document) {
    if (err) { return next(err);   }


    res.json(document);
  });
});



// EN DONDE SE VAN A GUARDAR LOS ARCHIVOS QUE SE SUBAN
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads2')
  },
  filename: function (req, file, cb) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
      dd='0'+dd
    }
    if(mm<10){
      mm='0'+mm
    }

  var nombre = file.originalname.split('.');
    console.log(nombre[0] + '.' + nombre[1]);
    cb(null, nombre[0] + ' ' +  dd+'-'+mm+'-'+yyyy + '.' + nombre[1]   )
  }
});

var upload = multer({ storage: storage });



//ANADIR ARCHIVOS A LA PQRSF

router.post('/pqrsf', function(req, res, next){
  console.log('error1');

  var pqrsf = new Pqrsf(req.body);
  pqrsf.encargado = [req.body.encargado];
  pqrsf.fechainicio = Date.now();
  pqrsf.save(function (err, pq){
    console.log(err);
    console.log('error2');
    if(err){ return next(err); }
    res.json(pq)
  });
});

router.param('pqrsf', function(req, res, next, id) {
  var query = Pqrsf.findById(id);

  query.exec(function (err, pqrsf){
    if (err) { return next(err); }
    if (!pqrsf) { return next(new Error('can\'t find post')); }

    req.pqrsf = pqrsf;
    return next();
  });
});


router.post('/pqrsfs/:pqrsf/files',auth, upload.single('file'), function(req, res, next) {


  var file = new Pqrsffile();
  file.nombre = req.body.nombre;
  file.filename = req.body.nombre;
  file.adjunto = '/uploads2/'+req.file.filename;
  file.save(function(err, files){
    if(err){ return next(err); }

    req.pqrsf.files.push(file);
    req.pqrsf.save(function(err, document) {
      if(err){ return next(err); }
      console.log('done');
      res.json(req.body);
    });

  });
});


//ANADIR FOTOS A LOS ALBUMS


router.post('/fotos/:foto/files',auth, upload.single('file'), function(req, res, next) {


  var file = new Fotosfile();
  file.nombre = req.body.nombre;
  file.filename = req.body.nombre;
  file.adjunto = '/uploads2/'+req.file.filename;
  file.save(function(err, files){
    if(err){ return next(err); }

    req.foto.files.push(file);
    req.foto.save(function(err, document) {
      if(err){ return next(err); }

      res.json(req.body);
    });

  });
});


//CREAR CARPETAS DENTRO DE LAS CARPETAS


router.post('/documents/:document/documents',auth, function(req, res, next) {
  var comment = new Folder(req.body);
  comment.padre = req.document._id;
  comment.author = req.payload.username;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.document.carpetas.push(comment);
    req.document.save(function(err, document) {
      if(err){ return next(err); }

      res.json(req.body);
    });
  });
});


// FUNCION PARA DARLE UN TAMANO A LOS ARCHIVOS

function getReadableFileSizeString(fileSizeInBytes) {

  var i = -1;
  var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
  do {
    fileSizeInBytes = fileSizeInBytes / 1024;
    i++;
  } while (fileSizeInBytes > 1024);

  return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
}




// CREAR PUBLICACION QUE INCLUYE SUBIDA DE ARCHIVOS

router.post('/posts',auth, upload.single('file'), function(req, res, next) {
  console.log(req.params);
  req.body.file = '/uploads2/'+req.file.filename;
  var post = new Post(req.body);

  post.author = req.payload.username;
  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});


//ARCHIVOS DE LAS CARPETAS EN LA PARTE DOCUMENTAL

router.post('/documents/:document/files',auth, upload.single('file'), function(req, res, next) {

  console.log('error');
    var file = new File();
    file.author = req.payload.username;
    file.nombre = req.body.nombre;
    file.filename = req.body.nombre;
    file.fecha =  Date.now();
    file.tamano = getReadableFileSizeString(req.file.size);
    file.adjunto = '/uploads2/'+req.file.filename;
    file.padre = req.document._id;
    file.save(function(err, files){
      if(err){ return next(err); }

      req.document.files.push(file);
      req.document.save(function(err, document) {
        if(err){ return next(err); }

        res.json(req.body);
      });

    });
});


// PARAMETRO DE PUBLICACION

router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});



//ME GUSTA

router.put('/posts/:post/upvote',auth, function(req, res, next) {
  req.post.upvote(function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
});


//ELIMINAR PUBLICACIONES

router.delete('/conectados/:_id',auth, function(req, res,next){

  Conectado.findById( req.params._id, function ( err, conectado ){
    conectado.remove( function ( err, conectado ){
      res.json(conectado);
    });
  });
});


router.delete('/posts/:_id',auth, function(req, res,next){
  console.log("Deleting");
  Post.findById( req.params._id, function ( err, post ){
    post.remove( function ( err, post ){
      res.json(post);
    });
  });
});

router.delete('/comments/:_id',auth, function(req, res,next){
  console.log("Deleting");
  Comment.findById( req.params._id, function ( err, comment ){
    comment.remove( function ( err, comment ){
      res.json(comment);
    });
  });
});


// NUEVOS COMENTARIOS A LAS PUBLICACIONES


router.post('/posts/:post/comments',auth, function(req, res, next) {
  User.findOne({ username: req.payload.username  }, function (err, name) {

  });


  User.findOne({ username: req.payload.username  }, function (err, name) {
    var comment = new Comment(req.body);
    comment.post = req.post;
    comment.author = titleize(name.nombre) +' ' + titleize(name.apellido);
    comment.author2 = req.payload.username;
    comment.fotoperfil = (name.fotoperfil == undefined ? '/img/iconouser.jpg' : name.fotoperfil);
    comment.save(function(err, comment){
      if(err){ return next(err); }

      req.post.comments.push(comment);
      req.post.save(function(err, post) {
        if(err){ return next(err); }

        res.json(comment);
      });
    });
  });


});


//CREACION DE USUARIOS


router.get('/areas', function(req, res, next) {
  Area.find(function(err, area){
    if(err){ return next(err); }
    res.json(area);
  });
});
router.post('/areas', function(req, res, next){
  var area = new Area(req.body);
  area.save(function (err, area){
    if(err){ return next(err); }
  });
});

router.get('/users', function(req, res, next) {

  User.find(function(err, users){

    if(err){ return next(err); }
    res.json(users);
  });

});
router.post('/users', function(req, res, next){

  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User(req.body);

  user.username = req.body.username;

  user.setPassword(req.body.password);
  user.save(function (err, user){
    if(err){ return next(err); }


  });
});

router.post('/users/:_id', function(req, res, next){

  User.findOne({ username: req.body.username  }, function (err, name) {

    (req.body.password == "unpasswordquenadienuncaenlavidacolocaria" ? console.log('No cambio el password') : name.setPassword(req.body.password));
    name.nombre =         req.body.nombre;
    name.email =          req.body.email;
    name.area =           req.body.area;
    name.cargo =          req.body.cargo;
    name.sexo =           req.body.sexo;
    name.telefono =       req.body.telefono;
    name.direccion =      req.body.direccion;
    name.region =         req.body.region;
    name.documento =      req.body.documento;
    name.apellido =       req.body.apellido;
    name.contratacion =   req.body.contratacion;
    name.adminusers =     req.body.adminusers;
    name.adminpubli =     req.body.adminpubli;
    name.admindocs =      req.body.admindocs;
    name.adminforms =     req.body.adminforms;
    name.adminfotos =     req.body.adminfotos;
    name.admincrono =     req.body.admincrono;
    name.adminpqrsf =     req.body.adminpqrsf;
    name.save();
    res.json(name);
  });

});


router.get('/users/:_id', function(req, res, next){

    var user = req.params._id;
    User.findById( user, function (err, name) {
      res.json(name);
    });


});

router.post('/usersf/:_id',auth,upload.single('file'), function(req, res, next){
  console.log('con foto');
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  User.findOne({ username: req.body.username  }, function (err, name) {
    console.log('subiendo foto');
    var query = { author2: name.username };
    Comment.update(query, {fotoperfil: '/uploads2/'+req.file.filename}, {multi: true}, function(err) {
      console.log('update done')
    });

    (req.body.password == "unpasswordquenadienuncaenlavidacolocaria" ? console.log('No cambio el password') : name.setPassword(req.body.password));
    name.fotoperfil = '/uploads2/'+req.file.filename;
    console.log('/uploads2/'+req.file.filename);
    name.nombre =         req.body.nombre;
    name.email =          req.body.email;
    name.area =           req.body.area;
    name.cargo =          req.body.cargo;
    name.sexo =           req.body.sexo;
    name.telefono =       req.body.telefono;
    name.direccion =      req.body.direccion;
    name.region =         req.body.region;
    name.documento =      req.body.documento;
    name.apellido =       req.body.apellido;
    name.contratacion =   req.body.contratacion;
    name.adminusers =     req.body.adminusers;
    name.adminpubli =     req.body.adminpubli;
    name.admindocs =      req.body.admindocs;
    name.adminforms =     req.body.adminforms;
    name.adminfotos =     req.body.adminfotos;
    name.admincrono =     req.body.admincrono;
    name.adminpqrsf =     req.body.adminpqrsf;
    name.save();
    res.json(name);
  });


});

router.post('/usersf',auth,upload.single('file'), function(req, res, next){

  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User(req.body);
  user.fotoperfil = '/uploads2/'+req.file.filename;
  user.username = req.body.username;

  user.setPassword(req.body.password);
  user.save(function (err, user){
    if(err){ return next(err); }

    res.json(user);
  });
});



router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;

  user.setPassword(req.body.password);
  user.save(function (err){
    if(err){ return next(err); }

    return res.json({token: user.generateJWT()})
  });
});


// LOGIN

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});


// Home page


router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});



  module.exports = router;
