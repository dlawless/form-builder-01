var FormBuilderApp = angular.module('FormBuilderApp', ['ngRoute', 'ui.sortable', 'ui.bootstrap']);

FormBuilderApp.config(function($routeProvider){
    $routeProvider
        .when('/new', {
            templateUrl: 'detail-template.html',
            controller: 'DetailCtrl'
        })
        .when('/edit/:id', {
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
        .otherwise({
            redirectTo: '/'
        });
});