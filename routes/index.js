
var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var moment = require('moment');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var Foto = mongoose.model('Foto');
var Fotosfile = mongoose.model('Fotosfile');
var File = mongoose.model('File');
var User = mongoose.model('User');
var Folder = mongoose.model('Folder');

var jwt = require('express-jwt');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});
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

router.get('/fotos', function(req, res, next) {

  Foto.find(function(err, fotos){
    if(err){ return next(err); }
    res.json(fotos);
  });

});

router.post('/fotos',auth, function(req, res, next) {
  var foto = new Foto(req.body);
  foto.author = req.payload.username;
  foto.save(function(err, post){
    if(err){ return next(err); }
    res.json(foto);
  });
});








router.post('/documents',auth, function(req, res, next) {
  var document = new Folder(req.body);
  document.author = req.payload.username;
  document.save(function(err, post){
    if(err){ return next(err); }

    res.json(document);
  });
});

router.get('/posts/:post', function(req, res, next) {
  req.post.populate('comments', function(err, post) {
    if (err) { return next(err); }

    res.json(post);
  });
});



router.param('foto', function(req, res, next, id) {
  var query = Foto.findById(id);

  query.exec(function (err, foto){
    if (err) { return next(err); }
    if (!foto) { return next(new Error('can\'t find post')); }

    req.foto = foto;
    return next();
  });
});


router.param('document', function(req, res, next, id) {
  var query = Folder.findById(id);

  query.exec(function (err, document){
    if (err) { return next(err); }
    if (!document) { return next(new Error('can\'t find post')); }

    req.document = document;
    return next();
  });
});

router.get('/fotos/:foto', function(req, res, next) {
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
  req.foto.populate('files').populate('adjunto','nombre', function(err, foto) {
    if (err) { return next(err);   }


    res.json(foto);
  });
});

router.get('/documents/:document', function(req, res, next) {
  console.log(req.document);
  req.document.populate('files').populate('carpetas','nombre', function(err, document) {
    if (err) { return next(err);   }


    res.json(document);
  });
});

var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads2')
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname )
  }
});

var upload = multer({ storage: storage });


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




function getReadableFileSizeString(fileSizeInBytes) {

  var i = -1;
  var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
  do {
    fileSizeInBytes = fileSizeInBytes / 1024;
    i++;
  } while (fileSizeInBytes > 1024);

  return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
}
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

router.post('/posts',auth, upload.single('file'), function(req, res, next) {

  req.body.file = '/uploads2/'+req.file.filename;
  var post = new Post(req.body);
  post.author = req.payload.username;
  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});





router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});



router.put('/posts/:post/upvote',auth, function(req, res, next) {
  req.post.upvote(function(err, post){
    if (err) { return next(err); }

    res.json(post);
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

router.post('/posts/:post/comments',auth, function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;
  comment.author = req.payload.username;
  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(comment);
    });
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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
