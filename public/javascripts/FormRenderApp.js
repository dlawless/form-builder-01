var FormRenderApp = angular.module('FormRenderApp', ['ngRoute', 'ui.bootstrap']);

FormRenderApp.config(function($routeProvider){
   $routeProvider
       .when('/', {
           templateUrl: 'render-template.html',
           controller: 'MainCtrl'
       })
       .when('/thanks' , {
           templateUrl: 'thanks-for-submitting-template.html',
           controller: 'MainCtrl'
       })
       .otherwise({
           redirectTo: '/'
       });
});

FormRenderApp.controller('MainCtrl', function($scope, $http, $location) {
    $scope.data = {};
    var url = '/api/forms/' + id;
    console.log('url: ' + url);
    $scope.data = {};
    $http.get(url).success(function(data){
        var id = data._id;
        delete data._id;
        data.parentId = id;
        $scope.data.form = data;
    });

    $scope.saveForm = function() {
        console.log($scope.data.form);
        $http.post('/api/formResponses/', $scope.data.form).success(function(result){
            console.log(result);
            $location.path('/thanks');
        }).error(function(err) {
            console.log('err: ' + err);
        });
    };

    $scope.openCalendar = function($event) {
        console.log('openCalendar');
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
});