function locMap(type,lat,lng,funcionretorno){
	
	$("#tolerancia").html('Location map ->( '+lat+' , '+lng+' )').css('background-color','green');
	
	var latlng = new google.maps.LatLng(lat, lng);
	initialLocation = latlng;
	
	//ESTILO DEL MAPA
	var mapOptions = {
		disableDoubleClickZoom:true,
		zoom: 15,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	if (type == 1){
		
		geocoder = new google.maps.Geocoder();
		directionsService = new google.maps.DirectionsService();
		
		map = new google.maps.Map(document.getElementById("content"), mapOptions);
	
		google.maps.event.addListener(map, 'dblclick', function(event) {
			if (user_marcado == 1) addFinder(event.latLng);
		});
			
	}else{
		map.setCenter(initialLocation);
	}
	funcionretorno();
}


function showPosition(position) {
	
	user.latitude = position.coords.latitude;
	user.longitude = position.coords.longitude;
	user.altitude = position.coords.altitude;
	user.accuracy = position.coords.accuracy;
	user.altitudeAccuracy = position.coords.altitudeAccuracy;
	user.heading = position.coords.heading;
	user.speed = position.coords.speed;
	user.timestamp = position.coords.timestamp;
	marcarUsuario(1);
	
}

function refreshPosition(position) {
	
	user.latitude = position.coords.latitude;
	user.longitude = position.coords.longitude;
	user.altitude = position.coords.altitude;
	user.accuracy = position.coords.accuracy;
	user.altitudeAccuracy = position.coords.altitudeAccuracy;
	user.heading = position.coords.heading;
	user.speed = position.coords.speed;
	user.timestamp = position.coords.timestamp;
	marcarUsuario(2);
	
}

function marcarUsuario(type){
	locMap(type,user.latitude,user.longitude,function(){
		
		var markerCircleOptions = {
		  	//strokeColor: '#000', //color borde
			//strokeOpacity: 0.5, //opacidad borde
			strokeWeight: 0, //ancho borde
			fillColor: '#d7d800', //color interior
			fillOpacity: 0.2, //opacidad interior
		    map: map,
		    center: initialLocation,
		    radius: 250
		};
		markerCircle = new google.maps.Circle(markerCircleOptions);
		
		var markerIcon = new google.maps.MarkerImage(						
			'imgs/20x20_H.png',
			new google.maps.Size(20, 20),
			new google.maps.Point(0,0),
			new google.maps.Point(10, 10)
		);
		
		
		marker = new google.maps.Marker({
			position: initialLocation,
			map: map,
			icon: markerIcon,
			draggable: false,
			animation: google.maps.Animation.DROP
		});
		
		poly = new google.maps.Polyline(polyOptions);
		poly.setMap(map);
		
		$("#tolerancia").html(user.accuracy).css('background-color','green');
		//$.post('php/traceGeolocation.php',{user:user}, function(data){},"json");
		
		user_marcado = 1;
		
		//userTranslation = navigator.geolocation.watchPosition(showTranslation, onErrorTranslation, optionsPosition);
	
	});
}

function onError(error) {
	switch(error.code){
        case error.PERMISSION_DENIED: $("#tolerancia").html("user did not share geolocation data").css('background-color','red'); break;  
		case error.POSITION_UNAVAILABLE: $("#tolerancia").html("could not detect current position").css('background-color','red'); break;  
		case error.TIMEOUT: $("#tolerancia").html("retrieving position timedout").css('background-color','red'); break;  
		default: $("#tolerancia").html("unknown error").css('background-color','red'); break;  
	}  
}

function showTranslation(position) {
	
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	
	var distancia = distancegmaps(user.latitude, user.longitude, lat, lng);
	
	$("#tolerancia").html('Acurracy: '+position.coords.accuracy+' - Distancia anterior punto: '+distancia).css('background-color','green');

	if ((position.coords.accuracy <= 65)&&(distancia > 0.01)&&(distancia < 100)){
	
		user.trace = 'navegacion';
		user.latitude = position.coords.latitude;
		user.longitude = position.coords.longitude;
		user.altitude = position.coords.altitude;
		user.accuracy = position.coords.accuracy;
		user.altitudeAccuracy = position.coords.altitudeAccuracy;
		user.heading = position.coords.heading;
		user.speed = position.coords.speed;
		user.timestamp = position.coords.timestamp;
		
		var newlLocation = new google.maps.LatLng(lat, lng);
		map.setCenter(newlLocation);
		marker.setPosition(newlLocation);
		markerCircle.setCenter(newlLocation);
		
		//$.post('php/traceGeolocation.php',{user:user}, function(data){},"json");
		
		var path = poly.getPath();
		path.push(newlLocation);

	}else if((position.coords.accuracy <= 65)&&(distancia > 100)){
		//cerramos la session e iniciamos una nueva
		/*
		$.post("php/reiniciaSession.php",{user:user}, function(data){
			marker.setMap(null);
			markerCircle.setMap(null);
			poly.setMap(null);
			navigator.geolocation.clearWatch(userTranslation);
			navigator.geolocation.getCurrentPosition(refreshPosition, onError);
		}, "json");
		*/
	}
}

function onErrorTranslation(error) {
	switch(error.code){
        case error.PERMISSION_DENIED: $("#tolerancia").html("user did not share geolocation data - translation").css('background-color','red'); break;  
		case error.POSITION_UNAVAILABLE: $("#tolerancia").html("could not detect current position - translation").css('background-color','red'); break;  
		case error.TIMEOUT: $("#tolerancia").html("retrieving position timedout - translation").css('background-color','red'); break;  
		default: $("#tolerancia").html("unknown error - translation").css('background-color','red'); break;  
	}
}

//FUNCION QUE MIDE LA DISTANCIA ENTRE 2 PUNTOS (km)
function distancegmaps(lat1,lon1,lat2,lon2) {
	var R = 6371; // km (change this constant to get miles)
	var dLat = (lat2-lat1) * Math.PI / 180;
	var dLon = (lon2-lon1) * Math.PI / 180; 
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) * 
		Math.sin(dLon/2) * Math.sin(dLon/2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	//vamos a redondear en centimetros para guardar en base de datos
	var result=Math.round(d*100000)/100000;
	//redondeamos y mostramos en metros
	//var result=Math.round(d*1000)/1000;
	return result;
	//redondea en kilometros
	//if (d>1) return Math.round(d)+"km";
	//redondea en metros
	//else if (d<=1) return Math.round(d*1000)+"m";
	//return d;
}


function addFinder(location){
	
	var numero = num_finder;
	
	var markerFinderIcon = new google.maps.MarkerImage(						
		'imgs/20x20_Z.png',
		new google.maps.Size(20, 20),
		new google.maps.Point(0,0),
		new google.maps.Point(10, 10)
	);
			
	//establecemos la nueva marca
	var marker_finder_new = new google.maps.Marker({
		position: location,
		icon:markerFinderIcon,
		map: map
	});
	
	markersFinder[numero] = marker_finder_new;
	
	//calculamos la ruta hasta el usuario
	var latlngUser = new google.maps.LatLng(user.latitude, user.longitude);
	var ruta = {
		origin:location,
		destination:latlngUser,
		travelMode:google.maps.DirectionsTravelMode.DRIVING,
		optimizeWaypoints: true
	};

	directionsService.route(ruta, function(response,status){
		if (status == google.maps.DirectionsStatus.OK){
			
			//ESTILO DE LA RUTA CALCULADA
			var routeOptions = {
				suppressInfoWindows:true,
				suppressMarkers:true,
				polylineOptions:{
					strokeColor:'#3b2b1c',
					strokeOpacity:0.5
				}
			};
			
			directionsDisplay[numero] = new google.maps.DirectionsRenderer(routeOptions);
			directionsDisplay[numero].setMap(map);			
			directionsDisplay[numero].setDirections(response);
			
			//consoleText(response);
			//consoleText(response.routes[0].overview_path);
			var pointsRoute = new Array();
			
			var pointInicial = new google.maps.LatLng(response.routes[0].overview_path[0].jb,response.routes[0].overview_path[0].kb);
			var numFnal = response.routes[0].overview_path.length - 1;
			var pointFinal = new google.maps.LatLng(response.routes[0].overview_path[numFnal].jb,response.routes[0].overview_path[numFnal].kb);
			var min_distance = metrosXsegundo; 
			
			//consoleText('DISTANCIA DEL RECORRIDO= '+min_distance);
			
			var contador_punto = 0;
			
			for (var cont = 0; cont <  response.routes[0].overview_path.length; cont++){
				var new_point = [response.routes[0].overview_path[cont].jb,response.routes[0].overview_path[cont].kb];
				var next_point_num = cont + 1;
				if (next_point_num < response.routes[0].overview_path.length){
					contador_punto++;
					pointsRoute.push(new_point);
					var next_point = [response.routes[0].overview_path[next_point_num].jb,response.routes[0].overview_path[next_point_num].kb];
					var P1 = new google.maps.LatLng(new_point[0], new_point[1]);
					var P2 = new google.maps.LatLng(next_point[0], next_point[1]);
					var D1 = geometryGoogle.computeDistanceBetween(P1, P2);					
					if (D1>min_distance){
						var cantidad_points = Math.floor(D1/min_distance);
						for (var con1 = 1; con1 <= cantidad_points; con1++){
							var point_int = (1/cantidad_points);
							var point = google.maps.geometry.spherical.interpolate(P1, P2, con1*point_int);
							var new_interpoint = [point.jb,point.kb];
							contador_punto++;
							pointsRoute.push(new_interpoint);							
						}
					}
				}
			}
			
			
			
			animationFinder[numero] = {
				'total': contador_punto,
				'cont' : 0
			};
			
			
			animationFinderInterval[numero] = setInterval(function(){

				var next_point = animationFinder[numero].cont + 1;
				if (next_point < animationFinder[numero].total){
					var P1 = new google.maps.LatLng(pointsRoute[animationFinder[numero].cont][0], pointsRoute[animationFinder[numero].cont][1]);
					var P2 = new google.maps.LatLng(pointsRoute[next_point][0], pointsRoute[next_point][1]);
					//calculamos la distancia
					var D1 = geometryGoogle.computeDistanceBetween(P1, P2);
					//var D2 = distancegmaps(pointsRoute[animationFinder_cont][0],pointsRoute[animationFinder_cont][1],pointsRoute[next_point][0],pointsRoute[next_point][1]);
					//if (D1 > 50) consoleText('distancia Google = '+D1+' metros');
					//consoleText('distancia funcion = '+D2+' kilometros');
				}
				var newPointLatLng = new google.maps.LatLng(pointsRoute[animationFinder[numero].cont][0], pointsRoute[animationFinder[numero].cont][1]);	
				markersFinder[numero].setPosition(newPointLatLng);
				animationFinder[numero].cont++;
				
				//consoleText(animationFinder[numero].total + ' - '+ animationFinder[numero].cont);
				if (animationFinder[numero].total == animationFinder[numero].cont) {
					clearInterval(animationFinderInterval[numero]);
					directionsDisplay[numero].setMap(null);
				}

			},100);
		}
	});
	
	num_finder = num_finder + 1;
	
}