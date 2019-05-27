$(document).ready(function(){	
 
    var CircleIcon = L.Icon.extend({
    	options: {
    		//shadowUrl: 'images/circle2x.png',
	    	iconSize: [10,10],
	    	shadowSize: [20,20],
	    	iconAnchor:   [-722, 610], // point of the icon which will correspond to marker's location
	    	shadowAnchor: [-650, 605],  // the same for the shadow
	    	popupAnchor:  [650, -560]
    	}    	
    });

    var ParisIcon = new CircleIcon({iconUrl: 'images/circle.png'}),
    	OtherIcon = new CircleIcon({iconUrl: 'images/circle.png'}); //mozna inny png wrzucic

    L.icon = function(options){
    	return new L.icon(options);
    }

    var ParisPopup = "Paris Air Show<br/><hr>Paris(France)";
    var ParisOptions = {
    	'maxWidth' : '300',
    	'className' : 'parisMarker'
    }

    var OtherPopup = "To jest inne show<br/><hr>Inne(Miejsce)";
    var OtherOptions = {
    	'maxWidth' : '300',
    	'className' : 'otherMarker'
    }

    var map = L.map('map', {
    	crs: L.CRS.Simple,
    	zoomControl: false, // usuniecie + - zoom
    	touchZoom: false,
    	touchEvent: false   	
    });

    map.scrollWheelZoom.disable(); // usuniecie możliwości zoom na scrollu


    var bounds = [[0,0],[787,1566]];
    // var bounds = [[-26.5,-25], [1021.5,1023]];
    var image = L.imageOverlay('mapgood.png', bounds).addTo(map);

    //var paris = L.latLng([605,726]);
    //L.marker(paris).addTo(map);

    var markers = [];
    var ParisMarker = L.marker([0,0], {title: 'ParisMarker', icon:ParisIcon, className: 'parisAnimated'}).addTo(map).bindPopup(ParisPopup, ParisOptions);
    markers.push(ParisMarker);	
    var OtherMarker = L.marker([100,200], {title: 'OtherMarker', icon:OtherIcon, className: 'otherAnimated'}).addTo(map).bindPopup(OtherPopup, OtherOptions);	
    markers.push(OtherMarker);
    map.setView([70,120], 1);
    map.fitBounds(bounds);

   // fitBounds();   
  	
   	function markerFunction(id){
	    for (var i in markers){
	    	var icon = markers[i].options.icon;
	  			//console.log("icon = " + JSON.stringify(icon));
	    	var markerID = markers[i].options.title;
	        if (markerID == id){
	            markers[i].openPopup();	            
	        };	       
	    }
	}

	function zoomMarker(e){
		//for(var i in markers){
			//var markerZoom = markers[i].getLatLng();
			//console.log(markerZoom);

			var latLngs = [e.target.getLatLng()];
  			var markerBounds = L.latLngBounds(latLngs);
  			map.fitBounds(markerBounds);


		//}
	}

	zoomMarker();



	$('.list').children().click(function(){
		var markerTitle = $('.leaflet-marker-pane').find('img').attr('title');
	   	markerFunction($(this)[0].id);
	  	var e = $(this)[0].id;
	  	markerFunction($(this)[0].icon);
	  	var ico = $(this)[0].icon;
	  	console.log(JSON.stringify(ico));

	  	var zoom = zoomMarker($(this)[0].latlng);
	  	console.log(zoom);

	  	

	  	if(e == markerTitle){
	  		//console.log("gora title " + markerTitle);
	  		//console.log("dol e " + e);	  		
	  	} else {
	  		//console.log('nie');
	  	}

	});

	 var list = $('.list');

	 list.on('click', function(e){
	 	e.stopPropagation();
	 	list.fadeOut('slow');
	 	$(document).on('click', function(){
	 		if(list.is(':hidden')){
	 			list.fadeIn('slow');
	 		}
	 	})
	 })	

	   
	map.dragging.disable();
	map.touchZoom.disable();
	map.doubleClickZoom.disable();
	map.scrollWheelZoom.disable();
	map.boxZoom.disable();
	map.keyboard.disable();
	if (map.tap) map.tap.disable();
	document.getElementById('map').style.cursor='default';    
	
});