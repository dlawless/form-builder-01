var FormBuilderApp = angular.module('FormBuilderApp', ['ngRoute', 'ui.sortable']);

FormBuilderApp.config(function($routeProvider){
    $routeProvider
        .when('/new', {
            templateUrl: 'detail-template.html',
            controller: 'DetailCtrl'
        })
        .when('/list',{
            templateUrl: 'list-template.html',
            controller: 'ListCtrl'
        })
        .when('/edit/:id', {
            templateUrl: 'detail-template.html',
            controller: 'DetailCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});

FormBuilderApp.controller('ListCtrl', function($scope, $http){
    $http.get('/api/forms').success(function(results) {
        $scope.forms = results;
    }).error(function(data){
        console.log('error: ' + data);
    });
});
