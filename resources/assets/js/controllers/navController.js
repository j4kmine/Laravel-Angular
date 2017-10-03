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