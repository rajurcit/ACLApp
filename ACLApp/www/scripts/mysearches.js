angular.module('mysearches', ['ngCookies'])
 .controller('mysearchesCtrl', ['$scope', '$http', '$location', '$cookies', '$window', function ($scope, $http, $location, $cookies, $window) {
     $scope.back = function () {
         $window.location.href = '/index.html';
     }
  
     Mysearches($cookies.lastName, $cookies.authFactorType, $cookies.patronHomeUbId, $cookies.patronId, $cookies.authFactorId);
     function Mysearches(lastName, loginType, patronHomeUbId, patronId, Id) {
         $http({
             method: 'get',
             url: 'http://sirez-server2/AmericanCenter/Aclservices.asmx/Mysearches',
             params: { 'lastName': lastName, 'loginType': loginType, 'patronHomeUbId': patronHomeUbId, 'patronId': patronId, 'Id': Id }
         }).then(function (response) {
             var Rdata = response.data.replace(/(&lt;)/g, "<");
             Rdata = Rdata.replace(/(&gt;)/g, ">").replace('<?xml version="1.0" encoding="utf-8"?>', '').replace('</string>', '').replace('<string xmlns="http://tempuri.org/">', '').replace('<?xml version="1.0" encoding="UTF-8"?>', '').replace(/\n/g, '');

             var x2js = new X2JS();
             $scope.MysearchesData = x2js.xml_str2json(Rdata);
             $scope.MysearchesDetails = $scope.MysearchesData.voyagerServiceData.serviceData.queries.query;
 
         }, function errorCallback(response) {
             alert('some error!!!!!!');
         });
     }

 }]);