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
        .when('/responses/:id', {
            templateUrl: 'response-list-template.html',
            controller: 'ResponseListCtrl'
        })
        .when('/edit/:id', {
            templateUrl: 'detail-template.html',
            controller: 'DetailCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});

FormBuilderApp.controller('ResponseListCtrl', function($scope, $http, $routeParams, $location) {
    $scope.data = {};
    if($routeParams.id){
        $http.get('/api/formResponses/' + $routeParams.id).success(function(results){
            $scope.data.forms = results;
        }).error(function(data) {
            console.log('error: ' + data);
        });
    }
});