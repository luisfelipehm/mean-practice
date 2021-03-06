var express = require('express');
var archiver = require('archiver');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var moment = require('moment');
var fs = require('fs');
var Post = mongoose.model('Post');
var Respuesta = mongoose.model('Respuesta');
var Comment = mongoose.model('Comment');
var Foto = mongoose.model('Foto');
var Area = mongoose.model('Area');
var Fotosfile = mongoose.model('Fotosfile');
var Postarea = mongoose.model('Postarea');
var Pqrsf = mongoose.model('Pqrsf');
var Pqrsffile = mongoose.model('Pqrsffile');
var Conectado = mongoose.model('Conectado');
var Pqrsfnum = mongoose.model('Pqrsfnum');
var Conversation = mongoose.model('Conversation');
var Pregunta = mongoose.model('Pregunta');
var Evento = mongoose.model('Evento');
var File = mongoose.model('File');
var User = mongoose.model('User');
var Acta = mongoose.model('Acta');
var Folder = mongoose.model('Folder');
var Formulario = mongoose.model('Formulario');
var Gfile = mongoose.model('Gfile');
var Gfolder = mongoose.model('Gfolder');
// var Num_Coment_User = mongoose.model('Coments');




var jwt = require('express-jwt');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

 var titleize =function(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
};


router.get('/mensajesNoChat/:mes', function(req, res, next) {

  var sabe = req.params.mes;
  var vardeconvs= [];;

  Conversation.find({ $or:[  {'usernameone':sabe}, {'receptor':sabe} ]}).distinct('usernameone' , function(err,mensa){
    if(err){ return next(err); }
    var alpha = mensa;
    Conversation.find({ $or:[  {'usernameone':sabe}, {'receptor':sabe} ]}).distinct('receptor' , function(err,mensa2){
      if(err){ return next(err); }


      var omega = alpha.concat(mensa2);
      var uniqueNames = [];


      for(var a = 0; a < omega.length; a++ ){
        if(uniqueNames.indexOf(omega[a]) == -1 && omega[a] != sabe && omega[a] != null) uniqueNames.push(omega[a]);
      }

      var beta = [];
      var cc = 0;

      for(i = 0; i< uniqueNames.length; i++){


      Conversation.find({ $or:[  {'usernameone':sabe, 'receptor': uniqueNames[i]},
        {'usernameone':uniqueNames[i],'receptor':sabe} ]}).sort({fecha: -1}).exec(function (err,conversacion) {

          var nombrereal = (conversacion[0].usernameone == sabe ? conversacion[0].receptor : conversacion[0].usernameone)
          beta.push({ nombre: nombrereal,
                      conversacion: conversacion[0]
                      // para: conversacion[0]['usernameone'],
                      // de: conversacion[0]['receptor']
          })
          cc++;

      })

      }
        setInterval(function () {
          if (cc == uniqueNames.length) {
            cc++;
            res.json(beta);
          }
        }, 200)
    });
  });
});


router.get('/posts', function(req, res, next) {
  Post.find().populate('comments').exec(function (err,posts) {
    if(err){ return next(err); }
    res.json(posts);
  })
});


router.get('/actas', function(req, res, next) {

  Acta.find(function(err, ac){
    if(err){ return next(err); }
    res.json(ac);
  });

});

router.get('/eventos', function(req, res, next) {

  Evento.find(function(err, even){
    if(err){ return next(err); }
    res.json(even);
  });

});
router.post('/eventos', function(req, res, next) {

  var evento = new Evento(req.body);
  //formulario.author = req.payload.username;
  evento.save(function(err, even){
    if(err){ return next(err); }
    res.json(even);
  });

});


router.get('/documents', function(req, res, next) {

  Folder.find(function(err, documents){
    if(err){ return next(err); }
    res.json(documents);
  });

});
router.get('/gdocuments', function(req, res, next) {

  Gfolder.find(function(err, documents){
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

      // User.find(function(err, users){
      //   if(err){ return next(err); }
      //   res.json(users.nombre);
      // });
  
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
  comment.fecha = Date.now();
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


router.post('/formularios/:formulario/habilitar',auth, function(req, res, next) {
    req.formulario.habilitado = req.body.habilitado;
    req.formulario.save(function(err, formulario) {
      if(err){ return next(err); }
      res.json(formulario);
    });

});

// OBTENER UN FORMULARIO
router.get('/formularios/:formulario/results', function(req, res, next) {

  req.formulario.populate('preguntas').populate('respuestas',function(err, formulario) {
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
  Pqrsf.find().populate('files').exec(function(err, pqrsf){
    if(err){ return next(err); }
    res.json(pqrsf);
  });
});


router.get('/pqrsfuser/:user', function(req, res, next) {


  Pqrsf.find({creadopor: req.params.user}).populate('files').exec(function(err, pqrsf){
    if(err){ return next(err); }
    res.json(pqrsf);
  });
});


router.get('/pqrsftramite/:user', function(req, res, next) {


  Pqrsf.find().populate('files').exec(function(err, pqrsf){
    if(err){ return next(err); }
    res.json(pqrsf);
  });
});






// INDEX DE ALBUMS

router.get('/fotos', function(req, res, next) {

  Foto.find().populate('files').exec(function(err, fotos){
    if(err){ return next(err); }
    res.json(fotos);
  });

});

// CREAR ALBUMS

router.post('/fotos',auth, function(req, res, next) {
  var foto = new Foto(req.body);
  foto.author = req.payload.username;
  foto.save(function(err, foto){
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

router.post('/gdocuments',auth, function(req, res, next) {
  var document = new Gfolder(req.body);
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
  query.populate('files').populate('adjunto').exec(function (err, foto){
    if (err) { return next(err); }
    if (!foto) { return next(new Error('can\'t find post')); }

    req.foto = foto;
    return next();
  });
});


// PARAMETRO DE DOCUMENTO PARA SHOW

router.param('document', function(req, res, next, id) {

  //Folder.find({_id: id}).populate('files').populate('carpetas','nombre', function (err,document) {
  //  if (err) { return next(err);   }
  //  console.log('sadsa');
  //  if (!document) { return next(new Error('can\'t find post')); }
  //  console.log('sadsa2');
  //  req.document = document;
  //  console.log('sadsa3');
  //  return next();
  //  console.log('sadsa4');
  //});

  var query = Folder.findById(id);

  query.populate('files').populate('carpetas').exec(function (err, document){
    if (err) { return next(err); }
    if (!document) { return next(new Error('can\'t find post')); }

    req.document = document;
    return next();
  });
});

router.param('gdocument', function(req, res, next, id) {



  var query = Gfolder.findById(id);

  query.populate('files').populate('carpetas').exec(function (err, document){
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


router.post('/pqrszipfile', function (req,res,next) {


  var ruta = 'C:/Users/Usuario/hub/mean-practice/public/zips/pqrsfarchivos-'+ Date.now() +'.zip';
  console.log('1')
  var output = fs.createWriteStream(ruta);
  console.log('2')
  var archive = archiver('zip');
  console.log('3')
  output.on('close', function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
    res.json(ruta.split('/').splice(-1)[0])
  });
  console.log('4')

  archive.on('error', function(err) {
    throw err;
  });
  console.log('5')
  archive.pipe(output);
  console.log('6')
  // var file1 ='C:/Users/Usuario/hub/mean-practice/public/sounds/notification.mp3';
  // var file2 = 'C:/Users/Usuario/hub/mean-practice/public/javascripts/angularApp.js';
  for (i in req.body.archivos){
    archive.append(fs.createReadStream('C:/Users/Usuario/hub/mean-practice/public/uploads2/'+req.body.archivos[i]), { name: req.body.archivos[i] })
  }
  console.log('7')
  archive.finalize();
  console.log('8')


});

router.param('area', function(req, res, next, id) {



  var query = Area.findById(id);

  query.populate('posts').exec(function (err, area){
    if (err) { return next(err); }
    if (!area) { return next(new Error('can\'t find post')); }

    req.area = area;
    return next();
  });
});


router.get('/areas/:area', function(req, res, next) {

  req.area.populate('posts', function(err, area) {
    if (err) { return next(err);   }


    res.json(area);
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

router.get('/gdocuments/:gdocument', function(req, res, next) {
  console.log(req.document) ;
  req.document.populate('files carpetas', function(err, document) {
    if (err) {
      return next(err);
    }


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


  var nombre = file.originalname.split('.');
    console.log(nombre[0] + '.' + nombre[1]);
    cb(null, nombre[0] + '-' +  Date.now() + '.' + nombre[1]   )
  }
});

var upload = multer({ storage: storage });








//ANADIR ARCHIVOS A LA PQRSF

router.post('/pqrsf', function(req, res, next){



    Pqrsfnum.findOne(function (err,num) {
      var numerable= null;
      switch (req.body.tipopq) {
        case "Peticion":
          numerable = "P" + (Number(num.peticion.substring(1))+1);
          num.peticion = numerable;
          break;
        case "Queja":
          numerable = "Q" + (Number(num.queja.substring(1))+1);
          num.queja = numerable;
          break;
        case "Reclamo":
          numerable = "R" + (Number(num.reclamo.substring(1))+1);
          num.reclamo = numerable;
          break;
        case "Solicitud":
          numerable = "S" + (Number(num.solicitud.substring(1))+1);
          num.solicitud = numerable;
          break;
        case "Felicitacion":
          numerable = "F" + (Number(num.felicitacion.substring(1))+1);
          num.felicitacion = numerable;
          break;

      }
      num.save(function (err,thetake) {
        var pqrsf = new Pqrsf(req.body);
        pqrsf.enumeracion = numerable;
        pqrsf.encargado = [req.body.encargado];
        pqrsf.fechainicio = Date.now();
        pqrsf.fase = 1;
        pqrsf.save(function (err, pq){
          Pqrsf.find({creadopor: req.body.creadopor}).populate('files').exec(function(err, pqrsf){
            if(err){ return next(err); }
            res.json(pqrsf);
          });
        });
      })

    })


});

router.param('postarea', function(req, res, next, id) {

  var query = Postarea.findById(id);

  query.exec(function (err, postarea){
    if (err) { return next(err); }
    if (!postarea) { return next(new Error('can\'t find postarea')); }

    req.postarea = postarea;
    return next();
  });
});

router.post('/areas/:postarea/comments',auth, function(req, res, next) {

  User.findOne({ username: req.payload.username  }, function (err, name) {

      req.postarea.comentarios.push({
            author: titleize(name.nombre) + ' ' + titleize(name.apellido),
            author2: req.payload.username,
            fotoperfil: (name.fotoperfil == undefined ? '/img/user_chat.png' : name.fotoperfil),
            body: req.body.body
          }
      );
      req.postarea.save(function(err, postarea) {
        if(err){ return next(err); }

        var query = Area.findById(req.body.idarea);

        query.populate('posts').exec(function (err, area){
          if (err) { return next(err); }
          res.json(area);
        });


      });

  });


});

router.post('/actas/otro', function(req, res, next) {

  Acta.findById({_id: req.body.id}, function (err,acta) {

    if(!acta){return;}
    acta.comentarios.push({
      texto: req.body.texto,
      aprobado: req.body.aprobado,
      nombre: req.body.nombre,
      username: req.body.username,
      fecha: Date.now()
    })
    acta.save(function (err,acta) {
      Acta.find({carpeta: req.body.carpeta},function (err,ac) {
        res.json(ac)
      })
    })

  });

  
});



router.post('/cambiocontra', function(req, res, next) {

  User.findById({_id: req.body.id}, function (err,usuario) {
    usuario.setPassword(req.body.pass1);
    usuario.save();
    res.json("se actualizo")

  });
  
  });

router.post('/actas',auth, upload.single('file'), function(req, res, next) {

  req.body.adjunto = '/uploads2/'+req.file.filename;
  var acta = new Acta(req.body);

  acta.save(function(err, ac){
      Acta.find({carpeta: req.body.carpeta},function (err,allactas) {
        res.json(allactas);
      })
  });
});

router.post('/areas/:area/posts',auth, upload.single('file'), function(req, res, next) {

  req.body.file = '/uploads2/'+req.file.filename;
  var post = new Postarea(req.body);

  post.author = req.payload.username;
  post.save(function(err, post){
    if(err){ return next(err); }

    req.area.posts.push(post);
    req.area.save(function(err, document) {
      if(err){ return next(err); }

      res.json(document);
    });

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

function removeA(arr) {
  var what, a = arguments, L = a.length, ax;
  while (L > 1 && arr.length) {
    what = a[--L];
    while ((ax= arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1);
    }
  }
  return arr;
}

router.post('/pqrsf/:pqrsf', function(req, res, next){



  req.pqrsf.fase += 1;

  req.pqrsf.comentarios.push(req.body.comentario);

  req.pqrsf.estado = req.body.estado;

  if(req.body.estado == 'Cerrado'){
     req.pqrsf.fechacierre = Date.now()
  }


  if(  req.body.tramitando != 'tramitando'){
    req.pqrsf.encargados.push(req.body.responsable)}
  else{
    removeA(req.pqrsf.encargados, req.body.responsable)
  }


  req.pqrsf.save(function (err, pq){
    if(err){ return next(err); }
    var pqs = {};
    Pqrsf.find().populate('files').exec(function (err,pqsx) {
      pqs.pqnuevo = pqsx.filter(function( obj ) {
        return obj.estado == 'En espera';
      });
      pqs.pqtramite = pqsx.filter(function( obj ) {
        return obj.estado == 'En tramite';
      });
      pqs.pqcerrado = pqsx.filter(function( obj ) {
        return obj.estado == 'Cerrado';
      });
      console.log(pqs)
      res.json(pqs)
    });
  });
});


router.post('/pqrsfs/:pqrsf/files',auth, upload.single('file'), function(req, res, next) {


  var file = new Pqrsffile();
  file.fase = req.pqrsf.fase;
  file.nombre = req.body.nombre;
  file.filename = req.body.nombre;
  file.adjunto = '/uploads2/'+req.file.filename;
  file.save(function(err, files){
    if(err){ return next(err); }

    req.pqrsf.files.push(file);
    req.pqrsf.save(function(err, document) {
      if(err){ return next(err); }

        Pqrsf.find({creadopor: req.body.usuario}).populate('files').exec(function(err, pqrsf){
          if(err){ return next(err); }
          res.json(pqrsf);
        });

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
    req.foto.save(function(err, foto) {
      if(err){ return next(err); }
      var query = Foto.findById({_id: foto._id});
      query.populate('files').exec(function (err, document){
        if (err) { return next(err); }
        res.json(document)
      });
    });

  });
});


router.delete('/preguntas/:_id', function (req,res,next) {
  Pregunta.findById( req.params._id, function ( err, ar ){
    if(ar){
      ar.remove(function (err, arf) {
        Formulario.find().populate('preguntas').exec(function(err, formularios){
          if(err){ return next(err); }
          res.json(formularios);
        });
      });
    }
  });
});

//CREAR CARPETAS DENTRO DE LAS CARPETAS


router.post('/documents/:document/documents',auth, function(req, res, next) {
  var comment = new Folder(req.body);
  console.log(req.body);
  comment.padre = req.document._id;
  comment.author = req.payload.username;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.document.carpetas.push(comment);
    req.document.save(function(err, document) {
      if(err){ return next(err); }

      res.json(document);
    });
  });
});

router.post('/gdocuments/:gdocument/gdocuments',auth, function(req, res, next) {
  var carpeta = new Gfolder(req.body);

  carpeta.padre = req.document._id;
  // comment.author = req.payload.username;

  carpeta.save(function(err, comment){
    if(err){ return next(err); }

    req.document.carpetas.push(comment);
    req.document.save(function(err, document) {
      if(err){ return next(err); }
      // var xx = document.carpetas;
      // var yy = document.files;
      // document.carpetas = []
      // document.files = []
      // for(x = 0; x<xx.length;x++){
      //   if(xx[x].corporacion == user.region){
      //     document.carpetas.append(xx[x])
      //   }
      //
      // }
      // for(y = 0; y<yy.length;y++){
      //   if(yy[y].corporacion == user.region){
      //     document.files.append(yy[y])
      //   }
      //
      // }
      res.json(document);
      // res.json(document);
    });
  });
});

router.get('/losgerentes', function (req,res,next) {
  User.find({gerente: true}, function (err,usuarios) {
    res.json(usuarios)
  })

})

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

router.post('/postssin',auth, function(req, res, next) {
  var post = new Post(req.body);
  post.author = req.payload.username;
  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});


router.post('/chat/adjuntos',auth, upload.single('file'), function(req, res, next) {
    console.log("mierdaaaaaa")
    res.json('/uploads2/'+req.file.filename);
});

//ARCHIVOS DE LAS CARPETAS EN LA PARTE DOCUMENTAL
router.post('/documents/:document/files',auth, upload.single('file'), function(req, res, next) {

  // console.log('error');
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
        var query = Folder.findById({_id:document._id});
        query.populate('files').populate('carpetas').exec(function (err, document){
          if (err) { return next(err); }
          res.json(document)
        });

      });

    });
});


router.post('/gdocuments/:gdocument/files',auth, upload.single('file'), function(req, res, next) {

  var file = new Gfile();

  file.nombre = req.body.nombre;
  file.corporacion = req.body.corporacion;
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
      var query = Gfolder.findById({_id:document._id});
      query.populate('files carpetas').exec(function (err, document){
        if (err) { return next(err); }
        res.json(document)
      });

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
    if(conectado){
    conectado.remove( function ( err, conectado ){
      res.json(conectado);
    });
    }
  });
});

// ELIMINAR USUARIOS


router.post('/areas/:area/editando',auth, function(req, res, next) {

  Area.findById( req.body._id, function ( err, ar ){
    ar.nombre = req.body.nombre;
    ar.save(function(err, arc){
      if(err){ return next(err); }
        res.json(arc);
    });
  });
});

router.delete('/formularios/:_id',auth, function(req, res,next){

  Formulario.findById( req.params._id, function ( err, ar ){
    if(ar){
      ar.remove(function (err, arf) {
        res.json(arf);
      });
    }
  });
});

router.delete('/users/:_id',auth, function(req, res,next){

  User.findById( req.params._id, function ( err, ar ){
    if(ar) {
      ar.remove(function (err, arf) {
        res.json(arf);
      });
    }
  });
});


router.post('compararcorreo', function (req,res,next) {
  User.find({email: req.body.email}, function (err, usuario) {
      if(!usuario){return}

  })
});

router.delete('/folder/:_id',auth, function(req, res,next){
  //padre

  Folder.findById( req.params._id, function ( err, ar ){
    var padres = ar.padre;
    if(ar){
    ar.remove( function ( err, arf ){
      if (err) { return next(err); }
      console.log(padres);
      var query = Folder.findById(padres);
      query.populate('files').populate('carpetas').exec(function (err, document){
        if (err) { return next(err); }

        res.json(document)
      });

    });
    }
  });
});

router.delete('/gfolder/:_id',auth, function(req, res,next){
  //padre

  Gfolder.findById( req.params._id, function ( err, ar ){
    var padres = ar.padre;
    if(ar){
      ar.remove( function ( err, arf ){
        if (err) { return next(err); }
        console.log(padres);
        var query = Gfolder.findById(padres);
        query.populate('files carpetas').exec(function (err, document){
          if (err) { return next(err); }

          res.json(document)
        });

      });
    }
  });
});

router.delete('/file/:_id/:document',auth, function(req, res,next){



  //folder
  File.findById( req.params._id, function ( err, ar ){
    var padres = req.params.document;
    if(ar){
    ar.remove( function ( err, arf ){
      if (err) { return next(err); }
      console.log(padres);
      var query = Folder.findById(padres);
      query.populate('files carpetas').exec(function (err, document){
        if (err) { return next(err); }

        res.json(document)
      });
    });
    }
  });
});

router.delete('/gfile/:_id/:gdocument',auth, function(req, res,next){



  //folder
  Gfile.findById( req.params._id, function ( err, ar ){
    var padres = req.params.gdocument;
    if(ar){
      ar.remove( function ( err, arf ){
        if (err) { return next(err); }
        console.log(padres);
        var query = Gfolder.findById(padres);
        query.populate('files carpetas').exec(function (err, document){
          if (err) { return next(err); }

          res.json(document)
        });
      });
    }
  });
});


router.delete('/fotos/:_id',auth, function(req, res,next){
console.log(req.params._id)
  Foto.findById( req.params._id, function ( err, ar ){
    if(ar){
    ar.remove( function ( err, arf ){
      if (err) { return next(err); }
      res.json(arf);
    });
    }
  });
});


router.delete('/areas/:_id',auth, function(req, res,next){

  Area.findById( req.params._id, function ( err, ar ){
    if(ar) {
      ar.remove(function (err, arf) {
        if (err) {
          return next(err);
        }
        res.json(arf);
      });
    }
  });
});

router.delete('/eventos/:_id',auth, function(req, res,next){

  Evento.findById( req.params._id, function ( err, ar ){
    if(ar){
    ar.remove( function ( err, arf ){
      if (err) { return next(err); }
      res.json(arf);
    });
    }
  });
});

router.delete('/posts/areas/:_id',auth, function(req, res,next){
  console.log("Deleting");
  Postarea.findById( req.params._id, function ( err, post ){
    if(post){
    post.remove( function ( err, post ){
      if (err) { return next(err); }
      res.json(post);
    });
    }
  });
});

router.delete('/posts/:_id',auth, function(req, res,next){
  console.log("Deleting");
  Post.findById( req.params._id, function ( err, post ){
    if(post){
    post.remove( function ( err, post ){
      if (err) { return next(err); }
      res.json(post);
    });
    }
  });
});

router.delete('/comments/:_id',auth, function(req, res,next){
  console.log("Deleting");
  Comment.findById( req.params._id, function ( err, comment ){
    if(comment){
    comment.remove( function ( err, comment ){
      if (err) { return next(err); }
      res.json(comment);
    });
    }
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
    comment.fotoperfil = (name.fotoperfil == undefined ? '/img/user_chat.png' : name.fotoperfil);
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

router.get('/asignables', function(req, res, next) {

  User.find({ tramitepqrsf: true  }, function (err, name) {
    res.json(name);
  });

});

router.post('/users', function(req, res, next){
console.log(req.body);


  var user = new User(req.body);

  user.username = req.body.username;

  user.setPassword(req.body.password);
  user.save(function (err, user){
  if(err){ return next(err); }


  });
});

router.post('/users/:_id', function(req, res, next){

  User.findById(req.body.elid  , function (err, name) {

    (req.body.password == "unpasswordquenadienuncaenlavidacolocaria" ? console.log('No cambio el password') : name.setPassword(req.body.password));
    name.username = req.body.username;
    console.log(name.username);
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
    name.cumpleanos =     req.body.cumpleanos;
    name.tramitepqrsf =   req.body.tramitepqrsf;
    name.admingerente =   req.body.admingerente;
    name.carpetasAdicionales =   req.body.carpetasAdicionales;
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

router.post('/gerentes', function (req,res,next) {

    gerente = new User(req.body);
    gerente.setPassword(req.body.password);
    gerente.gerente = true;
    gerente.save(function (err){
      if(err){ return next(err); }

      return res.json("Se registro")
    });

  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  
  
  var user = new User();
  user.username = req.body.pass1;
  user.setPassword(req.body.password);
  user.save(function (err){
    if(err){ return next(err); }
    return res.json({token: user.generateJWT()})
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
router.get('/gerentesPage', function(req, res, next) {

});

router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});



  module.exports = router;
