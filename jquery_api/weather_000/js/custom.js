console.log("custom.js");

// BRIDGE
const URL_BRIDGE = "http://ozateck.sakura.ne.jp/shimejiapis/api_weather/";

// Ready
$(document).ready(function(){
	console.log("ready");

	// Search
	$("#myBtn").click(function(){
		console.log("submit!!");
		let api  = $("#myApi").val();
		let city = $("#myCity").val();
		loadURL(api, city);
	});
});

//==========
// Search

function loadURL(api, city){
	console.log("loadURL");
	$.ajax(URL_BRIDGE, {
			type: "GET",
			dataType: "json",
			data: {
				api:  api,
				city: city
			},
			success: function(e){
				console.log("Successful!!");
				console.log(e);
				showResult(e);
			},
			error: function(e){
				console.log("Error...");
				console.log(e);
			}
		}
	);
}

function showResult(json){
	// タイトル
	$("#myResult").append("<h3>" + json.title + "</h3>");

	// 詳細
	$("#myResult").append("<p>" + json.description.text + "</p>");

	// 予報
	let forecasts = json.forecasts;
	for(forecast of forecasts){
		console.log(forecast);
		let telop     = forecast.telop;
		let date      = forecast.date;
		let dateLabel = forecast.dateLabel;
		let imgUrl    = forecast.image.url;
		let tag = "<p>" + dateLabel + "<img src='" + imgUrl + "'>" + telop + "</p>";
		$("#myResult").append(tag);
	}
}
