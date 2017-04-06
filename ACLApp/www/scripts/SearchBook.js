var AclApp = angular.module('AclApp', []);
AclApp.controller('Searchctrl', function ($scope, $http, $rootScope, $location, $templateCache, SearchPropertiesService, $window) {
    $scope.diverror = true;
    $scope.divhead = true;
    GetsearchTypes();
    $scope.back = function () {         
        window.location = '../index.html';
    }
 
    function GetsearchTypes() {
     
        SearchPropertiesService.GetsearchTypes('203.115.101.198')
            .then(function (response) {
                $scope.searchTypes = response.voyagerServiceData.serviceData;
                if ($scope.searchTypes.searchTypes) {                    
                    $scope.searchType = $scope.searchTypes.searchTypes.searchType;
                    for (var i = 0; i < $scope.searchType.length; i++) {
                        if ($scope.searchType[i].searchName.__text == 'Keyword Anywhere')
                            $scope.searchType[i].searchName.__text = 'All Fields';

                        if ($scope.searchType[i].searchName.__text == 'ISBN')
                            $scope.searchType.splice(i, 1);
                        if ($scope.searchType[i].searchName.__text == 'ISSN')
                            $scope.searchType.splice(i, 1);
                        if ($scope.searchType[i].searchName.__text == 'Publisher: Name')
                            $scope.searchType.splice(i, 1);
                        if ($scope.searchType[i].searchName.__text == 'Series')
                            $scope.searchType.splice(i, 1);
                        if ($scope.searchType[i].searchName.__text == 'Publisher: Date')
                            $scope.searchType.splice(i, 1);
                        if ($scope.searchType[i].searchName.__text == 'Personal Name')
                            $scope.searchType.splice(i, 1);
                        if ($scope.searchType[i].searchName.__text == 'OPAC Geospatial Search')
                            $scope.searchType.splice(i, 1);
                        if ($scope.searchType[i].searchCode.__text == 'GPOL')
                            $scope.searchType.splice(i, 1);
                    }
                }
                if ($scope.searchTypes.searchDatabases) {
                    $scope.searchDatabases = $scope.searchTypes.searchDatabases.searchDatabase;
                }
                if ($scope.searchTypes.searchLimits) {
                    $scope.searchLimits = $scope.searchTypes.searchLimits.locations.locationName;
                }
                if ($scope.searchTypes.mapSearchProperties) {
                    $scope.unitType = $scope.searchTypes.mapSearchProperties.unitTypes.unitType;
                    $scope.formatType = $scope.searchTypes.mapSearchProperties.formatTypes.formatType;
                }
                else {
                    console.log('error');
                }
            },
                function (errorMessage) {
                    console.log(errorMessage);
                });
    };

    $scope.SearchBasic = function () {

        $scope.searchCode = $scope.ddlsearchType.searchCode.__text;
        $scope.searchArg = $scope.searchArg;
        $scope.maxResultsPerPage = 100;
        $scope.ddlsearchTexts = $scope.ddlsearchType.searchName.__text;
        basicSearch();
    }

    function basicSearch() {
        $http.get("http://64.94.37.21:7014/vxws/SearchService", {
            params: { 'searchCode': $scope.searchCode, 'searchArg': $scope.searchArg, 'maxResultsPerPage': $scope.maxResultsPerPage,'searchArgType':'AND'}
        }).then(function (response) {
            var x2js = new X2JS();
            $scope.bookData = x2js.xml_str2json(response.data);
            $scope.bookDetails = $scope.bookData.voyagerServiceData.serviceData;
            if ($scope.bookDetails) {
                $scope.divhead = false;
                $scope.totalHits = $scope.bookDetails.totalHits.__text;
               
                $scope.bookDetails = $scope.bookData.voyagerServiceData.serviceData.bibSearchResults.results.result;

            }
            else {
                $scope.diverror = false;
                $scope.ErrorMessage = $scope.bookData.voyagerServiceData.messages.message.__text;

            }

        }, function errorCallback(response) {
            alert('some error!!!!!!');
        });
    }
});
