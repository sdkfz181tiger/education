//==========
// Plugin
console.log("Hello, base_plugin.js");

const ICON_DIR = "./data/fgimage/default/";// カーソル用格納ディレクトリ

var myFlgs     = {};
var myItems    = {};
var myHand     = {};
var elmBkg     = null;
var elmCursor  = null;

function init(fObj){
	myFlgs  = fObj.flgs; // フラグ一覧
	myItems = fObj.items;// アイテム一覧
	readyItemPanel();    // アイテムパネル表示
	readyItemCursor();   // カーソル表示
}

function setFlg(key, flg){
	console.log("setFlg:" + flg);
	myFlgs[key] = flg;
	readyItemPanel();// Reflesh
}

function getFlg(key){
	if(!myFlgs.hasOwnProperty(key)) return -1;
	return myFlgs[key];
}

function setItem(key, item){
	console.log("setItem:" + item);
	myItems[key] = item;
	readyItemPanel();// Reflesh
}

function getItem(key){
	if(!myItems.hasOwnProperty(key)) return -1;
	return myItems.items[key];
}

//==========
// ItemPanel
function readyItemPanel(){
	//console.log("readyItemPanel");
	// Background
	var w = $("body").width() / 2;
	var h = 80;
	if(elmBkg == null){
		elmBkg = $("<p>");
		elmBkg.attr("id", "item_panel");
		elmBkg.css({
			background: "purple", position: "absolute",
			margin: 0, padding: 0, width: w, height: h, top: 0, left: 0
		}).appendTo("body");
	}
	elmBkg.empty();
	// Items
	var m = 10;
	var s = 60;
	var l = 0;
	for(var key in myItems){
		var item = myItems[key];
		var elmBtn = $("<img>");
		elmBtn.css({
			background: "pink", position: "absolute", cursor: "pointer",
			margin: m, padding: 0, width: s, height: s, top: 0, left: l
		}).text(item);
		elmBtn.attr({alt: key, src: ICON_DIR+item, key: key, item: item});
		elmBtn.click(function(e){
			var key = $(this).attr("key");
			var item = $(this).attr("item");
			if(myHand.key != key){
				grabHand(key, item, e);// Grab something
			}else{
				releaseHand();// Release something
			}
		});
		elmBtn.appendTo(elmBkg);
		l += m + s;// Offset
	}	
}

//==========
// Cursor
function readyItemCursor(){
	//console.log("readyItemCursor");
	if(elmCursor == null){
		elmCursor = $("<img>");
		elmCursor.attr("id", "cursor");
		elmCursor.css({
			background: "green", position: "absolute", visibility: "hidden",
			margin: 0, padding: 0, width: 40, height: 40, top: 0, left: 0
		}).appendTo("body");
		$("#tyrano_base, #item_panel").on("mousemove", function(e){
			elmCursor.css({"top": e.clientY+5, "left": e.clientX+5});
		});
	}
	releaseHand();
}

function grabHand(key, item, e){
	console.log("grabHand:", key, item);
	myHand.key = key;
	myHand.item = item;
	$("#cursor").attr({alt: key, src: ICON_DIR+item});
	$("#cursor").css({visibility: "visible", "top": e.clientY+5, "left": e.clientX+5});
	$("body").css({cursor: "none"});
}

function releaseHand(){
	console.log("releaseHand");
	myHand = {};
	$("#cursor").css({visibility: "hidden"});
	$("body").css({cursor: "auto"});
}