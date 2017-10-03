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