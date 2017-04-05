myApp.controller('HomeCtrlr', function ($scope, Calculator, $http) {

    $scope.findSquare = function () {
        $scope.root = Calculator.root($scope.number);
        
    }
});