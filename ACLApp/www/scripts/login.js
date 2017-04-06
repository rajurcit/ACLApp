var AclApp = angular.module('AclApp', ['ngCookies', 'ngStorage']);
AclApp.controller('SearchAuthorCtrl', ['$scope', '$http', '$window', '$localStorage', '$location', function ($scope, $http, $window, $localStorage,$location) {

    $scope.divfullname = false;
    $scope.divError = true;

    $scope.loginType = [{ ID: 'B', Title: 'Barcode' }, { ID: 'I', Title: 'Institution Id' }, { ID: 'S', Title: 'Social Security Number' }, ];

    //$scope.back1 = function () {
    //  //  window.location = 'index.html';
    //    $location.path("index.html");
    //}
    $scope.mysearches = function () {
          window.location = 'mysearches.html';
        
    }
    $scope.MyAccount = function () {

        window.location = 'MyAccount.html';
    }
    $scope.login = function () {
        var loginTypes = $scope.user.loginTypes;
        var lastName = $scope.user.lastname;
        var Id =  $scope.user.ID;
        login(lastName, loginTypes, Id);
         
    }
    function login(lastName, loginTypes, Id) {
        
        $http.get("http://192.168.72.6/AmericanCenter/Aclservices.asmx/AuthenticatePatronService", {
            params: { 'lastName': lastName, 'loginType': loginTypes, 'Id': Id }
        }).then(function (response) {
                     
            var Rdata = response.data.replace(/(&lt;)/g, "<");
            Rdata = Rdata.replace(/(&gt;)/g, ">").replace('<?xml version="1.0" encoding="utf-8"?>', '').replace('</string>', '').replace('<string xmlns="http://tempuri.org/">', '').replace('<?xml version="1.0" encoding="UTF-8"?>', '').replace(/\n/g, '');
            var x2js = new X2JS();
            $scope.loginData = x2js.xml_str2json(Rdata);
            $scope.loginDetails = $scope.loginData.voyagerServiceData.serviceData;
            if ($scope.loginDetails) {
                $scope.divfullname = false;
                $scope.fullname = $scope.loginDetails.fullName.__text;
                $localStorage.fullname = $scope.loginDetails.fullName.__text;
                $scope.patronHomeUbId = $scope.loginDetails.patronIdentifier._patronHomeUbId;
                $localStorage.patronHomeUbId = $scope.loginDetails.patronIdentifier._patronHomeUbId;
                $scope.patronId = $scope.loginDetails.patronIdentifier._patronId;
                $localStorage.patronId = $scope.loginDetails.patronIdentifier._patronId;
                $scope.lastName = $scope.loginDetails.patronIdentifier._lastName;
                $localStorage.lastName = $scope.loginDetails.patronIdentifier._lastName;
                $localStorage.authFactorId = $scope.loginDetails.patronIdentifier.authFactor.__text;
                $localStorage.authFactorType = $scope.loginDetails.patronIdentifier.authFactor._type;

                $scope.divError = true;
            }
            else {
                $scope.Errormessage = $scope.loginData.voyagerServiceData.messages.message.__text;
                $scope.divError = false;
                $scope.divfullname = true;
            }
        }, function errorCallback(response) {
            alert('some error!!!!!!');
        });
    }
     
}]);
