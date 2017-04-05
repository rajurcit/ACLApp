var AclApp = angular.module('AclApp', ['ngCookies']);
AclApp.controller('loginctrl', function ($scope, $http, $location, $cookies, $cookieStore, $window) {  
    $scope.divfullname = false;
    $scope.divError = true;
    
    $scope.loginType = [{ ID: 'B', Title: 'Barcode' }, { ID: 'I', Title: 'Institution Id' }, { ID: 'S', Title: 'Social Security Number' }, ];    
    
    $scope.mysearches = function () {
     //   $window.location.href = 'mysearches.html';
    }
    $scope.MyAccount = function () {
         
        $window.location.href = 'MyAccount.html';
    }
    $scope.BasicSearchBook = function () {
        $window.location.href = 'SearchBook.html';
    }
    $scope.SearchSubject = function () {
        $window.location.href = 'SearchSubject.html';
    }
    $scope.SearchAuthor = function () {
        $window.location.href = 'SearchAuthor.html';
    }
    $scope.HoldingInfo = function () {
        $window.location.href = 'Templates/HoldingInfo.html';
    }

    $scope.login = function () {        
        var loginTypes = $scope.user.loginTypes;
        var lastName = $scope.user.lastname;
        var Id = $scope.user.ID;
        login(lastName, loginTypes, Id);
    }

    function login(lastName, loginType, Id) {
        $http({
            method: 'get',
            //url: 'http://localhost:52361/Aclservices.asmx/AuthenticatePatronService',
            url: 'http://sirez-server2/AmericanCenter/Aclservices.asmx/AuthenticatePatronService',
            params: { 'lastName': lastName, 'loginType': loginType, 'Id': Id }
        }).then(function (response) {
            var Rdata = response.data.replace(/(&lt;)/g, "<");
            Rdata = Rdata.replace(/(&gt;)/g, ">").replace('<?xml version="1.0" encoding="utf-8"?>', '').replace('</string>', '').replace('<string xmlns="http://tempuri.org/">', '').replace('<?xml version="1.0" encoding="UTF-8"?>', '').replace(/\n/g, '');
            var x2js = new X2JS();
            $scope.loginData = x2js.xml_str2json(Rdata);
            $scope.loginDetails = $scope.loginData.voyagerServiceData.serviceData;
            if ($scope.loginDetails) {
                $scope.divfullname = false;

                $scope.fullname = $scope.loginDetails.fullName.__text;
                $cookies.fullname = $scope.loginDetails.fullName.__text;
                $scope.patronHomeUbId = $scope.loginDetails.patronIdentifier._patronHomeUbId;
                $cookies.patronHomeUbId = $scope.loginDetails.patronIdentifier._patronHomeUbId;
                $scope.patronId = $scope.loginDetails.patronIdentifier._patronId;
                $cookies.patronId = $scope.loginDetails.patronIdentifier._patronId;
                $scope.lastName = $scope.loginDetails.patronIdentifier._lastName;
                $cookies.lastName = $scope.loginDetails.patronIdentifier._lastName;
                $cookies.authFactorId = $scope.loginDetails.patronIdentifier.authFactor.__text;
                $cookies.authFactorType = $scope.loginDetails.patronIdentifier.authFactor._type;

                $scope.divError = true;
            }
            else {
                $scope.Errormessage = $scope.loginData.voyagerServiceData.messages.message.__text;
                $scope.divError = false;
                $scope.divfullname = true;
            }

        }, function errorCallback(response) {
            alert('Not connected Services!!!!!!');
        });
    }

});





