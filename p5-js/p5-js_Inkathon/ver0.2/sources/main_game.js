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
	// Delete
	setTimeout(deletePlayer(userName), 3000);
}

function msgConnectionCode(userName){
	console.log("msgConnectionCode:" + userName);
	setTimeout(launchUserCode(userName), 3000);
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
function launchUserCode(userName){
	console.log("launchUserCode");
	jQuery.ajax("./utils/rz_launch_code.php", {
			type: "POST",
			dataType: "json",
			data:{
				"launch": "true",
				"user_name": userName
			},
			success: function(e){
				console.log("success(launch)");
				var result = e["result"];
				for(var i=0; i<result.length; i++){
					console.log("id:" + result[i]["id"]);
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

//==========
// Main
enchant();

var gameManager;
var core;
var scene;

//==========
// EnchantJS
function enchantStart(){

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
}

// Area etc...
var area;
var portalIndex;
var map;
var portal;

var playerGroup;
var bulletGroup;
var itemGroup;
var enemyGroup;
var trapGroup;

var firepattern;

var ctlFc;
var lPanel;
var mPanel;

var ctlKbd;

var bgmNormal, bgmReapers;

function gameStart(){// ゲーム画面
	scene = gameManager.createGameScene();
	core.replaceScene(scene); core.resume();

	//==========
	// ここから
	//==========

	// Area
	area = new Group();
	scene.addChild(area);

	// PortalIndex
	portalIndex = 0;

	// Map
	map = new DgMap(32, 32, data, collision, "images/dg_map_game.png");
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

	portal.addEventListener(Event.TOUCH_START, function(){
		// Move to next portal position
		if(portalIndex < portals.length-1){
			portalIndex++;
		}else{
			portalIndex = 0;
		}
		map.setPortalGridX(portals[portalIndex][0]);
		map.setPortalGridY(portals[portalIndex][1]);
		portal.x = map.getPortalPosX();
		portal.y = map.getPortalPosY();
	});

	// Light
	map.lightAround(portal.x, portal.y);

	// Players, Bullets, Enemies, Items
	playerGroup      = new Group();
	bulletGroup      = new Group();
	itemGroup        = new Group();
	enemyGroup       = new Group();
	trapGroup        = new Group();

	area.addChild(trapGroup);
	area.addChild(itemGroup);
	area.addChild(enemyGroup);
	area.addChild(playerGroup);
	area.addChild(bulletGroup);

	// Items
	for(var r=itemPositions.length-1; 0<=r; r--){
		for(var c=0; c<itemPositions[r].length; c++){
			if(itemPositions[r][c] != 0){// 0 is Nothing
				var item = createItem(itemPositions[r][c], c, r);
				if(item != null) itemGroup.addChild(item);
			}
		}
	}

	// Enemies
	for(var r=enemyPositions.length-1; 0<=r; r--){
		for(var c=0; c<enemyPositions[r].length; c++){
			if(enemyPositions[r][c] != 0){// 0 is Nothing
				var enemy = createEnemy(enemyPositions[r][c], c, r);
				if(enemy != null) enemyGroup.addChild(enemy);
			}
		}
	}

	// Traps
	for(var r=trapPositions.length-1; 0<=r; r--){
		for(var c=0; c<trapPositions[r].length; c++){
			if(trapPositions[r][c] != 0){// 0 is Nothing
				var trap = createTrap(trapPositions[r][c], c, r);
				if(trap != null) trapGroup.addChild(trap);
			}
		}
	}

	// Firepattern
	firepattern = new DgFirepattern(scene.width, scene.height);
	firepattern.x = Math.floor(scene.width * 0.5);
	firepattern.y = Math.floor(scene.height * 0.5);
	scene.addChild(firepattern);
	
	// Fc
	ctlFc = createFc();
	scene.addChild(ctlFc);

	// Keyboard
	ctlKbd = createKbd();
	scene.addChild(ctlKbd);

	// LeftPanel
	lPanel = new DgLeftPanel(110, 305);
	lPanel.x = 0;
	lPanel.y = Math.floor(scene.height * 0.5);
	lPanel.setup();
	scene.addChild(lPanel);

	// MonsterPanel
	mPanel = new DgMonsterPanel(100, 200);
	mPanel.x = Math.floor(5 - lPanel.width);
	mPanel.y = Math.floor(10 - lPanel.height * 0.5);
	lPanel.addChild(mPanel);

	// MonsterMarker
	var mMarker = null;
	var mPin    = null;
	lPanel.addEventListener(Event.TOUCH_START, function(e){
		mPin = pickMonster(e.localX, e.localY);
		if(mPin != null){
			mPin.x = e.x - mPin.width * 0.5;
			mPin.y = e.y - mPin.height * 0.5;
		}
	});
	lPanel.addEventListener(Event.TOUCH_MOVE, function(e){
		if(mPin != null){
			var gridX = Math.floor((e.x - map.x) / map.tileWidth);
			var gridY = Math.floor((e.y - map.y) / map.tileHeight);
			map.blowMarker(gridX, gridY);
			mPin.x = e.x - mPin.width * 0.5;
			mPin.y = e.y - mPin.height * 0.5;
		}
	});
	lPanel.addEventListener(Event.TOUCH_END, function(e){
		if(mPin != null){
			var gridX = Math.floor((e.x - map.x) / map.tileWidth);
			var gridY = Math.floor((e.y - map.y) / map.tileHeight);
			var resultFlg = putMonster(mPin.getType(), gridX, gridY);
			mPin.remove();
			mPin = null;
		}
	});

	// Brain
	var totalRows = data.length;
	var totalCols = data[0].length;
	var brain = createBrain(totalRows, totalCols);

	//==========
	// Collision
	scene.addEventListener(Event.ENTER_FRAME, function(){

		// Bullet x (Player, Enemy)
		for(var b=0; b<bulletGroup.childNodes.length; b++){
			var bullet = bulletGroup.childNodes[b];

			// x Player
			for(var p=0; p<playerGroup.childNodes.length; p++){
				var player = playerGroup.childNodes[p];
				if(bullet.intersect(player)){
					bullet.remove();

					// Guard
					var damage = player.calcGuard(bullet.getAttack());

					// Bomb
					var bomb = createBomb();
					bomb.x = player.x;
					bomb.y = player.y;
					area.addChild(bomb);

					// Sound
					var sound = core.assets["sounds/bomb_s.mp3"].clone().play();

					// Popper
					var popper = createPopper(damage, bomb.x, bomb.y, 10, bomb.width, "orange");
					area.addChild(popper);

					// Die
					if(player.pHP <= 0){
						// Die
						player.actionDie(moveDone, portal);

						// Send
						if(socket != null) socket.send(
							CONNECTION_CONTROL_OTHER + MSG_DELIMITER + player.getCSV() +
							QUEST_DIE + OTHER_DELIMITER + damage);
					}else{
						// Send
						if(socket != null) socket.send(
							CONNECTION_CONTROL_OTHER + MSG_DELIMITER + player.getCSV() + 
							QUEST_DAMAGE + OTHER_DELIMITER + damage);
					}
				}
			}

			// x Enemy
			for(var e=0; e<enemyGroup.childNodes.length; e++){
				var enemy = enemyGroup.childNodes[e];
				if(bullet.intersect(enemy)){

					// Direction
					enemy.setCounter(bullet.getCounter());
					bullet.remove();

					// Guard
					var damage = enemy.calcGuard(bullet.getAttack());

					// Bomb
					var bomb = createBomb();
					bomb.x = enemy.x;
					bomb.y = enemy.y;
					area.addChild(bomb);

					// Sound
					var sound = core.assets["sounds/bomb_s.mp3"].clone().play();

					// Popper
					var popper = createPopper(damage, bomb.x, bomb.y, 10, bomb.width, "white");
					area.addChild(popper);

					// Die
					if(enemy.pHP <= 0){
						// Remove
						enemy.actionDie(moveDone);
					}
				}
			}
		}

		// Item x Player
		for(var i=0; i<itemGroup.childNodes.length; i++){
			var item = itemGroup.childNodes[i];
			for(var p=0; p<playerGroup.childNodes.length; p++){
				var player = playerGroup.childNodes[p];
				if(item.intersect(player)){
					// Item
					item.itemOff();// Off

					// Equip
					var value = player.equipOne(item.frame);

					// Sound
					var sound = core.assets["sounds/item.mp3"].clone().play();

					// Popper
					var popper = createPopper(value, player.x, player.y, 10, player.width, "white");
					area.addChild(popper);

					// Send
					if(socket != null) socket.send(
						CONNECTION_CONTROL_OTHER + MSG_DELIMITER + player.getCSV() +
						QUEST_EQUIP + OTHER_DELIMITER + value);
				}
			}
		}

		// Trap x Player
		for(var i=0; i<trapGroup.childNodes.length; i++){
			var trap = trapGroup.childNodes[i];
			for(var p=0; p<playerGroup.childNodes.length; p++){
				var player = playerGroup.childNodes[p];
				if(trap.intersect(player)){

					// Damage
					var damage = player.calcGuard(trap.getAttack());

					// Bomb
					var bomb = createBomb();
					bomb.x = player.x;
					bomb.y = player.y;
					area.addChild(bomb);

					// Sound
					var sound = core.assets["sounds/bomb_s.mp3"].clone().play();

					// Popper
					var popper = createPopper(damage, bomb.x, bomb.y, 10, bomb.width, "orange");
					area.addChild(popper);

					// Die
					if(player.pHP <= 0){
						// Die
						player.actionDie(moveDone, portal);

						// Send
						if(socket != null) socket.send(
							CONNECTION_CONTROL_OTHER + MSG_DELIMITER + player.getCSV() +
							QUEST_DIE + OTHER_DELIMITER + damage);
					}else{
						// Send
						if(socket != null) socket.send(
							CONNECTION_CONTROL_OTHER + MSG_DELIMITER + player.getCSV() + 
							QUEST_DAMAGE + OTHER_DELIMITER + damage);
					}
				}
			}
		}
	});

	//==========
	// Tick
	scene.tl.delay(enchant.dg.TICK_TIME);
	scene.tl.then(function(){
		tick();
	});
	scene.tl.loop();

	function tick(){
		// Brain
		if(resetBrain(brain)){
			pushBrain(brain, playerGroup);
			pushBrain(brain, enemyGroup);
			//checkBrain(brain);
		}

		// Random
		var rdm = Math.floor(Math.random()*10);

		// Move all enemies
		for(var i=0; i<enemyGroup.childNodes.length; i++){

			var enemy = enemyGroup.childNodes[i];
			var cX = map.x + map.getWidth() * 0.5;
			var cY = map.y + map.getHeight() * 0.5;

			if(enemy.getDirection() == enchant.dg.DIR_NONE){
				console.log("None!!");
				moveDone(enemy);// Sending socket
				enemy.setDirectionRandom();// Random
			}

			// Brain
			var distance = judgeDistance(brain, enemy);

			if(distance < 0){
				// You can't find anything!!
				if(enemy.lockFlg == false){
					// You can go anywhere!!
					if(rdm < enemy.stay){
						// You have to go forward or turn or backward!!
						if(judgeWall(enemy) == true){
							// You can go forward!!
							enemy.actionKeep(moveDone);
						}else{
							// You have to turn or backward!!
							enemy.setDirection(judgeDirection(enemy));
						}
					}else{
						// You have to stay and look around!!
						enemy.setDirection(judgeDirection(enemy));
					}
				}else{
					// You have lost a target!!
					if(enemy.lockApproach() == true){
						// You must go there!!
						enemy.actionKeep(moveDone);
						// Popper
						var popper = createPopper(
							"?", enemy.x, enemy.y, 10, enemy.width, "white");
						area.addChild(popper);
					}else{
						// Popper
						var popper = createPopper(
							"*", enemy.x, enemy.y, 10, enemy.width, "white");
						area.addChild(popper);
					}
				}
			}else if(distance <= enemy.range){
				// You captured a player insite!!
				enemy.actionAttack(moveDone);
				// LockOn!!
				enemy.lockOn(distance);
				// Popper
				var popper = createPopper(
					"!", enemy.x, enemy.y, 10, enemy.width, "white");
				area.addChild(popper);
			}else{
				// You found a player and follow it!!
				enemy.actionKeep(moveDone);
				// LockOn!!
				enemy.lockOn(distance);
				// Popper
				var popper = createPopper(
					"!", enemy.x, enemy.y, 10, enemy.width, "white");
				area.addChild(popper);
			}
		}
	}

	// BGM
	bgmNormal  = core.assets["sounds/bgm_dg_normal.mp3"].clone();
	bgmNormal.play();

	//==========
	// ここまで
	//==========
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
		// Path
		var path = "images/dg_player_" + tag + ".png";

		// Create
		player = new DgPlayer(32, 32, 
			path, tag, "images/bullet_player.png", 1, map);
		player.x = portal.x;
		player.y = portal.y;
		// ID
		player.setSpriteId(tag);
		playerGroup.addChild(player);
		// Send
		if(socket != null) socket.send(
			CONNECTION_CONTROL_OTHER + MSG_DELIMITER + player.getCSV() +
			QUEST_BORN + OTHER_DELIMITER + 0);
	}
	return player;
}

function deletePlayer(tag){
	// Delete
	for(var i=0; i<playerGroup.childNodes.length; i++){
		if(playerGroup.childNodes[i].tag == tag){
			// Remove
			var player = playerGroup.childNodes[i];
			player.remove();
		}
	}
}

function createItem(index, gridX, gridY){

	if(itemTypes[index] == null) return null;

	// Create new Sprite
	var item = new DgItem(32, 32, itemTypes[index][0], index, "item");
	item.x = Math.floor(map.x + gridX * map.tileWidth);
	item.y = Math.floor(map.y + gridY * map.tileHeight);
	item.addEventListener(Event.TOUCH_START, function(){
		this.itemOn();// On
	});
	return item;
}

function createEnemy(index, gridX, gridY){
	if(enemyTypes[index] == null) return null;
	// Create new Sprite
	var enemy = new DgEnemy(32, 32, 
		enemyTypes[index][0], enemyTypes[index][1],
		enemyTypes[index][2], enemyTypes[index][3],
		enemyTypes[index][4]);
	enemy.equipInit(
		enemyTypes[index][5], enemyTypes[index][6],
		enemyTypes[index][7], enemyTypes[index][8]);
	enemy.x = Math.floor(map.x + gridX * map.tileWidth);
	enemy.y = Math.floor(map.y + gridY * map.tileHeight);
	// ID
	var date = new Date();
	var spriteId = gridX + "_" + gridY + "_" + date.getHours() + "_" + date.getMinutes() + "_" + date.getSeconds();
	enemy.setSpriteId(spriteId);
	// Sleep
	var tag = enemyTypes[index][1];
	if(tag == enchant.dg.REAPER_TAG) enemy.sleepToggle(true);// Sleep
	return enemy;
}

function createTrap(index, gridX, gridY){
	if(trapTypes[index] == null) return null;
	// Create new Sprite
	var trap = new DgTrap(32, 32, 
		trapTypes[index][0], trapTypes[index][1], trapTypes[index][2]);
	trap.x = Math.floor(map.x + gridX * map.tileWidth);
	trap.y = Math.floor(map.y + gridY * map.tileHeight);
	trap.addEventListener(Event.TOUCH_START, function(){
		this.trapToggle();// Toggle
	});
	return trap;
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

function actionAttack(sprite, direction, attack, pathBullet, range){
	// Bullet
	var bullet = new DgBullet(32, 32, pathBullet, direction, attack);

	// Direction
	var fromX    = sprite.x;
	var fromY    = sprite.y;
	var distance = range * 32;
	var speed    = 8;
	var time     = distance / speed;
	var dirX     = 0;
	var dirY     = 0;

	if(direction == enchant.dg.DIR_NONE){
		fromX += sprite.width * 0.5 - bullet.width * 0.5;
		fromY += sprite.height;
		dirY = distance * 1;
	}else if(direction == enchant.dg.DIR_UP){
		fromX += sprite.width * 0.5 - bullet.width * 0.5;
		fromY -= bullet.height;
		dirY = distance * -1;
	}else if(direction == enchant.dg.DIR_DOWN){
		fromX += sprite.width * 0.5 - bullet.width * 0.5;
		fromY += sprite.height;
		dirY = distance * 1;
	}else if(direction == enchant.dg.DIR_LEFT){
		fromX -= bullet.width;
		fromY += sprite.height * 0.5 - bullet.height * 0.5;
		dirX = distance * -1;
	}else if(direction == enchant.dg.DIR_RIGHT){
		fromX += sprite.width;
		fromY += sprite.height * 0.5 - bullet.height * 0.5;
		dirX = distance * 1;
	}
	bullet.x = Math.floor(fromX);
	bullet.y = Math.floor(fromY);
	bullet.tl.moveBy(dirX, dirY, time);
	bullet.tl.then(function(){
		this.remove();
	});
	bulletGroup.addChild(bullet);

	// Sound
	var sound = core.assets["sounds/shot.mp3"].clone().play();
}

function getRandom(start, end){
	return start + Math.floor( Math.random() * (end - start + 1));
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
	var player = createPlayer(userName);
	player.moveUp(moveDone);
}

function msgConnectionControlDown(userName){
	console.log("msgConnectionControlDown:" + userName);
	var player = createPlayer(userName);
	player.moveDown(moveDone);
}

function msgConnectionControlLeft(userName){
	console.log("msgConnectionControlLeft:" + userName);
	var player = createPlayer(userName);
	player.moveLeft(moveDone);
}

function msgConnectionControlRight(userName){
	console.log("msgConnectionControlRight:" + userName);
	var player = createPlayer(userName);
	player.moveRight(moveDone);
}

function msgConnectionControlA(userName){
	console.log("msgConnectionControlA:" + userName);
	var player = createPlayer(userName);
	player.actionAttack(moveDone);
}

function msgConnectionControlB(userName){
	console.log("msgConnectionControlB:" + userName);
	var player = createPlayer(userName);
	player.actionKnock(moveDone);
}

function msgConnectionControlC(userName){
	console.log("msgConnectionControlC:" + userName);
	sleepReapers(false);// Awake
	firepattern.fireOn();
}

function msgConnectionControlD(userName){
	console.log("msgConnectionControlD:" + userName);
	sleepReapers(true);// Sleep
	firepattern.fireOff();
}

function msgConnectionControlOption(userName){
	console.log("msgConnectionControlOption:" + userName);
	// Player
	var player = createPlayer(userName);
	var defX = map.getPortalPosX();
	var defY = map.getPortalPosY();
	// EquipInit
	player.equipInit();
}

function msgConnectionControlOther(strs){
	console.log("msgConnectionControlOther:" + strs[0]);
}

function msgConnectionControlDone(strs){
	//console.log("msgConnectionControlDone:" + strs[0] + ", " + strs[1] + ", " + strs[2]);
}

function msgConnectionControlTalk(strs){
	console.log("msgConnectionControlTalk:" + strs[0] + ", " + strs[1]);
	// Player
	var player = createPlayer(strs[0]);
	// Popper
	var popper = createPopper(
		strs[1], player.x, player.y, 10, player.width, "white");
	area.addChild(popper);
}

//==========
// MoveDone
var moveDone = function(sprite){

	// Socket
	var tag   = sprite.getTag();
	var gridX = Math.floor((sprite.x + sprite.width*0.5  - map.x) / map.tileWidth);
	var gridY = Math.floor((sprite.y + sprite.height*0.5 - map.y) / map.tileHeight);
	var direction = sprite.getDirection();
	var spriteId  = sprite.getSpriteId();
	var pHP       = sprite.getSpriteHP();
	var pMP       = sprite.getSpriteMP();

	// Fog
	for(var p=0; p<playerGroup.childNodes.length; p++){
		var player = playerGroup.childNodes[p];
		// Light
		map.lightAround(player.x, player.y);
	}

	// Mask
	maskEnemies();
	maskTraps();

	// Send
	if(socket != null) socket.send(CONNECTION_CONTROL_DONE + MSG_DELIMITER + 
		tag + DONE_DELIMITER + gridX + DONE_DELIMITER + gridY + DONE_DELIMITER + 
		direction + DONE_DELIMITER + spriteId + DONE_DELIMITER + 
		pHP + DONE_DELIMITER + pMP);

	if(pHP <= 0){
		// Sprite

		// Marker
		var marker = new DgMarkerEnemy(32, 32, "images/dg_marker_enemy.png", "", "");
		marker.x = sprite.x;
		marker.y = sprite.y;
		marker.markDead();
		scene.addChild(marker);
	}
}

//==========
// Wall
function judgeWall(sprite){

	var bTop = map.y;
	var bBottom = map.y + map.getHeight();
	var bLeft = map.x;
	var bRight = map.x + map.getWidth();

	var tX = sprite.x + sprite.width * 0.5;
	var tY = sprite.y + sprite.height * 0.5;

	var direction = sprite.getDirection();
	if(direction == enchant.dg.DIR_NONE){
		return false;
	}else if(direction == enchant.dg.DIR_UP){
		tX += 0;
		tY -= map.tileHeight;
	}else if(direction == enchant.dg.DIR_DOWN){
		tX += 0;
		tY += map.tileHeight;
	}else if(direction == enchant.dg.DIR_LEFT){
		tX -= map.tileWidth;
		tY += 0;
	}else if(direction == enchant.dg.DIR_RIGHT){
		tX += map.tileWidth;
		tY += 0;
	}

	var borderFlg = tY < bTop || bBottom < tY || tX < bLeft || bRight < tX;
	var hitFlg = map.hitTestPos(tX, tY);
	return (borderFlg == false && hitFlg == false);
}

//==========
// Direction
function judgeDirection(sprite){

	var bTop = map.y;
	var bBottom = map.y + map.getHeight();
	var bLeft = map.x;
	var bRight = map.x + map.getWidth();

	var direction = sprite.getDirection();
	var backward = enchant.dg.DIR_NONE;
	if(direction == enchant.dg.DIR_NONE){
		// Do nothing
	}else if(direction == enchant.dg.DIR_UP){
		backward = enchant.dg.DIR_DOWN;
	}else if(direction == enchant.dg.DIR_DOWN){
		backward = enchant.dg.DIR_UP;
	}else if(direction == enchant.dg.DIR_LEFT){
		backward = enchant.dg.DIR_RIGHT;
	}else if(direction == enchant.dg.DIR_RIGHT){
		backward = enchant.dg.DIR_LEFT;
	}

	var directions = [
		enchant.dg.DIR_UP, enchant.dg.DIR_DOWN,
		enchant.dg.DIR_LEFT, enchant.dg.DIR_RIGHT];
	var selects = new Array();
	for(var i=0; i<directions.length; i++){
		if(direction != directions[i] && backward != directions[i]){

			var tX = sprite.x + sprite.width * 0.5;
			var tY = sprite.y + sprite.height * 0.5;
			if(directions[i] == enchant.dg.DIR_NONE){
				// Do nothing
			}else if(directions[i] == enchant.dg.DIR_UP){
				tX += 0;
				tY -= map.tileHeight;
			}else if(directions[i] == enchant.dg.DIR_DOWN){
				tX += 0;
				tY += map.tileHeight;
			}else if(directions[i] == enchant.dg.DIR_LEFT){
				tX -= map.tileWidth;
				tY += 0;
			}else if(directions[i] == enchant.dg.DIR_RIGHT){
				tX += map.tileWidth;
				tY += 0;
			}
			var borderFlg = tY < bTop || bBottom < tY || tX < bLeft || bRight < tX;
			var hitFlg = map.hitTestPos(tX, tY);
			if(borderFlg == false && hitFlg == false){
				selects.push(directions[i]);
			}
		}
	}
	if(selects.length <= 0) return backward;
	var index = Math.floor(Math.random() * selects.length);
	return selects[index];
}

//==========
// Brain
function createBrain(totalRows, totalCols){
	var brain = new Array();
	for(var r=0; r<totalRows; r++){
		brain.push(new Array());
		for(var c=0; c<totalCols; c++){
			brain[r].push(new Array());
		}
	}
	return brain;
}

function checkBrain(brain){
	//console.log("checkBrain");
	for(var r=0; r<brain.length; r++){
		for(var c=0; c<brain[r].length; c++){
			if(0 < brain[r][c].length){
				console.log("brain[" + r + ", " + c + "]" + brain[r][c].length);
			}
		}
	}
}

function resetBrain(brain){
	//console.log("resetBrain");
	for(var r=0; r<brain.length; r++){
		for(var c=0; c<brain[r].length; c++){
			if(0 < brain[r][c].length){
				brain[r][c].length = 0;
			}
		}
	}
	return true;
}

function pushBrain(brain, group){
	//console.log("pushBrain");
	for(var i=0; i<group.childNodes.length; i++){
		var sprite = group.childNodes[i];
		var gridX = Math.floor((sprite.x - map.x) / map.tileWidth);
		var gridY = Math.floor((sprite.y - map.y) / map.tileHeight);
		brain[gridY][gridX].push(sprite);
	}
	return true;
}

function judgeDistance(brain, sprite){
	//console.log("judgeDistance");

	var gridX = Math.floor((sprite.x - map.x) / map.tileWidth);
	var gridY = Math.floor((sprite.y - map.y) / map.tileHeight);
	var gridRows = brain.length;
	var gridCols = brain[0].length;

	var direction = sprite.getDirection();
	if(direction == enchant.dg.DIR_NONE){
		return -1;
	}else if(direction == enchant.dg.DIR_UP){
		if(gridY <= 0) return -1;
		var c = gridX;
		for(var r=gridY-1; 0<=r; r--){
			if(map.hitTestGrid(c, r)) return -1;
			//if(r < gridY - 6) return -1;
			if(0 < brain[r][c].length){
				if(judgeTag(brain[r][c])) return gridY - r;
				return -1;
			}
		}
	}else if(direction == enchant.dg.DIR_DOWN){
		if(gridRows-1 <= gridY) return -1;
		var c = gridX;
		for(var r=gridY+1; r<gridRows; r++){
			if(map.hitTestGrid(c, r)) return -1;
			//if(gridY + 6 < r) return -1;
			if(0 < brain[r][c].length){
				if(judgeTag(brain[r][c])) return r - gridY;
				return -1;
			}
		}
	}else if(direction == enchant.dg.DIR_LEFT){
		if(gridX <= 0) return -1;
		var r = gridY;
		for(var c=gridX-1; 0<=c; c--){
			if(map.hitTestGrid(c, r)) return -1;
			//if(c < gridX - 6) return -1;
			if(0 < brain[r][c].length){
				if(judgeTag(brain[r][c])) return gridX - c;
				return -1;
			}
		}
	}else if(direction == enchant.dg.DIR_RIGHT){
		if(gridCols-1 <= gridX) return -1;
		var r = gridY;
		for(var c=gridX+1; c<gridCols; c++){
			if(map.hitTestGrid(c, r)) return -1;
			//if(gridX + 6 < c) return -1;
			if(0 < brain[r][c].length){
				if(judgeTag(brain[r][c])) return c - gridX;
				return -1;
			}
		}
	}
	return -1;
}

function judgeTag(targets){
	//console.log("judgeTag");
	for(var i=0; i<targets.length; i++){
		if(targets[i].getTag() == enchant.dg.ENEMY_TAG){
			return false;
		}
		if(targets[i].getTag() == enchant.dg.REAPER_TAG){
			return false;
		}
	}
	return true;
}

//==========
// Monster
function pickMonster(x, y){
	//console.log("pickMonster:" + x + ", " + y);
	var index = mPanel.getPickedIndex(x, y);
	if(0 < index){
		var pin = new DgMonsterPin(32, 32, enemyTypes[index][0], index);
		scene.addChild(pin);
		return pin;
	}
	return null;
}

function putMonster(type, gridX, gridY){
	//console.log("putMonster:" + type);
	if(map.hitTestGrid(gridX, gridY) == true) return false;
	var enemy = createEnemy(type, gridX, gridY);
	if(enemy != null){
		enemyGroup.addChild(enemy);

		// Sound
		var sound = core.assets["sounds/born.mp3"].clone().play();

		// Popper
		var popper = createPopper(
			"Hello!!", enemy.x, enemy.y, 10, enemy.width, "white");
		area.addChild(popper);
	}
	return true;
}

//==========
// Mask
function maskEnemies(){
	//console.log("maskEnemies");
	for(var i=0; i<enemyGroup.childNodes.length; i++){
		var enemy = enemyGroup.childNodes[i];
		var gridX = Math.floor((enemy.x - map.x) / map.tileWidth);
		var gridY = Math.floor((enemy.y - map.y) / map.tileHeight);
		if(this.map.getLightFlg(gridX, gridY) == true){
			enemy.maskOff();
		}else{
			enemy.maskOn();
		}
	}
}

function maskTraps(){
	//console.log("maskTraps");
	for(var i=0; i<trapGroup.childNodes.length; i++){
		var trap = trapGroup.childNodes[i];
		var gridX = Math.floor((trap.x - map.x) / map.tileWidth);
		var gridY = Math.floor((trap.y - map.y) / map.tileHeight);
		if(this.map.getLightFlg(gridX, gridY) == true){
			trap.visibleOn();
		}else{
			trap.visibleOff();
		}
	}
}

//==========
// Reaper
function sleepReapers(flg){
	console.log("toggleReapers:" + flg);

	for(var i=0; i<enemyGroup.childNodes.length; i++){
		var enemy = enemyGroup.childNodes[i];
		if(enemy.tag == enchant.dg.REAPER_TAG){
			judgeSleep(enemy, flg);
		}
	}

	// Sound(Effect)
	if(flg == false){
		core.assets["sounds/reaper_on.mp3"].clone().play();
	}else{
		core.assets["sounds/reaper_off.mp3"].clone().play();
	}

	area.tl.delay(32);
	area.tl.then(function(){
		// Sound(BGM)
		if(flg == false){
			bgmReapers = core.assets["sounds/bgm_dg_reapers.mp3"].clone();
			bgmReapers.play();
			if(bgmNormal != null) bgmNormal.stop();
		}else{
			bgmNormal = core.assets["sounds/bgm_dg_normal.mp3"].clone();
			bgmNormal.play();
			if(bgmReapers != null) bgmReapers.stop();
		}
	});
}

function judgeSleep(enemy, flg){
	var gridX = Math.floor((enemy.x - map.x) / map.tileWidth);
	var gridY = Math.floor((enemy.y - map.y) / map.tileHeight);
	if(this.map.getLightFlg(gridX, gridY) == false){
		if(flg == true) enemy.sleepToggle(flg);// Sleep
	}else{
		enemy.sleepToggle(flg);// Sleep or Awake
		if(flg == false) emitSoul(enemy.x, enemy.y, enemy.width, enemy.height);
	}
}

function emitSoul(x, y, width, height){
	for(var i=0; i<5; i++){
		var index = getRandom(0, 5);
		var delay = getRandom(0, 16);
		var soul = new DgSoul(16, 16, "images/dg_soul.png", index, delay);
		soul.x = x + getRandom(0, width - soul.width);
		soul.y = y;
		area.addChild(soul);
	}
}