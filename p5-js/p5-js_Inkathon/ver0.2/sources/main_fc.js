//==========
// Message
function msgConnectionOnline(userName){
	console.log("msgConnectionOnline:" + userName);
	setTimeout(updateFriendsBox, 1000);
	// Fc
	setTimeout(function(){if(getUserName() == userName) ctlFc.setPowerOn();}, 3000);
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

window.onunload = function(){

	// Status
	if(socket != null) statusOffline();

	//==========
	// Ratchet
	clientClose();
	return false;
}

//==========
// EnchantJS

var ctlFc;
var sPanel;
var iPanel;
var puppet;

function gameStart(){// ゲーム画面
	scene = gameManager.createGameScene();
	core.replaceScene(scene); core.resume();

	//==========
	// ここから
	//==========

	// Fc
	ctlFc = createFc();
	ctlFc.openController();// Open
	scene.addChild(ctlFc);

	// StatusPanel
	sPanel = new DgStatusPanel();
	sPanel.x = 15 + scene.width * 0.5 - 320 * 0.5;
	sPanel.y = 110;
	scene.addChild(sPanel);

	// ItemPanel
	iPanel = new DgItemPanel(320, scene.height);
	iPanel.x = scene.width * 0.5 - 320 * 0.5;
	iPanel.y = 5;
	scene.addChild(iPanel);

	// Puppet
	puppet = new DgPuppet();
	puppet.x = scene.width * 0.5 - puppet.width * 0.5;
	puppet.y = scene.height * 0.5 - puppet.height * 0.5;
	scene.addChild(puppet);

	//==========
	// ここまで
	//==========
}

function getRandom(start, end){
	return start + Math.floor( Math.random() * (end - start + 1));
}

function createBomb(){
	// Create new Sprite
	var bomb = new DgBomb(96, 96, "images/dg_bomb_96.png", "bomb");
	return bomb;
}

function createPopper(str, x, y, size, width, color){
	// Create new DgPopper
	if(str == 0) str = "0";
	var popper = new DgPopper(str, x, y, size, width, color);
	return popper;
}

//==========
// Fc
function createFc(){

	var dgFc = DgFc();
	dgFc.x = Math.floor(scene.width * 0.5 - dgFc.getWidth() * 0.5);
	dgFc.y = Math.floor(scene.height);
	dgFc.setup(
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
		},
		function(){console.log("controlOption");
			var sound = core.assets["sounds/btn_push.mp3"].clone().play();
			// Send
			if(socket != null) socket.send(CONNECTION_CONTROL_OPTION + MSG_DELIMITER + getUserName());
		});
	return dgFc;
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
	// Status
	var userName = strs[0];
	if(getUserName() == userName){

		// StatusPanel
		if(sPanel != null){
			sPanel.updateParam(
				strs[0], strs[1], strs[2], strs[3], strs[4],
				strs[5], strs[6]);
		}

		// ItemPanel
		if(iPanel != null){
			iPanel.updateParam(
				strs[7], strs[8], strs[9], strs[10], strs[11],
				strs[12], strs[13], strs[14], strs[15], strs[16],
				strs[17], strs[18]);
		}

		// Puppet
		if(puppet != null){
			puppet.updateParam(
				strs[7], strs[8], strs[9], strs[10], strs[11],
				strs[12], strs[13], strs[14], strs[15], strs[16],
				strs[17], strs[18]);
		}

		// QUEST
		var quest = strs[strs.length - 2];
		var value = strs[strs.length - 1];

		// BORN
		if(QUEST_BORN == quest){
			var born = value;// No use
			console.log("born:" + born);
		}

		// DIE
		if(QUEST_DIE == quest){
			var die = value;
			console.log("die:" + die);

			// Bomb
			var bomb = createBomb();
			bomb.x = puppet.x;
			bomb.y = puppet.y;
			scene.addChild(bomb);

			// Sound
			var sound = core.assets["sounds/bomb_s.mp3"].clone().play();

			// Popper
			var popper = createPopper(damage, puppet.x, puppet.y, 30, puppet.width, "orange");
			scene.addChild(popper);
		}

		// DAMAGE
		if(QUEST_DAMAGE == quest){
			var damage = value;
			console.log("damage:" + damage);

			// Bomb
			var bomb = createBomb();
			bomb.x = puppet.x;
			bomb.y = puppet.y;
			scene.addChild(bomb);

			// Sound
			var sound = core.assets["sounds/bomb_s.mp3"].clone().play();

			// Popper
			var popper = createPopper(damage, puppet.x, puppet.y, 30, puppet.width, "orange");
			scene.addChild(popper);
		}

		// EQUIP
		if(QUEST_EQUIP == quest){
			var equip = value;
			console.log("equip:" + equip);

			var str = "!";
			if(equip != 0) str = equip;

			// Popper
			var popper = createPopper(str, puppet.x, puppet.y, 30, puppet.width, "white");
			scene.addChild(popper);
		}
	}
}

//==========
// Controll from Android

//==========
// AJAX
function uploadUserCode(userName, userCode){
	console.log("uploadUserCode:" + userName);
	jQuery.ajax("./utils/rz_upload_code.php", {
			type: "POST",
			dataType: "json",
			data:{
				"upload": "true",
				"user_name": userName,
				"user_code": userCode
			},
			success: function(e){
				console.log("success(upload)");
				var result = e["result"];
				console.log("result:" + result);
				// Popper
				var popper = createPopper("Uploaded!!", puppet.x, puppet.y, 30, puppet.width, "orange");
				scene.addChild(popper);
				// Send
				if(socket != null) socket.send(CONNECTION_CODE + MSG_DELIMITER + getUserName());
			},
			error: function(e){
				console.log("error");
			}
		}
	);
}

function downloadUserCode(userName){
	console.log("downloadUserCode:" + userName);
	jQuery.ajax("./utils/rz_download_code.php", {
			type: "POST",
			dataType: "json",
			data:{
				"download": "true",
				"user_name": userName
			},
			success: function(e){
				console.log("success(download)");
				var result = e["result"];
				for(var i=0; i<result.length; i++){
					console.log("uid:" + result[i]["uid"]);
					console.log("userName:" + result[i]["user_name"]);
					console.log("userCode:" + result[i]["user_code"]);
				}
				console.log("total:" + result.length);
				// Popper
				var popper = createPopper("Downloaded!!", puppet.x, puppet.y, 30, puppet.width, "orange");
				scene.addChild(popper);
			},
			error: function(e){
				console.log("error");
			}
		}
	);
}