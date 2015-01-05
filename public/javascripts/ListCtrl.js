FormBuilderApp.controller('ListCtrl', function($scope, $http){
    $http.get('/api/forms').success(function(results) {
        $scope.forms = results;
    }).error(function(data){
        console.log('error: ' + data);
    });
});
