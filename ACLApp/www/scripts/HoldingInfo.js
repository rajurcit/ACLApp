var AclApp = angular.module('AclApp', ['ngRoute', 'ngSanitize']);
AclApp.config(function ($routeProvider) {
    $routeProvider
        .when('/HoldingInfo/:id', {
            templateUrl: 'Templates/HoldingInfo.html',
            controller: 'holdingInfoCtrl'
        })
});
AclApp.controller('holdingInfoCtrl', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {

    $scope.back = function () {
        $window.location.href = 'SearchBook.html';
    }
    if ($location.search().Holding) {
        var bibId = $location.search().Holding;
        GetHoldingInfo(bibId);
    }
    function GetHoldingInfo(bibId) {
        $http.get("http://64.94.37.21:7014/vxws/GetHoldingsService", {
            params: { 'bibId': bibId, 'link880sFlag': 'YYYY', 'dbCode': 'ZZZZ' }
        }).then(function (response) {
            debugger;
            var x2js = new X2JS();
            $scope.Data = x2js.xml_str2json(response.data);
            $scope.holdingsDetails = $scope.Data.voyagerServiceData.serviceData;
            if ($scope.holdingsDetails) {
                $scope.divhead = false; 
                $scope.holdingsRecord = $scope.holdingsDetails.holdingsRecord;
                if ($scope.holdingsRecord) {
                    for (var i = 0; i < $scope.holdingsRecord.length; i++) {
                        if (i == 0) {
                            if ($scope.holdingsRecord[0]) {
                                var BasicHoldinginfo = $scope.holdingsRecord[0].bibRecord.marcRecord.datafield;
                                for (var j = 0; j < BasicHoldinginfo.length; j++) {
                                    if (BasicHoldinginfo[j]._tag == '020') {
                                        if (BasicHoldinginfo[j].subfield.length) {
                                            for (var k = 0; k < BasicHoldinginfo[j].subfield.length; k++) {
                                                var ISBN = '<span>' + BasicHoldinginfo[j].subfield[k].__text + '</span><br>';
                                                $scope.ISBN += ISBN;
                                                $scope.ISBN = $scope.ISBN.replace('undefined', '');
                                            }
                                        } else {
                                            var ISBN = '<span>' + BasicHoldinginfo[j].subfield.__text + '</span><br>';
                                            $scope.ISBN = ISBN.replace('undefined', '');
                                        }
                                    }
                                    if (BasicHoldinginfo[j]._tag == '245') {
                                        if (BasicHoldinginfo[j].subfield.length) {
                                            for (var k = 0; k < BasicHoldinginfo[j].subfield.length; k++) {
                                                var Title = '<span>' + BasicHoldinginfo[j].subfield[k].__text + '</span><br>';
                                                $scope.Title += Title;
                                                $scope.Title = $scope.Title.replace('undefined', '');
                                            }
                                        } else {
                                            var Title = '<span>' + BasicHoldinginfo[j].subfield.__text + '</span><br>';
                                            $scope.Title = Title.replace('undefined', '');
                                        }

                                    }
                                    if (BasicHoldinginfo[j]._tag == '100') {
                                        if (BasicHoldinginfo[j].subfield.length) {
                                            for (var k = 0; k < BasicHoldinginfo[j].subfield.length; k++) {
                                                var Author = '<span>' + BasicHoldinginfo[j].subfield[k].__text + '</span><br>';
                                                $scope.Author += Author;
                                                $scope.Author = $scope.Author.replace('undefined', '');
                                            }
                                        } else {
                                            var Author = '<span>' + BasicHoldinginfo[j].subfield.__text + '</span><br>';
                                        }

                                    }
                                    if (BasicHoldinginfo[j]._tag == '250') {
                                        if (BasicHoldinginfo[j].subfield.length) {
                                            for (var k = 0; k < BasicHoldinginfo[j].subfield.length; k++) {
                                                var Description = '<span>' + BasicHoldinginfo[j].subfield[k].__text + '</span><br>';
                                                $scope.Description += Description;
                                                $scope.Description = $scope.Description.replace('undefined', '');
                                            }
                                        } else {
                                            var Description = '<span>' + BasicHoldinginfo[j].subfield.__text + '</span><br>';
                                            $scope.Description = Description.replace('undefined', '');
                                        }

                                    }
                                    if (BasicHoldinginfo[j]._tag == '260') {
                                        if (BasicHoldinginfo[j].subfield.length) {
                                            for (var k = 0; k < BasicHoldinginfo[j].subfield.length; k++) {
                                                var Publisher = '<span>' + BasicHoldinginfo[j].subfield[k].__text + '</span><br>';
                                                $scope.Publisher += Publisher;
                                                $scope.Publisher = $scope.Publisher.replace('undefined', '');
                                            }
                                        } else {
                                            var Publisher = '<span>' + BasicHoldinginfo[j].subfield.__text + '</span><br>';
                                            $scope.Publisher = Publisher.replace('undefined', '');
                                        }

                                    }
                                    if (BasicHoldinginfo[j]._tag == '505') {
                                        if (BasicHoldinginfo[j].subfield.length) {
                                            for (var k = 0; k < BasicHoldinginfo[j].subfield.length; k++) {
                                                var Contents = '<span>' + BasicHoldinginfo[j].subfield[k].__text + '</span><br>';
                                                $scope.Contents += Contents;
                                                $scope.Contents = $scope.Contents.replace('undefined', '');
                                            }
                                        } else {
                                            var Contents = '<span>' + BasicHoldinginfo[j].subfield.__text + '</span><br>';
                                            $scope.Contents = Contents.replace('undefined', '');
                                        }

                                    }
                                    if (BasicHoldinginfo[j]._tag == '651') {
                                        if (BasicHoldinginfo[j].subfield.length) {
                                            for (var k = 0; k < BasicHoldinginfo[j].subfield.length; k++) {
                                                var Subject = '<span>' + BasicHoldinginfo[j].subfield[k].__text + '</span><br>';
                                                $scope.Subject += Subject;
                                                $scope.Subject = $scope.Subject.replace('undefined', '');
                                            }
                                        } else {
                                            var Subject = '<span>' + BasicHoldinginfo[j].subfield.__text + '</span><br>';
                                            $scope.Subject = Subject.replace('undefined', '');
                                        }

                                    }



                                }

                            } else { }
                        } else {
                            GetHoldingData($scope.holdingsRecord)
                            console.log('second time');
                        }
                    }
                }
            }
            else {
                $scope.diverror = false;
                $scope.ErrorMessage = $scope.holdingsDetails.voyagerServiceData.messages.message.__text;
            }
        }, function errorCallback(response) {
            alert('some error!!!!!!');
        });
    }

    function GetHoldingData(holdingsRecord) {

        var HoldingInfo = holdingsRecord[0].mfhdCollection.mfhdRecord;
        for (var j = 0; j < HoldingInfo.length; j++) {
            $scope.itemLocationData = HoldingInfo[j].itemCollection.itemLocation.itemLocationData;
            $scope.mfhdData = HoldingInfo[j].mfhdData;
            for (var k = 0; k < $scope.mfhdData.length; k++) {
                if ($scope.mfhdData[k]._name == 'locationDisplayName') {
                    var locationName = 'locationName: <span>' + $scope.mfhdData[k].__text + '</span><br>';
                    $scope.locationName = locationName.replace('undefined', '');
                }
                if ($scope.mfhdData[k]._name == 'databaseName') {
                    var databaseName = 'databaseName: <span>' + $scope.mfhdData[k].__text + '</span><br>';
                    $scope.databaseName = databaseName.replace('undefined', '');
                }
                if ($scope.mfhdData[k]._name == 'callNumber') {
                    var callNumber = 'callNumber: <span>' + $scope.mfhdData[k].__text + '</span><br>';
                    $scope.callNumber = callNumber.replace('undefined', '');
                }
                if ($scope.mfhdData[k]._name == 'updateLocation') {
                    var updateLocation = 'updateLocation: <span>' + $scope.mfhdData[k].__text + '</span><br>';
                    $scope.updateLocation = updateLocation.replace('undefined', '');
                }
                              
            }
             
        }
    }
}]);