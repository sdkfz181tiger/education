//==========
// Message
function msgConnectionOnline(userName){
	console.log("msgConnectionOnline:" + userName);
	setTimeout(updateFriendsBox, 3000);
	// Fc
	setTimeout(function(){if(getUserName() == userName && ctlFc != null) ctlFc.setPowerOn();}, 3000);
}

function msgConnectionOffline(userName){
	console.log("msgConnectionOffline:" + userName);
	setTimeout(updateFriendsBox, 3000);
}

function msgConnectionCode(userName){
	console.log("msgConnectionCode:" + userName);
	// Do nothing
	//setTimeout(launchUserCode, 3000);
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

function statusCode(){
	$(".codeLamp div div").attr("id", "active");
	var timer = setTimeout(function(){
		$(".codeLamp div div").attr("id", "inactive");
	}, 1000);
	// Send
	if(socket != null) socket.send(CONNECTION_CODE + MSG_DELIMITER + getUserName());
}

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
			},
			error: function(e){
				console.log("error");
			}
		}
	);
}

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
			}
		}
	);
}

function runUserCode(userName, userCode){
	console.log("runUserCode:" + userName);
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
				// Send
				statusCode();
			},
			error: function(e){
				console.log("error");
			}
		}
	);
	
	// Show / Hide
	$("#submitRunCode").hide();
	$("#submitDummyCode").show();
	setTimeout(function(){
		$("#submitRunCode").show();
		$("#submitDummyCode").hide();
	}, 3000);
}

//==========
// Main
enchant();
var gameManager;
var core;
var scene;

//==========
// EnchantJS
function enchantStart(){

	// EnchantJS
	gameManager = new common.GameManager();
	core = gameManager.createCore(540, 480);
	core.preload(assets);
	core.onload = function(){gameStart();};
	core.start();
}

// Area etc...
var area;
var portalIndex;
var map;
var portal;

var playerGroup;
var markerItemGroup;
var markerEnemyGroup;
var markerTrapGroup;

var ctlFc;
var tPanel;
var sPanel;
var iPanel;
var puppet;

var ctlKbd;

function gameStart(){// ゲーム画面
	scene = gameManager.createGameScene();
	core.replaceScene(scene); core.resume();

	//==========
	// ここから
	//==========

	scene.backgroundColor = "#333333";

	// Area
	area = new Group();
	scene.addChild(area);

	// PortalIndex
	portalIndex = 0;

	// Map
	map = new DgMap(32, 32, data, collision, "images/dg_map_client.png");
	map.x = Math.floor(scene.width * 0.5 - map.getWidth() * 0.5);
	map.y = Math.floor(scene.height * 0.5 - map.getHeight() * 0.5);
	map.setPortalGridX(portals[portalIndex][0]);
	map.setPortalGridY(portals[portalIndex][1]);
	area.addChild(map);

	// Portal
	portal = new Sprite(32, 32);
	portal.image = core.assets["images/dg_stair.png"];
	portal.x = map.getPortalPosX();
	portal.y = map.getPortalPosY();
	area.addChild(portal);

	// Players
	playerGroup = new Group();

	// Markers
	markerItemGroup  = new Group();
	markerEnemyGroup = new Group();
	markerTrapGroup  = new Group();

	area.addChild(markerTrapGroup);
	area.addChild(markerItemGroup);
	area.addChild(markerEnemyGroup);
	area.addChild(playerGroup);

	// Marker(Items)
	for(var r=itemPositions.length-1; 0<=r; r--){
		for(var c=0; c<itemPositions[r].length; c++){
			if(0 < itemPositions[r][c]){// 0 is Nothing
				var tag = "item";
				var spriteId = c + "_" + r;
				var item = createMarkerItem(tag, spriteId);
				if(item != null){
					item.x = map.x + map.tileWidth * c;
					item.y = map.y + map.tileHeight * r;
					markerItemGroup.addChild(item);
				}
			}
		}
	}

	/*
	// Marker(Enemies)
	for(var r=enemyPositions.length-1; 0<=r; r--){
		for(var c=0; c<enemyPositions[r].length; c++){
			if(0 < enemyPositions[r][c]){// 0 is Nothing
				var tag = "enemy";
				var spriteId = c + "_" + r;
				var enemy = createMarkerEnemy(tag, spriteId);
				if(enemy != null){
					enemy.x = map.x + map.tileWidth * c;
					enemy.y = map.y + map.tileHeight * r;
					markerEnemyGroup.addChild(enemy);
				}
			}
		}
	}
	*/

	// Marker(Traps)
	for(var r=trapPositions.length-1; 0<=r; r--){
		for(var c=0; c<trapPositions[r].length; c++){
			if(0 < trapPositions[r][c]){// 0 is Nothing
				var tag = "trap";
				var spriteId = c + "_" + r;
				var trap = createMarkerTrap(tag, spriteId);
				if(trap != null){
					trap.x = map.x + map.tileWidth * c;
					trap.y = map.y + map.tileHeight * r;
					markerTrapGroup.addChild(trap);
				}
			}
		}
	}

	// Fc
	ctlFc = createFc();
	//ctlFc.openController();// Open
	scene.addChild(ctlFc);

	// Keyboard
	ctlKbd = createKbd();
	scene.addChild(ctlKbd);

	// TopPanel
	tPanel = new DgTopPanel(scene.width, 115);
	tPanel.setup();
	scene.addChild(tPanel);

	// StatusPanel
	sPanel = new DgStatusPanel();
	sPanel.x = 40;
	sPanel.y = 20;
	tPanel.addChild(sPanel);

	// ItemPanel
	iPanel = new DgItemPanel(300, scene.height);
	iPanel.x = 120;
	iPanel.y = 15;
	tPanel.addChild(iPanel);

	// Puppet
	puppet = new DgPuppet();
	puppet.x = 410;
	puppet.y = 0;
	tPanel.addChild(puppet);

	// Dragging
	scene.addEventListener(Event.TOUCH_START, dragStart);
	scene.addEventListener(Event.TOUCH_END, dragEnd);

	//==========
	// ここまで
	//==========
}

//==========
// Dragging
function dragStart(e){
	portal.visible = false;
	for(var i=0; i<playerGroup.childNodes.length; i++){
		playerGroup.childNodes[i].visible = false;
	}
	for(var i=0; i<markerItemGroup.childNodes.length; i++){
		markerItemGroup.childNodes[i].visible = false;
	}
	for(var i=0; i<markerEnemyGroup.childNodes.length; i++){
		markerEnemyGroup.childNodes[i].visible = false;
	}
	for(var i=0; i<markerTrapGroup.childNodes.length; i++){
		markerTrapGroup.childNodes[i].visible = false;
	}
	var dragOffsetX = area.x - e.x;
	var dragOffsetY = area.y - e.y;

	var paddingW = Math.abs(scene.width - map.getWidth()) * 0.5;
	var paddingH = Math.abs(scene.height - map.getHeight()) * 0.5;
	scene.addEventListener(Event.TOUCH_MOVE, function(e){
		area.x = dragOffsetX + e.x;
		area.y = dragOffsetY + e.y;
		if(paddingW <= area.x)  area.x = paddingW;
		if(area.x <= -paddingW) area.x = -paddingW;
		if(paddingH <= area.y)  area.y = paddingH;
		if(area.y <= -paddingH) area.y = -paddingH;
		var left   = scene.width * 0.1;
		var right  = scene.width * 0.9;
		var top    = scene.height * 0.1;
		var bottom = scene.height * 0.9;
		if(right < e.x || e.x < left || bottom < e.y || e.y < top){
			portal.visible = true;
			for(var i=0; i<playerGroup.childNodes.length; i++){
				playerGroup.childNodes[i].visible = true;
			}
			for(var i=0; i<markerItemGroup.childNodes.length; i++){
				markerItemGroup.childNodes[i].visible = true;
			}
			for(var i=0; i<markerEnemyGroup.childNodes.length; i++){
				markerEnemyGroup.childNodes[i].visible = true;
			}
			for(var i=0; i<markerTrapGroup.childNodes.length; i++){
				markerTrapGroup.childNodes[i].visible = true;
			}
			this.clearEventListener(Event.TOUCH_MOVE);
		}
	});
}

function dragEnd(e){
	portal.visible = true;
	for(var i=0; i<playerGroup.childNodes.length; i++){
		playerGroup.childNodes[i].visible = true;
	}
	for(var i=0; i<markerItemGroup.childNodes.length; i++){
		markerItemGroup.childNodes[i].visible = true;
	}
	for(var i=0; i<markerEnemyGroup.childNodes.length; i++){
		markerEnemyGroup.childNodes[i].visible = true;
	}
	for(var i=0; i<markerTrapGroup.childNodes.length; i++){
		markerTrapGroup.childNodes[i].visible = true;
	}
	this.clearEventListener(Event.TOUCH_MOVE);
}

function createPlayer(tag){
	// Create or Reuse
	var player = null;
	var existFlg = false;
	for(var i=0; i<playerGroup.childNodes.length; i++){
		if(playerGroup.childNodes[i].tag == tag){
			player = playerGroup.childNodes[i];
			existFlg = true;
		}
	}
	if(existFlg == false){
		// Create
		player = new DgPlayer(32, 32, 
			"images/dg_player.png", tag, "images/bullet_player.png", 1, map);
		player.x = portal.x;
		player.y = portal.y;
		playerGroup.addChild(player);
	}
	return player;
}

function createMarkerItem(tag, spriteId){
	for(var i=0; i<markerItemGroup.childNodes.length; i++){
		if(markerItemGroup.childNodes[i].getSpriteId() == spriteId){
			return markerItemGroup.childNodes[i];
		}
	}
	var marker = new DgMarkerItem(32, 32, "images/dg_marker_item.png", tag, spriteId);
	markerItemGroup.addChild(marker);
	return marker;
}

function createMarkerEnemy(tag, spriteId){
	console.log("tag:" + tag);
	console.log("spriteId:" + spriteId);
	for(var i=0; i<markerEnemyGroup.childNodes.length; i++){
		if(markerEnemyGroup.childNodes[i].getSpriteId() == spriteId){
			return markerEnemyGroup.childNodes[i];
		}
	}
	var marker = new DgMarkerEnemy(32, 32, "images/dg_marker_enemy.png", tag, spriteId);
	marker.markAlive();
	markerEnemyGroup.addChild(marker);
	return marker;
}

function createMarkerTrap(tag, spriteId){
	for(var i=0; i<markerTrapGroup.childNodes.length; i++){
		if(markerTrapGroup.childNodes[i].getSpriteId() == spriteId){
			return markerTrapGroup.childNodes[i];
		}
	}
	var marker = new DgMarkerTrap(32, 32, "images/dg_marker_trap.png", tag, spriteId);
	markerTrapGroup.addChild(marker);
	return marker;
}

function getRandom(start, end){
	return start + Math.floor( Math.random() * (end - start + 1));
}

function createBomb(){
	// Create new Sprite
	var bomb = new DgBomb(32, 32, "images/dg_bomb_32.png", "bomb");
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
	dgFc.x = Math.floor(scene.width);
	dgFc.y = Math.floor(scene.height*0.5 - dgFc.getHeight()*0.5);
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
		function(){console.log("controlC");
			var sound = core.assets["sounds/btn_push.mp3"].clone().play();
			// Send
			if(socket != null) socket.send(CONNECTION_CONTROL_C + MSG_DELIMITER + getUserName());
		},
		function(){console.log("controlD");
			var sound = core.assets["sounds/btn_push.mp3"].clone().play();
			// Send
			if(socket != null) socket.send(CONNECTION_CONTROL_D + MSG_DELIMITER + getUserName());
		},
		function(){console.log("controlOption");
			var sound = core.assets["sounds/btn_push.mp3"].clone().play();
			// Send
			if(socket != null) socket.send(CONNECTION_CONTROL_OPTION + MSG_DELIMITER + getUserName());
		});
	return dgFc;
}

function createKbd(){

	// Chars
	var arrLeft = [
		["あ", "い", "う", "え", "お"], ["か", "き", "く", "け", "こ"],
		["さ", "し", "す", "せ", "そ"], ["た", "ち", "つ", "て", "と"],
		["な", "に", "ぬ", "ね", "の"]
	];
	var arrRight = [
		["は", "ひ", "ふ", "へ", "ほ"], ["ま", "み", "む", "め", "も"],
		["や", "ゆ", "よ", "", ""], ["ら", "り", "る", "れ", "ろ"],
		["わ", "を", "ん", "゛", "゜"]
	];

	var dgKbd = DgKeyBoard();
	dgKbd.x = Math.floor(scene.width*0.5 - dgKbd.getWidth()*0.5);
	dgKbd.y = Math.floor(scene.height);
	dgKbd.setup();
	dgKbd.makeKeys(30, 90, 38, arrLeft);
	dgKbd.makeKeys(235, 90, 38, arrRight);
	dgKbd.makeCtls(function(){
		// Send
		var str = dgKbd.getStr();
		if(str.length <= 0) return;
		if(socket != null) socket.send(CONNECTION_CONTROL_TALK + MSG_DELIMITER + getUserName() + TALK_DELIMITER + str);
		var sound = core.assets["sounds/btn_push.mp3"].clone().play();
	});
	return dgKbd;
}

//==========
// Controll from UI
function msgConnectionControlUp(userName){
	console.log("msgConnectionControlUp:" + userName);
	if(getUserName() != userName) return;
}

function msgConnectionControlDown(userName){
	console.log("msgConnectionControlDown:" + userName);
	if(getUserName() != userName) return;
}

function msgConnectionControlLeft(userName){
	console.log("msgConnectionControlLeft:" + userName);
	if(getUserName() != userName) return;
}

function msgConnectionControlRight(userName){
	console.log("msgConnectionControlRight:" + userName);
	if(getUserName() != userName) return;
}

function msgConnectionControlA(userName){
	console.log("msgConnectionControlA:" + userName);
	if(getUserName() != userName) return;
}

function msgConnectionControlB(userName){
	console.log("msgConnectionControlB:" + userName);
	if(getUserName() != userName) return;
}

function msgConnectionControlC(userName){
	console.log("msgConnectionControlC:" + userName);
	if(getUserName() != userName) return;
}

function msgConnectionControlD(userName){
	console.log("msgConnectionControlD:" + userName);
	if(getUserName() != userName) return;
}

function msgConnectionControlOption(userName){
	console.log("msgConnectionControlOption:" + userName);
	if(getUserName() != userName) return;
}

function msgConnectionControlOther(strs){
	console.log("msgConnectionControlOther:" + strs[0]);
	// Status
	var userName = strs[0];
	if(getUserName() == userName){

		// Player
		var player = createPlayer(userName);

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

			// Sound
			var sound = core.assets["sounds/born.mp3"].clone().play();

			// Popper
			var popper = createPopper("GO!!", player.x, player.y, 10, player.width, "white");
			playerGroup.addChild(popper);
		}

		// DIE
		if(QUEST_DIE == quest){
			var die = value;
			console.log("die:" + die);

			// Bomb
			var bomb = createBomb();
			bomb.x = player.x;
			bomb.y = player.y;
			playerGroup.addChild(bomb);

			// Sound
			var sound = core.assets["sounds/die.mp3"].clone().play();

			// Popper
			var popper = createPopper(die, player.x, player.y, 10, player.width, "orange");
			playerGroup.addChild(popper);
		}

		// DAMAGE
		if(QUEST_DAMAGE == quest){
			var damage = value;
			console.log("damage:" + damage);

			// Bomb
			var bomb = createBomb();
			bomb.x = player.x;
			bomb.y = player.y;
			playerGroup.addChild(bomb);

			// Sound
			var sound = core.assets["sounds/damage.mp3"].clone().play();

			// Popper
			var popper = createPopper(damage, player.x, player.y, 10, player.width, "orange");
			playerGroup.addChild(popper);
		}

		// EQUIP
		if(QUEST_EQUIP == quest){
			var equip = value;
			console.log("equip:" + equip);

			var str = "!";
			if(equip != 0) str = equip;

			// Popper
			var popper = createPopper(str, player.x, player.y, 10, player.width, "white");
			playerGroup.addChild(popper);
		}
	}
}

function msgConnectionControlDone(strs){
	console.log("msgConnectionControlDone:" + 
		strs[0] + ", " + strs[1] + ", " + strs[2] + ", " + strs[3] + ", " + strs[4]);
	// Marker
	var tag = strs[0];
	var x = map.x + map.tileWidth  * strs[1];
	var y = map.y + map.tileHeight * strs[2];
	var direction = strs[3];
	var spriteId  = strs[4];
	var pHP       = strs[5];
	var pMP       = strs[6];

	if(tag == getUserName()){
		var player = createPlayer(tag);
		player.tl.moveTo(x, y, 8);
		player.setDirection(direction);
		// Fog
		map.lightAround(x, y);
	}else if(tag == enchant.dg.ENEMY_TAG || tag == enchant.dg.REAPER_TAG){
		var marker = createMarkerEnemy(tag, spriteId);
		if(marker.x == 0 && marker.y == 0){
			marker.tl.moveTo(x, y, 0);
		}else{
			marker.tl.moveTo(x, y, 8);
		}
		if(0 < pHP){
			marker.markAlive();
		}else{
			marker.markDead();
		}
	}
}

function msgConnectionControlTalk(strs){
	console.log("msgConnectionControlTalk:" + strs[0] + ", " + strs[1]);
	if(strs[0] == getUserName()){
		// Player
		var player = createPlayer(strs[0]);
		// Popper
		var popper = createPopper(
			strs[1], player.x, player.y, 10, player.width, "white");
		area.addChild(popper);
	}
}

//==========
// MoveDone
var moveDone = function(player){
	// Do nothing
}