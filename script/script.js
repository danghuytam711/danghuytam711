	//
	var app = angular.module('app', ['ngRoute']);
	// configure our routes
	app.config(function($routeProvider) {
	    $routeProvider
	    // route 
	        .when('/', {
	            templateUrl: '/view/view_homepage.html',
	            controller: 'mainController'
	        })
	        .when('/post', {
	            templateUrl: '/view/view_post.html',
	            controller: 'mainController'
	        })
	});

	app.controller("mainController", function($scope, $http, $location) {
	    var root = "https://green-web-blog.herokuapp.com";

	    $scope.apiGetCat = function() {
	        $http.get(root + "/api/categories")
	            .then(function(response) {
	                $scope.categories = response.data;
	            });
	    };

	    $scope.apiGetArts = function() {
	        $http.get(root + "/api/articles")
	            .then(function(response) {
	                $scope.articles = response.data;
	            });
	    };

	    $scope.apiGetArt = function() {
	        $http.get(root + "/api/articles")
	            .then(function(response) {
	                $scope.articles = response.data;
	                var id = $location.search().id;
	                for (i = 0; i < $scope.articles.length; ++i) {
	                    if ($scope.articles[i]._id == id) {
	                        $scope.art = $scope.articles[i];
	                    }
	                }
	            });
	    }

	    $scope.getCatNameOfArt = function(id) {
	        if (undefined != $scope.categories) {
	            for (i = 0; i < $scope.categories.length; i++) {
	                var cat = $scope.categories[i];
	                if (cat._id == id) {
	                    return cat.name;
	                }
	            }
	        };
	    }



	    $scope.login = function() {
	        $http.post(root + '/api/users/auth', $scope.user)
	            .success(function(response) {
	                var isSuccess = response.success;
	                if (isSuccess) {
	                    console.log(response);
	                } else {

	                    alert(response.message);
	                }
	            }).error(function(data, status, headers, config) {
	                console.log(data, status, headers, config);
	            });
	    };
	});