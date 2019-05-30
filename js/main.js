$(document).ready(function(){

	var parisFromList = $('.fra');
	var list = $('.units__column');

////
	 var langSpan = $('.lang').find('span');
	 var langDivs = $('.languages').find('div');
	 console.log('lang span + ' + langSpan.length);
	 console.log('langDivs + ' + langDivs.length);
	
 
    var CircleIcon = L.Icon.extend({
    	options: {
    		//shadowUrl: 'images/circle2x.png',
	    	iconSize: [10,10],
	    	shadowSize: [20,20],
	    	iconAnchor:   [-722, 610], // point of the icon which will correspond to marker's location
	    	shadowAnchor: [-650, 605],  // the same for the shadow
	    	popupAnchor:  [600, -540]
    	}    	
    });

    var ParisIcon = new CircleIcon({iconUrl: 'images/circle.png'}),
    	OtherIcon = new CircleIcon({iconUrl: 'images/circle.png'}); //mozna inny png wrzucic

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

    //var something = L.latLng([605,726],{title: 'BAU', icon:ParisIcon}).addTo(map).bindPopup(ParisPopup, ParisOptions);
    //L.marker(paris).addTo(map);
    // function addMarker(e){
    // 	var newMarker = new L.marker([150,150]).addTo(map);
    // }

    // var bau = $('.bau');
    // bau.on('click',function(){
    // 	addMarker();
    // })

   
    

    var markers = [];
    var ParisMarker = L.marker([0,0], {title: 'ParisMarker', icon:ParisIcon}).on('click', function(e){console.log(e.latlng)}).addTo(map).bindPopup(ParisPopup, ParisOptions);
    markers.push(ParisMarker);	
    var OtherMarker = L.marker([-100,600], {title: 'OtherMarker', icon:OtherIcon}).on('click', function(e){console.log(e.latlng)}).addTo(map).bindPopup(OtherPopup, OtherOptions);	
    markers.push(OtherMarker);
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
	  			//console.log("icon = " + JSON.stringify(icon));
	    	var markerID = markers[i].options.title;
	        if (markerID == id){
	            markers[i].openPopup();
	        };	

	        
	        //console.log('icon ' + icon);        	       
	    }
	}

	var markerHide = $('.leaflet-marker-icon');
    markerHide.hide();

	function compareTitle(c){
		//for(var i in markers){
			//console.log("markers: " + markers[i].options.title);
			if($('.list').find('div').data('catch') == markers[i].options.title){
				
				console.log("to jest markers[i].options.title " + markers[i].options.title);
				console.log("$('.list').find('div').data('catch') " + $('.list').find('div').data('catch'));
				console.log('pasuje');
				return true;
			} else {
				console.log('nie pasuje');
				return false;
			}
		//}
	}	

	$('.list').children().each( function(){
		$('list').find('div').on('click',function(){
			compareTitle();
		})
	})

	

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
		title.css({'visibility': 'hidden'});
		
	

		popup.on('click',function(){
			units.addClass('highlight');
		});
	});	
		
		$(document).on('click', function(e){			
		if(title.css('visibility') === 'hidden'){
			//title.css({'visibility':'visible'});
		}
	});
   
	map.dragging.disable();
	map.touchZoom.disable();
	map.doubleClickZoom.disable();
	map.scrollWheelZoom.disable();
	map.boxZoom.disable();
	map.keyboard.disable();
	if (map.tap) map.tap.disable();
	document.getElementById('map').style.cursor='default';    


	var caret = $('.fa-chevron-down');
	var langs = $('.langauges div');
	console.log(langs);

	caret.on('click', function(){
		console.log('kilk');
		langs.css({'visibility':'visible'});
	});
});