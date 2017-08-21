	//
	var app = angular.module('app', ['ngRoute', 'ngTagsInput', 'textAngular', 'ui.bootstrap']);
	// configure our routes
	app.config(function($routeProvider) {
	    $routeProvider
	    // route 
	        .when('/', {
	            templateUrl: '/View/view_homepage.html',
	            controller: 'mainController'
	        })
	        .when('/post', {
	            templateUrl: '/View/view_post.html',
	            controller: 'mainController'
	        })
	});

	app.controller("mainController", function($scope, $http, $location) {
	    var root = "https://green-web-blog.herokuapp.com";
	    var maxRandomArticleNumber = 3;

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

	    $scope.submitCreateCategory = function() {
	        if ($scope.newCategory.name.length > 0 &&
	            $scope.newCategory.description.length > 0) {
	            $http.post(root + "/api/categories", $scope.newCategory)
	                .then(function uccessCallbak(response) {
	                    alert("Thành công");
	                    $scope.categories.push(response);
	                    $scope.newCategory.name = "";
	                    $scope.newCategory.description = "";
	                }, function errorCallback(response) {
	                    // console.log(data, status, headers, config);
	                });
	        } else {
	            alert("Input invalid");
	        }
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


	    $scope.getArticleID = function(id) {
	        angular.forEach($scope.articles, function(value, key) {
	            if (value._id === id) {

	                $scope.article = value;
	                return false;
	            }
	        });
	    };


	    $scope.submitCreateArticle = function() {
	        console.log($scope.newArticle);
	        $scope.newArticle._author = "598411b3fd49fb00044fd9b3";
	        $http.post(root + '/api/articles/', $scope.newArticle)
	            .then(function successCallbak(response) {
	                alert("Thành công");
	                // window.location.href = 'admin.html';
	            }, function errorCallback(response) {
	                // console.log(data, status, headers, config);
	            });
	    };

	    $scope.updateArticle = function() {
	        $scope.article._author = "598411b3fd49fb00044fd9b3";
	        $http.patch(root + '/api/articles/' + $scope.article._id, $scope.article)
	            .then(function successCallback(response) {
	                window.location.href = 'admin.html';
	                alert("Update Success");
	            }, function errorCallback(response) {
	                // console.log(data, status, headers, config);
	            });
	    }


	    $scope.deleteArticle = function() {
	        $http.delete(root + '/api/articles/' + $scope.article._id)
	            .then(function successCallback(response) {
	                console.log('You have already deleted the articles')
	                window.location.href = '/admin.html#/listArticles';
	            }, function errorCallback(response) {
	                // console.log(data, status, headers, config);
	            });
	    }

	    //Scope watch
	    $scope.$watchCollection("articles", function(newArticles, oldArticles) {
	        if (newArticles != undefined) {
	            //Update random articles
	            $scope.randomArticles = [];
	            var listArticles = newArticles.slice();
	            for (var i = 0; i < maxRandomArticleNumber; i++) {
	                if (listArticles.length > 0) {
	                    var random = Math.floor(Math.random() * listArticles.length);
	                    $scope.randomArticles.push(listArticles[random]);
	                    listArticles.splice(random, 1);
	                };
	            };
	        }
	    });


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