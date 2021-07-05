console.log("custom.js");

/*
	About
		https://leafletjs.com/
	AccessToken
		https://account.mapbox.com/access-tokens/
*/

const ATTRIBUTION = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const ACCESS_TOKEN = "pk.eyJ1Ijoic2RrZnoxODF0aWdlciIsImEiOiJja3FxNGU0cmcwdWFoMnhxaG5mcDYyaWwzIn0.acxWamqlCUkmAATOIUTlAQ";

window.onload = (event)=>{
	console.log("onload!!");

	//==========
	// Mapbox
	let map = L.map("mapid").setView([35.3840842, 136.6073998], 16);

	// TileLayer
	L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
		attribution: ATTRIBUTION,
		accessToken: ACCESS_TOKEN,
		id: "mapbox/streets-v11",
		tileSize: 512,
		maxZoom: 18,
		zoomOffset: -1
	}).addTo(map);

	// Position
	const nichibi = [35.3839023,136.6083425];
	const tandai  = [35.3866576,136.6078114];

	// Marker
	L.marker(nichibi).addTo(map)
	.bindPopup("Hello OpenStreetMap!!").openPopup();

	// Circle
	let circle = L.circle(tandai, {
		color: "red", fillColor: "#f03",
		fillOpacity: 0.2, radius: 100
	}).addTo(map);

	// Rectangle
	let rect = [
		[35.3824800, 136.6066900], 
		[35.3835110, 136.6079040]];
	L.rectangle(rect, {
		color: "#ff7800", weight: 1
	}).addTo(map);

	// Event
	let popup = L.popup();
	map.on("click", (e)=>{
		console.log(e.latlng);
		let str = e.latlng.lat + ", " + e.latlng.lng;
		popup.setLatLng(e.latlng).setContent(str).openOn(map);
	});


}