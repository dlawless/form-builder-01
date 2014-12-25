var testApp = angular.module('TestApp', ['ngRoute','ui.bootstrap']);

//testApp.config(function($routeProvider){
//    $routeProvider
//        .when('/', {
//            templateUrl: 'myModalContent.html'
//        })
//});

testApp.controller('ModalDemoCtrl', function($scope, $modal) {
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function(size) {
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function() {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function(selectedItem){
            $scope.selected = selectedItem;
        }, function() {
            console.log('Modal dismissed at: ' + new Date());
        });
    };
});

testApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});