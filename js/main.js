$(document).ready(function(){

	var list = $('.units__column');
 
    var CircleIcon = L.Icon.extend({
    	options: {
    		//shadowUrl: 'images/circle2x.png',
	    	iconSize: [10,10],
	    	shadowSize: [20,20],
	    	iconAnchor:   [-722, 610], 
	    	shadowAnchor: [-650, 605],  
	    	popupAnchor:  [600, -540]
    	}    	
    });

    var ParisIcon = new CircleIcon({iconUrl: 'images/circle.png'}),
    	OtherIcon = new CircleIcon({iconUrl: 'images/circle.png'}); 

    L.icon = function(options){
    	return new L.icon(options);
    }

    var ParisPopup = "<span class='up-line'>Paris Air Show</span><br/><div class='over'><div class='line'></div><div class='circle'></div></div><span class='below-line'>Paris(France)</span>";
    var ParisOptions = {
    	'maxWidth' : '300',
    	'className' : 'parisMarker'
    }

    var OtherPopup = "<span class='up-line'>To jest inne show</span><br/><div class='over'><div class='line'></div><div class='circle'></div></div><span class='below-line'>Inne(Miejsce)</span>";
    var OtherOptions = {
    	'maxWidth' : '300',
    	'className' : 'otherMarker'
    }

    var BauPopup = "<span class='up-line'>BAU</span><br/><div class='over'><div class='line'></div><div class='circle'></div></div><span class='below-line'>Bau(United States)</span>";
    var BauOptions = {
    	'maxWidth' : '300',
    	'className' : 'bauMarker'
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

    var markers = [];
    var ParisMarker = L.marker([0,0], {title: 'ParisMarker', icon:ParisIcon}).on('click', function(e){console.log(e.latlng)}).addTo(map).bindPopup(ParisPopup, ParisOptions);
    markers.push(ParisMarker);	
    var OtherMarker = L.marker([-100,600], {title: 'OtherMarker', icon:OtherIcon}).on('click', function(e){console.log(e.latlng)}).addTo(map).bindPopup(OtherPopup, OtherOptions);	
    markers.push(OtherMarker);
    var BauMarker = L.marker([-50,-600], {title: 'BauMarker', icon:OtherIcon}).on('click', function(e){console.log(e.latlng)}).addTo(map).bindPopup(BauPopup, BauOptions);	
    markers.push(BauMarker);
    map.setView([70,120], 1);
    map.fitBounds(bounds);

   // fitBounds(); 

     function addToMap(xy){
	    for (var i in markers){	  			
	    	var markerID = markers[i].options.title;
	        if (markerID == id){
	            markers[i].addTo(map);
	        };	               	       
	    }
	}
  	
   	function markerFunction(id){
	    for (var i in markers){
	    	var icon = markers[i].options.icon;	  			
	    	var markerID = markers[i].options.title;
	        if (markerID == id){
	            markers[i].openPopup();
	        };	            	       
	    }
	}

	var markerHide = $('.leaflet-marker-icon');
    markerHide.hide();	

	$('.units__column').children().click(function(){
		var markerTitle = $('.leaflet-marker-pane').find('img').attr('title');
	   	markerFunction($(this)[0].id);
	});	 

	var units = $('.unit');
	var title = $('.title__desc');
	var popup = $('.leaflet-popup');
	var $this = $(this);
	console.log(popup);
	//title.hide();

	units.on('click', function(){
		units.removeClass('highlight').addClass('lowlight');
		$(this).addClass('highlight').removeClass('lowlight');
		//title.css({'visibility': 'hidden'});
		title.parent().addClass('hid');
		popup.on('click',function(){
			units.addClass('highlight');
		});
	});	

	$('.site__logo').on('click', function(){		
		if($('.title').hasClass('hid')){
			$('.title').addClass('vis').removeClass('hid');

			console.log('ma klase hid');
		}
		units.removeClass('lowlight').addClass('highlight');
	});		
   
	map.dragging.disable();
	map.touchZoom.disable();
	map.doubleClickZoom.disable();
	map.scrollWheelZoom.disable();
	map.boxZoom.disable();
	map.keyboard.disable();
	if (map.tap) map.tap.disable();
	document.getElementById('map').style.cursor='default'; 
	
});