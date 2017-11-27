//==========
// Message
function msgConnectionOnline(userName){
	console.log("msgConnectionOnline:" + userName);
	setTimeout(updateFriendsBox, 1000);
	// Controller
	setTimeout(function(){if(getUserName() == userName) ctlController.setPowerOn();}, 1000);
}

function msgConnectionOffline(userName){
	console.log("msgConnectionOffline:" + userName);
	setTimeout(updateFriendsBox, 1000);
}

function msgConnectionCode(userName){
	console.log("msgConnectionCode:" + userName);
	setTimeout(launchUserCode, 1000);
}

function updateFriendsBox(){
	console.log("updateFriendsBox");
	jQuery.ajax("./utils/rz_connection.php", {
			type: "POST",
			dataType: "json",
			data:{},
			success: function(e){
				console.log("success");

				// FriendsBox
				$("#friendsBox").empty();
				var result = e["result"];
				for(var i=0; i<result.length; i++){
					var userName = result[i]["user_name"];
					console.log("userName:" + userName);
					$("#friendsBox").append(
						'<div class="connectionLamp"><div><div id="online"><i class="fa fa-user"></i>:' + userName + '</div></div></div>');
				}
			},
			error: function(e){
				console.log("error");
			}
		}
	);
}

//==========
// Status
function statusOnline(){
	$(".connectionLamp div div").attr("id", "online");
	$(".connectionLamp div div").empty();
	$(".connectionLamp div div").append("Online");
	// Send
	if(socket != null) socket.send(CONNECTION_ONLINE + MSG_DELIMITER + getUserName());
}

function statusOffline(){
	$(".connectionLamp div div").attr("id", "offline");
	$(".connectionLamp div div").empty();
	$(".connectionLamp div div").append("Offline");
	// Send
	if(socket != null) socket.send(CONNECTION_OFFLINE + MSG_DELIMITER + getUserName());
}

//==========
// AJAX
function launchUserCode(){
	console.log("launchUserCode");
	jQuery.ajax("./utils/rz_launch_code.php", {
			type: "POST",
			dataType: "json",
			data:{
				"launch": "true"
			},
			success: function(e){
				console.log("success(launch)");
				var result = e["result"];
				for(var i=0; i<result.length; i++){
					console.log("uid:" + result[i]["uid"]);
					console.log("userName:" + result[i]["user_name"]);
					console.log("userCode:" + result[i]["user_code"]);
					// Run
					eval(result[i]["user_code"]);
				}
				console.log("total:" + result.length);
			},
			error: function(e){
				console.log("error");
				console.log(e);
			}
		}
	);
}

//==========
// Main
enchant();
var gameManager;
var core;
var scene;
window.onload = function(){

	// Width, Height
	var width = $(".loginBackground").width();
	var height = $(".loginBackground").height();
	$("#enchant-stage").attr("width", width);
	$("#enchant-stage").attr("height", height);

	// EnchantJS
	gameManager = new common.GameManager();
	core = gameManager.createCore(width, height);
	core.preload(assets);
	core.onload = function(){gameStart();};
	core.start();

	//==========
	// Ratchet
	socket = clientOpen();
}

var resizeTimer;
window.onresize = function(e){
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function(){
		//setup();// TODO:この箇所で不具合
	}, 250);
}

window.onbeforeunload = function(){

	// Status
	if(socket != null) statusOffline();

	//==========
	// Ratchet
	clientClose();
	return false;
}

//==========
// EnchantJS
var ctlController;
function gameStart(){// ゲーム画面
	scene = gameManager.createGameScene();
	core.replaceScene(scene); core.resume();

	//==========
	// ここから
	//==========

	// Controller
	ctlController = createController();
	scene.addChild(ctlController);

	//==========
	// ここまで
	//==========
}

//==========
// Controller
function createController(){

	var dgController = new DgController();
	dgController.x = Math.floor(scene.width * 0.5 - dgController.getWidth() * 0.5);
	dgController.y = Math.floor(scene.height * 0.5 - dgController.getHeight() * 0.5);

	dgController.setup(
		function(){console.log("controlUp");
			var sound = core.assets["sounds/btn_push.mp3"].clone().play();
			// Send
			if(socket != null) socket.send(CONNECTION_CONTROL_UP + MSG_DELIMITER + getUserName());
		},
		function(){console.log("controlDown");
			var sound = core.assets["sounds/btn_push.mp3"].clone().play();
			// Send
			if(socket != null) socket.send(CONNECTION_CONTROL_DOWN + MSG_DELIMITER + getUserName());
		},
		function(){console.log("controlLeft");
			var sound = core.assets["sounds/btn_push.mp3"].clone().play();
			// Send
			if(socket != null) socket.send(CONNECTION_CONTROL_LEFT + MSG_DELIMITER + getUserName());
		},
		function(){console.log("controlRight");
			var sound = core.assets["sounds/btn_push.mp3"].clone().play();
			// Send
			if(socket != null) socket.send(CONNECTION_CONTROL_RIGHT + MSG_DELIMITER + getUserName());
		},
		function(){console.log("controlA");
			var sound = core.assets["sounds/btn_push.mp3"].clone().play();
			// Send
			if(socket != null) socket.send(CONNECTION_CONTROL_A + MSG_DELIMITER + getUserName());
		},
		function(){console.log("controlB");
			var sound = core.assets["sounds/btn_push.mp3"].clone().play();
			// Send
			if(socket != null) socket.send(CONNECTION_CONTROL_B + MSG_DELIMITER + getUserName());
		}
	);
	return dgController;
}

//==========
// Controll from UI
function msgConnectionControlUp(userName){
	console.log("msgConnectionControlUp:" + userName);
}

function msgConnectionControlDown(userName){
	console.log("msgConnectionControlDown:" + userName);
}

function msgConnectionControlLeft(userName){
	console.log("msgConnectionControlLeft:" + userName);
}

function msgConnectionControlRight(userName){
	console.log("msgConnectionControlRight:" + userName);
}

function msgConnectionControlA(userName){
	console.log("msgConnectionControlA:" + userName);
}

function msgConnectionControlB(userName){
	console.log("msgConnectionControlB:" + userName);
}

function msgConnectionControlOption(userName){
	console.log("msgConnectionControlOption:" + userName);
}

function msgConnectionControlOther(strs){
	console.log("msgConnectionControlOther:" + strs[0]);
}