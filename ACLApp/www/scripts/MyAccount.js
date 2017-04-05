angular.module('MyAccount', ['ngCookies'])
 .controller('MyAccountCtrl', ['$scope', '$http', '$location', '$cookies', '$window', function ($scope, $http, $location, $cookies, $window) {
      
     $scope.back = function () {
         $window.location.href = '/index.html';
     }
     $scope.Logout = function () {

         $cookies.patronId = "";
         $cookies.patronHomeUbId = "";
         $cookies.fullname = "";
         $cookies.lastName = "";
         $cookies.authFactorId = "";
         $cookies.authFactorType = "";         
         $scope.divfullname = true;
         $window.location.href = 'ACL-login.html';
     }

     MyAccount($cookies.patronId, $cookies.patronHomeUbId);

     function MyAccount(patronId, patronHomeUbId) {
         $http({
             method: 'get',
             url: 'http://64.94.37.21:7014/vxws/PersonalInfoService',
             params: { 'patronId': patronId, 'patronHomeUbId': patronHomeUbId}
         }).then(function (response) {
           
             var x2js = new X2JS();
             $scope.MyAccountData = x2js.xml_str2json(response.data);
             $scope.MyAccountDetails = $scope.MyAccountData.voyagerServiceData.serviceData;
             if ($scope.MyAccountDetails) {
                 $scope.fullname = $scope.MyAccountDetails.name.fullName.__text;
                 $scope.EmailId = $scope.MyAccountDetails.emailAddress.address.__text;
                 $scope.addressLine1 = $scope.MyAccountDetails.tempAddress.addressLine1.__text;
                 $scope.addressLine2 = $scope.MyAccountDetails.tempAddress.addressLine2.__text;
                 $scope.addressLine3 = $scope.MyAccountDetails.tempAddress.addressLine3.__text;
                 $scope.ActiveAddress = $scope.addressLine1 + ' ' + $scope.addressLine2 + ', ' + $scope.addressLine3;
                 $scope.PermanentAddress = $scope.addressLine1 + ' ' + $scope.addressLine2 + ', ' + $scope.addressLine3;
                 $scope.CellPhone = $scope.MyAccountDetails.permanentAddress.telephone.number.__text;

             } else {

             }

         }, function errorCallback(response) {
             alert('some error!!!!!!');
         });
     }
     
     

 }]);