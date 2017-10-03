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