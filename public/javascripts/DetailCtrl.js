FormBuilderApp.controller('DetailCtrl', function($scope, $http, $routeParams, $location){
    // If there's an id it's an existing form otherwise assume new
    if(!$routeParams.id){
        $scope.form = {
            fields: []
        };
    } else {
        $http.get('/api/forms/' + $routeParams.id).success(function(result){
            $scope.form = result;
        }).error(function(data) {
            console.log('error: ' + data);
        });
    }

    $scope.newField = {};

    $scope.sortableOptions = {
        stop: function(e, ui) {
            //console.log(ui.item.scope().field);
            $scope.adjustOrdinals();
        },
        cursor: 'move',
        axis: 'y',
        containment: 'parent'
    };

    $http.get('/api/dataTypes').success(function(results){
        $scope.dataTypes = results;
    });

    $scope.saveForm = function() {
        console.log(JSON.stringify($scope.form, null, 2));
        // If this is an existing form
        if($scope.form._id) {
            $http.put('/api/forms/' + $scope.form._id, $scope.form).success(function (result) {
                console.log(result);
            }).error(function (err) {
                console.log('err: ' + err);
            });
        } else {
            // No id so assume new form
            $scope.adjustOrdinals();

            $http.post('/api/forms/', $scope.form).success(function(result){
                console.log(result);
                $location.path('/list');
            }).error(function(err) {
                console.log('err: ' + err);
            });
        }
    };

    $scope.adjustOrdinals = function() {
        for(var i = 0; i < $scope.form.fields.length; i++) {
            console.log(i);
            console.log($scope.form.fields[i]);
            $scope.form.fields[i].ordinal = i + 1;
        }
    }

    $scope.addField = function(newField) {
        if(!$scope.form.fields){
            $scope.form.fields = [];
        }
        $scope.form.fields.push(newField);
        $scope.newField = {};
    };

    $scope.removeField = function(field) {
        var index = $scope.form.fields.indexOf(field);
        $scope.form.fields.splice(index, 1);
    };
});