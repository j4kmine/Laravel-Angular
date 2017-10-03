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