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
	        .when('/list', {
	            templateUrl: '/View/view_list_post.html',
	            controller: 'mainController'
	        })
	        .when('/search/:_term', {
	            templateUrl: '/View/view_search.html',
	            controller: 'mainController'
	        })
	        .when('/mypost/', {
	            templateUrl: '/View/view_tammi.html',
	            controller: 'mainController'
	        })
	});

	app.controller("mainController", function($scope, $http, $location, $routeParams) {
	    var root = "https://green-web-blog.herokuapp.com";
	    var maxRandomArticleNumber = 3;
	    $scope.keySearch = "";
	    myId = "598411b3fd49fb00044fd9b3";

	    $scope.apiGetCat = function() {
	        $http.get(root + "/api/categories")
	            .then(function(response) {
	                $scope.categories = response.data;
	            });
	    };

	    $scope.apiGetSingleCat = function(id) {
	        $http.get(root + "/api/categories")
	            .then(function(response) {
	                $scope.categories = response.data;
	                for (i = 0; i < $scope.categories.length; ++i) {
	                    if ($scope.categories[i]._id == id) {
	                        $scope.cat = $scope.categories[i];
	                    }
	                }
	            });
	    };

	    //Search Aritcle
	    $scope.getArticleBySearchKey = function() {
	        $scope.keyWord = $routeParams._term;
	        $http.get(root + '/api/articles/search/' + $scope.keyWord)
	            .then(function successCallbak(response) {
	                $scope.articleGetByKey = response.data;
	            }, function errorCallback(response) {
	                console.log(data, status, headers, config);
	            });
	    }

	    $scope.apiGetArts = function(_callback) {
	        $http.get(root + "/api/articles")
	            .then(function(response) {
	                $scope.articles = response.data;
	                _callback();
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

	    $scope.getArticle = function() {
	        $scope.currentArticleId = $routeParams.id;
	    };


	    $scope.getArticleID = function(id) {
	        angular.forEach($scope.articles, function(value, key) {
	            if (value._id === id) {
	                $scope.article = value;
	                return false;
	            }
	        });
	    };

	    $scope.getAllArticleinCategories = function() {
	        $scope.apiGetArts(function() {
	            $scope.currentCategoryID = $routeParams.id;
	            $scope.articlesInCategory = [];
	            for (i = 0; i < $scope.articles.length; ++i) {
	                if ($scope.articles[i]._category._id == $scope.currentCategoryID) {
	                    $scope.articlesInCategory.push($scope.articles[i]);
	                }
	            }
	        });
	    }

	    //Begin get articles by id
	    var getArticlesById = function(id, maximumArticle) {
	        if (maximumArticle === undefined) {
	            if ($scope.articles === undefined) {
	                maximumArticle = 0;
	            } else {
	                maximumArticle = $scope.articles.length;
	            }
	        }
	        var articles = [];
	        angular.forEach($scope.articles, function(value, key) {
	            if (value._category._id === id && articles.length < maximumArticle) {
	                articles.push(value);
	            }
	        });
	        return articles;
	    };

	    //Begin get my articles 
	    $scope.getMyArticles = function() {
	        $scope.currentMyID = myId;
	        $scope.articlesByMe = getArticlesByMe($scope.currentMyID);
	    }

	    var getArticlesByMe = function(id, maximumArticle) {
	        if (maximumArticle === undefined) {
	            if ($scope.articles === undefined) {
	                maximumArticle = 0;
	            } else {
	                maximumArticle = $scope.articles.length;
	            }
	        }
	        var articles = [];
	        angular.forEach($scope.articles, function(value, key) {
	            if (value._author._id === id && articles.length < maximumArticle) {
	                articles.push(value);
	            }
	        });
	        return articles;

	    };



	    $scope.submitCreateCategory = function() {
	        if ($scope.cat.name.length > 0 &&
	            $scope.cat.description.length > 0) {
	            $http.post(root + "/api/categories", $scope.cat)
	                .then(function successCallbak(response) {
	                    alert("Thành công");
	                    $scope.categories.push(response);
	                    $scope.category.name = "";
	                    $scope.category.description = "";
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

	    // Comment
	    $scope.addCommentforArticle = function() {
	        $scope.newComment._user = $scope.user;
	        $http.put(root + '/api/article/comment/' + $scope.article._id, $scope.newComment)
	            .then(function successCallbak(response) {
	                $scope.article = response.data;
	                // console.log(response.data);
	            }, function errorCallback(response) {
	                // console.log(data, status, headers, config);
	            });
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
	        // alert('me_first');
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
	        // alert('update_first');
	        $scope.article._author = "598411b3fd49fb00044fd9b3";
	        $http.patch(root + '/api/articles/' + $scope.article._id, $scope.article)
	            .then(function successCallback(response) {
	                window.location.href = 'admin.html';
	                alert("Update Success");
	            }, function errorCallback(response) {
	                // console.log(data, status, headers, config);
	            });
	    };


	    $scope.updateCategory = function() {
	        // $scope.category._author = "598411b3fd49fb00044fd9b3";
	        $http.patch(root + '/api/categories/' + $scope.cat._id, $scope.cat)
	            .then(function successCallbak(response) {
	                // alert("failfgf");
	                window.location.href = '/admin_cat.html#/';
	            }, function errorCallback(response) {
	                // console.log(data, status, headers, config);
	                // alert("failfgf");
	            });
	    };

	    $scope.deleteArticle = function() {
	        $http.delete(root + '/api/articles/' + $scope.article._id)
	            .then(function successCallback(response) {
	                console.log('You have already deleted the articles')
	                window.location.href = '/admin.html#/listArticles';
	            }, function errorCallback(response) {
	                // console.log(data, status, headers, config);
	            });
	    };

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
	            //Begin Pagination
	            $scope.viewby = 5;
	            $scope.totalItems = newArticles.length;
	            $scope.currentPage = 1;
	            $scope.itemsPerPage = $scope.viewby;
	            $scope.maxSize = 5;
	            $scope.setPage = function(pageNo) {
	                $scope.currentPage = pageNo;
	            };
	            $scope.pageChanged = function() {
	                console.log('Page changed to: ' + $scope.currentPage);
	            };
	            $scope.setItemsPerPage = function(num) {
	                $scope.itemsPerPage = num;
	                $scope.currentPage = 1;
	            }
	        }

	        // dynamic
	        // $scope.getAllArticleinCategories();
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