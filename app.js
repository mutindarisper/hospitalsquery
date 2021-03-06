(function() {
   var hospitalMap = new L.LayerGroup(); //hospitals layer that combines your hospital  markers into one layer you can add or remove from the map at once.
	 
    var osmLink = '<a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a>',
        thunLink = '<a href="http://www.thunderforest.com/" target="_blank">Thunderforest</a>';
    

    //creating base layers and adding the default ones to the map
    
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        thunTrans = 'http://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=66c492b59e4a41fe9b461bcd12f5e9b6',
        osmAttrib = '&copy; ' + osmLink + ' & '+thunLink +' Contributors',
        landUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        thunAttrib = 'Tiles &copy; Esri -; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, & The GIS User Community';
    var osmMap = L.tileLayer(osmUrl, {attribution: osmAttrib}),
        landMap = L.tileLayer(landUrl, {attribution: thunAttrib})
        transMap = L.tileLayer(thunTrans, {attribution: osmAttrib})
   

	var zoomLevel = 13,
        mapCenter = [-1.3, 36.8];

	var options = {
        center: mapCenter,
        zoom: zoomLevel,
        layers: [transMap],//default layer to be added once the map loads
    };
    var map = L.map('map', options);

  

   var icon = new L.icon({
                    iconUrl: 'img/dental.png', 
                    iconSize:     [80, 90], // width and height of the image in pixels
                    shadowSize:   [35, 20], // width, height of optional shadow image
                    iconAnchor:   [12.5, 30], // point of the icon which will correspond to marker's location
                    shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
                    popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor
                  });

   
   	 //create a Layers Control and add it to the map


         L.control.scale().addTo(map);//reate a scale Control and add it to the map


        var searchIcon = L.icon({
		    iconUrl: 'img/search_marker.png',
		    iconSize:     [40, 40], // width and height of the image in pixels
		    shadowSize:   [40, 20], // width, height of optional shadow image
		    iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
		    shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
		    popupAnchor:  [0, -30] // point from which the popup should open relative to the iconAnchor
		  })
		  
		  var pinIcon = L.icon({
		    iconUrl: 'img/blue-pin.png',
		    iconSize:     [50, 50], // width and height of the image in pixels
		    shadowSize:   [40, 20], // width, height of optional shadow image
		    iconAnchor:   [25, 50], // point of the icon which will correspond to marker's location
		    shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
		    popupAnchor:  [0, -30], // point from which the popup should open relative to the iconAnchor
			tooltipAnchor: [0, -40],
		  })
    var sqlQuery = 'SELECT * FROM hospital';
    
    var hospitals,
        $body = $('body'),
        $locate = $('#locate'),
        $findNearest = $('#find-nearest'),
        $status = $('#status');

                
    // replace Leaflet's default blue marker with a custom icon
 
hospitals = L.geoJSON(null, //////////////////// LOAD LOAD LOAD////////////////////////
    {
    pointToLayer: function(feature, latlng) {
            switch (feature.properties.CATEGORY){
                 case 'GENERAL':

                  var myIcon = new L.icon({
                    iconUrl: 'img/marker.png', 
                    iconSize:     [25, 30], // width and height of the image in pixels
                    shadowSize:   [35, 20], // width, height of optional shadow image
                    iconAnchor:   [12.5, 30], // point of the icon which will correspond to marker's location
                    shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
                    popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor
                  });
                    return L.marker(latlng, { icon: myIcon });

               
               
                case 'GYNAECOLOGIST':
                    var gynIcon = new L.icon({
                        iconUrl: 'img/gyna.png', 
                        iconSize:     [70, 50], // width and height of the image in pixels
                        shadowSize:   [35, 20], // width, height of optional shadow image
                        iconAnchor:   [12.5, 30], // point of the icon which will correspond to marker's location
                        shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
                        popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor

                  });
                
                     return L.marker(latlng, {icon: gynIcon});
                
                 case 'DENTAL':
                    var dentIcon = new L.icon({
                        iconUrl: 'img/dental.png', 
                        iconSize:     [70, 60], // width and height of the image in pixels
                        shadowSize:   [35, 20], // width, height of optional shadow image
                        iconAnchor:   [12.5, 30], // point of the icon which will correspond to marker's location
                        shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
                        popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor
                  });
               
                    return L.marker(latlng, {icon: dentIcon});
                
                
                case 'ULTRASOUND':
                    var scanIcon = new L.icon({
                        iconUrl: 'img/ultra.png', 
                        iconSize:     [100, 100], // width and height of the image in pixels
                        shadowSize:   [35, 20], // width, height of optional shadow image
                        iconAnchor:   [12.5, 30], // point of the icon which will correspond to marker's location
                        shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
                        popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor
                  });
    
                     return L.marker(latlng, {icon: scanIcon});

               }
        },
        onEachFeature: function (feature, layer) {
    layer.bindPopup('<strong>'+feature.properties.NAME+'</strong><p><strong>Type: </strong>'+feature.properties.TYPE+'</p><strong>Facility: </strong>'+feature.properties.FACILITY+'</p></p><strong>Emergency Contact: </strong><a href="tel:'+feature.properties.CONTACT+'" target="_blank" style="text-decoration:none; color:#e04d21">CALL</a></p></p><strong>Navigate: </strong><a href="https://maps.google.com/?q='+feature.properties.LATITUDE+','+feature.properties.LONGITUDE+'" target="_blank" style="text-decoration:none; color:#e04d21">GO</a></p>');
  }
}).addTo(map);

    $.getJSON('hospitals_geojson.php', function(data) {	
  
        //$('#loader').fadeOut();
        $body.addClass('loaded');
        hospitals.addData(data);
        

        $locate.fadeIn().on('click', function(e) {
            
            $status.html('Droping pin at your location...');
            
            if (!navigator.geolocation){ //if the browser is unable to get current location,then give the error message
                alert("<p>Sorry, your browser does not support Geolocation</p>");
                return;
            }
            
            $body.removeClass('loaded');
              
            navigator.geolocation.getCurrentPosition(success, error); //if the browser is able to get current location then drop the pin
            
           $locate.fadeOut();
            
        });   
    });

var baseLayers = {
           "Transport": transMap,
            "Basic Map": osmMap,
             "Satellite": landMap
        };
        var overlayLayers = {
           "hospitals": hospitals,
           // "smartUtilsLayer": smartUtilsLayer
            
        };

        
L.control.layers(baseLayers, overlayLayers).addTo(map);

    function success(position) {
        
        $body.addClass('loaded');
        
        var currentPos = [position.coords.latitude,position.coords.longitude]; //after successfully getting location, show lat and long
        
        map.setView(currentPos, zoomLevel); //set the map at zoom level 13 and the position of the user

        var myLocation = L.marker(currentPos, {draggable: true, icon: pinIcon}) //the pin can be dragged to the user's desired location
                            .addTo(map)
                            .bindTooltip("Drag pin to desired location") //message of the tooltip
                            .openTooltip(); //tooltip remains open and does not disappear
		
		
		var newPos = [myLocation.getLatLng().lat, myLocation.getLatLng().lng];
        console.log(newPos);
		
		myLocation.on('dragend', function (e) {
		newPos = [myLocation.getLatLng().lat, myLocation.getLatLng().lng]; //the dragged position becomes the new position
	
		}); 
        
		//querying for the nearby hospitals
            
        $findNearest.fadeIn()
            .on('click', function(e) {
                
                $findNearest.fadeOut();
                
                $status.html('Finding your nearest hospitals') //message displayed while finding nearest hospitals
            
                queryFeatures(newPos, 3); //displays the three nearest hospitals
                console.log(newPos);
            
                myLocation.unbindTooltip();
            
                
        });

    };

    function error() {
        alert("Unable to retrieve your location");
    };
     
    function queryFeatures(currentPos, numResults) {
        
        var distances = [];
        
        hospitals.eachLayer(function(l) {
            
            var distance = L.latLng(currentPos).distanceTo(l.getLatLng())/1000;
            
            distances.push(distance);

        });
        
        distances.sort(function(a, b) {
            return a - b;
        });
        
        
var hospitalsLayer = L.featureGroup();


        hospitals.eachLayer(function(l) {
            
            var distance = L.latLng(currentPos).distanceTo(l.getLatLng())/1000;
            
            if(distance < distances[numResults]) {
                
                l.bindTooltip(distance.toLocaleString() + ' km from current location.');
                
                L.polyline([currentPos, l.getLatLng()], {
                    color : 'blue',
                    weight : 2,
                    opacity: 1,
                    dashArray : "5, 10"
                }).addTo(hospitalsLayer);
                
            }
        });
        
        map.flyToBounds(hospitalsLayer.getBounds(), {duration : 3, easeLinearity: .1 });
        
        map.on('zoomend', function() {
          
            map.addLayer(hospitalsLayer);
			
        })
      
    }
	
    	var searchControl = new L.Control.Search({
		layer: hospitalsLayer,
		propertyName: 'NAME',
		marker: false,
		moveToLocation: function(latlng, title, map) {
			//map.fitBounds( latlng.layer.getBounds() );
			var zoom = map.getBoundsZoom(latlng.layer.getBounds());
  			map.setView(latlng, zoom); // access the zoom
		}
	});

	searchControl.on('search:locationfound', function(e) {
		
		//console.log('search:locationfound', );

		//map.removeLayer(this._markerSearch)

		e.layer.setStyle({fillColor: '#3f0', color: '#0f0'});
		if(e.layer._popup)
			e.layer.openPopup();

	}).on('search:collapsed', function(e) {

		hospitalsLayer.eachLayer(function(layer) {	//restore feature color
			hospitalsLayer.resetStyle(layer);
		});	
	});
	
	map.addControl( searchControl, {icon: searchIcon} );  //inizialize search control

})();