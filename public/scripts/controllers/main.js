(function ()
{
	'use strict';
	angular
	.module('deskbookersApp')
	.controller('MainCtrl', MainCtrl);
   function MainCtrl($scope, MapService) {

   		MapService.map_service().then(function(data){
   			$scope.list = [];
   			$scope.markers = [];
   			console.log(data);
   			var mapOptions = {
		        mapTypeId: google.maps.MapTypeId.ROADMAP
		    }

		    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
		    MapService.set_bounds($scope.map);
		    $scope.list = MapService.get_listings();
		    console.log($scope.list);
		    for (var i = 0; i < $scope.list.length; i++){
		        MapService.create_marker($scope.list[i], $scope.map, $scope.markers);
		    }
			// $scope.markers = [];
	    
		 //    
		    
		     
		    
		    
		    $scope.openInfoWindow = function(e, selectedMarker){
		        e.preventDefault();
		        google.maps.event.trigger(selectedMarker, 'click');
		    }
   		});
	  }
})();