apps.controller('galleryController',['$scope','$location','galleryModel','$routeParams', 'Lightbox','data',function($scope,$location,galleryModel,$routeParams, Lightbox,data){
		
        if(data && data.galleries != undefined){
            data.galleries.then(function(response) {
               $scope.galleries = response.data;

            });
          
        	// data.galleries.success(function(response){
        	// 	 $scope.galleries = response.data;
        	// });
        }
        if(data && data.singleGallery != undefined){
        	data.singleGallery.then(function(response){
        		  $scope.singleGallery = response.data;
        	});
        }        
        //emit dispatches an event name upwards through the scope hierarchy and notify to the registered $rootScope.Scope listeners. against broadcast
        
         $scope.$on('imageAdded', function(event, args) {
            $scope.singleGallery = args;
          
            $scope.$apply();
        });
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
                        $scope.singleGallery.images.push(response);
                        $scope.$emit('imageAdded', $scope.singleGallery);
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
			 openLightboxModal: function(index) {
                Lightbox.openModal($scope.singleGallery.images, index);
            },
            deleteImage:function(imageId){
            	var data= {
					imageId:imageId,
					galleryId:$routeParams.id
				};
				galleryModel.deleteSinglegallery(data).then(function(response) {	
		            $scope.singleGallery = response.data;
		          
		        });
            	
            	
            },
		});
}]);