var app = angular.module('flapperNews', ['ui.router','ngMaterial','ngFileUpload']);


app.directive('barranav', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/_barra.html'
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
            .state('documents', {
                url: '/documents/{id}',
                templateUrl: 'templates/document.html',
                controller: 'DocumentCtrl',
                resolve: {
                    document: ['$stateParams', 'documents', function($stateParams, documents) {
                        return documents.get($stateParams.id);
                    }]}

            }).state('login', {
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
            console.log(doc);
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
                console.log("Postcontroller: upload then ");
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