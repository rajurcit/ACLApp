var AclApp = angular.module('AclApp', []);
AclApp.controller('SearchSubjectCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.back = function () {
        $window.location.href = '../index.html';
    }
    $scope.diverror = true;
    $scope.divhead = true;
    $scope.SearchSubject = function () {

        $scope.searchCode = 'SUBJ';
        $scope.searchArg = $scope.searchArg;
        $scope.searchArgType = 'AND';
        $scope.maxResultsPerPage = 100;
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
