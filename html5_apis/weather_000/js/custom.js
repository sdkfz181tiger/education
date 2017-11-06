console.log("custom.js");

// API
const urlSearch = "http://ozateck.sakura.ne.jp/shimejiapis/weather_api/";

// Ready
$(document).ready(function(){
	console.log("ready");

	// Search
	$("#formBtn").click(function(){
		console.log("submit!!");
		var city = $("#formInput").val();
		loadURL(urlSearch, city);
	});
});

//==========
// Search

function loadURL(url, city){
	console.log("loadURL:" + url);
	$.ajax(url, {
			type: "GET",
			dataType: "json",
			data: {
				city: city
			},
			success: function(e){
				console.log("Successful!!");
				console.log(e);
				parseJSON(e);
			},
			error: function(e){
				console.log("Error...");
				console.log(e);
			}
		}
	);
}

function parseJSON(jsonObj){
	console.log(jsonObj.title);
	console.log(jsonObj.description);
	console.log(jsonObj.location);
	console.log(jsonObj.forecasts);
}
