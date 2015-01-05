var FormRenderApp = angular.module('FormRenderApp', ['ngRoute']);

FormRenderApp.config(function($routeProvider){
   $routeProvider
       .when('/', {
           templateUrl: 'render-template.html',
           controller: 'MainCtrl'
       })
       .otherwise({
           redirectTo: '/'
       });
});

FormRenderApp.controller('MainCtrl', function($scope, $http, $routeParams) {
    $scope.data = {};
    var url = '/api/forms/' + id;
    console.log('url: ' + url);
    $scope.data = {};
    $http.get(url).success(function(data){
        delete data._id;
        $scope.data.form = data;
    });
});