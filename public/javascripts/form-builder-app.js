var FormBuidlerApp = angular.module('FormBuilderApp', ['ngRoute']);

FormBuidlerApp.config(function($routeProvider){
    $routeProvider
        .when('/list',{
            templateUrl: 'list-template.html',
            controller: 'ListCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});

FormBuidlerApp.controller('ListCtrl', function($scope, $http){

});