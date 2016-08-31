
var app = angular.module('flapperNews', ['base64','ui.router','ngMaterial','ngFileUpload','ui.calendar','jkuri.gallery','slick','nvd3','btford.socket-io','angularMoment','underscore','ngMessages','ui.timepicker' ]);

app.filter('moment', function() {
    return function(dateString, format) {
            return moment(dateString).locale("es").format(format);
    };
});


app.animation('.boxpublipqrs', function ($animateCss) {
    return {
        enter: function (element) {
            return $animateCss(element,{
                from:{
                    opacity: 0
                },
                to: {
                    opacity: 1
                },
                duration: 0.5
            })
        }
    }
})

app.filter('cortarlargostring', function () {
    return function (tr,bol) {
        if(tr.length > 55){
            return tr.slice(0,55) + "..."
        }else {
            return tr
        }
    }
});


app.config(['$httpProvider', function($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }

    // Answer edited to include suggestions from comments
    // because previous version of code introduced browser-related errors

    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
}]);

app.directive('barranav', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/_barra.html'
    };
});

//app.directive('resolveLoadernum', function($rootScope, $timeout) {
//
//    return {
//        restrict: 'E',
//        replace: true,
//        templateUrl: 'templates/spinner.html',
//        link: function(scope, element) {
//
//            $rootScope.$on('$routeChangeStart', function(event, currentRoute, previousRoute) {
//                if (previousRoute) return;
//                console.log('aqui1')
//                $timeout(function() {
//                    console.log('aqui2')
//                    element.removeClass('ng-hide');
//                });
//            });
//
//            $rootScope.$on('$routeChangeSuccess', function() {
//                console.log('success');
//                element.addClass('ng-hide');
//            });
//        }
//    };
//});

app.factory('mySocket', function (socketFactory) {
    return socketFactory();
});

app.directive('fullbars', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/_fullbars.html'
    };
});

app.directive('barrader', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/_barraderecha.html'
    };
});

app.directive('chat', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/_chat.html'
    };
});

app.directive('barraizq', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/_barraizquierda.html'
    };
});

app.factory('posts', ['$http','auth',function($http,auth){
    var o = {
        posts:[]
    };

    o.getAll = function() {
        return $http.get('/posts').success(function(data){
            angular.copy(data, o.posts);
        });
    };
    o.create = function(post) {
        return $http.post('/postssin', post, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        }).success(function(data){
            o.posts.push(data);
        });
    };

    o.upvote = function(post) {
        return $http.put('/posts/' + post._id + '/upvote', null, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        }).success(function(data){
            post.upvotes += 1;
        });
    };

    o.addComment = function(id, comment) {
        return $http.post('/posts/' + id + '/comments', comment, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        });
    };
    o.get = function(id) {
        return $http.get('/posts/' + id).then(function(res){
            return res.data;
        });
    };

    return o;
}]);

app.factory('documents', ['$http','auth',function($http,auth){
    var o = {
        documents:[]
    };

    o.getAll = function() {
        return $http.get('/documents').success(function(data){
            angular.copy(data, o.documents);
        });
    };
    o.create = function(document) {

        return $http.post('/documents', document, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        }).success(function(data){
            o.documents.push(data);
        });
    };

    o.addSubFolder = function(id , document) {
        return $http.post('/documents/' + id + '/documents', document, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        });
    };
    o.get = function(id) {
        return $http.get('/documents/' + id).then(function(res){
			console.log(res.data)
            return res.data;
        });
    };

    return o;
}]);

app.factory('gdocuments', ['$http','auth',function($http,auth){
    var o = {
        documents:[]
    };

    o.getAll = function() {
        return $http.get('/gdocuments').success(function(data){
            angular.copy(data, o.documents);
        });
    };
    o.create = function(document) {

        return $http.post('/gdocuments', document, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        }).success(function(data){
            o.documents.push(data);
        });
    };

    o.addSubFolder = function(id , document) {
        return $http.post('/gdocuments/' + id + '/gdocuments', document, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        });
    };
    o.get = function(id) {
        return $http.get('/gdocuments/' + id, {
            headers: {Authorization: 'Bearer '+auth.getToken()}} ).then(function(res){
            console.log(res.data)
            return res.data;
        });
    };

    return o;
}]);

app.factory('fotos', ['$http','auth',function($http,auth){
    var o = {
        fotos:[]
    };

    o.getAll = function() {
        return $http.get('/fotos').success(function(data){
            angular.copy(data, o.fotos);
        });
    };
    o.create = function(fotos) {

        return $http.post('/fotos', fotos, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        }).success(function(data){
            o.fotos.push(data);
        });
    };

    o.get = function(id) {
        return $http.get('/fotos/' + id).then(function(res){
            return res.data;
        });
    };

    return o;
}]);

app.factory('pqrsf', ['$http','auth',function($http,auth){
    var o = {
        pqrsf:[],
        pq:[],
        pqnuevo:[],
        pqtramitepqtramitepqtramite:[],
        pqcerradopqcerradopqtramite:[],
        pqtramite:[]


    };

    o.getByUser =  function (par) {
        return $http.get('/pqrsfuser/' +par ).success(function(data){
            angular.copy(data, o.pqrsf);
        });
    };


    o.getTramite = function(par) {
        return $http.get('/pqrsftramite/' +par ).success(function(data){

            o.pqtramite = data.filter(function( obj ) {
                return obj.encargados.indexOf(par) > -1;
            });

            // angular.copy(data, o.pqrsf);
        });
    };

    o.getAdmin = function() {
        return $http.get('/pqrsf').success(function(data){
            o.pqnuevo = data.filter(function( obj ) {
                return obj.estado == 'En espera';
            });
            o.pqtramite = data.filter(function( obj ) {
                return obj.estado == 'En tramite';
            });
            o.pqcerrado = data.filter(function( obj ) {
                return obj.estado == 'Cerrado';
            });
            // angular.copy(data, o.pqrsf);
        });
    };

    o.getAll = function() {
        return $http.get('/pqrsf').success(function(data){
            angular.copy(data, o.pqrsf);
        });
    };
    o.create = function(pqrsf) {

        return $http.post('/pqrsf', pqrsf, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        }).success(function(data){
            o.pqrsf.push(data);

            angular.copy(data, o.pq)
        });
    };

    o.get = function(id) {
        return $http.get('/pqrsf/' + id).then(function(res){
            return res.data;
        });
    };

    return o;
}]);

app.factory('areas', ['$http','auth',function($http,auth){
    var o = {
        areas:[]
    };
    o.getAll = function() {
        return $http.get('/areas').success(function(data){
            angular.copy(data, o.areas);
        });
    };
    o.addComment = function(id, comment) {
        return $http.post('/areas/' + id + '/comments', comment, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        });
    };
    o.create = function(area) {

        return $http.post('/areas', area, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        }).success(function(data){
            o.areas.push(data);
        });
    };
    o.get = function(id) {
        return $http.get('/areas/' + id).then(function(res){
            return res.data;

        });
    };
    return o;
}]);

app.factory('eventos', ['$http','auth',function($http,auth){
    var o = {
        eventos:[]
    };
    o.getAll = function() {
        return $http.get('/eventos').success(function(data){
            angular.copy(data, o.eventos);
        });
    };
    o.create = function(even) {

        return $http.post('/eventos', even, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        }).success(function(data){
            o.eventos.push(data);
        });
    };
    return o;
}]);

app.factory('users', ['$http','auth',function($http,auth){
    var o = {
        users:[]
    };

    o.getAll = function() {
        return $http.get('/users').success(function(data){

            angular.forEach(data, function (us) {

                if(us.carpetasAdicionales){
                    us.carpetasAdicionales = us.carpetasAdicionales.split("~")
                }
            })
            angular.copy(data, o.users);
        });
    };
    o.asignables = function() {
        return $http.get('/asignables').then(function(data){
            return data;
        });
    };
    o.create = function(user) {

        return $http.post('/users', user, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        }).success(function(data){
            o.users.push(data);
        });
    };
    o.edit = function(user,id) {

        return $http.post('/users/'+ id, user, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        }).success(function(data){
            o.users.push(data);
        });
    };
    o.get = function(id) {
        return $http.get('/users/' + id).then(function(data){
            return data;

        });
    };

    return o;
}]);

app.factory('formularios', ['$http','auth',function($http,auth){
    var o = {
        formularios:[]
    };

    o.getAll = function() {
        return $http.get('/formularios').success(function(data){
            angular.copy(data, o.formularios);
        });
    };
    o.create = function(formularios) {

        return $http.post('/formularios', formularios, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        }).success(function(data){
            o.formularios.push(data);
        });
    };

    o.get = function(id) {
        return $http.get('/formularios/' + id).then(function(res){
            return res.data;
        });
    };
    o.getResults = function (id) {
        return $http.get('/formularios/' + id + '/results').then(function(res){
            return res.data;
        });
    };
    o.addPregunta = function(id, pregunta) {


        return $http.post('/formularios/' + id + '/preguntas', pregunta, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        });
    };
    o.respon = function(id, comment) {
        return $http.post('/formularios/' + id + '/responder', comment, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        });
    };

    return o;
}]);

app.factory('actas', ['$http','auth',function($http,auth){
    var o = {
        actas:[]
    };
    o.getAll = function() {
        return $http.get('/actas').success(function(data){

            angular.copy(data, o.actas);
        });
    };
    o.addComment = function(id, comment) {
        return $http.post('/actas/' + id + '/comments', comment, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        });
    };
    o.create = function(acta) {


        return $http.post('/actas', acta, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        }).success(function(data){
            o.areas.push(data);
        });
    };
    //o.get = function(id) {
    //    return $http.get('/areas/' + id).then(function(res){
    //        return res.data;
    //    });
    //};
    return o;
}]);

app.factory('auth', ['$http', '$window','$state','mySocket','$base64', function($http, $window,$state,mySocket,$base64){


    (function () {

        var object = typeof exports != 'undefined' ? exports : this; // #8: web workers
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        function InvalidCharacterError(message) {
            this.message = message;
        }
        InvalidCharacterError.prototype = new Error;
        InvalidCharacterError.prototype.name = 'InvalidCharacterError';

        // encoder
        // [https://gist.github.com/999166] by [https://github.com/nignag]
        object.btoa || (
            object.btoa = function (input) {
                var str = String(input);
                for (
                    // initialize result and counter
                    var block, charCode, idx = 0, map = chars, output = '';
                    // if the next str index does not exist:
                    //   change the mapping table to "="
                    //   check if d has no fractional digits
                    str.charAt(idx | 0) || (map = '=', idx % 1);
                    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
                    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
                ) {
                    charCode = str.charCodeAt(idx += 3/4);
                    if (charCode > 0xFF) {
                        throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
                    }
                    block = block << 8 | charCode;
                }
                return output;
            });

        // decoder
        // [https://gist.github.com/1020396] by [https://github.com/atk]
        object.atob || (
            object.atob = function (input) {
                var str = String(input).replace(/=+$/, '');
                if (str.length % 4 == 1) {
                    throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
                }
                for (
                    // initialize result and counters
                    var bc = 0, bs, buffer, idx = 0, output = '';
                    // get next character
                    buffer = str.charAt(idx++);
                    // character found in table? initialize bit storage and add its ascii value;
                    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
                        // and if not first of each 4 characters,
                        // convert the first 8 bits to one ascii character
                    bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
                ) {
                    // try to find character in table (0-63, not found => -1)
                    buffer = chars.indexOf(buffer);
                }
                return output;
            });

    }());

    var auth = {};
    auth.saveToken = function (token){
        $window.localStorage['flapper-news-token'] = token;
    };

    auth.getToken = function (){
        return $window.localStorage['flapper-news-token'];
    };
    auth.isLoggedIn = function(){
        var token = auth.getToken();

        if(token){
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };
    auth.currentUser = function(){
        if(auth.isLoggedIn()){
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload;
        }else
        {
            return "no conectado"
        }
    };
    auth.register = function(user){
        return $http.post('/register', user).success(function(data){
            auth.saveToken(data.token);
        });
    };
    auth.logIn = function(user){
        return $http.post('/login', user).success(function(data){
            auth.saveToken(data.token);
        });
    };
    auth.logOut = function(){
            $window.localStorage.removeItem('flapper-news-token');
            $state.go('login');
    };

    return auth;
}]);

app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('grey')
        .accentPalette('pink');
});

app.config([
    '$stateProvider',
    '$urlRouterProvider',

    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state( 'root', {
                url: '/root',
                views: {
                    "main": {
                        controller: 'RootCtrl',
                        templateUrl: 'templates/root.html'
                    }
                },
                onEnter: ['$state', 'auth','$window', function($state, auth,$window){
                    if(auth.isLoggedIn() == false){
                        $state.go('login');

                    }
                    var currentUser = auth.currentUser();
                    if(currentUser.gerente  ){
                        $state.go('gerentes',{id: "578991c6a809558427456951"});
                    }
                }],
                resolve: {
                    postPromise: ['fotos', function(fotos){
                        return fotos.getAll();
                    }]}

            })
            .state('gerentes', {
                url: '/gerentes/{id}',
                views: {
                    "main": {
                        controller: 'GerentesCtrl',
                        templateUrl: 'templates/gerentes.html'
                    }
                },
                resolve: {
                    gdocument: ['$stateParams', 'gdocuments', function($stateParams, gdocuments) {
                        return gdocuments.get($stateParams.id);
                }]},
                onEnter: ['$state', 'auth', function($state, auth){
                    if(auth.isLoggedIn() == false){
                        $state.go('login');
                    }
                    var currentUser = auth.currentUser();
                    // console.log(currentUser.gerente)
                    // console.log(currentUser.admingerente)
                    // console.log(!currentUser.gerente && !currentUser.admingerente)
                    if(!currentUser.gerente && !currentUser.admingerente){
                        $state.go('home');
                    }

                }]
            })
            .state('xgxgxg', {
                url: '/xgxgxg',
                views: {
                    "main": {
                        controller: 'xgxgxgCtrl',
                        templateUrl: 'templates/xgxgxg.html'
                    }
                },

                resolve: {
            postPromise: ['gdocuments', function(documents){
                return documents.getAll();
            }]
        }
            })
            .state('home', {
                parent: 'root',
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'MainCtrl',
                resolve: {
                    //postPromise2:['users', function(users){
                    //    var ux = auth.currentUser();
                    //    return users.get(ux._id);
                    //}],
                    postPromise: ['posts', function(posts){
                        return posts.getAll();
                    }]

                }
            })
            .state('documentos', {
                parent: 'root',
                url: '/documentos',
                templateUrl: 'templates/documents.html',
                controller: 'DocumentsCtrl',
                resolve: {
                    postPromise: ['documents', function(documents){
                        return documents.getAll();
                    }]
                }
                //onEnter: ['$state', 'auth', function($state, auth){
                //    if(auth.isLoggedIn()){
                //        $state.go('home');
                //    }
                //}]
            })
            .state('login', {
                url: '/login',
                views: {
                    "main": {
                        controller: 'AuthCtrl as usuario',
                        templateUrl: 'templates/login.html'
                    }
                },
                onEnter: ['$state', 'auth', function($state, auth){
                    if(auth.isLoggedIn()){
                        $state.go('home');
                    }
                }]
            })
            .state('register', {
                parent: 'root',
                url: '/register',
                templateUrl: 'templates/register.html',
                controller: 'AuthCtrl as usuario',
                onEnter: ['$state', 'auth', function($state, auth){
                    if(auth.isLoggedIn()){
                        $state.go('home');
                    }
                }]
            })
            .state('users', {
                parent: 'root',
                url: '/users/',
                templateUrl: 'templates/users.html',
                controller: 'UsersCtrl',
                resolve: {
                    postPromise: ['users', function(users){
                        return users.getAll();
                    }]
                }
            })
            .state('fotox', {
                parent: 'root',
                url: '/fotos',
                templateUrl: 'templates/fotos.html',
                controller: 'FotosCtrl',
                resolve: {
                    postPromise: ['fotos', function(fotos){
                        return fotos.getAll();
                    }]
                }
            })
            .state('fotos', {
                parent: 'root',
                url: '/fotos/{id}',
                templateUrl: 'templates/album.html',
                controller: 'FotoCtrl',
                resolve: {
                    foto: ['$stateParams', 'fotos', function($stateParams, fotos) {
                        return fotos.get($stateParams.id);
                    }]}

            })
            .state('documents', {
                parent: 'root',
                url: '/documents/{id}',
                templateUrl: 'templates/document.html',
                controller: 'DocumentCtrl',
                resolve: {
                    document: ['$stateParams', 'documents', function($stateParams, documents) {						
                        return documents.get($stateParams.id);
                    }]}

            })
            .state('calendar', {
                parent: 'root',
                url: '/calendar',
                templateUrl: 'templates/calendar.html',
                controller: 'CalendarCtrl',
                resolve: {
                    postPromise: ['eventos', function (eventos) {
                        return eventos.getAll();
                    }]
                }

            })
            .state('formularios',{
                parent: 'root',
                url: '/formularios',
                templateUrl: 'templates/formularios.html',
                controller: 'FormulariosCtrl',
                resolve: {
                    postPromise: ['formularios', function(formularios){
                        return formularios.getAll();
                    }]
                }
            })
            .state('formulario', {
                parent: 'root',
                url: '/formularios/{id}',
                templateUrl: 'templates/formulario.html',
                controller: 'FormularioCtrl',
                resolve: {
                    formulario: ['$stateParams', 'formularios', function($stateParams, formularios) {
                        return formularios.get($stateParams.id);
                    }]}

            })
            .state('areas', {
                parent: 'root',
                url: '/areas',
                templateUrl: 'templates/areas.html',
                controller: 'AreasCtrl',
                resolve: {
                    postPromise: ['areas', function(areas){
                        return areas.getAll();
                    }]
                }
            })
            .state('area', {
                parent: 'root',
                url: '/areas/{id}',
                templateUrl: 'templates/area.html',
                controller: 'AreaCtrl',
                resolve: {
                    area: ['$stateParams', 'areas', function($stateParams, areas) {
                        return areas.get($stateParams.id);
                    }]}

            })
            .state('actas', {
                parent: 'root',
                url: '/actas',
                templateUrl: 'templates/actas.html',
                controller: 'ActasCtrl',
                
                onEnter: ['$state', 'auth', function($state, auth){
                    var currentUser = auth.currentUser();
                    if(currentUser.usaactas == undefined  && currentUser.adminactas == undefined ){
                        $state.go('home');
                    }
                }],

                resolve: {
                   postPromise: ['actas', function(actas){
                       return actas.getAll();
                   }]
                }
            })
            .state('pqrsfdispatcher', {
                parent: 'root',
                url: '/pqrsfdispatcher',
                templateUrl: 'templates/pqrsfdispatcher.html',
                controller: 'PqrsfdispatcherCtrl',
                onEnter: ['$state', 'auth', function($state, auth){
                    var currentUser = auth.currentUser();

                    if(currentUser.tramitepqrsf){
                        $state.go('tramitepq');
                    }else if(currentUser.adminpqrsf){
                        $state.go('adminpq');
                    }else{
                        $state.go('pqrsfuser');
                    }

                }]

            })
            .state('pqrsfuser', {
                parent: 'root',
                url: '/pqrsfuser',
                templateUrl: 'templates/pqrsfuser.html',
                controller: 'PqrsfuserCtrl',
                resolve: {
                    //postPromise2:['users', function(users){
                    //    var ux = auth.currentUser();
                    //    return users.get(ux._id);
                    //}],
                    postPromise: ['pqrsf','auth', function(pqrsf,auth){
                        var currentUser = auth.currentUser();
                        return pqrsf.getByUser(currentUser.username);
                    }]

                }
            })
            .state('tramitepq', {
                parent: 'root',
                url: '/tramitepq',
                templateUrl: 'templates/tramitepq.html',
                controller: 'TramitepqCtrl',
                resolve: {
                    //postPromise2:['users', function(users){
                    //    var ux = auth.currentUser();
                    //    return users.get(ux._id);
                    //}],
                    postPromise: ['pqrsf','auth', function(pqrsf,auth){
                        var currentUser = auth.currentUser();
                        return pqrsf.getTramite(currentUser.username);
                    }]


                }
            })
            .state('adminpq', {
                parent: 'root',
                url: '/adminpq',
                templateUrl: 'templates/adminpq.html',
                controller: 'AdminpqCtrl',
                resolve: {

                    postPromise: ['pqrsf', function(pqrsf){
                        return pqrsf.getAdmin();
                    }]

                }
            })
            .state('pqrsf', {
                parent: 'root',
                url: '/pqrsf',
                templateUrl: 'templates/pqrsf.html',
                controller: 'PqrsfCtrl',
                resolve: {
                    //postPromise2:['users', function(users){
                    //    var ux = auth.currentUser();
                    //    return users.get(ux._id);
                    //}],
                    postPromise: ['pqrsf', function(pqrsf){
                        return pqrsf.getAll();
                    }]

                }
            })
            .state('formularioresults', {
                parent: 'root',
                url: '/formularios/{id}/results',
                templateUrl: 'templates/formularioresults.html',
                controller: 'FormularioresultsCtrl',
                resolve: {
                    formularior: ['$stateParams', 'formularios', function($stateParams, formularios) {





                        return formularios.getResults($stateParams.id);
                    }]}

            })
            .state('mensajes', {
                parent: 'root',
                url: '/mensajes',
                templateUrl: 'templates/mensajes.html',
                controller: 'MensajesCtrl',

                resolve: {
                    // postPromise: ['actas', function(actas){
                    //     return actas.getAll();
                    // }]
                }
            })


        $urlRouterProvider.otherwise('/root/home');
    }]);





/*////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
app.controller('MensajesCtrl', ['$scope','Upload','$timeout','mySocket','auth','$http','moment','users','$compile', function ($scope,Upload,$timeout,mySocket,auth,$http,moment,users,$compile) {

    $scope.currentUser = auth.currentUser();

    $http.get('/mensajesNoChat/'+ $scope.currentUser.username ).then(function (response) {

        $scope.artists = response.data.userConectados;       /*artists: son usuarios de conversaciones historicas*/
        $scope.conversacion =response.data.conversaciones;  /* conversacion: son todas las conversaciones*/
        
        // if($scope.nombre_archivo==''){
        //     var ADJ = document.getElementById('ADJ');
        //     ADJ.css('visibility', value ? 'visible' : 'hidden');
        // }else{
        //     var ADJ = document.getElementById('ADJ');
        //     ADJ.css('visibility', value ? 'visible' : 'block');
        // }

        document.getElementById("ADJ").style.visibility = "hidden";


        var xx={};
        var yo= $scope.currentUser.username;
        var primera_conversacion='';



        /*aquí es la logica del panel izquierdo, todas las conversaciones tenidas y lo ultimo que escribió el destinatario*/
        angular.forEach($scope.conversacion , function (conv) {

              for (var i=0; i<$scope.artists.length; i++){
                  if($scope.artists[i]==conv.usernameone){
                        if(i==0){
                            primera_conversacion=conv.usernameone; /*aqui delegamos cual es la primera conversacion para imprimirla al panel derecho inmediatamente*/
                        }

                        xx[i] = {
                                  De: conv.usernameone,
                                  UltimoMsj: conv.mensaje,
                                  DateMsj: conv.fecha
                        }
                  }
            }
        });
        /*fin*/
        $scope.mensajes ={};
        $scope.mensajes= xx;



        /*aquí es la logica del panel derecho, son los mensajes (historial) de un usuario del panel izquierdo*/
        $scope.myConversacion = function(ok) {
          //  document.getElementById(ok).style = "border: 1px solid red";
            $scope.conversacion =response.data.conversaciones;
            $scope.con_quien_converso= ok;
            var yy={};
            var contador=0;


            angular.forEach($scope.conversacion , function (conv) {

                        if(ok==conv.usernameone && yo==conv.receptor){
                            contador++;
                            yy[contador] = {
                                De: conv.usernameone,
                                UltimoMsj: conv.mensaje,
                                DateMsj: conv.fecha
                            }
                        }

                        if(ok==conv.receptor && yo==conv.usernameone){
                            contador++;
                            yy[contador] = {
                                De: conv.usernameone,
                                UltimoMsj: conv.mensaje,
                                DateMsj: conv.fecha
                            }
                        }
            });
            $scope.historial_conv ={};
            $scope.historial_conv= yy;
            return $scope.historial_conv;
            /*fin*/


        }

        /*aqui tomamos la primera conversacion para imprimirla*/
        $scope.myConversacion(primera_conversacion);


/*┼┼    ┼┼┼┼Esto┼┼es┼┼el┼┼Adjunto┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼*/
        $scope.seleccionarchivochat = function (ff,name) {

            // var progresito = name + "picFile.progress";
            // var progresito2 = name + "picFile";

            //console.log(ff[0].type);



            switch (ff[0].type){

                    case 'image/jpeg':
                    case 'image/png':
                    case 'image/gif':
                    case 'image/tiff':
                    case 'application/pdf':
                    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                    case 'application/vnd.ms-excel':
                    case 'application/vnd.ms-word':
                    case 'application/vnd.ms-powerpoint':
                    case 'text/plain':
                    case 'application/msword':
                    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.template':
                    case 'application/vnd.ms-word.template.macroEnabled.12':
                    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.template':
                    case 'application/vnd.ms-excel.sheet.macroEnabled.12':
                    case 'application/vnd.ms-excel.template.macroEnabled.12':
                    case 'application/vnd.ms-excel.sheet.binary.macroEnabled.12':
                    case 'application/vnd.openxmlformats-officedocument.presentationml.template':
                    case 'application/vnd.openxmlformats-officedocument.presentationml.slideshow':
                    case 'application/vnd.ms-powerpoint.addin.macroEnabled.12':
                    case 'application/vnd.ms-powerpoint.presentation.macroEnabled.12':
                    case 'application/vnd.ms-powerpoint.template.macroEnabled.12':


                    document.getElementById("ADJ").style.visibility = "visible";
                    $scope.nombre_archivo= ff[0].name.substring(0,19);
                    return $scope.nombre_archivo;


                    break;
                default:
                    alert("No se puede adjuntar el archivo ya que no corresponde a una extención 'doc','docx','ppsx','ppt','pptm','pptx','xls','xlsx','xlsm','xlsb','pdf','png','tiff','gif','jpg','jpeg','doc','cvs' o 'txt'. ");
                    console.log(ff[0].type);
                    break;

            }



            // if(ff){
            //
            //     var genereitor1 =  ' <li class="self" id="previasubidaarchivos'+ name+'">'+
            //         '<div class="chatboxmessagecontent chatboxmessagecontents">'+
            //         ' <img src="/img/icono-atras.png" class="subirarchvos" ng-click="enviarmensajeadjunto('+progresito2+',\''+ name +'\')">';
            //
            //
            //     if(ff.name.split('.')[1]=='doc' || ff.name.split('.')[1]=='docx')
            //     {
            //         var genereitor2 =         '  <img  src="img/WRD.png" class="imagenadjuntochat">';
            //     }else if(ff.name.split('.')[1]=='ppsx' || ff.name.split('.')[1]=='ppt' || ff.name.split('.')[1]=='pptm' || ff.name.split('.')[1]=='pptx')
            //     {
            //         var genereitor2 =         '  <img  src="img/PW.png" class="imagenadjuntochat">'
            //     }else if(ff.name.split('.')[1]=='xls' || ff.name.split('.')[1]=='xlsx' || ff.name.split('.')[1]=='xlsm' || ff.name.split('.')[1]=='xlsb')
            //     {
            //         var genereitor2 =         '  <img  src="img/XEL.png" class="imagenadjuntochat">'
            //     }
            //     else if(ff.name.split('.')[1]=='pdf')
            //     {
            //         var genereitor2 =         '  <img  src="img/PDF.png" class="imagenadjuntochat">'
            //     }
            //     else if(ff.name.split('.')[1].toLowerCase() =='png' || ff.name.split('.')[1].toLowerCase()=='tiff' || ff.name.split('.')[1].toLowerCase()=='gif' || ff.name.split('.')[1].toLowerCase()=='jpg' || ff.name.split('.')[1].toLowerCase()=='jpeg')
            //     {
            //         var genereitor2 =         '  <img  ngf-src="!'+ name+'picFile.$error && '+ name+'picFile" class="imagenadjuntochat">';
            //     }
            //     else
            //     {
            //         var genereitor2 = '  <img  src="img/DOC.png" class="imagenadjuntochat">';
            //     }
            //
            //
            //     var genereitor3 = '  <div class="progresosubidachat">'+
            //         ' <div style="width:{{'+progresito+'}}%" ng-bind="'+progresito+'+\'%\'" class="ng-binding progresointernochat"></div>'+
            //         '  </div>'+
            //         ' <img src="img/icono-eliminar-g.png" class="cancelarsubidachat" ng-click="cancelarsubidachats(\''+ name+'\')">'+
            //         ' </div>'+
            //         ' </li>';
            //
            //
            //     var genereitor  = genereitor1 + genereitor2 + genereitor3;
            //     console.log(name);
            //     angular.element(document.getElementById('message')).append($compile(genereitor)($scope));
            //     // setTimeout(function(){
            //     //     $('#chatcontent').scrollTop($('#chatcontent'+name)[0].scrollHeight)
            //     // }, 100);
            //     console.log(ff.name)
            // }else
            // {
            //     angular.element(document.getElementById('previasubidaarchivos'+name)).remove();
            // }
        };


        $scope.borrar = function() {
            document.getElementById("ADJ").style.visibility = "hidden";
            $scope.nombre_archivo= '';
        }


        $scope.envarMsj_a_ = function(con_quien_converso){
            alert('se ha enviado el mensaje a '+ con_quien_converso);
        }


       /*┼┼┼fin┼┼┼adjunto┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼*/
    });

/*
 {"_id":"56d0a9ad48e250f02b932bb4",
 "usernameone":"ozarta2",
 "mensaje":"hola ivan",
 "receptor":"ivantrips",
 "fecha":"2016-02-26T19:38:21.064Z",
 "fotoperfil":"/uploads2/perro 19-02-2016.jpg",
 "__v":0,"usernametwo":["ivantrips","ozarta2"]
*/


    // $scope.areas = areas.areas;
    // $scope.crearArea = function () {
    //     if(!$scope.nombre || $scope.nombre === '') { return; }
    //     areas.create({
    //         nombre: $scope.nombre
    //     });
    //     $scope.nombre = '';
    //     areas.getAll();
    //     $scope.areas = areas.areas;
    // };
    //
    // $scope.editararea= function(id,datico){
    //
    //     return $http.post('/areas/' + id+'/editando',{_id: id,nombre: datico},{headers: {Authorization: 'Bearer '+auth.getToken()}})
    //         .success(function(data) {
    //             areas.getAll();
    //             $scope.areas = areas.areas;
    //         })
    //         .error(function(data) {
    //             console.log('Error: ' + data);
    //         });
    //
    //
    // };
    // $scope.deletearea = function (ar) {
    //     return $http.delete('/areas/' + ar._id,{headers: {Authorization: 'Bearer '+auth.getToken()}})
    //         .success(function(data) {
    //             areas.getAll();
    //             $scope.areas = areas.areas;
    //         })
    //         .error(function(data) {
    //             console.log('Error: ' + data);
    //         });
    // };

}]);
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////*/



app.controller('GerentesCtrl',['$scope','auth','gdocuments','gdocument','$http','$timeout','Upload', function ($scope,auth,gdocuments,gdocument,$http,$timeout,Upload) {
    $scope.document = gdocument;
    $scope.currentUser = auth.currentUser();
    console.log($scope.currentUser);
    if($scope.currentUser.gerente){
        $scope.document.carpetas = $scope.document.carpetas.filter(function( obj ) {
            return obj.corporacion == $scope.currentUser.region || ($scope.currentUser.carpetasAdicionales ? $scope.currentUser.carpetasAdicionales.indexOf(obj.corporacion) !== -1 : false);
        });

        $scope.document.files = $scope.document.files.filter(function( obj ) {
            return obj.corporacion == $scope.currentUser.region;
        });
    }
    $scope.isLoggedIn = auth.isLoggedIn;


    console.log($scope.currentUser);
    $('.ui.dropdown').dropdown();
    $scope.corpora = [];
    $http.get('losgerentes').then(function (data) {
        $scope.corpora = data.data;
    })
    // users.get($scope.currentUser._id).then(function(user){
    //     $scope.usuario =  user;
    // });
    $scope.CarpenCarp = function(){
        var corporacion = angular.element(document.getElementsByName('gender')).attr('value');

        if($scope.carpetaNueva === '') { return; }

        gdocuments.addSubFolder($scope.document._id, {
            nombre: $scope.carpetaNueva,
            padre: $scope.document._id,
            corporacion: corporacion
        }).success(function(doc) {
            $scope.document = doc;
        });
        $scope.carpetaNueva = '';

        
    };

    $scope.mostrarModal= function () {
        $('.ui.modal').modal('show');

    }



    $scope.change = function () {
        if($scope.pass1==$scope.pass2){

            return $http.post('/cambiocontra', {
                id: $scope.currentUser._id,
                pass1: $scope.pass1
            }, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
            }).then(function(data){
                console.log(data.data)
                alert('Se ha realizado el proceso satisfactoriamente');
            },function (err) {
                alert('Ha ocurrido un error');
            });


        }else{
            alert('Las contraseñas no coinciden');
        }
        
    }
    
    
    $scope.deletecarpeta = function (ar) {
        return $http.delete('/gfolder/' + ar._id,{headers: {Authorization: 'Bearer '+auth.getToken()}})
            .success(function(data) {
                $scope.document = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.deletearchivo = function (ar) {
        return $http.delete('/gfile/' + ar._id + '/' + $scope.document._id,  {data:{padreidx: $scope.document._id},headers: {Authorization: 'Bearer '+auth.getToken()}})
            .success(function(data) {
                $scope.document = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.uploadPic = function(files) {



        angular.forEach(files, function(file) {
            var corporacion = angular.element(document.getElementsByName('gender2')).attr('value');
            file.upload = Upload.upload({
                url: '/gdocuments/'+ $scope.document._id + '/files',
                data:{id: $scope.document._id,file:file,nombre: file.name,corporacion: corporacion},
                headers: {Authorization: 'Bearer '+auth.getToken(),'Content-Type': file.type}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
            file.upload.progress(function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                console.log("PostController: upload progress " + file.progress);
            });
            file.upload.success(function (data, status, headers, config) {
                console.log(data)
                $scope.document = data;
            });


        });

    };
}]);

app.controller('ActasCtrl',['$scope','auth','users','Upload','$http','$timeout','actas', function ($scope,auth,users,Upload,$http,$timeout,actas) {


    $scope.currentUser = auth.currentUser();
    console.log($scope.currentUser.adminactas);

    $scope.seleccorp = function () {
      $scope.xxx = true

    };


    $scope.verificarAprobados =function(comentarios){
        var apro = []

        angular.forEach(comentarios, function (elemento) {
            if (elemento.aprobado == 'si'){
                // if (apro.indexOf({nombre: elemento.nombre,aprobado: elemento.aprobado}) == -1) {

                    apro.push(
                        {
                            nombre: elemento.nombre,
                            aprobado: elemento.aprobado,
                            fecha: elemento.fecha
                        }
                    )
                // }
            }
        });


        apro = _.uniq(apro,'nombre');
        return apro;
    }
    $scope.selecterFolder = 0;
    $scope.actas = actas.actas;    
    $scope.xx = false;
    $scope.xxx = false;
    $scope.search = 0;

    $scope.selec = function (pa) {
        $scope.selecterFolder = pa;
        $scope.actas = $scope.actas.filter(function( obj ) {

            if(obj.carpeta == pa) {
                return obj
            }

        });
        $scope.xx = true;

    };
    $scope.buscarencomentarios = function (ac) {


      angular.forEach(ac.comentarios, function (com) {



          if(com.username == $scope.currentUser.username && com.aprobado == 'si'){

              return false;
          }
      });
        return true
    };

    $scope.comentarioActa = function (text, id, aprob) {
        users.get($scope.currentUser._id).then(function(user){

            return $http.post('/actas/otro', {
                texto: text,
                id: id,
                aprobado: aprob,
                nombre: user.data.nombre + ' ' + user.data.apellido,
                username: user.data.username,
                carpeta:$scope.selecterFolder
            }, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
            }).success(function(data){

               $scope.actas = data;
            });

        });


    };


    $scope.uploadPic2 = function (file) {
        if(file==undefined || !$scope.nombre || $scope.nombre == '' || !$scope.fecha || $scope.fecha == '')
        {

        }else{

            file.upload = Upload.upload({
                url: '/actas/',
                data: {
                    titulo: $scope.nombre,
                    fecha: $scope.fecha,
                    carpeta: $scope.selecterFolder
                },

                file: file,
                headers: {Authorization: 'Bearer '+auth.getToken(),'Content-Type': file.type}

            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            });

            file.upload.progress(function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });

            file.upload.success(function (data, status, headers, config) {
                $scope.actas = data;
            });
        }
    };


}]);

app.controller('AreaxCtrl', ['$scope','areas','auth', function ($scope,areas,auth) {
    areas.getAll();
    $scope.currentUser = auth.currentUser();
    $scope.areas = areas.areas;
    $scope.hola = 'Hola mundo';
}]);

app.controller('FoticosCtrl', ['$scope','fotos', function ($scope,fotos) {
    $scope.fotos = fotos.fotos;
    $scope.awesomeThings = [];
}]);

app.controller('CumpleanosCtrl', ['$scope','users', function ($scope,users) {
    users.getAll();
    $scope.users = users.users;



    setTimeout(
        function() {
            $scope.users = $scope.users.filter(function( obj ) {

                if(obj.cumpleanos) {
                    return (moment(obj.cumpleanos).format("MMM Do YY") == moment(Date.now()).format("MMM Do YY") );
                }

            });

            console.log($scope.users);
        }, 500);




}]);

app.controller('AreasCtrl', ['$scope','auth','areas','$http', function ($scope,auth,areas,$http) {
    $scope.areas = areas.areas;
    $scope.crearArea = function () {
        if(!$scope.nombre || $scope.nombre === '') { return; }
        areas.create({
            nombre: $scope.nombre
        });
        $scope.nombre = '';
        areas.getAll();
        $scope.areas = areas.areas;
    };

    $scope.editararea= function(id,datico){

        return $http.post('/areas/' + id+'/editando',{_id: id,nombre: datico},{headers: {Authorization: 'Bearer '+auth.getToken()}})
            .success(function(data) {
                areas.getAll();
                $scope.areas = areas.areas;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });


    };
    $scope.deletearea = function (ar) {
        return $http.delete('/areas/' + ar._id,{headers: {Authorization: 'Bearer '+auth.getToken()}})
            .success(function(data) {
                areas.getAll();
                $scope.areas = areas.areas;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };





}]);

app.controller('AreaCtrl', ['$scope','users','Upload','$timeout','$http', 'areas','area','auth','$window', function ($scope,users,Upload,$timeout,$http,areas,area,auth,$window) {


    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser();


        users.get($scope.currentUser._id).then(function(user){
        $scope.usuario =  user;
            $scope.area = area;


        $scope.area.posts = $scope.area.posts.filter(function( obj ) {
            return (obj.areaf == $scope.usuario.data.area || !obj.areaf);
        });

            console.log($scope.area.posts)

    });

    $scope.loadAreas = function() {
        areas.getAll();
        $scope.areas = areas.areas;
    };

    $scope.remove = function(post) {
        return $http.delete('/posts/areas/' + post._id,{headers: {Authorization: 'Bearer '+auth.getToken()}})
            .success(function(data) {
                $window.location.reload();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


    $scope.selectthing = function(idx, form) {
        if ($scope.selectedIndex == idx  ){
            form ? $scope.selectedIndex = idx : $scope.selectedIndex = undefined

        }else{
            $scope.selectedIndex = idx;
        }
    };


    //comment.author = titleize(name.nombre) +' ' + titleize(name.apellido);
    //comment.author2 = req.payload.username;
    //comment.fotoperfil = (name.fotoperfil == undefined ? '/img/iconouser.jpg' : name.fotoperfil);




    $scope.addComment = function(idpost,com){

        areas.addComment(idpost, {
            body: com,
            idarea: $scope.area._id
        }).success(function(area) {
            $scope.area = area;
        });
    };


    $scope.uploadPic = function(file, id) {
        if(file==undefined)
        {
            //posts.create({
            //    title: $scope.title,
            //    link: $scope.link
            //});
            //$scope.title = '';
            //$scope.link = '';
        }

        file.upload = Upload.upload({
            url: '/areas/' + id +'/posts',
            data: {title:$scope.title,link:$scope.link,areaf:$scope.areaf},
            file: file,
            headers: {Authorization: 'Bearer '+auth.getToken(),'Content-Type': file.type}

        });

        file.upload.then(function (response) {
            console.log("Postcontroller: upload then ");
            $timeout(function () {
                file.result = response.data;
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            console.log("PostController: upload progress " + file.progress);
        });

        file.upload.success(function (data, status, headers, config) {
            console.log('terminado')

            $scope.title = '';
            $scope.link = '';
            $scope.picFile = '';
            console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);
            $scope.area = data

        });

    };



}]);

app.controller('UsersCtrl', ['$scope','auth','users','areas','Upload','$timeout','$http', function ($scope,auth,users,areas,Upload,$timeout,$http) {


    $scope.currentUser = auth.currentUser();

    users.get($scope.currentUser._id).then(function(user){
        $scope.users = users.users;

        $scope.usuario =  user;
        if(!$scope.usuario.data.adminusers){
            $scope.users = $scope.users.filter(function( obj ) {
                return obj._id == $scope.usuario.data._id;
            });
        }
    });
     $scope.loadAreas = function() {
            areas.getAll();
            $scope.areas = areas.areas;
     };


    //
    //angular.forEach($scope.seed, function (us) {
    //    users.create({
    //        username: us.username,
    //        password: us.password,
    //        nombre: (us.nombre == "\N" ? "" : us.nombre),
    //        email: (us.email == "\N" ? "" : us.email),
    //        area:  (us.area == "\N" ? "" : us.area),
    //        cargo: (us.cargo == "\N" ? "" : us.cargo),
    //        sexo: (us.sexo == "\N" ? "" : us.sexo),
    //        telefono: (us.telefono == "\N" ? "" : us.telefono),
    //        direccion: (us.direccion == "\N" ? "" : us.direccion),
    //        region: (us.region == "\N" ? "" : us.region),
    //        documento: (us.documento == "\N" ? "" : us.documento),
    //        apellido: (us.apellido == "\N" ? "" : us.apellido),
    //        contratacion: (us.contratacion == "\N" ? "" : us.contratacion)
    //    })
    //});

    $scope.registrarGerente = function () {
        // console.log($scope.carpetasSeleccionadas)
        // console.log( typeof $scope.carpetasSeleccionadas)
        $scope.cscs = $scope.carpetasSeleccionadas.join("~")

        $http.post('/gerentes', {username: $scope.gereUsername,password:  $scope.gerePassword, nombre: $scope.gereNombre,apellido:  $scope.gereApellido, region:   $scope.corpo, carpetasAdicionales: $scope.cscs }).then(function (data) {
            alert("Se registro el gerente exitosamente");
        }, function (err) {
            alert("Ocurrio un error");
        })
    };

///*////////////////////esto fue lo que meti////////////////////////////////////////////



    $scope.RedCarpet = function () {
        $http.get('losgerentes').then(function (data) {
            $scope.carpetasGerentes = data.data;
        });
        // $http.get('/gdocuments/578991c6a809558427456951')
        //     .then(function (data) {
        //         $scope.carpetasGerentes = data.data.carpetas;
        //     },function (err) {
        //
        //     });
    };

    $scope.RedCarpet2 = function () {
        $http.get('losgerentes').then(function (data) {
            $scope.carpetasGerentes2 = data.data;
        });

    };


    $scope.anadirCarpeta= function () {
        if($scope.carpetasSeleccionadas.indexOf($scope.lacarpeta) !== -1) {
            // alert("sdas")
        }else {
            $scope.carpetasSeleccionadas.push($scope.lacarpeta)
        }
    };

    $scope.anadirCarpeta2= function (id,us) {
        if(!us.carpetasAdicionales){
            us.carpetasAdicionales = []
        }

        if(us.carpetasAdicionales.indexOf(id) !== -1) {
            // alert("sdas")
        }else {
            us.carpetasAdicionales.push(id)
        }

    };


    $scope.borrar2 = function (id,us) {
        us.carpetasAdicionales.splice(id, 1);
    }
    $scope.borrar = function (id) {
        $scope.carpetasSeleccionadas.splice(id, 1);
    }
    
    $scope.carpetasSeleccionadas = [];
    $scope.carpetasSeleccionadas2 = [];
/////////////////////////////////////////////////////////////////////////////////////////






    $scope.uploadPic2 = function (file,datos,id) {
        if(datos[23]){
            var cppppppp = datos[23].join("~")
        } else {
            var cppppppp = null;
        }

        if(file==undefined)
        {
            users.edit({
                username:       datos[0],
                password:       (datos[1] == undefined ? "unpasswordquenadienuncaenlavidacolocaria" : datos[1]),
                nombre:         datos[2],
                email:          datos[3],
                area:           datos[4],
                cargo:          datos[5],
                sexo:           datos[6],
                telefono:       datos[7],
                direccion:      datos[8],
                region:         datos[9],
                documento:      datos[10],
                apellido:       datos[11],
                contratacion:   datos[12],
                adminpubli:     datos[13],
                admindocs:      datos[14],
                adminforms:     datos[15],
                adminfotos:     datos[16],
                admincrono:     datos[17],
                adminpqrsf:     datos[18],
                adminusers:     datos[19],
                tramitepqrsf:   datos[20],
                cumpleanos:      datos[21],
                elid: id,
                admingerente:      datos[22],
                carpetasAdicionales:      cppppppp,

            },id);
            users.getAll();
        }else{

            file.upload = Upload.upload({
                url: '/usersf/'+ id,
                data: {
                    username:       datos[0],
                    password:       (datos[1] == undefined ? "unpasswordquenadienuncaenlavidacolocaria" : datos[1]),
                    nombre:         datos[2],
                    email:          datos[3],
                    area:           datos[4],
                    cargo:          datos[5],
                    sexo:           datos[6],
                    telefono:       datos[7],
                    direccion:      datos[8],
                    region:         datos[9],
                    documento:      datos[10],
                    apellido:       datos[11],
                    contratacion:   datos[12],
                    adminpubli:     datos[13],
                    admindocs:      datos[14],
                    adminforms:     datos[15],
                    adminfotos:     datos[16],
                    admincrono:     datos[17],
                    adminpqrsf:     datos[18],
                    adminusers:     datos[19],
                    tramitepqrsf:   datos[20],
                    cumpleanos:      datos[21],
                    elid: id},
                    admingerente:      datos[22],
                carpetasAdicionales:      cppppppp,
                file: file,
                headers: {Authorization: 'Bearer '+auth.getToken(),'Content-Type': file.type}

            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            });

            file.upload.progress(function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });

            file.upload.success(function (data, status, headers, config) {
                users.getAll();
            });
        }
    };
    $scope.remove = function (ar) {
        return $http.delete('/users/' + ar._id,{headers: {Authorization: 'Bearer '+auth.getToken()}})
            .success(function(data) {
                users.getAll();
                $scope.users = users.users;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


    $scope.uploadPic = function(file) {

        if(file==undefined)
        {
            console.log($scope.username);
            console.log($scope.password);

            users.create({
                username:       $scope.username,
                password:       $scope.password,
                nombre:         $scope.nombre,
                email:          $scope.email,
                area:           $scope.area,
                cargo:          $scope.cargo,
                sexo:           $scope.sexo,
                telefono:       $scope.telefono,
                direccion:      $scope.direccion,
                region:         $scope.region,
                documento:      $scope.documento,
                apellido:       $scope.apellido,
                contratacion:   $scope.contratacion,
                cumpleanos: $scope.cumpleanos
            });
            $scope.username = '';
            $scope.password = '';
            $scope.nombre = '';
            $scope.email= '';
            $scope.area= '';
            $scope.cargo= '';
            $scope.sexo= '';
            $scope.telefono= '';
            $scope.direccion= '';
            $scope.region= '';
            $scope.documento= '';
            $scope.apellido= '';
            $scope.contratacion= '';
            $scope.cumpleanos= '';
        }else{

        file.upload = Upload.upload({
            url: '/usersf',
            data: {username:       $scope.username,
                password:       $scope.password,
                nombre:         $scope.nombre,
                email:          $scope.email,
                area:           $scope.area,
                cargo:          $scope.cargo,
                sexo:           $scope.sexo,
                telefono:       $scope.telefono,
                direccion:      $scope.direccion,
                region:         $scope.region,
                documento:      $scope.documento,
                apellido:       $scope.apellido,
                contratacion:   $scope.contratacion,
                cumpleanos:     $scope.cumpleanos},
            file: file,
            headers: {Authorization: 'Bearer '+auth.getToken(),'Content-Type': file.type}

        });

        file.upload.then(function (response) {

            $timeout(function () {
                file.result = response.data;
            });
        }, function (response) {

            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function (evt) {

            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });

        file.upload.success(function (data, status, headers, config) {
            $scope.username = '';
            $scope.password = '';
            $scope.nombre = '';
            $scope.email= '';
            $scope.area= '';
            $scope.cargo= '';
            $scope.sexo= '';
            $scope.telefono= '';
            $scope.direccion= '';
            $scope.region= '';
            $scope.documento= '';
            $scope.apellido= '';
            $scope.contratacion= '';
            $scope.cumpleanos = '';
            $scope.picFile = '';
            users.getAll();
        });
        }
    };





    //$scope.crearUsuario = function(){
    //    if(!$scope.username || $scope.username === '') { return; }
    //
    //};

}]);

app.controller('NavCtrl', ['auth','mySocket','$scope', function( auth,mySocket,$scope){
        var nav = this;
        nav.isLoggedIn = auth.isLoggedIn;
        nav.currentUser = auth.currentUser();
    console.log(nav.currentUser)

        nav.logOut = function (user) {
            socket.emit('disusuario', user );
            mySocket.forward('usuario', $scope);
            auth.logOut();
        }
    $scope.getMyCtrlScope = function() {
        return $scope;
    }
    }]);

app.controller('DocumentCtrl', ['$scope','users','Upload','$timeout','$http', 'documents','document','auth',  function($scope,users,Upload,$timeout,$http,  documents,document,auth){

    $scope.document = document;
    console.log(document);
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser();

    users.get($scope.currentUser._id).then(function(user){
        $scope.usuario =  user;
    });
    $scope.CarpenCarp = function(id){
        if($scope.nombre === '') { return; }
        console.log($scope.nombre)
        documents.addSubFolder(id, {
            nombre: $scope.nombre,
            padre: $scope.id
        }).success(function(doc) {
            $scope.document = doc;
        });
        $scope.nombre = '';
    };
    $scope.deletecarpeta = function (ar) {
        return $http.delete('/folder/' + ar._id,{headers: {Authorization: 'Bearer '+auth.getToken()}})
            .success(function(data) {
                $scope.document = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.deletearchivodocs = function (ar) {
        return $http.delete('/file/' + ar._id + '/' + $scope.document._id,  {data:{padreidx: $scope.document._id},headers: {Authorization: 'Bearer '+auth.getToken()}})
            .success(function(data) {
                $scope.document = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.uploadPic = function(files) {



        angular.forEach(files, function(file) {
            file.upload = Upload.upload({
                url: '/documents/'+ $scope.document._id + '/files',
                data:{id: $scope.document._id,file:file,nombre: file.name},
                headers: {Authorization: 'Bearer '+auth.getToken(),'Content-Type': file.type}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
            file.upload.progress(function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                console.log("PostController: upload progress " + file.progress);
            });
            file.upload.success(function (data, status, headers, config) {
                console.log(data)
                $scope.document = data;
            });


        });

    };
}]);

app.controller('xgxgxgCtrl',['$scope','auth','gdocuments', function ($scope,auth,gdocuments) {


    $scope.gdocuments = gdocuments.documents;

    $scope.crearCarpeta = function(){
        if(!$scope.nombre || $scope.nombre === '') { return; }
        gdocuments.create({
            nombre: $scope.nombre
        });
        $scope.nombre = '';
    };

}]);

app.controller('DocumentsCtrl',['$scope','auth','documents', function ($scope,auth,documents) {

    $scope.isLoggedIn = auth.isLoggedIn;

    if(!$scope.isLoggedIn)
    {

    }
    $scope.documents = documents.documents;

    $scope.crearCarpeta = function(){
        if(!$scope.nombre || $scope.nombre === '') { return; }
        documents.create({
            nombre: $scope.nombre
        });
        $scope.nombre = '';
    };

}]);

app.controller('RootCtrl', ['$scope','$rootScope', function ($scope,$rootScope) {





}]);

app.controller('PqrsfdispatcherCtrl', ['$scope','auth', function ($scope,auth) {


}]);

app.controller('TramitepqCtrl', ['$scope','auth','pqrsf','$http','Upload','$timeout','users', function ($scope,auth,pqrsf,$http,Upload,$timeout,users) {
    $scope.currentUser = auth.currentUser();
    $scope.pqasignados = pqrsf.pqtramite;

    $scope.tdocumentos = ('Cedula de Ciudadania;Cedula de Extranjeria;Pasaporte').split(';').map(function (state) { return { nombre: state }; });
    $scope.tipospq = ('Peticion Queja Reclamo Solicitud Felicitacion').split(' ').map(function (state) { return { nombre: state }; });

    $scope.addCiclo = function (files,comentario,id,fase,responsable,estado,tramitando) {
        if(files==undefined)
        {
            return $http.post('/pqrsf/'+ id, {
                comentario: {c: comentario,f: fase+1, u: $scope.currentUser.nombre + ' ' + $scope.currentUser.nombre},
                responsable: ((tramitando == 'tramitando')? $scope.currentUser.username : responsable),
                estado: estado,
                tramitando: tramitando

            }, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
            }).then(function (data) {

                $scope.pqasignados = data.data.pqtramite.filter(function( obj ) {

                    return obj.encargados.indexOf($scope.currentUser) > -1;
                });
            }, function (err) {

            });

        }else{
            return $http.post('/pqrsf/'+ id, {
                comentario: {c: comentario,f: fase+1, u: $scope.currentUser.nombre + ' ' + $scope.currentUser.apellido},
                responsable: ((tramitando == 'tramitando')? $scope.currentUser.username : responsable),
                estado: estado,
                tramitando: tramitando,

            }, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
            }).success(function(data){

                $scope.total = files.length;
                $scope.cont = 0;
                angular.forEach(files, function(file) {
                    $scope.cont++;



                    file.upload = Upload.upload({
                        url: '/pqrsfs/'+ data._id + '/files',

                        data:{id: data._id,file:file,nombre: file.name,
                            admm: true},

                        headers: {Authorization: 'Bearer '+auth.getToken(),'Content-Type': file.type}
                    });

                    file.upload.then(function (response) {

                        $timeout(function () {
                            file.result = response.data;
                        });
                    }, function (response) {
                        if (response.status > 0)
                            $scope.errorMsg = response.status + ': ' + response.data;
                    }, function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 *
                            evt.loaded / evt.total));
                    });
                    file.upload.progress(function (evt) {
                        // Math.min is to fix IE which reports 200% sometimes
                        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                        console.log("PostController: upload progress " + file.progress);
                    });
                    file.upload.success(function (data, status, headers, config) {


                    });


                });


            });


        }};

}])

app.controller('AdminpqCtrl', ['$scope','auth','pqrsf','$http','Upload','$timeout','users', function ($scope,auth,pqrsf,$http,Upload,$timeout,users) {
    $scope.currentUser = auth.currentUser();
    $scope.pqnuevo = pqrsf.pqnuevo;
    $scope.pqtramite = pqrsf.pqtramite;
    $scope.pqcerrado = pqrsf.pqcerrado;
    $scope.mispqadmin = 1;
    $scope.tdocumentos = ('Cedula de Ciudadania;Cedula de Extranjeria;Pasaporte').split(';').map(function (state) { return { nombre: state }; });
    $scope.tipospq = ('Peticion Queja Reclamo Solicitud Felicitacion').split(' ').map(function (state) { return { nombre: state }; });





    $scope.cambiarArchivox = function (index, ruta) {


        var ext = ruta.split('.');
        ext = ext.slice(-1)[0] ;
        ext = ext.toLowerCase();
        if(ext =='doc' || ext=='docx'){
            angular.element(document.getElementById('imgchangex' + index)).prop('src', "/img/WRD.png");

        }else if(ext=='ppsx' || ext=='ppt' || ext=='pptm' || ext=='pptx'){
            angular.element(document.getElementById('imgchangex' + index)).prop('src', "/img/PW.png");
        }else if(ext=='xls' || ext=='xlsx' || ext=='xlsm' || ext=='xlsb'){
            angular.element(document.getElementById('imgchangex' + index)).prop('src', "/img/XEL.png");
        }else if(ext=='pdf'){
            angular.element(document.getElementById('imgchangex' + index)).prop('src', "/img/PDF.png");
        }else if(ext.toLowerCase() =='png' || ext.toLowerCase()=='tiff' || ext.toLowerCase()=='gif' || ext.toLowerCase()=='jpg' || ext.toLowerCase()=='jpeg' || ext.toLowerCase()=='bmp'){
            angular.element(document.getElementById('imgchangex' + index)).prop('src', ruta);
        }else{
            angular.element(document.getElementById('imgchangex' + index)).prop('src', "/img/DOC.png");
        }


        angular.element(document.getElementById('cambioimagenx' + index)).prop('href', ruta);

    }

    $scope.cambiarArchivo = function (index, ruta) {


        var ext = ruta.split('.');
        ext = ext.slice(-1)[0] ;
        ext = ext.toLowerCase();
        if(ext =='doc' || ext=='docx'){
            angular.element(document.getElementById('imgchange' + index)).prop('src', "/img/WRD.png");

        }else if(ext=='ppsx' || ext=='ppt' || ext=='pptm' || ext=='pptx'){
            angular.element(document.getElementById('imgchange' + index)).prop('src', "/img/PW.png");
        }else if(ext=='xls' || ext=='xlsx' || ext=='xlsm' || ext=='xlsb'){
            angular.element(document.getElementById('imgchange' + index)).prop('src', "/img/XEL.png");
        }else if(ext=='pdf'){
            angular.element(document.getElementById('imgchange' + index)).prop('src', "/img/PDF.png");
        }else if(ext.toLowerCase() =='png' || ext.toLowerCase()=='tiff' || ext.toLowerCase()=='gif' || ext.toLowerCase()=='jpg' || ext.toLowerCase()=='jpeg' || ext.toLowerCase()=='bmp'){
            angular.element(document.getElementById('imgchange' + index)).prop('src', ruta);
        }else{
            angular.element(document.getElementById('imgchange' + index)).prop('src', "/img/DOC.png");
        }


        angular.element(document.getElementById('cambioimagen' + index)).prop('href', ruta);

    }

    $scope.cerrarModal = function(){
        angular.element(document.getElementById('modalarch')).css('display','none')
    }
    $scope.archivoszip = [];

    $scope.modalArchivos = function (archivos, fase) {
        angular.element(document.getElementById('descargarzip')).css('display','none');
        var bases = '';

        $scope.archivoszip = [];
        angular.forEach(archivos , function (archivo) {
            if(archivo.fase == fase){
                var xg = archivo.adjunto.split('/').splice(-1)[0];
                $scope.archivoszip.push(xg)
                bases += '<div class="lispq"><p class="selection">' + xg + '</p></div>'
            }
        });
        angular.element(document.getElementById('modalarcdocs')).html('')
        angular.element(document.getElementById('modalarcdocs')).append(bases)
        angular.element(document.getElementById('modalarch')).css('display','block')

    };

    $scope.generarzip = function () {
        angular.element(document.getElementById('cargazip')).css('display','block')
        return $http.post('/pqrszipfile/', {
            archivos: $scope.archivoszip
        }, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        }).then(function (data) {

            angular.element(document.getElementById('cargazip')).css('display','none');
            angular.element(document.getElementById('descargarzip')).attr('href','/zips/' +data.data).css('display','block');



        }, function (err) {

        });
    };

    $scope.loadasignables = function() {
        users.asignables().then(function (asig) {
            $scope.asignables = asig;
            console.log($scope.asignables);
        });

    };
    $scope.addCiclo = function (files,comentario,id,fase,responsable,estado,tramitando) {
        if(files==undefined)
        {
            return $http.post('/pqrsf/'+ id, {
                comentario: {c: comentario,f: fase+1, u: $scope.currentUser.nombre + ' ' + $scope.currentUser.nombre},
                responsable: ((tramitando == 'tramitando')? $scope.currentUser.username : responsable),
                estado: estado,
                tramitando: tramitando

            }, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
            }).then(function (data) {
                $scope.pqnuevo = data.data.pqnuevo;
                $scope.pqtramite = data.data.pqtramite;
                $scope.pqcerrado = data.data.pqcerrado;
            }, function (err) {
                
            });

        }else{
            console.log(files)
            console.log(files)
            return $http.post('/pqrsf/'+ id, {
                comentario: {c: comentario,f: fase+1, u: $scope.currentUser.nombre + ' ' + $scope.currentUser.apellido},
                responsable: ((tramitando == 'tramitando')? $scope.currentUser.username : responsable),
                estado: estado,
                tramitando: tramitando,

            }, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
            }).success(function(data){

                $scope.total = files.length;
                $scope.cont = 0;
                angular.forEach(files, function(file) {
                    $scope.cont++;


                    var a = "/pqrsfs/45/files"
                    file.upload = Upload.upload({
                        url: '/pqrsfs/'+ id + '/files',

                        data:{id: id,file:file,nombre: file.name,
                            admm: true},

                        headers: {Authorization: 'Bearer '+auth.getToken(),'Content-Type': file.type}
                    });

                    file.upload.then(function (response) {

                        $timeout(function () {
                            file.result = response.data;
                        });
                    }, function (response) {
                        if (response.status > 0)
                            $scope.errorMsg = response.status + ': ' + response.data;
                    }, function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 *
                            evt.loaded / evt.total));
                    });
                    file.upload.progress(function (evt) {
                        // Math.min is to fix IE which reports 200% sometimes
                        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                        console.log("PostController: upload progress " + file.progress);
                    });
                    file.upload.success(function (data, status, headers, config) {


                    });


                });


            });


        }};
}]);

app.controller('PqrsfuserCtrl', ['$scope','pqrsf','$http','auth','Upload','$timeout', function ($scope,pqrsf,$http,auth,Upload,$timeout) {

    $scope.currentUser = auth.currentUser();
    $scope.pqrsf = pqrsf.pqrsf;    
    $scope.tdocumentos = ('Cedula de Ciudadania;Cedula de Extranjeria;Pasaporte').split(';').map(function (state) { return { nombre: state }; });
    $scope.tipospq = ('Peticion Queja Reclamo Solicitud Felicitacion').split(' ').map(function (state) { return { nombre: state }; });


    $scope.cerrarModal = function(){
        angular.element(document.getElementById('modalarch')).css('display','none')
    }
    $scope.archivoszip = [];

    $scope.modalArchivos = function (archivos, fase) {
        angular.element(document.getElementById('descargarzip')).css('display','none');
        var bases = '';

        $scope.archivoszip = [];
        angular.forEach(archivos , function (archivo) {
            if(archivo.fase == fase){
                var xg = archivo.adjunto.split('/').splice(-1)[0];
                $scope.archivoszip.push(xg)
                bases += '<div class="lispq"><p class="selection">' + xg + '</p></div>'
            }
        });
        angular.element(document.getElementById('modalarcdocs')).html('')
        angular.element(document.getElementById('modalarcdocs')).append(bases)
        angular.element(document.getElementById('modalarch')).css('display','block')

    };

    $scope.generarzip = function () {
        angular.element(document.getElementById('cargazip')).css('display','block')
        return $http.post('/pqrszipfile/', {
            archivos: $scope.archivoszip
        }, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        }).then(function (data) {

            angular.element(document.getElementById('cargazip')).css('display','none');
            angular.element(document.getElementById('descargarzip')).attr('href','/zips/' +data.data).css('display','block');



        }, function (err) {

        });
    };


    $scope.iconoSubidaDocumentoPq = function (file) {
        var ext = file[0].name.split('.');
        ext = ext.slice(-1)[0] ;
        ext = ext.toLowerCase();
        if(ext =='doc' || ext=='docx'){
            return "/img/WRD.png"
        }else if(ext=='ppsx' || ext=='ppt' || ext=='pptm' || ext=='pptx'){
            return "/img/PW.png"
        }else if(ext=='xls' || ext=='xlsx' || ext=='xlsm' || ext=='xlsb'){
            return "/img/XEL.png"
        }else if(ext=='pdf'){
            return "/img/PDF.png"
        }else if(ext.toLowerCase() =='png' || ext.toLowerCase()=='tiff' || ext.toLowerCase()=='gif' || ext.toLowerCase()=='jpg' || ext.toLowerCase()=='jpeg' || ext.toLowerCase()=='bmp'){
            return  file.name
        }else{
            return "/img/DOC.png"
        }

    }

    $scope.cambiarArchivo = function (index, ruta) {


        var ext = ruta.split('.');
        ext = ext.slice(-1)[0] ;
        ext = ext.toLowerCase();
        if(ext =='doc' || ext=='docx'){
            angular.element(document.getElementById('imgchange' + index)).prop('src', "/img/WRD.png");

        }else if(ext=='ppsx' || ext=='ppt' || ext=='pptm' || ext=='pptx'){
            angular.element(document.getElementById('imgchange' + index)).prop('src', "/img/PW.png");
        }else if(ext=='xls' || ext=='xlsx' || ext=='xlsm' || ext=='xlsb'){
            angular.element(document.getElementById('imgchange' + index)).prop('src', "/img/XEL.png");
        }else if(ext=='pdf'){
            angular.element(document.getElementById('imgchange' + index)).prop('src', "/img/PDF.png");
        }else if(ext.toLowerCase() =='png' || ext.toLowerCase()=='tiff' || ext.toLowerCase()=='gif' || ext.toLowerCase()=='jpg' || ext.toLowerCase()=='jpeg' || ext.toLowerCase()=='bmp'){
            angular.element(document.getElementById('imgchange' + index)).prop('src', ruta);
        }else{
            angular.element(document.getElementById('imgchange' + index)).prop('src', "/img/DOC.png");
        }


        angular.element(document.getElementById('cambioimagen' + index)).prop('href', ruta);

    }


    $scope.uploadPic = function(files) {

        return $http.post('/pqrsf', {
            nombre: $scope.nombre,
            tdocumento: $scope.tdocumento,
            ndocumento: $scope.ndocumento,
            empresa: $scope.empresa,
            cargo: $scope.cargo,
            ciudad2: $scope.ciudad2,
            creadopor: $scope.currentUser.username,
            tipopq: $scope.tipopq,
            comentario: $scope.comentario,
            email: $scope.email,
            celular: $scope.celular,
            direccion: $scope.direccion,
            estado: 'En espera',

            // encargado: 'ivantrips'
        }, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        }).success(function(data){
            console.log(data[data.length - 1]);
            $scope.total = files.length;
            $scope.cont = 0;
            angular.forEach(files, function(file) {
                $scope.cont++;
                file.upload = Upload.upload({
                    url: '/pqrsfs/'+ data[data.length - 1]._id + '/files',
                    data:{id: data._id,file:file,nombre: file.name,usuario: $scope.currentUser.username},
                    headers: {Authorization: 'Bearer '+auth.getToken(),'Content-Type': file.type}
                });

                file.upload.then(function (response) {

                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
                file.upload.progress(function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    console.log("PostController: upload progress " + file.progress);
                });
                file.upload.success(function (data, status, headers, config) {
                    if($scope.cont == $scope.total){
                        $scope.nombre = '';
                        $scope.tdocumento = '';
                        $scope.ndocumento = '';
                        $scope.empresa = '';
                        $scope.cargo = '';
                        $scope.ciudad = '';
                        $scope.tipopq = '';
                        $scope.comentario = '';
                        $scope.email = '';
                        $scope.celular = '';
                        $scope.direccion = '';
                        $scope.picFile = '';
                        $scope.mispq = true;
                        
                        // pqrsf.getAll();
                        $scope.pqrsf = data;
                        // $scope.pqrsf = $scope.pqrsf.filter(function( obj ) {
                        //     return obj.creadopor == $scope.usuario.data.username;
                        // });

                    }

                });


            });


        });





    };

}]);

app.controller('PqrsfCtrl', ['$scope','pqrsf','$http','auth','Upload','$timeout','$state','users', function ($scope,pqrsf,$http,auth,Upload,$timeout,$state,users) {


    $scope.fechaxxx = moment();

    $scope.currentUser = auth.currentUser();



    users.get($scope.currentUser._id).then(function(user){
        $scope.usuario =  user;
        console.log($scope.usuario);
        $scope.nombre = $scope.usuario.data.nombre + ' ' +$scope.usuario.data.apellido;
        $scope.tdocumento = 'Cedula de Ciudadania';
        $scope.ndocumento = $scope.usuario.data.documento;
        $scope.ciudad2 = $scope.usuario.data.region;
        console.log($scope.ciudad);
        $scope.empresa = 'Soluciones';
        $scope.cargo = $scope.usuario.data.cargo;
        $scope.ciudad = $scope.usuario.data.ciudad;
        $scope.email = $scope.usuario.data.email;
        $scope.celular = $scope.usuario.data.telefono;
        $scope.direccion = $scope.usuario.data.direccion;

        $scope.pqnuevo = $scope.pqrsf.filter(function( obj ) {
            return obj.estado == 'En espera';
        });


        $scope.pqtramite = $scope.pqrsf.filter(function( obj ) {
            return obj.estado == 'En tramite';
        });
        $scope.pqcerrado = $scope.pqrsf.filter(function( obj ) {
            return obj.estado == 'Cerrado';
        });

        $scope.pqasignados = $scope.pqrsf.filter(function( obj ) {
            return obj.encargados.indexOf($scope.usuario.data.username) > -1;
        });

        if(!$scope.usuario.data.adminpqrsf){
            console.log('filtro');
            $scope.pqrsf = $scope.pqrsf.filter(function( obj ) {

                return obj.creadopor == $scope.usuario.data.username;
            });

        }
    });

    $scope.loadasignables = function() {
        users.asignables().then(function (asig) {
            $scope.asignables = asig;
            console.log($scope.asignables);
        });

    };





    


    $scope.mispq = true;
    $scope.mispqadmin = 1;
    $scope.mispqtramite = 1;

    $scope.tdocumentos = ('Cedula de Ciudadania;Cedula de Extranjeria;Pasaporte').split(';').map(function (state) { return { nombre: state }; });
    $scope.tipospq = ('Peticion Queja Reclamo Solicitud Felicitacion').split(' ').map(function (state) { return { nombre: state }; });
    
    $scope.addCiclo = function (files,comentario,id,fase,responsable,estado,tramitando) {
        if(files==undefined)
        {
            return $http.post('/pqrsf/'+ id, {
                comentario: {c: comentario,f: fase+1, u: $scope.usuario.data.nombre + ' ' + $scope.usuario.data.nombre},
                responsable: ((tramitando == 'tramitando')? $scope.usuario.data.username : responsable),
                estado: estado,
                tramitando: tramitando

            }, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
            })

        }else{
            return $http.post('/pqrsf/'+ id, {
                comentario: {c: comentario,f: fase+1, u: $scope.usuario.data.nombre + ' ' + $scope.usuario.data.apellido},
                responsable: ((tramitando == 'tramitando')? $scope.usuario.data.username : responsable),
                estado: estado,
                tramitando: tramitando
            }, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
            }).success(function(data){

                $scope.total = files.length;
                $scope.cont = 0;
                angular.forEach(files, function(file) {
                    $scope.cont++;



                    file.upload = Upload.upload({
                        url: '/pqrsfs/'+ data._id + '/files',

                        data:{id: data._id,file:file,nombre: file.name},

                        headers: {Authorization: 'Bearer '+auth.getToken(),'Content-Type': file.type}
                    });

                    file.upload.then(function (response) {

                        $timeout(function () {
                            file.result = response.data;
                        });
                    }, function (response) {
                        if (response.status > 0)
                            $scope.errorMsg = response.status + ': ' + response.data;
                    }, function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 *
                            evt.loaded / evt.total));
                    });
                    file.upload.progress(function (evt) {
                        // Math.min is to fix IE which reports 200% sometimes
                        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                        console.log("PostController: upload progress " + file.progress);
                    });
                    file.upload.success(function (data, status, headers, config) {
                        if($scope.cont == $scope.total){
                            pqrsf.getAll();
                            $scope.pqrsf = pqrsf.pqrsf;

                            $scope.pqnuevo = $scope.pqrsf.filter(function( obj ) {
                                return obj.estado == 'En espera';
                            });
                            $scope.pqtramite = $scope.pqrsf.filter(function( obj ) {
                                return obj.estado == 'En tramite';
                            });
                            $scope.pqcerrado = $scope.pqrsf.filter(function( obj ) {
                                return obj.estado == 'Cerrado';
                            });
                            if(!$scope.usuario.data.adminpqrsf){
                                console.log('filtro');
                                $scope.pqrsf = $scope.pqrsf.filter(function( obj ) {
                                    return obj.creadopor == $scope.usuario.data.username;
                                });

                            }

                        }

                    });


                });


            });


    }};

    $scope.uploadPic = function(files) {

        return $http.post('/pqrsf', {
            nombre: $scope.nombre,
            tdocumento: $scope.tdocumento,
            ndocumento: $scope.ndocumento,
            empresa: $scope.empresa,
            cargo: $scope.cargo,
            ciudad2: $scope.ciudad2,
            creadopor: $scope.usuario.data.username,
            tipopq: $scope.tipopq,
            comentario: $scope.comentario,
            email: $scope.email,
            celular: $scope.celular,
            direccion: $scope.direccion,
            estado: 'En espera',
            encargado: 'ivantrips'
        }, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        }).success(function(data){

            $scope.total = files.length;
            $scope.cont = 0;
            angular.forEach(files, function(file) {
                $scope.cont++;



                file.upload = Upload.upload({
                    url: '/pqrsfs/'+ data._id + '/files',

                    data:{id: data._id,file:file,nombre: file.name},

                    headers: {Authorization: 'Bearer '+auth.getToken(),'Content-Type': file.type}
                });

                file.upload.then(function (response) {

                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
                file.upload.progress(function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    console.log("PostController: upload progress " + file.progress);
                });
                file.upload.success(function (data, status, headers, config) {
                    if($scope.cont == $scope.total){
                        $scope.nombre = '';
                        $scope.tdocumento = '';
                        $scope.ndocumento = '';
                        $scope.empresa = '';
                        $scope.cargo = '';
                        $scope.ciudad = '';
                        $scope.tipopq = '';
                        $scope.comentario = '';
                        $scope.email = '';
                        $scope.celular = '';
                        $scope.direccion = '';
                        $scope.picFile = '';
                        $scope.mispq = true;
                        pqrsf.getAll();
                        $scope.pqrsf = pqrsf.pqrsf;
                        $scope.pqrsf = $scope.pqrsf.filter(function( obj ) {
                            return obj.creadopor == $scope.usuario.data.username;
                        });

                    }

                });


            });


        });





    };




}]);

app.controller('CalendarCtrl',['$scope','$http','$window','eventos','users','auth','$compile', function ($scope,$http,$window,eventos,users,auth,$compile) {

    $scope.eventos = eventos.eventos;

    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser();

    users.get($scope.currentUser._id).then(function(user) {
        $scope.usuario = user;
    })

    $scope.manejadordeeventos = [];

    angular.forEach($scope.eventos, function (evento) {
        $scope.manejadordeeventos.push({fecha: moment(evento.fechainicio).format('YYYY') +'-'+ moment(evento.fechainicio).format('MM')+'-'+moment(evento.fechainicio).format('DD'), num:1, frame: evento.fechainicio})
    });

    $(document).ready(function () {


        setTimeout(
            function() {
                angular.forEach($scope.manejadordeeventos, function (evento) {
                    if ($('#calendar .fc-day[data-date="'+evento.fecha+'"]').find(".cuentaeventos").length > 0){
                        var x = Number($('#calendar .fc-day[data-date="'+evento.fecha+'"]  p').text());
                        x+=1;
                        $('#calendar .fc-day[data-date="'+evento.fecha+'"]  p').text(x);
                    }else{
                        $('#calendar .fc-day[data-date="'+evento.fecha+'"]').append('<div class="cuentaeventos">' +
                            '<img src="/img/evento.png" class="iconodeevento"> ' +
                            '<div class="numev"><p>'+evento.num+'</p></div>' +
                            '</div>');
                    }
                });
            }, 1000);
    });

    $scope.crearEvento = function (nombre,descripcion,fechainicio,fechafinal,horainicio,horafinal) {
        eventos.create({
            nombre: nombre,
            descripcion: descripcion,
            fechainicio: moment(fechainicio).format(),
            fechafinal: moment(fechafinal).format(),
            horainicio: moment(horainicio).subtract(5, 'hours').format(),
            horafinal: moment(horafinal).subtract(5, 'hours').format()
        });
        eventos.getAll();
        $scope.eventos = eventos.eventos;
        setTimeout(
            function() {
        $scope.nuevoev = $scope.eventos[$scope.eventos.length - 1];


        $scope.manejadordeeventos.push({fecha: moment($scope.nuevoev.fechainicio).format('YYYY') +'-'+ moment($scope.nuevoev.fechainicio).format('MM')+'-'+moment($scope.nuevoev.fechainicio).format('DD'), num:1, frame: $scope.nuevoev.fechainicio})
        console.log($scope.manejadordeeventos);
        if ($('#calendar .fc-day[data-date="'+$scope.manejadordeeventos[$scope.manejadordeeventos.length - 1].fecha+'"]').find(".cuentaeventos").length > 0){
                var x = Number($('#calendar .fc-day[data-date="'+$scope.manejadordeeventos[$scope.manejadordeeventos.length - 1].fecha+'"]  p').text());
                x+=1;
                $('#calendar .fc-day[data-date="'+$scope.manejadordeeventos[$scope.manejadordeeventos.length - 1].fecha+'"]  p').text(x);
            }else{
                $('#calendar .fc-day[data-date="'+$scope.manejadordeeventos[$scope.manejadordeeventos.length - 1].fecha+'"]').append('<div class="cuentaeventos"><img src="/img/evento.png" class="iconodeevento"> <div class="numev"><p>'+$scope.manejadordeeventos[$scope.manejadordeeventos.length - 1].num+'</p></div></div>');
            }
            }, 500);
    };


    $scope.eliminarevento = function (ar) {
        return $http.delete('/eventos/' + ar,{headers: {Authorization: 'Bearer '+auth.getToken()}})
            .success(function(data) {
                $window.location.reload();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.hola = 'Hello World';
    $scope.eventSources = [];
    $scope.uiConfig = {
        calendar:{

            height: 450,
            editable: true,
            header:{
                left: '',
                center: '',
                right: ''
            },
            monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
            monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles','Jueves', 'Viernes', 'Sabado'],
            dayNamesShort: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
            dayClick: function(date, jsEvent, view) {
                 $scope.unafehca = $scope.eventos.slice(-1);
                 console.log(moment($scope.unafehca[0].fechainicio).format());
                console.log(moment(date).format('DD MM YYYY'));
                console.log(moment(date).format('DD MM YYYY') == moment($scope.unafehca[0].fechainicio).format('DD MM YYYY'));
                $('.leftcal').html('')
                $('.leftcal').append(
                    '<div class="cut"> ' +
                        '<p class="showndia">'+moment(date).format('DD')+' </p>' +
                        '<p class="showldia">'+moment(date).format('dddd')+' </p><br>' +
                    '</div>')

                angular.forEach($scope.eventos, function (evento) {
                    if(moment(date).format('DD MM YYYY') == moment(evento.fechainicio).format('DD MM YYYY')){
                        angular.element(document.getElementsByClassName('cut')).append($compile(
                            '   <p class="horaround">'+moment(evento.horainicio).format('LT')+'</p>' +
                            '   <div class="titsub"><span>' +
                            '       <img ng-show="usuario.data.admincrono" ng-click="eliminarevento(\''+ evento._id+'\')" class="iconoeliminarevento" src="/img/icono-eliminar-g.png">' +
                            '       <img class="iconoeventos" src="/img/evento.png">'+evento.nombre+'<img src="img/Iconos-81.png" class="desplegarev"> </span>' +
                            '       <div class="infoevshow">' +
                            '       <p class="labelshowevdes">• Descripcion:</p>' +
                            '       <p class="datoshowevdes">'+evento.descripcion+'</p> ' +
                            '       <p class="labelshowevdes">• Hora:</p> ' +
                            '       <p class="datoshowevdes">'+moment(evento.horainicio).format('LT')+' a '+moment(evento.horafinal).format('LT')+'</p>' +
                            '       <p class="labelshowevdes">• Fecha:</p>' +
                            '       <p class="datoshowevdes">'+moment(evento.fechainicio).format('DD MM YYYY')+' a '+moment(evento.fechainicio).format('DD-MM-YYYY')+'</p>' +
                            '       </div>' +
                            '       </div><br>'
                        )($scope));


                    }});

                $('.leftcal').append(
                    '<script>' +
                    '$(".desplegarev").click(function(){' +
                    '    if($(this).parent().next().css("display") == "block"  ) {' +
                    '    $(this).attr("src", "img/Iconos-81.png");' +
                    '    $(this).parent().css("color","#878787");' +
                    '    }else ' +
                    '    { $(this).attr("src", "img/Iconos-82.png");' +
                    '    $(this).parent().css("color","#575757");' +
                    '    } $(this).parent().next().slideToggle( "slow", function() {});});' +
                    '</script>' )


            },
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize
        }
    };
    function calcularleft(element){var mid = element.outerWidth()/2;var pare = element.parent().outerWidth()/2;var total = pare-mid;var cien = pare*2;var last = total*100/cien;return last;}
    var meshelper = moment().format('MM');
    function cambiarmes(date,bol){if( bol ){if (Number(date) == 12 ) {return 1;} else {return Number(date)+1;}}else {if (Number(date) == 1 ) {return 12;} else {return Number(date)-1;}}}
    $('.onlymes').html(moment().format('MMMM').toUpperCase()).css('left',calcularleft($('.onlymes'))+'%');


    $('.siguiente2').click(function(){
        meshelper= cambiarmes(meshelper,true);
        $('#calendar').fullCalendar('next');

        setTimeout(
            function() {
                angular.forEach($scope.manejadordeeventos, function (evento) {
                    if ($('#calendar .fc-day[data-date="'+evento.fecha+'"]').find(".cuentaeventos").length > 0){
                        var x = Number($('#calendar .fc-day[data-date="'+evento.fecha+'"]  p').text());
                        x+=1;
                        $('#calendar .fc-day[data-date="'+evento.fecha+'"]  p').text(x);
                    }else{
                        $('#calendar .fc-day[data-date="'+evento.fecha+'"]').append('<div class="cuentaeventos">' +
                            '<img src="/img/evento.png" class="iconodeevento"> ' +
                            '<div class="numev"><p>'+evento.num+'</p></div>' +
                            '</div>');
                    }
                });
            }, 1000);
        $('.onlymes').html(moment("2016-"+meshelper+"-03",'YYYY-MM-DD').format('MMMM').toUpperCase()).css('left',calcularleft($('.onlymes'))+'%');



    });

    $('.anterior2').click(function(){
        meshelper = cambiarmes(meshelper,false);
        $('#calendar').fullCalendar('prev');
        setTimeout(
            function() {
                angular.forEach($scope.manejadordeeventos, function (evento) {
                    if ($('#calendar .fc-day[data-date="'+evento.fecha+'"]').find(".cuentaeventos").length > 0){
                        var x = Number($('#calendar .fc-day[data-date="'+evento.fecha+'"]  p').text());
                        x+=1;
                        $('#calendar .fc-day[data-date="'+evento.fecha+'"]  p').text(x);
                    }else{
                        $('#calendar .fc-day[data-date="'+evento.fecha+'"]').append('<div class="cuentaeventos">' +
                            '<img src="/img/evento.png" class="iconodeevento"> ' +
                            '<div class="numev"><p>'+evento.num+'</p></div>' +
                            '</div>');
                    }
                });
            }, 1000);
        $('.onlymes').html(moment("2016-"+meshelper+"-03",'YYYY-MM-DD').format('MMMM').toUpperCase()).css('left',calcularleft($('.onlymes'))+'%');
    });


    console.log(moment("2016-02-25T05:00:00.000Z").subtract(5, 'hours').format());



}]);

app.controller('FormulariosCtrl',['$scope','auth','users','formularios','$http','areas', function ($scope,auth,users,formularios,$http,areas) {
    $scope.isLoggedIn = auth.isLoggedIn;





    $scope.currentUser = auth.currentUser();
    users.get($scope.currentUser._id).then(function(user){
        $scope.usuario =  user;
        $scope.formularios = formularios.formularios;
        if(!$scope.usuario.data.adminforms){
        $scope.formularios = $scope.formularios.filter(function( obj ) {
            return (obj.habilitado == true);
        });
        $scope.formularios = $scope.formularios.filter(function( obj ) {
              return (obj.area == $scope.usuario.data.area || !obj.area);
        });
        }

    });

    $scope.removerPregunta  = function (id) {
        return $http.delete('/preguntas/'+id , {
                headers: { Authorization: 'Bearer' + auth.getToken()}
            }).then(function (data) {
            $scope.formularios = data.data;
            if(!$scope.usuario.data.adminforms) {
                $scope.formularios = $scope.formularios.filter(function (obj) {
                    return (obj.habilitado == true);
                });
                $scope.formularios = $scope.formularios.filter(function (obj) {
                    return (obj.area == $scope.usuario.data.area || !obj.area);
                });
            }
        }, function (err) {

        })
    };

    $scope.loadAreas = function() {
        areas.getAll();
        $scope.areas = areas.areas;
    };


    $scope.habilitando = function (hab,id) {
        return $http.post('/formularios/' + id + '/habilitar', {habilitado: hab}, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        });
    };


    $scope.pregunta = {valor:''};
    $scope.tipo = {valor:''};
    $scope.opcion = {valor:''};
    $scope.opciones = [];
    $scope.addOpcion = function () {
        $scope.opciones.push($scope.opcion.valor);
        $scope.opcion.valor = '';
    };

    $scope.crearFormulario = function(){
        if(!$scope.nombre || $scope.nombre === '') { return; }
        formularios.create({
            nombre: $scope.nombre,
            descripcion: $scope.descripcion,
            area: $scope.area,
            fecha: Date.now(),
            habilitado: true
        });
        $scope.nombre = '';
        $scope.descripcion = '';
        $scope.area = '';
    };


    $scope.states = [
        {html:'checkbox',visual: 'Opcion Multiple'},
        {html:'radio',visual: 'Unica Opcion'},
        {html:'text',visual: 'Texto'},
        {html:'interruptor',visual: 'SI / NO'}
    ];

    $scope.removerOpcion = function (id) {
        $scope.opciones.splice(id, 1);
    };

    $scope.remove = function (ar) {
        return $http.delete('/formularios/' + ar._id,{headers: {Authorization: 'Bearer '+auth.getToken()}})
            .success(function(data) {
                formularios.getAll();
                $scope.formularios = formularios.formularios;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.addPregunta = function(idformulario){
        if($scope.body === '') { return; }

        formularios.addPregunta(idformulario, {
            pregunta: $scope.pregunta.valor,
            tipo:     $scope.tipo.valor,
            opciones: $scope.opciones
        }).success(function(pregunta) {
            formularios.getAll();
        });
        $scope.pregunta = {valor:''};
        $scope.tipo = {valor:''};
    };

}]);

app.controller('ChatCtrl',['$scope','Upload','$timeout','mySocket','auth','$http','moment','users','$compile', function ($scope,Upload,$timeout,mySocket,auth,$http,moment,users,$compile) {

    /*
     * $scope.mensajes  VARIABLE DONDE SE GUARDAN LOS MENSAJES PARA GENERAR CHATS CADA VEZ QUE SE HACE UN GET AL SERVIDOR
     * $scope.usuariosconectados  GUARDA LOS USUARIOS DE LA BARRA EN DONDE MUESTRA LOS USUARIOS QUE ESTAN CONECTADOS O NO
     * $scope.currentUser GUARDA EL TOKEN DE JSON DE EL USUARIO QUE ESTA CONECTADO
     * $scope.isLoggedIn  Si el usuario esta logueado
     * $scope.titleize  Es una funcion que recibe un string y devuelve el string con el primer caracter en mayusculas
     * $scope.actualizarUsers La funcion actualizar users se ejecuta para estar actualizando constantemente los usuarios conectados
    */
    $scope.mensajes = [];
    $scope.usuariosconectados = [];
    $scope.currentUser = auth.currentUser();
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.titleize = function (text) {
        if(text){
            return text.charAt(0).toUpperCase() + text.slice(1);
        }else{
            return text
        }
    };
    $scope.actualizarUsers = function () {return $http.get('/conectados').success(function(data){ angular.copy(data,$scope.usuariosconectados)});
    };
    // * ESTE GET TRAE LA INFORMACION DEL USUARIO YA QUE EL TOKEN NECESITA RENOVARSE (CERRAR SESION) PARA PODER ACTUALIZAR LOS DATOS
    users.get($scope.currentUser._id).then(function(user){
        $scope.usuario =  user;
    });
    $scope.alertammm = function () {
       document.getElementById('chatAudio').play()
    };


    /*
     * Si el usuario esta logueado envia un socket para actualizar el estado de conexion
     */
    if ($scope.isLoggedIn) {
        socket.emit('usuario', $scope.currentUser.username);
        mySocket.forward('usuario', $scope);
    }
    /*
    * La funcion obtenerMensajes se ejecuta cada vez que llega un socket 'chateando'
    * esta funcion trae el ultimo mensaje y
    * hace un append a los chats que estan involucrados
    */
    $scope.obtenerMensajes = function (name1,name2,rec) {
        // Get con dos parametros los username de los responsables del chat
        $http.get('/mensajes/'+ name1 +','+ name2).then(function (response) {
            /*
            * Promesa del get a mensajes
            * la respuesta de este get se copia en $scope.mensajes y en $scope.lastme se guarda el ultimo mensaje enviado
            * a continuacion el campo de texto del chat se vacia            *
            */
            angular.copy(response.data, $scope.mensajes);
            var lastme = $scope.mensajes.slice(-1)[0];
            $("#"+rec+"chattext2").val('');
            /*
             * Si el mensaje es texto plano osea no tiene un adjunto el cuadro de chat que se genera solo tiene el mensaje
             * y la hora en la que se envio este mensaje
             */
            if(!lastme.adjunto){
                $('#chatcontent'+rec).append('<li class="'+ ($scope.currentUser.username == lastme.usernameone  ? "self" : "other") +'"> ' +
                                                ($scope.currentUser.username == lastme.usernameone  ? "" : "<div class=\"avatar\"><img src=\""+ lastme.fotoperfil +"\"> </div>") +
                                             '  <div class="chatboxmessagecontent">    ' +
                                             '      <p>'+lastme.mensaje+'</p>     ' +
                                             '      <time datetime="2015-12-10 21:45:46 UTC" title="10 Dec  2015 at 09:45PM">'  +   moment(lastme.fecha).format('LT')   +' </time>    ' +
                                             '  </div> ' +
                                             '</li>');

            }
            /*
             * En caso de que exista un adjunto se genera mediante genereitordemensajes 1,2,3 el html
              * que se va a ingresar en el chat y hay una serie de if y else que definen las imagenes
              * o el tipo de link que se va a generar en el adjunto del chat (PDF, WORD, EXCEL, POWER POINT, IMAGEN O OTRO)
              * TODO tenemos que crear un visualizador de imagenes y que el pdf descargue al darles click tambien se puede usar el visualizador recomendado por zarta
             */
            else {
                var genereitordemensajes1 = '<li class="'+ ($scope.currentUser.username == lastme.usernameone  ? "self" : "other") +'"> ' +
                                            '   <div class="chatboxmessagecontent chatboxmessagecontents">';
                var genereitordemensajes2 = '';
                if(lastme.adjunto.split('.')[1]=='doc' || lastme.adjunto.split('.')[1]=='docx'){
                    var genereitordemensajes2 =        ' <a href="'+lastme.adjunto+'"><img  src="img/WRD.png" class="subirarchvos2"></a><br>'
                }else if(lastme.adjunto.split('.')[1]=='ppsx' || lastme.adjunto.split('.')[1]=='ppt' || lastme.adjunto.split('.')[1]=='pptm' || lastme.adjunto.split('.')[1]=='pptx'){
                    var genereitordemensajes2 =         ' <a href="'+lastme.adjunto+'"><img  src="img/PW.png" class="subirarchvos2"></a><br>';
                }else if(lastme.adjunto.split('.')[1]=='xls' || lastme.adjunto.split('.')[1]=='xlsx' || lastme.adjunto.split('.')[1]=='xlsm' || lastme.adjunto.split('.')[1]=='xlsb'){
                    var genereitordemensajes2 =         ' <a href="'+lastme.adjunto+'"><img  src="img/XEL.png" class="subirarchvos2"></a><br>';
                }else if(lastme.adjunto.split('.')[1]=='pdf'){
                    var genereitordemensajes2 =         ' <a target="_blank" href="'+lastme.adjunto+'"><img src="img/PDF.png" class="subirarchvos2"></a><br>';
                }else if(lastme.adjunto.split('.')[1].toLowerCase() =='png' || lastme.adjunto.split('.')[1].toLowerCase()=='tiff' || lastme.adjunto.split('.')[1].toLowerCase()=='gif' || lastme.adjunto.split('.')[1].toLowerCase()=='jpg' || lastme.adjunto.split('.')[1].toLowerCase()=='jpeg' || lastme.adjunto.split('.')[1].toLowerCase()=='bmp'){
                    var genereitordemensajes2 =         ' <a target="_blank" href="'+lastme.adjunto+'"><img src="'+ lastme.adjunto+'" class="subirarchvos2"></a><br>';
                }else{
                    var genereitordemensajes2 =    ' <a href="'+lastme.adjunto+'"><img src="img/DOC.png" class="subirarchvos2"></a><br>';
                }

                var genereitordemensajes3 =  '<p>'+lastme.mensaje+'</p>     ' +
                '          <time datetime="2015-12-10 21:45:46 UTC" title="10 Dec  2015 at 09:45PM">      '  +       moment(lastme.fecha).format('LT')   +'   </time>    ' +
                    ' </div>'+
                    ' </li>';
                /*
                  * Se genera el contenido necesario
                  * Y se anade al chat
                 */
                var genereitordemensajes = genereitordemensajes1 + genereitordemensajes2 + genereitordemensajes3;
                $('#chatcontent'+rec).append(genereitordemensajes);
            }
            /*
              * Esta linea hace que el chat baje el scroll automaticamente
            */
            $('#chatcontent'+rec).scrollTop($('#chatcontent'+rec)[0].scrollHeight);

        })
    };
    /*
      * La funcion actualizar users se esta llamando cuando el socket indica que un usuario se conecto a la pagina
      * mySocket.forward('chateando', $scope); Con esta linea habilitamos el envio y recepcion de sockets en la aplicacion
      * este socket es cuando se envian mensajes
    */

    $scope.$on('socket:usuario', function (ev, data) {
       $scope.actualizarUsers();
    });

        mySocket.forward('chateando', $scope);

    /*
      * Cuando el cliente escucha el socket 'chateando' se actualiza la caja de chat del usuario que envio el mensaje
      * Ademas el que recibe el mensaje si tiene la caja de chat cerrado la abre en  if($('#'+data.envia+'chat').length == 0){
      * si ya existe el chat simplemente se agrega el ultimo mensaje con $scope.obtenerMensajes
     */
    $scope.$on('socket:chateando', function (ev, data) {
        if(data.envia == $scope.currentUser.username){
            $scope.obtenerMensajes(data.participan[0],data.participan[1],data.recibe);
        }else if(data.recibe == $scope.currentUser.username){
            if($('#'+data.envia+'chat').length == 0){
                $scope.generarChat(data.envia, data.nombrec);
                $scope.alertammm();
            }else{
                $scope.obtenerMensajes(data.participan[0],data.participan[1],data.envia);
                $scope.alertammm();
            }
        }
    });
    $scope.cancelarsubidachats= function(name){
        angular.element(document.getElementById('previasubidaarchivos'+name)).remove();
    };

    $scope.enviarmensajeadjunto= function (file,name) {
        file.upload = Upload.upload({
            url: '/chat/adjuntos',
            data: {},
            file: file,
            headers: {Authorization: 'Bearer '+auth.getToken(),'Content-Type': file.type}
        });

        file.upload.then(function (response) {
            console.log("Postcontroller: upload then ");
            $timeout(function () {
                file.result = response.data;
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            console.log("PostController: upload progress " + file.progress);
        });

        file.upload.success(function (data, status, headers, config) {

            $scope.title = '';
            $scope.link = '';
            $scope.picFile = '';

            socket.emit('pubs', 'update');
            console.log(name);
            console.log('mimerrjr');
            socket.emit("chateando", {mesj: $("#"+name+"chattext2").val(),
                                      envia:  $scope.currentUser.username ,
                                      participan: [name , $scope.currentUser.username].sort(),
                                      recibe:  name ,
                                      nombrec: $scope.usuario.data.nombre.split(' ')[0] +' '+$scope.usuario.data.apellido.split(' ')[0] ,
                                      fotoperfil: (!$scope.usuario.data.fotoperfil ? "/img/user_chat.png" : $scope.usuario.data.fotoperfil) ,
                                      adjunto: data });
            angular.element(document.getElementById('previasubidaarchivos'+name)).remove();
            angular.element(document.getElementById(name+'chattext2')).val('');

        });

    };




    $scope.seleccionarchivochat = function (ff,name) {

        var progresito = name + "picFile.progress";
        var progresito2 = name + "picFile";

        if(ff){

            var genereitor1 =  ' <li class="self" id="previasubidaarchivos'+ name+'">'+
                    '<div class="chatboxmessagecontent chatboxmessagecontents">'+
                    ' <img src="/img/icono-atras.png" class="subirarchvos" ng-click="enviarmensajeadjunto('+progresito2+',\''+ name +'\')">';


            if(ff.name.split('.')[1]=='doc' || ff.name.split('.')[1]=='docx')
            {
                var genereitor2 =         '  <img  src="img/WRD.png" class="imagenadjuntochat">';
            }else if(ff.name.split('.')[1]=='ppsx' || ff.name.split('.')[1]=='ppt' || ff.name.split('.')[1]=='pptm' || ff.name.split('.')[1]=='pptx')
            {
                var genereitor2 =         '  <img  src="img/PW.png" class="imagenadjuntochat">'
            }else if(ff.name.split('.')[1]=='xls' || ff.name.split('.')[1]=='xlsx' || ff.name.split('.')[1]=='xlsm' || ff.name.split('.')[1]=='xlsb')
            {
                var genereitor2 =         '  <img  src="img/XEL.png" class="imagenadjuntochat">'
            }
            else if(ff.name.split('.')[1]=='pdf')
            {
                var genereitor2 =         '  <img  src="img/PDF.png" class="imagenadjuntochat">'
            }
            else if(ff.name.split('.')[1].toLowerCase() =='png' || ff.name.split('.')[1].toLowerCase()=='tiff' || ff.name.split('.')[1].toLowerCase()=='gif' || ff.name.split('.')[1].toLowerCase()=='jpg' || ff.name.split('.')[1].toLowerCase()=='jpeg')
            {
                var genereitor2 =         '  <img  ngf-src="!'+ name+'picFile.$error && '+ name+'picFile" class="imagenadjuntochat">';
            }
            else
            {
                var genereitor2 = '  <img  src="img/DOC.png" class="imagenadjuntochat">';
            }


            var genereitor3 = '  <div class="progresosubidachat">'+
                ' <div style="width:{{'+progresito+'}}%" ng-bind="'+progresito+'+\'%\'" class="ng-binding progresointernochat"></div>'+
                '  </div>'+
                ' <img src="img/icono-eliminar-g.png" class="cancelarsubidachat" ng-click="cancelarsubidachats(\''+ name+'\')">'+
                ' </div>'+
                ' </li>';


            var genereitor  = genereitor1 + genereitor2 + genereitor3;
            console.log(name)
            angular.element(document.getElementById('chatcontent'+name)).append($compile(genereitor)($scope));
            setTimeout(function(){
            $('#chatcontent'+name).scrollTop($('#chatcontent'+name)[0].scrollHeight)
            }, 100);
        console.log(ff.name)
        }else
        {
            angular.element(document.getElementById('previasubidaarchivos'+name)).remove();
        }
    };

    $scope.numerochats = 1;
    $scope.generarChat = function (name , titulochat) {
        if($('#'+name+'chat').length > 0){

        }   else {
        var part = [name , $scope.currentUser.username].sort();

        $http.get('/mensajes/'+ part[0] +','+ part[1]).then(function (response) {
            angular.copy(response.data, $scope.mensajes);

            var genereitor = '<script>numerodechats++;$("#'+name+'chattext2").keypress(function(e) {if (e.which == 13) {if($("#'+name+'chattext2").val() == ""){}else {socket.emit("chateando", {mesj: $("#'+name+'chattext2").val(),envia: "'+ $scope.currentUser.username +'",participan: ["'+name +'", "'+$scope.currentUser.username+'"].sort(),recibe: "'+ name +'", nombrec: "'  + $scope.usuario.data.nombre.split(' ')[0] +' '+$scope.usuario.data.apellido.split(' ')[0] +'",fotoperfil: "'+ (!$scope.usuario.data.fotoperfil ? "/img/user_chat.png" : $scope.usuario.data.fotoperfil) +'" });} e.preventDefault();}});' +
            '$("#closechat'+ name+'").click(function () {$("#'+name+'chat").nextAll(".chatbox").css("right", "-=285");numerodechats--;$("#'+name+'chat").remove();})' +
            '</script>' +
            '<div class="chatbox" id="'+name+'chat" style="bottom: 0px; display: block;">' +
            '<div class="chatboxhead"><div class="chatboxtitle"><i class="fa fa-comments"></i>'+
            '<h1> '+titulochat.split(' ')[0]+' '+ titulochat.split(' ')[1] +'</h1></div><div class="chatboxoptions">&nbsp;&nbsp; <i style="cursor: pointer" id="closechat'+name+'" class="fa  fa-times cerrarchat" ng-click="cerrarChat(users.username)"></i> </div>'+
            '<br clear="all"></div><div class="chatboxcontent" id="chatcontent'+ name +'"></div>'+
            '    <div class="chatboxinput">'+
                ' <label for="'+ name +'file-img">'+
                '  <img src="img/adjunto_blanco.png" class="adjuntarchat">'+
                ' </label>'+
                ' <input ngf-select="seleccionarchivochat('+ name+'picFile,\''+ name+'\')" type="file" class="camera" ngf-select ng-model="'+ name+'picFile" id="'+ name+'file-img"  ngf-multiple="false" name="file"  ngf-max-size="200MB" style="display: none" />'+
            '<input placeholder="Escribe tu mensaje..." type="text" id="'+name+'chattext2" class="chatboxtextarea" autocomplete="off"> ' +
                '</div>' +
                ' </div>' +
            '<script>$("#'+name+'chat").css("right",numerodechats*285+"px");' +
            ' $("#'+name +'chattext2").focus();' +
            '' +
            '</script>';











            angular.element(document.getElementById('chap')).append($compile(genereitor)($scope));

            $scope.numerochats += 1;

            angular.forEach($scope.mensajes, function (mensa) {


                if(!mensa.adjunto){
                    $('#chatcontent'+name).append(
                        '<li class="'+ ($scope.currentUser.username == mensa.usernameone  ? "self" : "other") +'"> ' +
                        ($scope.currentUser.username == mensa.usernameone  ? "" : "<div class=\"avatar\"><img src=\""+ mensa.fotoperfil +"\"> </div>") +
                        '        <div class="chatboxmessagecontent">    ' +
                        '           <p>'+mensa.mensaje+'</p>     ' +
                        '          <time datetime="2015-12-10 21:45:46 UTC" title="10 Dec  2015 at 09:45PM">      '  +       moment(mensa.fecha).format('LT')   +'   </time>    ' +
                        '         </div> ' +
                        '   </li>');
                }else{

                var genereitordemensajes1 = '<li class="'+ ($scope.currentUser.username == mensa.usernameone  ? "self" : "other") +'"> ' +
                    ' <div class="chatboxmessagecontent chatboxmessagecontents">';

                var genereitordemensajes2 = '';


                if(mensa.adjunto.split('.')[1]=='doc' || mensa.adjunto.split('.')[1]=='docx')
                {
                    var genereitordemensajes2 =        ' <a href="'+mensa.adjunto+'"><img  src="img/WRD.png" class="subirarchvos2"></a><br>'
                }else if(mensa.adjunto.split('.')[1]=='ppsx' || mensa.adjunto.split('.')[1]=='ppt' || mensa.adjunto.split('.')[1]=='pptm' || mensa.adjunto.split('.')[1]=='pptx')
                {
                    var genereitordemensajes2 =         ' <a href="'+mensa.adjunto+'"><img  src="img/PW.png" class="subirarchvos2"></a><br>';

                }else if(mensa.adjunto.split('.')[1]=='xls' || mensa.adjunto.split('.')[1]=='xlsx' || mensa.adjunto.split('.')[1]=='xlsm' || mensa.adjunto.split('.')[1]=='xlsb')
                {
                    var genereitordemensajes2 =         ' <a href="'+mensa.adjunto+'"><img  src="img/XEL.png" class="subirarchvos2"></a><br>';
                }
                else if(mensa.adjunto.split('.')[1]=='pdf')
                {
                    var genereitordemensajes2 =         ' <a href="'+mensa.adjunto+'"><img src="img/PDF.png" class="subirarchvos2"></a><br>';
                }
                else if(mensa.adjunto.split('.')[1].toLowerCase() =='png' || mensa.adjunto.split('.')[1].toLowerCase()=='tiff' || mensa.adjunto.split('.')[1].toLowerCase()=='gif' || mensa.adjunto.split('.')[1].toLowerCase()=='jpg' || mensa.adjunto.split('.')[1].toLowerCase()=='jpeg')
                {
                    var genereitordemensajes2 =         ' <a href="'+mensa.adjunto+'"><img src="'+ mensa.adjunto+'" class="subirarchvos2"></a><br>';

                }
                else
                {
                    var genereitordemensajes2 =    ' <a href="'+mensa.adjunto+'"><img src="img/DOC.png" class="subirarchvos2"></a><br>';
                }




                var genereitordemensajes3 ='           <p>'+mensa.mensaje+'</p>     ' +
                    '          <time datetime="2015-12-10 21:45:46 UTC" title="10 Dec  2015 at 09:45PM">      '  +       moment(mensa.fecha).format('LT')   +'   </time>    ' +
                    ' </div>'+
                    ' </li>';
                var genereitordemensajes = genereitordemensajes1 + genereitordemensajes2 + genereitordemensajes3;


                    $('#chatcontent'+name).append(genereitordemensajes);

                }


                //$('#chatcontent'+name).append('<p>'+mensa.mensaje+'</p>');

            });

            $('#chatcontent'+name).scrollTop($('#chatcontent'+name)[0].scrollHeight)

        });
        }
    };
    $scope.actualizarUsers();





    //$('#enviando').click(function () {
    //    socket.emit('sok', $('#m').val());
    //    $('#m').val('');
    //});
    //
    //
    //mySocket.forward('sok', $scope);
    //$scope.$on('socket:sok', function (ev, data) {
    //        $scope.mensajes.push(data);
    //});
}]);

app.controller('FormularioresultsCtrl',['$scope','formularios','users','formularior','auth', function ($scope, formularios,users,formularior,auth) {
    $scope.formulario = formularior;
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.data2 = [];
    $scope.currentUser = auth.currentUser();


    $scope.alegible = function (obj) {
        console.log('entro')
        var a = '';
      angular.forEach(obj, function (ob) {
          a += ', ' + ob;
      });
        return a;
    };


    $scope.typee = function(obj) {
        return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
    }

    $scope.exportData = function () {
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Report.xls");
    };

    users.get($scope.currentUser._id).then(function(user){
        $scope.usuario =  user;

    });
    angular.forEach($scope.formulario.respuestas, function (respues) {
        $scope.data2.push(respues.dato);
    })

    function enumerador(arreglo) {
        objeto = {};
        for (var i = 0, j = arreglo.length; i < j; i++) {
            if(arreglo[i] != false && arreglo[i] != ""){
            objeto[arreglo[i]] = (objeto[arreglo[i]] || 0) + 1;
            }
        }
        return objeto;
    }
    function aD3(dato) {
        resultado = [];
        for (var x in dato) {
            resultado.push({key: x, y: dato[x]});
        }
        return resultado;
    }

    $scope.options = {
        chart: {
            type: 'pieChart',
            height: 500,
            donut: true ,
            color:['#E30613','#4a4a49','#646363','#7c7c7b','#929292','#a8a8a7','#bdbcbc','#d0d0d0'],
            showLabels: true,
            labelType: "percent",
            x: function(d){return d.key;},
            y: function(d){return d.y;},

            duration: 500,
            labelThreshold: 0.01,
            labelSunbeamLayout: true,
            legend: {
                margin: {
                    top: 5,
                    right: 35,
                    bottom: 5,
                    left: 0
                }
            }
        }
    };


    $scope.resultadofinal = [];
    $scope.resultadofinal3 = [];

    for(z=0; z< $scope.data2[0].length;z++) {

        $scope.resultadofinal3 = [];
        $scope.resultado3 = [];

        angular.forEach($scope.data2, function (dat) {
            if(dat[z]){
                $scope.resultado3.push(dat[z].respuesta)
            }
        });




        if(typeof $scope.resultado3[0] === 'object'){
            $scope.resultadox = [];

            angular.forEach($scope.resultado3, function (dat) {
                angular.forEach(dat, function (dat2) {
                    $scope.resultadox.push(dat2);
                })
            });
            $scope.obj3 = enumerador($scope.resultadox);
        }else{
            $scope.obj3 = enumerador($scope.resultado3);

        }
        $scope.resultadofinal3 = aD3($scope.obj3);


        $scope.resultadofinal.push($scope.resultadofinal3);

    }

}]);

app.controller('FormularioCtrl', ['$scope', 'formularios','formulario','auth','$state',  function($scope, formularios,formulario,auth,$state){

    $scope.formulario = formulario;
    $scope.isLoggedIn = auth.isLoggedIn;

    $scope.valores2 = [];
    angular.forEach($scope.formulario.preguntas, function (preg) {
            $scope.valores2.push(
                ( {pregunta: preg.pregunta,  respuesta:   '' })
        )
        }

    );

    $scope.responder = function (idform) {
        formularios.respon(idform,  {
            dato: $scope.valores2
        }).success(function () {
            $state.go('home');
        })
    };

    $scope.options = {
        chart: {
            type: 'pieChart',
            height: 500,
            donut: true ,
            color:['#E30613','#575756','#878787'],
            showLabels: true,
            labelType: "percent",
            x: function(d){return d.key;},
            y: function(d){return d.y;},

            duration: 500,
            labelThreshold: 0.01,
            labelSunbeamLayout: true,
            legend: {
                margin: {
                    top: 5,
                    right: 35,
                    bottom: 5,
                    left: 0
                }
            }
        }
    };

    $scope.data2 = [

        [{"pregunta":"intereses","respuesta":{"autos":false,"musica":"musica","otros":"otros"}},{"pregunta":"Deportes","respuesta":{"Tenis":"Tenis","Baloncesto":"Baloncesto","Futbol":"Futbol"}},{"pregunta":"Casado?","respuesta":"Si"},{"pregunta":"comentarios","respuesta":"sasa"},{"pregunta":"Tipo de documento","respuesta":"Cedula de Ciudadania"}],
        [{"pregunta":"intereses","respuesta":{"autos":false,"musica":"musica","otros":"otros"}},{"pregunta":"Deportes","respuesta":{"Tenis":"Tenis","Baloncesto":"Baloncesto","Futbol":"Futbol"}},{"pregunta":"Casado?","respuesta":"Si"},{"pregunta":"comentarios","respuesta":"sasa"},{"pregunta":"Tipo de documento","respuesta":"Cedula de Ciudadania"}],
        [{"pregunta":"intereses","respuesta":{"autos":false,"musica":"musica","otros":"otros"}},{"pregunta":"Deportes","respuesta":{"Tenis":"Tenis","Baloncesto":"Baloncesto","Futbol":"Futbol"}},{"pregunta":"Casado?","respuesta":"Si"},{"pregunta":"comentarios","respuesta":"sasa"},{"pregunta":"Tipo de documento","respuesta":"Cedula de Ciudadania"}],
        [{"pregunta":"intereses","respuesta":{"autos":false,"musica":"musica","otros":"otros"}},{"pregunta":"Deportes","respuesta":{"Tenis":"Tenis","Baloncesto":"Baloncesto","Futbol":"Futbol"}},{"pregunta":"Casado?","respuesta":"No"},{"pregunta":"comentarios","respuesta":"sasa"},{"pregunta":"Tipo de documento","respuesta":"Tarjeta de Identidad"}],

    ];


    function enumerador(arreglo) {
        objeto = {};
        for (var i = 0, j = arreglo.length; i < j; i++) {
            objeto[arreglo[i]] = (objeto[arreglo[i]] || 0) + 1;
        }
        return objeto;
    }
    function aD3(dato) {
        resultado = [];
        for (var x in dato) {
            resultado.push({key: x, y: dato[x]});
        }
        return resultado;
    }

    $scope.resultado = [];
    $scope.resultado2 = [];

    $scope.resultadofinal = [];
    $scope.resultadofinal2 = [];
    $scope.resultadofinal3 = [];

    for(z=0; z< $scope.data2[0].length;z++) {

        $scope.resultadofinal3 = [];
        $scope.resultado3 = [];

        angular.forEach($scope.data2, function (dat) {
            $scope.resultado3.push(dat[z].respuesta)
        });


        //console.log(Object.keys());

if(typeof $scope.resultado3[0] === 'object'){
    $scope.resultadox = [];

        angular.forEach($scope.resultado3, function (dat) {
            angular.forEach(dat, function (dat2) {
                $scope.resultadox.push(dat2);
            })
        });
    $scope.obj3 = enumerador($scope.resultadox);
}else{
    $scope.obj3 = enumerador($scope.resultado3);

}
        $scope.resultadofinal3 = aD3($scope.obj3);


        $scope.resultadofinal.push($scope.resultadofinal3);

    }


}]);

app.controller('CalendarbarCtrl',['$scope', function ($scope) {
    $scope.hola = 'Hello World';
    $scope.eventSource = [];
    $scope.calcularleft = function(element){
        var mid = element.outerWidth()/2;
        var pare = element.parent().outerWidth()/2;
        var total = pare-mid;
        var cien = pare*2;
        var last = total*100/cien;
        return last;
    }
    $scope.uiConfi = {
        calendar:{
            height: 450,
            editable: true,
            header:{
                left: '',
                center: '',
                right: '',
                border: 'none'
            },
            firstDay: 1,
            monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
            monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles','Jueves', 'Viernes', 'Sabado'],
            dayNamesShort: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
            buttonText: {
                today: 'Hoy',
                week: 'Semana',
                day: 'Dia'
            },
            dayClick: function(date, jsEvent, view) {
                $('.diacalendar').html(moment(date).locale('es').format('dddd')).css('left',$scope.calcularleft($('.diacalendar'))+'%');
                $('.dianumcalendar').html(moment(date).locale('es').format('DD')).css('left',$scope.calcularleft($('.dianumcalendar'))+'%');
                $('.mescalendar').html(moment(date).locale('es').format('MMMM')+' '+moment().format('YYYY')).css('left',$scope.calcularleft($('.mescalendar'))+'%');
            },
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize
        }
    };
}]);

app.controller('FotoCtrl', ['$scope','users','Upload','$timeout','$http', 'fotos','foto','auth',  function($scope,users,Upload,$timeout,$http, fotos,foto,auth){

    $scope.foto = foto;
    $scope.isLoggedIn = auth.isLoggedIn;


    $scope.currentUser = auth.currentUser();

    users.get($scope.currentUser._id).then(function(user){
        $scope.usuario =  user;

    });

    $scope.images = [];
    angular.forEach(foto.files, function (adj) {
        $scope.images.push({
            thumb: adj.adjunto, img: adj.adjunto
        })
    });




    $scope.uploadPic = function(files) {



        angular.forEach(files, function(file) {

            file.upload = Upload.upload({
                url: '/fotos/'+ $scope.foto._id + '/files',

                data:{id: $scope.foto._id,file:file,nombre: file.name},

                headers: {Authorization: 'Bearer '+auth.getToken(),'Content-Type': file.type}
            });

            file.upload.then(function (response) {

                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
            file.upload.progress(function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                console.log("PostController: upload progress " + file.progress);
            });
            file.upload.success(function (data, status, headers, config) {
                $scope.foto = data;
                $scope.images = [];
                angular.forEach($scope.foto.files, function (adj) {

                    $scope.images.push({
                        thumb: adj.adjunto, img: adj.adjunto
                    })
                });
                console.log($scope.images)
                $scope.picFile = '';

            });


        });

    };
}]);

app.controller('FotosCtrl',['$scope','users','fotos','Upload','$http','auth', function ($scope,users,fotos,Upload,$http,auth) {
    $scope.hola = "Hello World";

    $scope.fotos = fotos.fotos;

    $scope.currentUser = auth.currentUser();


    $scope.remove = function (ar) {
        return $http.delete('/formularios/' + ar._id,{headers: {Authorization: 'Bearer '+auth.getToken()}})
            .success(function(data) {
                formularios.getAll();
                $scope.formularios = formularios.formularios;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.alertando = function (text) {
        return $http.delete('/fotos/' + text._id,{headers: {Authorization: 'Bearer '+auth.getToken()}})
            .success(function(data) {
                fotos.getAll();
                $scope.fotos = fotos.fotos;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

    users.get($scope.currentUser._id).then(function(user){
        $scope.usuario =  user;

    });



    $scope.crearAlbum = function(){
        if(!$scope.nombre || $scope.nombre === '') { return; }
        fotos.create({
            nombre: $scope.nombre
        });
        $scope.nombre = '';
        fotos.getAll();
    };

}]);

app.controller('MainCtrl',['$scope','areas','Upload','mySocket','posts','auth','$timeout','$http','users', function ($scope,areas,Upload,mySocket,posts,auth,$timeout,$http,users) {


    $scope.bodyc = {val:''};
    $scope.currentUser = auth.currentUser();
    users.get($scope.currentUser._id).then(function(user){
        $scope.usuario =  user;
        $scope.posts = posts.posts;
        $scope.posts = $scope.posts.filter(function( obj ) {
            return (obj.area == $scope.usuario.data.area || !obj.area);
        });
    });





    $scope.loadAreas = function() {
        areas.getAll();
        $scope.areas = areas.areas;
    };

     $scope.selectthing = function(idx, form) {
        if ($scope.selectedIndex == idx  ){
            form ? $scope.selectedIndex = idx : $scope.selectedIndex = undefined

        }else{
            $scope.selectedIndex = idx;
        }
    };


    $scope.isLoggedIn = auth.isLoggedIn;


    $scope.remove = function(post) {
        return $http.delete('/posts/' + post._id,{headers: {Authorization: 'Bearer '+auth.getToken()}})
            .success(function(data) {
                posts.getAll()
                $scope.posts = posts.posts;

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.removeComment = function(comment) {
        return $http.delete('/comments/' + comment._id,{headers: {Authorization: 'Bearer '+auth.getToken()}})
            .success(function(data) {
                posts.getAll()

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.addComment = function(idpost,com){

        posts.addComment(idpost, {
            body: com,
            author: 'user'

        }).success(function(comment) {
            posts.getAll();
            $scope.posts = posts.posts;
        });
        $scope.bodyc.val = '';
    };

    mySocket.forward('pubs', $scope);


    $scope.uploadPic = function(file) {
        if(file==undefined)
        {
            posts.create({
                title: $scope.title,
                link: $scope.link,
                area: $scope.area
            });
            $scope.title = '';
            $scope.link = '';
            $scope.area = '';
            posts.getAll()
            $scope.posts = posts.posts;
        }

        file.upload = Upload.upload({
            url: '/posts',
            data: {title:$scope.title,link:$scope.link,area: $scope.area},
            file: file,
            headers: {Authorization: 'Bearer '+auth.getToken(),'Content-Type': file.type}

        });

        file.upload.then(function (response) {
            console.log("Postcontroller: upload then ");
            $timeout(function () {
                file.result = response.data;
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            console.log("PostController: upload progress " + file.progress);
        });

        file.upload.success(function (data, status, headers, config) {
            console.log('terminado')

            $scope.title = '';
            $scope.link = '';
            $scope.picFile = '';
            console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);
            socket.emit('pubs', 'update');

            posts.getAll();
            $scope.posts = posts.posts;

        });

    };
    $scope.$on('socket:pubs', function (ev, data) {
        posts.getAll();

    });
    $scope.incrementUpvotes = function(post) {
        posts.upvote(post)
    };
}]);

app.controller('AuthCtrl', [
    '$state',
    'auth',
    function( $state, auth){
        var usuario = this;
        usuario.user = {};
        usuario.loginfallido = false ;
        usuario.viendo = true;
        usuario.register = function(){
            auth.register(usuario.user).error(function(error){
                usuario.error = error;
            }).then(function(){
                $state.go('home');
            });
        };

        usuario.logIn = function(){
            auth.logIn(usuario.user).error(function(error){
                usuario.loginfallido = true ;
                usuario.error = error;
            }).then(function(){
                $state.go('home');
            });
        };
    }]);

app.directive("scroll", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
            if (this.pageYOffset > 0) {
                angular.element(document.getElementById('movil')).addClass('barrascroleadacelular');
                angular.element(document.getElementById('navazulcelular')).addClass('barramenumovil');
                scope.$emit('scro', {top: 0+'px',height:'700px'}

                );
            } else {
                angular.element(document.getElementById('movil')).removeClass('barrascroleadacelular');
                angular.element(document.getElementById('navazulcelular')).removeClass('barramenumovil');
                scope.$emit('scro', {top: 150 - $window.pageYOffset + 'px',height:'700px'}

                );
            }
            scope.$apply();
        });
    };
});
