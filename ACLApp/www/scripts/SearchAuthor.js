var AclApp = angular.module('AclApp', []);
AclApp.controller('SearchAuthorCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {

    $scope.diverror = true;
    $scope.divhead = true;
    $scope.back = function () {
        $window.location.href = '/index.html';
    }
    $scope.SearchAuthor = function () {

        $scope.searchCode = 'NAME';
        $scope.searchArg1 = $scope.searchArg1;
        $scope.searchArgt2 = $scope.searchArgt2;
        if ($scope.searchArg1 && $scope.searchArgt2) {
            $scope.searchArg = $scope.searchArg1 + " " + $scope.searchArgt2;
        }
        else if ($scope.searchArg1) {
            $scope.searchArg = $scope.searchArg1;
        }
        else if($scope.searchArgt2) {
            $scope.searchArg = $scope.searchArgt2;
        }


        $scope.searchArgType = 'AND';
        $scope.maxResultsPerPage = 10;
        basicSearch();
    }
    function basicSearch() {
        $http.get("http://64.94.37.21:7014/vxws/SearchService", {
            params: { 'searchCode': $scope.searchCode, 'searchArg': $scope.searchArg, 'maxResultsPerPage': $scope.maxResultsPerPage, 'searchArgType': $scope.searchArgType }
        }).then(function (response) {
            debugger;
            var x2js = new X2JS();
            $scope.bookData = x2js.xml_str2json(response.data);
            $scope.bookDetails = $scope.bookData.voyagerServiceData.serviceData;
            if ($scope.bookDetails) {
                $scope.divhead = false;
                $scope.totalHits = $scope.bookDetails.totalHits.__text;
                $scope.bookDetails = $scope.bookData.voyagerServiceData.serviceData.headingSearchResults.results.result;
            }
            else {
                $scope.diverror = false;
                $scope.ErrorMessage = $scope.bookData.voyagerServiceData.messages.message.__text;
            }
        }, function errorCallback(response) {
            alert('some error!!!!!!');
        });
    }
}]);
