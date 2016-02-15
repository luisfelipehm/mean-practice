var app = angular.module('flapperNews', ['ui.router','ngMaterial','ngFileUpload','ui.calendar','jkuri.gallery','slick','nvd3','btford.socket-io']);

app.directive('barranav', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/_barra.html'
    };
});
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
        return $http.post('/posts', post, {
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
        console.log(pregunta);
        console.log('hola mundo');

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


app.factory('auth', ['$http', '$window', function($http, $window){
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

            return payload.username;
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
            .state('home', {
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'MainCtrl',
                resolve: {
                    postPromise: ['posts', function(posts){
                        return posts.getAll();
                    }]
                }

            })
            .state('documentos', {
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
                templateUrl: 'templates/login.html',
                controller: 'AuthCtrl as usuario',
                onEnter: ['$state', 'auth', function($state, auth){
                    if(auth.isLoggedIn()){
                        $state.go('home');
                    }
                }]
            })
            .state('register', {
                url: '/register',
                templateUrl: 'templates/register.html',
                controller: 'AuthCtrl as usuario',
                onEnter: ['$state', 'auth', function($state, auth){
                    if(auth.isLoggedIn()){
                        $state.go('home');
                    }
                }]
            })
            .state('fotox', {
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
                url: '/fotos/{id}',
                templateUrl: 'templates/album.html',
                controller: 'FotoCtrl',
                resolve: {
                    foto: ['$stateParams', 'fotos', function($stateParams, fotos) {
                        return fotos.get($stateParams.id);
                    }]}

            })
            .state('documents', {
                url: '/documents/{id}',
                templateUrl: 'templates/document.html',
                controller: 'DocumentCtrl',
                resolve: {
                    document: ['$stateParams', 'documents', function($stateParams, documents) {
                        return documents.get($stateParams.id);
                    }]}

            })
            .state('calendar', {
                url: '/calendar',
                templateUrl: 'templates/calendar.html',
                controller: 'CalendarCtrl',

            })
            .state('formularios',{
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
                url: '/formularios/{id}',
                templateUrl: 'templates/formulario.html',
                controller: 'FormularioCtrl',
                resolve: {
                    formulario: ['$stateParams', 'formularios', function($stateParams, formularios) {
                        return formularios.get($stateParams.id);
                    }]}

            })
            .state('formularioresults', {
                url: '/formularios/{id}/results',
                templateUrl: 'templates/formularioresults.html',
                controller: 'FormularioresultsCtrl',
                resolve: {
                    formularior: ['$stateParams', 'formularios', function($stateParams, formularios) {
                        return formularios.getResults($stateParams.id);
                    }]}

            })


        //    .state('document', {
        //    url: '/document/{id}',
        //    templateUrl: 'templates/document.html',
        //    controller: 'DocumentCtrl',
        //    resolve: {
        //        document: ['$stateParams', 'document', function($stateParams, document) {
        //            return document.get($stateParams.id);
        //        }]}
        //})
        ;

        $urlRouterProvider.otherwise('home');
    }]);

app.controller('NavCtrl', [
    'auth',
    function( auth){
        var nav = this;
        nav.isLoggedIn = auth.isLoggedIn;
        nav.currentUser = auth.currentUser;
        nav.logOut = auth.logOut;
    }]);

app.controller('DocumentsCtrl',['$scope','auth','documents', function ($scope,auth,documents) {
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.documents = documents.documents;

    $scope.crearCarpeta = function(){
        if(!$scope.nombre || $scope.nombre === '') { return; }
        documents.create({
            nombre: $scope.nombre
        });
        $scope.nombre = '';
    };

}]);

app.controller('DocumentCtrl', ['$scope','Upload','$timeout','$http', 'documents','document','auth',  function($scope,Upload,$timeout,$http,  documents,document,auth){

    $scope.document = document;
    $scope.isLoggedIn = auth.isLoggedIn;

    $scope.CarpenCarp = function(id){
        if($scope.nombre === '') { return; }
        documents.addSubFolder(id, {
            nombre: $scope.nombre,
            padre: $scope.id
        }).success(function(doc) {
            $scope.document.carpetas.push(doc);
        });
        $scope.nombre = '';
    };

    $scope.uploadPic = function(files) {



        angular.forEach(files, function(file) {
            console.log(file);
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
                $scope.picFile = '';


            });


        });

    };
}]);

app.controller('CalendarCtrl',['$scope', function ($scope) {
    $scope.hola = 'Hello World';
    $scope.eventSources = [];
    $scope.uiConfig = {
        calendar:{
            height: 450,
            editable: true,
            header:{
                left: 'month basicWeek basicDay agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
            },
            dayClick: $scope.alertEventOnClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize
        }
    };
}]);

app.controller('FormulariosCtrl',['$scope','auth','formularios', function ($scope,auth,formularios) {
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.formularios = formularios.formularios;
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
            nombre: $scope.nombre
        });
        $scope.nombre = '';
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
app.controller('ChatCtrl',['$scope','mySocket', function ($scope,mySocket) {
    $scope.mensajes = [];
    $('#enviando').click(function () {
        socket.emit('message', $('#m').val());
        $('#m').val('');
    });
    mySocket.forward('message', $scope);
    $scope.$on('socket:message', function (ev, data) {
            $scope.mensajes.push(data);
    });
}]);
app.controller('FormularioresultsCtrl',['$scope','formularios','formularior','auth', function ($scope, formularios,formularior,auth) {
    $scope.formulario = formularior;
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.data2 = [];
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
            $scope.resultado3.push(dat[z].respuesta)
        });

        console.log();
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

        console.log();
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
    console.log($scope.resultadofinal);

}]);



app.controller('CalendarbarCtrl',['$scope', function ($scope) {
    $scope.hola = 'Hello World';
    $scope.eventSource = [];
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
            dayClick: $scope.alertEventOnClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize
        }
    };
}]);
app.controller('FotoCtrl', ['$scope','Upload','$timeout','$http', 'fotos','foto','auth',  function($scope,Upload,$timeout,$http, fotos,foto,auth){

    $scope.foto = foto;
    $scope.isLoggedIn = auth.isLoggedIn;

    $scope.images = [];
    angular.forEach(foto.files, function (adj) {
        $scope.images.push({
            thumb: adj.adjunto, img: adj.adjunto
        })
    });




    $scope.uploadPic = function(files) {



        angular.forEach(files, function(file) {
            console.log(file);
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
                $scope.picFile = '';
                fotos.get($scope.foto._id);

            });


        });

    };
}]);


app.controller('FotosCtrl',['$scope','fotos','Upload','$http','auth', function ($scope,fotos,Upload,$http,auth) {
    $scope.hola = "Hello World";

    $scope.fotos = fotos.fotos;
    console.log($scope.fotos);


    $scope.crearAlbum = function(){
        if(!$scope.nombre || $scope.nombre === '') { return; }
        fotos.create({
            nombre: $scope.nombre
        });
        $scope.nombre = '';
        fotos.getAll();
    };

}]);

app.controller('MainCtrl',['$scope','Upload','posts','auth','$timeout','$http', function ($scope,Upload,posts,auth,$timeout,$http) {


    $scope.posts = posts.posts;
    $scope.bodyc = {val:''};

    console.log($scope.posts);
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.remove = function(post) {
        return $http.delete('/posts/' + post._id,{headers: {Authorization: 'Bearer '+auth.getToken()}})
            .success(function(data) {
                posts.getAll()

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.addComment = function(idpost){
        if($scope.body === '') { return; }

        //$http.post('/posts/' + idpost + '/comments', comment, {
        //    headers: {Authorization: 'Bearer '+auth.getToken()}
        //}).success(function (data) {
        //
        //}).error(function () {
        //    console.log('Error: ' + data);
        //});

        posts.addComment(idpost, {
            body: $scope.bodyc.val,
            author: 'user'
        }).success(function(comment) {
            posts.getAll();
        });
        $scope.bodyc.val = '';
    };


    $scope.uploadPic = function(file) {

        if(file==undefined)
        {
            posts.create({
                title: $scope.title,
                link: $scope.link
            });
            $scope.title = '';
            $scope.link = '';
        }
        console.log(file);
        console.log($scope.link);
        console.log($scope.title);
        file.upload = Upload.upload({
            url: '/posts',
            data: {title:$scope.title,link:$scope.link},
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
            console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);
            posts.getAll()
        });

    };

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
                usuario.error = error;
            }).then(function(){
                $state.go('home');
            });
        };
    }]);


