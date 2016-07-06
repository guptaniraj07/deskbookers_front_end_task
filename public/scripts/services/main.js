(function ()
{
  'use strict';

  angular
  .module('deskbookersApp')
  .factory('MapService', MapService);

  /** @ngInject */
  function MapService($http){
  	var mapFactory = {};
    var _list = [];
    var _bounds = {};
    var _info_window = new google.maps.InfoWindow();

  	var service_url = 'https://www.deskbookers.com/nl-nl/sajax.json?q=Amsterdam&type=-&people=any&favorite=0&pid=&sw=52.293753%2C4.634942&ne=52.455562%2C5.162286&ids=17201%2C19640%2C13692%2C13691%2C12136%2C17938%2C15292%2C14886%2C14885%2C14884%2C14883%2C15730%2C15353%2C15351%2C15330%2C15080%2C17290%2C15454%2C15451%2C15379';
  	var _map_service = function(values){
        var data = $http.get(service_url);
        return data.then(function(data){
          _list = data.data.rows;
          console.log(_list);
          _bounds = data.data.bounds;
          return {success : 'Ready'};
        },
        function(data){
          return {error: 'An error occured while fetching results.'};
        }
        );//returns response
  	};

    var _create_marker = function (info, map, markers){
            
            var marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(info.coordinate[0], info.coordinate[1]),
                title: info.name
            });
            marker.content = '<div class="infoWindowContent">' + info.address_object.address_line1 + '</br>' + 
            (info.address_object.address_line2 === null ? '' : (info.address_object.address_line2 + '</br>')) + 
            (info.address_object.address_line3 === null ? '' : (info.address_object.address_line3 + '</br>')) +
            info.address_object.place + '</br>' + info.address_object.country + '</br>' + 
            info.address_object.postalcode + '</br>' + '</div>';
            
            google.maps.event.addListener(marker, 'click', function(){
                _info_window.setContent('<h4>' + marker.title + '</h4>' + marker.content);
                _info_window.open(map, marker);
            });
            markers.push(marker);
        } 

    var _set_bounds = function(map){
      var southWest = new google.maps.LatLng(_bounds.s, _bounds.w);
      var northEast = new google.maps.LatLng(_bounds.n, _bounds.e);
      var bounds = new google.maps.LatLngBounds(southWest,northEast);
      map.fitBounds(bounds);
    };

    var _get_listings = function(){
      return _list;
    };

  	mapFactory.map_service = _map_service;
    mapFactory.create_marker = _create_marker;
    mapFactory.set_bounds = _set_bounds;
    mapFactory.get_listings = _get_listings;
  	return mapFactory;
  }

  })();