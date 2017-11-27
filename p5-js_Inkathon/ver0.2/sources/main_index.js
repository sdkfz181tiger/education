//==========
// Message
function msgConnectionOnline(userName){
	console.log("msgConnectionOnline:" + userName);
	setTimeout(updateFriendsBox, 3000);
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
	core.onload = function(){titleStart();};
	core.start();
}

function titleStart(){// タイトル画面
	scene = gameManager.createGameScene();
	core.replaceScene(scene); core.resume();

	scene.backgroundColor = "#010133";

	// Title
	var title = new Sprite(1536, 1344);
	title.image = core.assets["images/dg_title.png"];
	title.x = Math.floor(scene.width * 0.5 - title.width * 0.5);
	title.y = Math.floor(scene.height * 0.5 - title.height * 0.5);
	scene.addChild(title);

	var scale = scene.height / title.height;
	title.scale(scale, scale);

	/*
	// Start
	var start = new Sprite(180, 22);
	start.image = core.assets["images/title_start.png"];
	start.x = Math.floor(scene.width * 0.5 - start.width * 0.5);
	start.y = Math.floor(scene.height * 0.5 - start.height * 0.6);
	group.addChild(start);

	// Copy
	var copy = new Sprite(182, 22);
	copy.image = core.assets["images/title_copy.png"];
	copy.x = Math.floor(scene.width * 0.5 - copy.width * 0.5);
	copy.y = Math.floor(scene.height * 0.5 + copy.height * 2.2);
	group.addChild(copy);

	// Boss
	var boss = new Sprite(57, 37);
	boss.image = core.assets["images/title_boss_s.png"];
	boss.x = Math.floor(scene.width * 0.5 - boss.width * 0.5);
	boss.y = Math.floor(scene.height * 0.5 - boss.height * 4.0);
	group.addChild(boss);

	boss.tl.moveBy(0, -10, 32);
	boss.tl.moveBy(0, 10, 32);
	boss.tl.loop();
	*/
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
			"images/dg_player.png", tag, "images/bullet_sword.png", 1, map);
		player.x = portal.x;
		player.y = portal.y;
		// ID
		player.setSpriteId(tag);
		playerGroup.addChild(player);

		// Visible
		if(getUserName() == tag){
			player.visible = true;
		}else{
			player.visible = false;
		}

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
	var spriteId = gridX + "_" + gridY;
	enemy.setSpriteId(spriteId);
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
	//bullet.tl.moveBy(dirX, dirY, time);
	bullet.tl.delay(time);
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
	console.log("msgConnectionControlDone:" + strs[0] + ", " + strs[1] + ", " + strs[2]);
	// Player
	var player = createPlayer(strs[0]);
	player.x = map.x + map.tileWidth * strs[1];
	player.y = map.y + map.tileHeight * strs[2];
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

	// User
	if(getUserName() == tag){
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
	}

	// Marker
	if(pHP <= 0){
		// Marker
		var marker = new DgMarkerEnemy(32, 32, "images/dg_marker_enemy.png", "", "");
		marker.x = sprite.x;
		marker.y = sprite.y;
		marker.markDead();
		scene.addChild(marker);

		// Visible
		sprite.visible = false;
	}else{
		// Visible
		sprite.visible = true;
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
				if(judgeTag(sprite, brain[r][c])) return gridY - r;
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
				if(judgeTag(sprite, brain[r][c])) return r - gridY;
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
				if(judgeTag(sprite, brain[r][c])) return gridX - c;
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
				if(judgeTag(sprite, brain[r][c])) return c - gridX;
				return -1;
			}
		}
	}
	return -1;
}

function judgeTag(sprite, targets){
	//console.log("judgeTag");
	for(var i=0; i<targets.length; i++){
		if(sprite.getTag() == targets[i].getTag()){
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