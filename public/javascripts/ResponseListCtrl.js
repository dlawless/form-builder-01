FormBuilderApp.controller('ResponseListCtrl', function($scope, $http, $routeParams, $location) {
    $scope.data = {};
    if($routeParams.id){
        $http.get('/api/formResponses/' + $routeParams.id).success(function(results){
            $scope.data.forms = results;
        }).error(function(data) {
            console.log('error: ' + data);
        });
    };

    $scope.orderFieldsByLength = function(form) {
        return form.fields.length;
    }
});