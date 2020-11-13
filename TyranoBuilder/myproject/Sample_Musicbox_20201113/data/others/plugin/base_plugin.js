//==========
// Plugin
// ver 0.0.2
//     2020/10/01_持ち物メニュー機能追加
//     2020/11/02_トグル機能追加
//     2020/11/05_音符再生機能追加
//     2020/11/06_タイマー機能追加
//     2020/11/13_音符生成機能削除
//     2020/11/13_オルゴール機能追加

console.log("Hello, base_plugin.js");

const ICON_DIR = "./data/fgimage/default/";// 画像格納ディレクトリ
const BGM_DIR = "./data/bgm/";             // BGM格納ディレクトリ

// For items
var myFlgs    = {};
var myItems   = {};
var myHand    = {};
var elmBkg    = null;
var elmCursor = null;

function init(fObj){
	myFlgs  = fObj.flgs; // フラグ一覧
	myItems = fObj.items;// アイテム一覧
	readyItemPanel();    // アイテムパネル表示
	readyItemCursor();   // カーソル表示
	readyToggle();       // トグルボタン初期化
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
	var w = $("body").width();
	var h = 80;
	if(elmBkg == null){
		elmBkg = $("<p>");
		elmBkg.attr("id", "item_panel");
		elmBkg.css({
			position: "absolute", background: "gray",
			margin: 0, padding: 0, width: w, height: h, top: -h, left: 0
		}).appendTo("body");
	}
	elmBkg.empty();
	// Handle
	var elmHandle = $("<p>");
	elmHandle.css({
		position: "absolute", background: "gray", cursor: "pointer",
		margin: 0, padding: 0, width: 80, height: 24, top: h, left: 0
	}).text("ITEM");
	elmHandle.click(function(e){
		if(elmBkg.offset().top < 0){
			elmBkg.css({top: 0});
		}else{
			elmBkg.css({top: -h});
		}
	});
	elmHandle.appendTo(elmBkg);
	// Items
	var m = 10;
	var s = 60;
	var l = 0;
	for(var key in myItems){
		var item = myItems[key];
		var elmBtn = $("<img>");
		elmBtn.css({
			position: "absolute", background: "pink", cursor: "pointer",
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
	console.log("readyItemCursor");
	if(elmCursor == null){
		elmCursor = $("<img>");
		elmCursor.attr("id", "cursor");
		elmCursor.css({
			position: "absolute", background: "orange", visibility: "hidden",
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

//==========
// Toggle

var tglBkg   = null;
var tglBkgX  = 0;
var tglBkgY  = 0;
var tglBkgW  = 100;
var tglBkgH  = 180;
var tglFiles = [];
var tglBtns  = [];

function readyToggle(x, y, w, h, files){
	console.log("readyToggle");
	tglBkgX  = x;
	tglBkgY  = y;
	tglBkgW  = w;
	tglBkgH  = h;
	tglFiles = files;
}

function createToggle(x, y, i, ans){
	console.log("createToggle");
	var w = $("body").width();
	var h = $("body").height();
	if(tglBkg == null){
		tglBkg = $("<p>");
		tglBkg.attr("id", "tgl_panel");
		tglBkg.css({
			position: "absolute", background: "gray",
			margin: 0, padding: 0, width: tglBkgW, height: tglBkgH, top: tglBkgY, left: tglBkgX
		}).appendTo("body");
	}

	var tglBtn = $("<img>");
	tglBtn.css({
		position: "absolute", background: "aqua", cursor: "pointer",
		margin: 0, padding: 0, top: y, left: x
	});
	tglBtn.attr({src: ICON_DIR+tglFiles[i], i: i, ans: ans});
	tglBtn.click(function(e){
		var n = Number(tglBtn.attr("i")) + 1;// Next
		if(tglFiles.length-1 < n) n = 0;
		tglBtn.attr({src: ICON_DIR+tglFiles[n], i: n});
		if(checkToggles()){// Test
			console.log("おおあたりー");
		}else{
			console.log("ちゃいますよ");
		}
	});
	tglBtn.appendTo(tglBkg);
	tglBtns.push(tglBtn);// Push
}

function checkToggles(){
	if(tglBtns.length <= 0) return false;
	for(var i=0; i<tglBtns.length; i++){
		var tglBtn = tglBtns[i];
		if(tglBtn.attr("i") != tglBtn.attr("ans")) return false;
	}
	return true;
}

function clearToggles(){
	console.log("clearToggles");
	if(tglBkg == null) return;
	tglBkg.remove();
	tglBkg = null;
}

//==========
// Timer

var timerBkg   = null;
var timerBkgX  = 0;
var timerBkgY  = 0;
var timerBkgW  = 100;
var timerBkgH  = 180;
var timerNums  = null;
var timerFlg   = false;

function readyTimer(x, y, w, h){
	console.log("readyTimer");
	timerBkgX = x;
	timerBkgY = y;
	timerBkgW = w;
	timerBkgH = h;
}

function startTimer(timeCnt, fontSize, target){
	console.log("startTimer");
	var w = $("body").width();
	var h = $("body").height();
	if(timerBkg == null){
		timerBkg = $("<p>");
		timerBkg.attr("id", "timer_panel");
		timerBkg.css({
			position: "absolute", background: "gray",
			margin: 0, padding: 0, width: timerBkgW, height: timerBkgH, top: timerBkgY, left: timerBkgX
		}).appendTo("body");
		// Number
		timerNums = $("<font>");
		timerNums.text(formatTime(timeCnt));
		timerNums.attr("size", fontSize);
		timerNums.css({
			color: "white"
		}).appendTo(timerBkg);
	}
	timerFlg = true;
	stepTime();

	function stepTime(){
		console.log("stepTime:", timeCnt);
		if(!timerFlg) return;
		if(0 < timeCnt) timeCnt -= 10;
		timerNums.text(formatTime(timeCnt));// Display
		if(timeCnt == 0){
			timerFlg = false;// Flg
			TYRANO.kag.ftag.startTag("jump",{target:target});// Jump
			return;
		}
		setTimeout(stepTime, 100);
	}
}

function formatTime(timeCnt){
	var timeSec = Math.floor(timeCnt/100);
	var timeMil = Math.floor(timeCnt%100);
	if(timeSec < 10) timeSec = "0" + timeSec;
	if(timeMil < 10) timeMil = "0" + timeMil;
	return timeSec + ":" + timeMil;
}

function stopTimer(){
	timerFlg = false;
}

function clearTimer(){
	console.log("clearTimer");
	timerFlg = false;
	if(timerBkg == null) return;
	timerBkg.remove();
	timerBkg = null;
}

//==========
// MusicBox

var mboxBkg   = null;
var mboxBkgX  = 0;
var mboxBkgY  = 0;
var mboxBkgW  = 100;
var mboxBkgH  = 180;
var mboxAudio = null;
var mboxOgg   = null;
var mboxNotes = [];

function readyMbox(x, y, w, h, ogg){
	console.log("readyMusicBox");
	mboxBkgX = x;
	mboxBkgY = y;
	mboxBkgW = w;
	mboxBkgH = h;
	mboxOgg  = ogg;
}

function createMboxNote(x, y, pngOff, pngOn, interval, time){
	console.log("createMusicbox");
	var w = $("body").width();
	var h = $("body").height();
	if(mboxBkg == null){
		mboxBkg = $("<p>");
		mboxBkg.attr("id", "mbox_panel");
		mboxBkg.css({
			position: "absolute", background: "gray",
			margin: 0, padding: 0, width: mboxBkgW, height: mboxBkgH, top: mboxBkgY, left: mboxBkgX
		}).appendTo("body");
	}
	mboxNotes.push({x:x, y:y, pngOff:pngOff, pngOn:pngOn, interval:interval, time:time});// Push
}

function playMbox(){
	// BGM
	playBGM();
	// Notes
	mboxBkg.empty();// Empty
	for(var i=0; i<mboxNotes.length; i++){
		var note = mboxNotes[i];// Note
		var mboxNote = $("<img>");
		mboxNote.css({
			position: "absolute",
			margin: 0, padding: 0, top: note.y, left: note.x
		});
		mboxNote.attr({src: ICON_DIR+note.pngOff});
		mboxNote.appendTo(mboxBkg);
		blinkMboxImg(mboxNote, note.pngOff, note.pngOn, note.interval, note.time);// Blink
	}
}

function playBGM(){
	stopBGM();// Stop BGM
	if(!mboxAudio) mboxAudio = new Audio(BGM_DIR+mboxOgg);
	mboxAudio.play();
}

function stopBGM(){
	if(!mboxAudio) return;
	mboxAudio.pause();// Pause
	mboxAudio.currentTime = 0;
}

function blinkMboxImg(target, pngOff, pngOn, interval, time){
	// Timeout
	setTimeout(function(){
		target.attr({src: ICON_DIR+pngOn});// On
		setTimeout(function(){
			target.attr({src: ICON_DIR+pngOff});// Off
		}, time);
	}, interval);
}

function clearMbox(){
	console.log("clearMusicbox");
	stopBGM();// Stop BGM
	if(mboxBkg == null) return;
	mboxBkg.remove();
	mboxBkg = null;
}