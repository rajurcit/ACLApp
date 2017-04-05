// create the module and name it scotchApp
var scotchApp = angular.module('scotchApp', ['ngRoute', 'ngCookies', 'ngSanitize']);

// configure our routes
scotchApp.config(function ($routeProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl: 'Templates/Home.html',
            controller: 'mainController'
        })

        // route for the about page
        .when('/About', {
            templateUrl: 'Templates/About.html',
            controller: 'aboutController'
        })

        .when('/ProductDeatils/:id', {
            templateUrl: 'Templates/ProductDeatils.html',
            controller: 'DetailsController'
        })

        .when('/ARRIVALS', {
            templateUrl: 'Templates/ARRIVALS.html',
            controller: 'mainController'
        })
         .when('/HotProduct', {
             templateUrl: 'Templates/HotProduct.html',
             controller: 'mainController'
         })
        // route for the contact page
        .when('/Contact', {
            templateUrl: 'Templates/Contact.html',
            controller: 'contactController'
        })
        .when('/Test', {
            templateUrl: 'Templates/Test_Append.html',
            controller: 'HomeCtrl1'
        })
        .when('/Login', {
            templateUrl: 'Templates/Login.html',
            controller: 'loginCtrl'
        })
    .when('/Signup', {
        templateUrl: 'Templates/Signup.html',
        controller: 'signupCtrl'
    })
    .when('/table', {
        templateUrl: 'Templates/table.html'
        // controller: 'signupCtrl'
    })
         .when('/table', {
             templateUrl: 'Templates/table.html'
             // controller: 'signupCtrl'
         })
    .when('/voyagerAPI', {
        templateUrl: 'Templates/voyagerAPI.html',
        controller: 'voyagerAPICtrl'
    });
     
});

scotchApp.controller('contactController', function ($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});