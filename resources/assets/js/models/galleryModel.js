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