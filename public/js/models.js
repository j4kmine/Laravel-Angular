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
apps.factory('galleryModel',['$http',function($http){
	return{
		savegallery:function(galleryData){
			return $http({
				headers:{
					'Content-Type' : 'application/json',
					 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				},
				url : baseUrl +'galleryadd',
				method:'POST',
				data:{
					name:galleryData.name
				}			
			});			
		},
		getAllGalleries:function(){
			return $http.get(baseUrl +'gallerylist');
		},
		getGalleryById:function(id){
			return $http.get(baseUrl +'galleryget/' + id);
		},
		deleteSinglegallery:function(data){
			return $http({
				headers:{
					'Content-Type' : 'application/json',
					
				},
				url : baseUrl +'delete-single-image',
				method:'POST',
				data:{
					imageId:data.imageId,
					galleryId:data.galleryId
				}			
			});		
		}
	};
}])