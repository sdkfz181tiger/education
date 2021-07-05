console.log("custom.js");

/*
	Leaflet
	http://leafletjs.com/
	-> オープンストリートマップ
	http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
	&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors
	-> 国土地理院
	http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png
	&copy; <a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>
*/

window.onload = function(){
	console.log("onload!!");


	//==========
	// Mapbox
	// var mymap = L.map('mapid').setView([51.505, -0.09], 13);

	// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2RrZnoxODF0aWdlciIsImEiOiJjamJkdjRnMHkyZTNjMnhsbGt6dnR5eWFoIn0.3UJBXbp8SL53EbCRMKnGLg', {
	// 	maxZoom: 18,
	// 	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
	// 		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
	// 		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	// 	id: 'mapbox.satellite'// mapbox.satellite
	// }).addTo(mymap);


	//==========
	// Open street map
	var map = L.map('mapid').setView([36.3219088, 139.0032936], 13);

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
	L.marker([36.3219088, 139.0032936]).addTo(map)
	.bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
	.openPopup();
}