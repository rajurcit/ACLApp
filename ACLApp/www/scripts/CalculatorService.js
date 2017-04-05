var CalculatorService = angular.module('CalculatorService', [])
.service('Calculator', function ($http) {
    debugger;
    this.square = function () {
        var data = $http({
            method: 'GET',
            url: 'http://staging.sirez.com/babyhugzservice/ProductApi.svc/GetNewProductList'
        }).then(function successCallback(response) {
            var data = response.data;
        }, function errorCallback(response) {

        });
        return data;
    };

    this.add = function (a) {
        return a + a
    };
    this.root = function (a) {
        return a * a * a
    };
});

 