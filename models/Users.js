var crypto = require('crypto');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var UserSchema = new mongoose.Schema({
    username: {type: String, lowercase: true, unique: true},
    hash: String,
    nombre: String,
    email: String,
    admin: Array,
    cargo: String,
    area: String,
    sexo: String,
    telefono: String,
    direccion: String,
    fotoperfil: String,
    region: String,
    documento: String,
    apellido: String,
    contratacion: String,
    salt: String,
    sock: String,
    actual: Boolean,
    adminusers: Boolean,
    adminpubli: Boolean,
    admindocs: Boolean,
    adminforms: Boolean,
    adminfotos: Boolean,
    admincrono: Boolean,
    adminpqrsf: Boolean,
    tramitepqrsf: Boolean,
    ultimaconexion: Date,
    cumpleanos: Date,
    adminactas:Boolean,
    usaactas: Boolean,
    gerente: Boolean,
    admingerente: Boolean,
    carpetasAdicionales: String,
    conversaciones: Number,
});


UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');

    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

    return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {

    // set expiration to 60 days
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        _id: this._id,
        username: this.username,
        apellido: this.apellido,
        nombre: this.nombre,
        fotoperfil: this.fotoperfil,
        adminusers: this.adminusers,
        adminpubli: this.adminpubli,
        admindocs: this.admindocs,
        adminforms: this.adminforms,
        adminfotos: this.adminfotos,
        admincrono: this.admincrono,
        adminpqrsf: this.adminpqrsf,
        tramitepqrsf: this.tramitepqrsf,
        adminactas: this.adminactas,
        usaactas: this.usaactas,
        gerente: this.gerente,
        admingerente: this.admingerente,
        region: this.region,
        carpetasAdicionales: (this.carpetasAdicionales ?  this.carpetasAdicionales.split("~") : false),
        exp: parseInt(exp.getTime() / 1000),
    }, 'SECRET');
};
mongoose.model('User', UserSchema);