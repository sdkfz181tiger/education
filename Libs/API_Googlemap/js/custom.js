console.log("custom.js");

var map;

function initMap(){
	console.log("initMap!!");

	map = new google.maps.Map(
		document.getElementById('map'),
		{ center: {lat: -34.397, lng: 150.644}, zoom: 8 });
}