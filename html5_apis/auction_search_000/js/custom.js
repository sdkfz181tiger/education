console.log("custom.js");

// API
const urlSearch = "http://ozateck.sakura.ne.jp/shimejiapis/auction_api/index.php";

// Ready
$(document).ready(function(){
	console.log("ready");

	// Search
	$("#formBtn").click(function(){
		console.log("submit!!");
		var api   = "search";
		var query = $("#formInput").val();
		loadURL(urlSearch, api, query);
	});
});

//==========
// Search

function loadURL(url, api, query){
	console.log("loadURL:" + url);
	$.ajax(url, {
			type: "GET",
			dataType: "json",
			data: {
				api: api,
				query: query
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
	console.log("総数:" + jsonObj.ResultSet.totalResultsAvailable);
	console.log("カテゴリーパス:" + jsonObj.ResultSet.Result.CategoryPath);
	$("#resultArea").empty();
	var items = jsonObj.ResultSet.Result.Item;
	for(item of items){
		
		var rootTag = $("<li>");

		var imgTag = $("<img>");
		imgTag.attr("src", item.Image);
		rootTag.append(imgTag);

		var titleTag = $("<a id='titleBox'>");
		titleTag.attr("href", item.AuctionItemUrl);
		titleTag.text(item.Title);
		rootTag.append(titleTag);

		var priceTag = $("<div id='priceBox'>");
		priceTag.text(item.CurrentPrice);
		rootTag.append(priceTag);

		$("#resultArea").append(rootTag);
	}
}
