console.log("custom.js");

// BRIDGE
const URL_BRIDGE = "http://ozateck.sakura.ne.jp/shimejiapis/api_atnd/";

// Ready
$(document).ready(function(){
	console.log("ready");

	// Search
	$("#myBtn").click(function(){
		console.log("submit!!");
		let api  = $("#myApi").val();
		let keyword = $("#myKeyWord").val();
		loadURL(api, keyword);
	});
});

//==========
// Search

function loadURL(api, keyword){
	console.log("loadURL");
	$.ajax(URL_BRIDGE, {
			type: "GET",
			dataType: "json",
			data: {
				api:  api,
				keyword_or: keyword,
				format: "json"
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

	// イベント情報
	let events = json.events;
	for(event of events){
		console.log(event);
		let title = event.event.title;
		let place = event.event.place;
		let start = event.event.started_at;
		let end   = event.event.ended_at;
		let url   = event.event.url;
		let tag = "<p><a href='" + url + "'>" + title + "</a><br/>(" + start + ") " + place + "</p>";
		$("#myResult").append(tag);
	}
}