	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute']);

	// configure our routes
	scotchApp.config(function($routeProvider) {
	    $routeProvider

	    // route for the home page
	        .when('/', {
	        templateUrl: '/For_post.html',
	        controller: 'mainController'
	    })

	    // route for the about page
	    .when('/about', {
	        templateUrl: 'pages/about.html',
	        controller: 'aboutController'
	    })

	    // route for the contact page
	    .when('/contact', {
	        templateUrl: 'pages/contact.html',
	        controller: 'contactController'
	    });
	});



	var app = angular.module("scotchApp", []);
	app.controller("mainController", function($scope, $http) {
	    var root = "https://green-web-blog.herokuapp.com";
	    var apiGetArticles = function() {
	        $http.get(root + '/api/articles')
	            .then(function(response) {
	                $scope.articles = response.datda;
	            });
	    };
	    var apiGetCategories = function() {
	        $http.get(root + '/api/categories')
	            .then(function(response) {
	                $scope.categories = response.datda;
	            });
	    };
	    var init = function() {
	        apiGetArticles();
	        apiGetCategories();
	    };
	    init();
	});