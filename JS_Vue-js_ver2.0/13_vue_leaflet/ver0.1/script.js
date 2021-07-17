// Vue.js

// Leaflet
const ATTRIBUTION = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const ACCESS_TOKEN = "pk.eyJ1Ijoic2RrZnoxODF0aWdlciIsImEiOiJja3FxNGU0cmcwdWFoMnhxaG5mcDYyaWwzIn0.acxWamqlCUkmAATOIUTlAQ";
const POSITION = [35.3839023, 136.6083425];

function createApp(){
	console.log("Hello Vue.js!!");

	new Vue({
		el: "#wrapper",
		data: {
			message: "Hello Vue.js!!",
			items: [],
		},
		mounted:function(){
			// Leaflet
			let map = L.map("mapid").setView(POSITION, 16);
			L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
				attribution: ATTRIBUTION,
				accessToken: ACCESS_TOKEN,
				id: "mapbox/streets-v11",
				tileSize: 512,
				maxZoom: 18,
				zoomOffset: -1
			}).addTo(map);
			// Marker
			L.marker(POSITION).addTo(map)
			.bindPopup("Hello OpenStreetMap!!").openPopup();
		},
		methods:{
			connect:function(){
				console.log("connect!!");
			},
			convertToArr:function(str){
				let arr = [];
				let lines = str.split('\n');
				for(let line of lines) arr.push(line.split(","));
				return arr;
			}
		}
	});
}

// 初期化
function initialize(){
	createApp();
}

document.addEventListener("DOMContentLoaded", initialize.bind(this));
