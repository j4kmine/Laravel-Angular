apps.controller('userController',['$scope','$location','userModel', function($scope,$location,userModel){
			angular.extend($scope, {
		        login: {
		            username: 'bayu@katadata.co.id',
		            password: 'bayu123'
		        }
		    });
		   angular.extend($scope, {
	        doLogin: function(loginForm) {
	            var data = {
	                email: $scope.login.username,
	                password: $scope.login.password
	            };

	            userModel.doLogin(data).then(function() {
	               
	            }).then(function (){
	            	//if accesible
					 $location.path('/dashboard');
			    },function (){
			    	// if auth is not accessible

			   });
	        },
	        doLogout:function(){
	        	userModel.douserLogout();
	        	$location.path('/');
	        }
	    });
}]);
apps.controller('globalController',['$scope',function($scope){
	$scope.templates ={};
	$scope.templates.nav = "templates/partials/nav.html";
}]);
apps.controller('navController',['$scope','userModel','$location',function($scope,userModel,$location){
	angular.extend($scope,{
		user:userModel.getUserObject(),
		 navUrl: [{
            link: 'Home',
            url: '/dashboard',
            subMenu: [{
                link: 'View Gallery',
                url: '/gallery/view'
            }, {
                link: 'Add Gallery',
                url: '/gallery/add'
            }]
        }, {
            link: 'View Gallery',
            url: '/gallery/view'
        }, {
            link: 'Add Gallery',
            url: '/gallery/add'
        }, {
            link: 'Invitations',
            url: '/invitation/list'
        }]

	});
	angular.extend($scope, {
	    doLogout:function(){
        	userModel.douserLogout();
        	$location.path('/');
        },
        chekActiveLink:function(route){

        	if($location.$$path == route){
        
        		return 'active-links';
        	}

        }
	});
}]);
apps.controller('galleryController',['$scope','$location','galleryModel','$routeParams',function($scope,$location,galleryModel,$routeParams){
		galleryModel.getAllGalleries().then(function(response) {
           $scope.galleries = response.data;
         
        });
        if($routeParams.id){
        	galleryModel.getGalleryById($routeParams.id).then(function(response) {
	           $scope.singleGallery = response.data;
	        });
        }
		angular.extend($scope,{
			newGallery:{},
			errorDiv:false,
			errorMessage:{},
			singleGallery:{},
			dropzoneConfig: {
                'options': {
                    'url': baseUrl + 'uploadfile'
                },
                'eventHandlers': {
                    'sending': function(file, xhr, formData) {
                        // formData.append('_token', csrfToken);
                        formData.append('galleryId', $routeParams.id);
                    },
                    'success': function(file, response) {
                       
                    }
                }
            }

		});
		angular.extend($scope,{
			saveNewGallery:function(addGalleryform){
				if(addGalleryform.$valid){
					galleryModel.savegallery($scope.newGallery).then(function() {			               
			            }).then(function (){
			            	//if accesible
							 $location.path('/gallery/view');
							 $scope.formSubmitted= false;
					    },function (){
					    	// if auth is not accessible

					   });
					
				}else{
					
					$scope.formSubmitted= true;
				}

			},
			
		});
}]);
apps.factory('userModel',['$http','$cookies',function($http,$cookies){
	var userModel = {};
	userModel.doLogin = function(loginData){
		console.log(loginData);
		var status;
		return $http({
					headers:{
						'Content-Type' : 'application/json'
					},
					url : baseUrl +'auth',
					method:'POST',
					data:{
						email:loginData.email,
						password:loginData.password
					}

			}).then(function (resposne){		
				$cookies.put('auth',JSON.stringify(resposne));
				
		    },function (error){
		    	alert("error");
		   });
	};
	 userModel.getAuthStatus = function() {
        var status = $cookies.get('auth');
        if (status) {
            return true;
        } else {
            return false;
        }
    };
    userModel.getUserObject = function(){
    	var userObj = angular.fromJson($cookies.get('auth'));
    	return userObj;
    };
    userModel.douserLogout = function(){
    	$cookies.remove('auth');
    };
	return userModel;
}])