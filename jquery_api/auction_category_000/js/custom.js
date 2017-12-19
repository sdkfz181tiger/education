console.log("custom.js");

// API
const urlApi = "http://ozateck.sakura.ne.jp/shimejiapis/api_auction/index.php";

// Ready
$(document).ready(function(){
	console.log("ready");

	// Tree
	loadTree(urlApi, "categoryTree");

	// Leaf
	$("#formBtn").click(function(){
		console.log("submit!!");
		var category = $("#formSelect").val();
		loadLeaf(urlApi, "categoryLeaf", category);
	});
});

//==========
// Tree

function loadTree(url, api){
	console.log("loadTree:" + url);
	$.ajax(url, {
			type: "GET",
			dataType: "json",
			data: {
				api: api
			},
			success: function(e){
				console.log("Successful!!");
				console.log(e);
				createSelectBox(e);
			},
			error: function(e){
				console.log("Error...");
				console.log(e);
			}
		}
	);
}

function createSelectBox(jsonObj){
	$("#formSelect").empty();
	var childs = jsonObj.ResultSet.Result.ChildCategory;
	for(child of childs){
		var optionTag = $("<option>");
		optionTag.attr("value", child.CategoryId);
		optionTag.text(child.CategoryName);
		$("#formSelect").append(optionTag);
	}
}

//==========
// Leaf

function loadLeaf(url, api, category){
	console.log("loadLeaf:" + url);
	$.ajax(url, {
			type: "GET",
			dataType: "json",
			data: {
				api: api,
				category: category
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
