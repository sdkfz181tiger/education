/**
 * dg namespace object
 * @type {Object}
 */
enchant.dg = {};

enchant.dg.TICK_TIME         = 16 * 4;

enchant.dg.DIR_NONE          = "dir_none";
enchant.dg.DIR_UP            = "dir_up";
enchant.dg.DIR_DOWN          = "dir_down";
enchant.dg.DIR_LEFT          = "dir_left";
enchant.dg.DIR_RIGHT         = "dir_right";

enchant.dg.PLAYER_DEF_HP     = 99;
enchant.dg.PLAYER_DEF_MP     = 99;
enchant.dg.PLAYER_DEF_ATTACK = 2;
enchant.dg.PLAYER_DEF_GUARD  = 0;

enchant.dg.COLLISION_LIMIT   = 14;// Collision or Not

// Item (path, param, repeatable)
enchant.dg.ITEM_NONE         = ["images/dg_artifact.png", 0,  false];// No item
enchant.dg.ITEM_SWORD        = ["images/dg_artifact.png", 40, false];// Attack
enchant.dg.ITEM_SHIELD       = ["images/dg_artifact.png", 20, false];// Defence
enchant.dg.ITEM_HELMET       = ["images/dg_artifact.png", 10, false];// HP
enchant.dg.ITEM_ARMOUR       = ["images/dg_artifact.png", 30, false];// HP
enchant.dg.ITEM_JEM          = ["images/dg_artifact.png", 20, false];// Attack
enchant.dg.ITEM_BOOK         = ["images/dg_artifact.png", 10, false];// MP
enchant.dg.ITEM_KEY_BRONZE   = ["images/dg_artifact.png", 0,  false];
enchant.dg.ITEM_KEY_SILVER   = ["images/dg_artifact.png", 0,  false];
enchant.dg.ITEM_KEY_GOLD     = ["images/dg_artifact.png", 0,  false];

enchant.dg.ITEM_PORTION_RED  = ["images/dg_artifact.png", 20, true]; // You can get this repeatable
enchant.dg.ITEM_PORTION_BLUE = ["images/dg_artifact.png", 10, true]; // You can get this repeatable

enchant.dg.MAP_DOOR_BRONZE   = [45, 48, 7];// id of tile(Close/Open) and index of pItem
enchant.dg.MAP_DOOR_SILVER   = [46, 48, 8];
enchant.dg.MAP_DOOR_GOLD     = [47, 48, 9];

// Map
var data      = null;
var collision = null;
var portals   = null;

// Enemies
enchant.dg.ENEMY_TAG  = "enemy";
enchant.dg.REAPER_TAG = "reaper";
// Path(image), Tag, Path(Bullet), Range, Stay, HP, MP, Attack, Defence
var enemyTypes = [
	null,
	["images/dg_slime.png",  enchant.dg.ENEMY_TAG,  "images/bullet_enemy.png", 1,  4,  2,  0,  1,  0],// 1:スライム
	["images/dg_dog.png",    enchant.dg.ENEMY_TAG,  "images/bullet_enemy.png", 1,  3,  8,  0,  4,  2],// 2:イヌ
	["images/dg_monkey.png", enchant.dg.ENEMY_TAG,  "images/bullet_enemy.png", 1,  4,  6,  0,  4,  0],// 3:サル
	["images/dg_kiji.png",   enchant.dg.ENEMY_TAG,  "images/bullet_enemy.png", 4,  3,  4,  0,  1,  1],// 4:キジ
	["images/dg_cat.png",    enchant.dg.ENEMY_TAG,  "images/bullet_fire.png",  4,  0,  6,  0,  4,  1],// 5:ネコ
	["images/dg_pig.png",    enchant.dg.ENEMY_TAG,  "images/bullet_enemy.png", 2,  2,  8,  0,  2,  2],// 6:ブタ
	["images/dg_ume.png",    enchant.dg.ENEMY_TAG,  "images/bullet_enemy.png", 1,  0,  3,  0,  8,  1],// 7:ウメ
	["images/dg_cow.png",    enchant.dg.ENEMY_TAG,  "images/bullet_enemy.png", 1,  0,  6,  0,  4,  1],// 8:ウシ
	["images/dg_boss.png",   enchant.dg.ENEMY_TAG,  "images/bullet_sonic.png", 1,  4, 30, 30,  9,  9],// 9:ボス
	["images/dg_skul_a.png", enchant.dg.REAPER_TAG, "images/bullet_fire.png",  1,  4,  4,  0,  6,  0],// 10:ホネ
	["images/dg_skul_b.png", enchant.dg.REAPER_TAG, "images/bullet_fire.png",  9,  4, 99, 99, 99, 99] // 11:死神
];
var enemyPositions = [];

// Items
var itemTypes = [
	enchant.dg.ITEM_NONE,
	enchant.dg.ITEM_SWORD,        // 1:剣
	enchant.dg.ITEM_SHIELD,       // 2:盾
	enchant.dg.ITEM_HELMET,       // 3:兜
	enchant.dg.ITEM_ARMOUR,       // 4:鎧
	enchant.dg.ITEM_JEM,          // 5:宝石
	enchant.dg.ITEM_BOOK,         // 6:書物
	enchant.dg.ITEM_KEY_BRONZE,   // 7:銅の鍵
	enchant.dg.ITEM_KEY_SILVER,   // 8:銀の鍵
	enchant.dg.ITEM_KEY_GOLD,     // 9:金の鍵
	enchant.dg.ITEM_PORTION_RED,  // 10:ポーション(赤)
	enchant.dg.ITEM_PORTION_BLUE  // 11:ポーション(青)
];
var itemPositions = [];

// Traps
enchant.dg.TRAP_TAG = "trap";
var trapTypes = [
	null,
	["images/dg_trap_poison.png",  enchant.dg.TRAP_TAG, 1], // 1:Poison
	["images/dg_trap_needle.png",  enchant.dg.TRAP_TAG, 2], // 2:Needle
	["images/dg_trap_fall.png",    enchant.dg.TRAP_TAG, 2], // 3:Fall
	["images/dg_trap_fire.png",    enchant.dg.TRAP_TAG, 5], // 4:Fire
	["images/dg_trap_ice.png",     enchant.dg.TRAP_TAG, 5], // 5:Ice
	["images/dg_trap_thunder.png", enchant.dg.TRAP_TAG, 8]  // 6:Thunder
];
var trapPositions = [];

// Window(onload)
window.onload = function(){

	jQuery.when(
		jQuery.ajax("./csv/dungeon_data.csv"), jQuery.ajax("./csv/dungeon_enemy.csv"),
		jQuery.ajax("./csv/dungeon_item.csv"), jQuery.ajax("./csv/dungeon_trap.csv")).
		done(function(resData, resEnemy, resItem, resTrap){
		console.log("success");

		// Data
		var csvData = resData[0].split(/\r\n|\r|\n/);
		data = new Array();
		for(var i=0; i<csvData.length; i++){
			if(0 < csvData[i].length) data.push(csvData[i].split(","));
		}

		// Collision
		collision = new Array();
		for(var r=0; r<data.length; r++){
			collision.push(new Array());
			for(var c=0; c<data[r].length; c++){
				if(data[r][c] <= enchant.dg.COLLISION_LIMIT){
					collision[collision.length-1].push(0);// Under collisionLimit
				}else{
					collision[collision.length-1].push(1);// Upper collisionLimit
				}
			}
		}

		// Portals
		portals = new Array();
		var portalId    = 2;// Id of portal
		var portalIndex = 0;
		for(var r=0; r<data.length; r++){
			for(var c=0; c<data[r].length; c++){
				if(data[r][c] == portalId){
					portals.push([c, r]);
				}
			}
		}

		// Enemy
		var csvEnemy = resEnemy[0].split(/\r\n|\r|\n/);
		enemyPositions = new Array();
		for(var i=0; i<csvEnemy.length; i++){
			if(0 < csvEnemy[i].length) enemyPositions.push(csvEnemy[i].split(","));
		}

		// Item
		var csvItem = resItem[0].split(/\r\n|\r|\n/);
		itemPositions = new Array();
		for(var i=0; i<csvEnemy.length; i++){
			if(0 < csvItem[i].length) itemPositions.push(csvItem[i].split(","));
		}

		// Trap
		var csvTrap = resTrap[0].split(/\r\n|\r|\n/);
		trapPositions = new Array();
		for(var i=0; i<csvTrap.length; i++){
			if(0 < csvTrap[i].length) trapPositions.push(csvTrap[i].split(","));
		}

		//==========
		// Ratchet
		socket = clientOpen();
		
		//==========
		// Enchant
		enchantStart();

	}).fail(function(jqXHR, textStatus, errorThrown){
		console.log("error");
	});
}

// Window(onbeforeunload)
window.onbeforeunload = function(){

	// Status
	if(socket != null) statusOffline();

	//==========
	// Ratchet
	clientClose();
	return false;
}

var assets = [
	"images/title_boss_m.png", "images/title_boss_s.png",
	"images/title_copy.png", "images/title_oyadius.png", "images/title_start.png",
	"images/back_land.png",
	"images/b_blue.png", "images/b_left.png",
	"images/b_red.png", "images/b_right.png",
	"images/bomb.png", "images/boss_s.png", "images/boss_m.png",
	"images/bullet_enemy.png", "images/bullet_fire.png", "images/bullet_player.png", "images/bullet_sonic.png",

	"images/ctl_back_dest.png", "images/ctl_back_main.png", "images/ctl_back_toggle.png",
	"images/ctl_btn_a.png", "images/ctl_btn_b.png",
	"images/ctl_btn_down.png","images/ctl_btn_left.png", "images/ctl_btn_right.png", "images/ctl_btn_up.png",
	"images/ctl_dest.png", "images/ctl_dial.png", "images/ctl_display.png",
	"images/ctl_power.png", "images/ctl_toggle.png",
	"images/planet_01.png", "images/planet_02.png", "images/planet_03.png",
	"images/planet_04.png", "images/planet_05.png", "images/planet_06.png",
	"images/star_01.png", "images/star_02.png",

	"images/fc_body.png", "images/fc_btn_a.png", "images/fc_btn_b.png",
	"images/fc_btn_center.png", "images/fc_btn_up.png", "images/fc_btn_down.png",
	"images/fc_btn_left.png", "images/fc_btn_right.png", "images/fc_btn_option.png", 
	"images/fc_btn_toggle.png", "images/fc_power.png",

	"images/gc_body.png", "images/gc_btn_a.png", "images/gc_btn_b.png", "images/gc_btn_c.png", "images/gc_btn_d.png",
	"images/gc_btn_center.png", "images/gc_btn_up.png", "images/gc_btn_down.png",
	"images/gc_btn_left.png", "images/gc_btn_right.png", "images/gc_btn_option.png", 
	"images/gc_btn_toggle.png", "images/gc_power.png",

	"images/btn_toggle_t.png", "images/btn_toggle_b.png", "images/btn_toggle_l.png", "images/btn_toggle_r.png",
	
	"images/dg_anko.png", "images/dg_artifact.png", "images/dg_artifact_box.png",
	"images/dg_bomb_32.png", "images/dg_bomb_96.png", "images/dg_border.png", 
	"images/dg_boss.png", "images/dg_cat.png", "images/dg_cow.png", "images/dg_dog.png",
	"images/dg_door.png", "images/dg_equip.png", "images/dg_fog.png", 
	"images/dg_food.png", "images/dg_grave.png", "images/dg_invader.png",
	"images/dg_kiji.png", "images/dg_map.png", "images/dg_map_client.png", "images/dg_map_game.png",
	"images/dg_marker_enemy.png", "images/dg_marker_item.png", "images/dg_marker_trap.png",
	"images/dg_mask.png", "images/dg_monkey.png", "images/dg_pig.png", "images/dg_player.png",
	"images/dg_player_mi001.png", "images/dg_player_mi002.png", 
	"images/dg_player_mi003.png", "images/dg_player_mi004.png", 
	"images/dg_portion_b.png", "images/dg_portion_r.png",
	"images/dg_puppet.png", "images/dg_skul_a.png", "images/dg_skul_b.png", "images/dg_racoon.png", "images/dg_slime.png",
	"images/dg_soul.png", "images/dg_stair.png", "images/dg_status.png", 
	"images/dg_trap_fall.png", "images/dg_trap_fire.png", "images/dg_trap_ice.png", 
	"images/dg_trap_needle.png", "images/dg_trap_poison.png", "images/dg_trap_thunder.png", 
	"images/dg_treasure.png", "images/dg_title.png",
	"images/dg_uguisu.png", "images/dg_ume.png", "images/dg_yomogi.png",
	"images/dg_firepattern_x2.png", "images/dg_firepattern_x3.png",

	"images/word_ouch.png", "images/word_un.png", "images/word_deux.png", "images/word_trois.png",

	"images/kbd_back_main.png", "images/kbd_btn_32.png", "images/kbd_btn_75.png", "images/kbd_btn_toggle.png",

	"sounds/bomb_s.mp3", "sounds/bomb_m.mp3", "sounds/bomb_l.mp3",
	"sounds/born.mp3", "sounds/crash.mp3", "sounds/damage.mp3", "sounds/die.mp3",
	"sounds/door_fail.mp3", "sounds/door_success.mp3",
	"sounds/item.mp3", "sounds/btn_push.mp3", "sounds/shot.mp3",
	"sounds/reaper_off.mp3", "sounds/reaper_on.mp3",
	"sounds/bgm_dg_normal.mp3", "sounds/bgm_dg_reapers.mp3"
];

/**
 * @fileOverview
 * dz.enchant.js
 * @version 0.0.1 (2017/01/06)
 * @requires enchant.js v0.8.0 or later
 * @author Shimeji Ozaki
 *
 * @description
 * Action Game plugin for enchant.js
 *
 */

/**
 * DgPlayer
 */
enchant.dg.DgPlayer = enchant.Class.create(enchant.Sprite, {
	
	initialize: function(width, height,
		pathImage, tag, pathBullet, range, map){
		enchant.Sprite.call(this, width, height);

		this.image      = core.assets[pathImage];
		this.tag        = tag;
		this.pathBullet = pathBullet;
		this.range      = range;
		this.map        = map;

		// ID
		this.spriteId   = -1;

		this.lever      = enchant.dg.DIR_NONE;
		this.direction  = enchant.dg.DIR_NONE;
		this.frame      = [5, null];

		// Items
		this.pItems    = new Array();
		for(var i=0; i<itemTypes.length; i++){
			this.pItems.push(0);// Default
		}

		// Equip
		this.equipInit();
	},
	getTag: function(){
		return this.tag;
	},
	setTag: function(tag){
		this.tag = tag;
	},
	setSpriteId: function(spriteId){
		this.spriteId = spriteId;
	},
	getSpriteId: function(){
		return this.spriteId;
	},
	getSpriteHP: function(){
		return this.pHP;
	},
	getSpriteMP: function(){
		return this.pMP;
	},
	getDirection: function(){
		return this.direction;
	},
	setDirection: function(direction){
		this.direction = direction;
		if(direction == enchant.dg.DIR_NONE){
			return;
		}else if(direction == enchant.dg.DIR_UP){
			this.frame = [0, null];
		}else if(direction == enchant.dg.DIR_DOWN){
			this.frame = [5, null];
		}else if(direction == enchant.dg.DIR_LEFT){
			this.frame = [10, null];
		}else if(direction == enchant.dg.DIR_RIGHT){
			this.frame = [15, null];
		}
	},
	dirUp: function(moveDone){
		this.lever = enchant.dg.DIR_UP;
		this.tl.then(function(){
			this.direction = enchant.dg.DIR_UP;
			this.frame     = [0, 1, 2, 3, 0, null];
		});
		this.tl.delay(16);
		this.tl.then(function(){
			this.frame = [];
			moveDone(this);
		});
	},
	dirDown: function(moveDone){
		this.lever = enchant.dg.DIR_DOWN;
		this.tl.then(function(){
			this.direction = enchant.dg.DIR_DOWN;
			this.frame     = [5, 6, 7, 8, 5, null];
		});
		this.tl.delay(16);
		this.tl.then(function(){
			this.frame = [];
			moveDone(this);
		});
	},
	dirLeft: function(moveDone){
		this.lever = enchant.dg.DIR_LEFT;
		this.tl.then(function(){
			this.direction = enchant.dg.DIR_LEFT;
			this.frame     = [10, 11, 12, 13, null];
		});
		this.tl.delay(16);
		this.tl.then(function(){
			this.frame = [];
			moveDone(this);
		});
	},
	dirRight: function(moveDone){
		this.lever = enchant.dg.DIR_RIGHT;
		this.tl.then(function(){
			this.direction = enchant.dg.DIR_RIGHT;
			this.frame     = [15, 16, 17, 18, null];
		});
		this.tl.delay(16);
		this.tl.then(function(){
			this.frame = [];
			moveDone(this);
		});
	},
	moveUp: function(moveDone){
		this.tl.then(function(){
			this.lever     = enchant.dg.DIR_UP;
			this.direction = enchant.dg.DIR_UP;
			this.frame     = [0, 1, 2, 3, 0];
			if(this.map.hitTestPos(
				this.x + this.width*0.5,
				this.y - this.height*0.5)){
				this.actionCrash();
				moveDone(this);
			}
		});
		this.tl.moveBy(0, -this.height, 16);
		this.tl.then(function(){
			this.frame = [];
			moveDone(this);
		});
	},
	moveDown: function(moveDone){
		this.tl.then(function(){
			this.lever     = enchant.dg.DIR_DOWN;
			this.direction = enchant.dg.DIR_DOWN;
			this.frame     = [5, 6, 7, 8, 5];
			if(this.map.hitTestPos(
				this.x + this.width*0.5,
				this.y + this.height*1.5)){
				this.actionCrash();
				moveDone(this);
			}
		});
		this.tl.moveBy(0, this.height, 16);
		this.tl.then(function(){
			this.frame = [];
			moveDone(this);
		});
	},
	moveLeft: function(moveDone){
		this.tl.then(function(){
			this.lever     = enchant.dg.DIR_LEFT;
			this.direction = enchant.dg.DIR_LEFT;
			this.frame     = [10, 11, 12, 13];
			if(this.map.hitTestPos(
				this.x - this.width*0.5,
				this.y + this.height*0.5)){
				this.actionCrash();
				moveDone(this);
			}
		});
		this.tl.moveBy(-this.width, 0, 16);
		this.tl.then(function(){
			this.frame = [];
			moveDone(this);
		});
	},
	moveRight: function(moveDone){
		this.tl.then(function(){
			this.lever     = enchant.dg.DIR_RIGHT;
			this.direction = enchant.dg.DIR_RIGHT;
			this.frame     = [15, 16, 17, 18];
			if(this.map.hitTestPos(
				this.x + this.width*1.5,
				this.y + this.height*0.5)){
				this.actionCrash();
				moveDone(this);
			}
		});
		this.tl.moveBy(this.width, 0, 16);
		this.tl.then(function(){
			this.frame = [];
			moveDone(this);
		});
	},
	actionAttack: function(moveDone){
		this.tl.then(function(){
			actionAttack(this, this.getDirection(), this.pAttack, this.pathBullet, this.range);
			if(this.direction == enchant.dg.DIR_UP)    this.frame = [0, 1, 2, 2, 2, 3, 4];
			if(this.direction == enchant.dg.DIR_DOWN)  this.frame = [5, 6, 7, 7, 7, 8, 9];
			if(this.direction == enchant.dg.DIR_LEFT)  this.frame = [10, 11, 12, 12, 12, 13, 14];
			if(this.direction == enchant.dg.DIR_RIGHT) this.frame = [15, 16, 17, 17, 17, 18, 19];
		});
		this.tl.delay(16);
		this.tl.then(function(){
			this.frame = [];
			moveDone(this);
		});
	},
	actionMagic: function(moveDone){
		this.tl.then(function(){
			console.log("actionMagic!!");
			// TODO:
		});
		this.tl.delay(16);
		this.tl.then(function(){
			this.frame = [];
			moveDone(this);
		});
	},
	actionGuard: function(moveDone){
		this.tl.then(function(){
			console.log("actionGuard!!");
			// TODO:
		});
		this.tl.delay(16);
		this.tl.then(function(){
			this.frame = [];
			moveDone(this);
		});
	},
	actionKnock: function(moveDone){
		this.tl.then(function(){
			var tX = this.x + this.width*0.5;
			var tY = this.y + this.height*0.5;
			if(this.direction == enchant.dg.DIR_NONE){
				// Do nothing
			}else if(this.direction == enchant.dg.DIR_UP){
				tY -= this.height;
			}else if(this.direction == enchant.dg.DIR_DOWN){
				tY += this.height;
			}else if(this.direction == enchant.dg.DIR_LEFT){
				tX -= this.width;
			}else if(this.direction == enchant.dg.DIR_RIGHT){
				tX += this.width;
			}
			// Door
			if(this.map.knockDoor(tX, tY, this.pItems)){
				// Sound
				var sound = core.assets["sounds/door_success.mp3"].clone().play();
			}else{
				// Sound
				var sound = core.assets["sounds/door_fail.mp3"].clone().play();
			}
		});
		this.tl.delay(16);
		this.tl.then(function(){
			this.frame = [];
			moveDone(this);
		});
	},
	actionCrash: function(moveDone){
		if(this.direction == enchant.dg.DIR_NONE){
			return;
		}else if(this.direction == enchant.dg.DIR_UP){
			this.tl.clear();
			this.frame = [4, null];
		}else if(this.direction == enchant.dg.DIR_DOWN){
			this.tl.clear();
			this.frame = [9, null];
		}else if(this.direction == enchant.dg.DIR_LEFT){
			this.tl.clear();
			this.frame = [14, null];
		}else if(this.direction == enchant.dg.DIR_RIGHT){
			this.tl.clear();
			this.frame = [19, null];
		}
		this.tl.then(function(){
			moveDone(this);
		});
		// Sound
		var sound = core.assets["sounds/crash.mp3"].clone().play();
	},
	actionDie: function(moveDone, portal){
		this.tl.clear();
		this.tl.then(function(){
			this.frame = [20, 21, 22, 23, 21, 22, 23, 24, null];
		});
		this.tl.delay(16);
		this.tl.then(function(){
			this.frame = [];
			this.x = portal.x;
			this.y = portal.y;
			moveDone(this);
		});
		// Equip
		this.equipInit();
		// Sound
		var sound = core.assets["sounds/die.mp3"].clone().play();
	},
	calkAttack: function(){
		return this.pAttack;
	},
	calcGuard: function(num, moveDone, defX, defY){
		var damage = num - this.pGuard;
		if(damage <= 0) damage = 1;
		this.pHP -= damage;
		if(this.pHP < 0) this.pHP = 0;
		return damage;
	},
	equipInit: function(){
		// Default
		this.pHP       = enchant.dg.PLAYER_DEF_HP;
		this.pMP       = enchant.dg.PLAYER_DEF_MP;
		this.pAttack   = enchant.dg.PLAYER_DEF_ATTACK;
		this.pGuard    = enchant.dg.PLAYER_DEF_GUARD;

		// Max
		this.pHPMax    = this.pHP;
		this.pMPMax    = this.pMP;

		// Equip(Initialize)
		if(this.pItems[1] != 0) this.pAttack += itemTypes[1][1];// Sword
		if(this.pItems[2] != 0) this.pGuard  += itemTypes[2][1];// Shield
		if(this.pItems[3] != 0) this.pHPMax  += itemTypes[3][1];// Helmet
		if(this.pItems[4] != 0) this.pHPMax  += itemTypes[4][1];// Armour
		if(this.pItems[5] != 0) this.pAttack += itemTypes[5][1];// Jem
		if(this.pItems[6] != 0) this.pMPMax  += itemTypes[6][1];// Book

		// Full
		this.pHP = this.pHPMax;
		this.pMP = this.pMPMax;
	},
	equipOne: function(index){
		var value = itemTypes[index][1];
		var repeatable = itemTypes[index][2];

		if(this.pItems.length <= index) return 0;
		if(this.pItems[index] != 0 && repeatable == false) return 0;
		this.pItems[index] = 1;// Active

		switch(index){
			case '0':
				// Do nothing
				break;
			case '1':
				this.pAttack += value;// Sword
				break;
			case '2':
				this.pGuard  += value;// Shield
				break;
			case '3':
				this.pHPMax  += value;// Helmet
				break;
			case '4':
				this.pHPMax  += value;// Armour
				break;
			case '5':
				this.pAttack += value;// Jem
				break;
			case '6':
				this.pMPMax  += value;// Book
				break;
			case '7':
				break;
			case '8':
				break;
			case '9':
				break;
			case '10':
				this.pHP     += value;// Portion(Red)
				if(this.pHPMax < this.pHP) this.pHP = this.pHPMax;
				break;
			case '11':
				this.pMP     += value;// Portion(Blue)
				if(this.pMPMax < this.pMP) this.pMP = this.pMPMax;
				break;
			case '12':
				break;
			case '13':
				break;
			default:
				// Do nothing
				break;
		}
		return value;
	},
	getCSV: function(){
		var csv = this.getTag() + OTHER_DELIMITER + 
			this.pHP + OTHER_DELIMITER + this.pMP + OTHER_DELIMITER + 
			this.pHPMax + OTHER_DELIMITER + this.pMPMax + OTHER_DELIMITER + 
			this.pAttack + OTHER_DELIMITER + this.pGuard + OTHER_DELIMITER;
		for(var i=0; i<this.pItems.length; i++){
			csv += this.pItems[i] + OTHER_DELIMITER;
		}
		return csv;
	},
	checkTileUp: function(type){
		var tX = this.x + this.width*0.5;
		var tY = this.y + this.height*0.5;
		tY -= this.height;
		return this.checkTileDir(type, tX, tY);
	},
	checkTileDown: function(type){
		var tX = this.x + this.width*0.5;
		var tY = this.y + this.height*0.5;
		tY += this.height;
		return this.checkTileDir(type, tX, tY);
	},
	checkTileLeft: function(type){
		var tX = this.x + this.width*0.5;
		var tY = this.y + this.height*0.5;
		tX -= this.width;
		return this.checkTileDir(type, tX, tY);
	},
	checkTileRight: function(type){
		var tX = this.x + this.width*0.5;
		var tY = this.y + this.height*0.5;
		tX += this.width;
		return this.checkTileDir(type, tX, tY);
	},
	checkTileDir: function(type, tX, tY){

		// Tile
		var tile = this.map.checkTile(tX, tY);

		console.log("checkTile(type):" + type);
		console.log("checkTile(tile):" + tile);

		// Road?
		if(type == "road"){
			if(tile <= collisionLimit){
				console.log("This is Road!!");
				return true;
			}
			return false;
		}

		// Wall?
		if(type == "wall"){
			if(collisionLimit < tile){
				console.log("This is Wall!!");
				return true;
			}
			return false;
		}

		if(type == "door"){
			// Door?
			if(tile == enchant.dg.MAP_DOOR_BRONZE[0]){
				console.log("This is Bronze door!!");
				return true;
			}
			if(tile == enchant.dg.MAP_DOOR_SILVER[0]){
				console.log("This is Silver door!!");
				return true;
			}
			if(tile == enchant.dg.MAP_DOOR_GOLD[0]){
				console.log("This is Gold door!!");
				return true;
			}
			return false;
		}

		return false;
	}
});

/**
 * DgItem
 */
enchant.dg.DgItem = enchant.Class.create(enchant.Group, {
	
	initialize: function(width, height, path, frame, tag){
		enchant.Group.call(this);

		this.width   = width;
		this.height  = height;
		this.path    = path;
		this.frame   = frame;
		this.tag     = tag;
		this.itemFlg = true; 

		this.item = new Sprite(width, height);
		this.item.image = core.assets[path];
		this.item.frame = frame;
		this.addChild(this.item);

		this.treasure = new Sprite(width, height);
		this.treasure.image = core.assets["images/dg_treasure.png"];
		this.addChild(this.treasure);
	},
	getTag: function(){
		return this.tag;
	},
	setTag: function(tag){
		this.tag = tag;
	},
	itemOn: function(){
		this.itemFlg = true;

		this.item.tl.moveTo(0, -this.height, 4);
		this.item.tl.delay(16);
		this.item.tl.moveTo(0, 0, 4);

		this.treasure.tl.then(function(){
			this.frame = 1;// Open
		});
		this.treasure.tl.delay(24);
		this.treasure.tl.then(function(){
			this.frame = 0;
		});
		// Sound
		var sound = core.assets["sounds/btn_push.mp3"].clone().play();
	},
	itemOff: function(){
		this.itemFlg = false;

		this.item.tl.moveTo(0, -this.height, 4);
		this.item.tl.delay(16);
		this.item.tl.moveTo(0, 0, 4);

		this.treasure.tl.then(function(){
			this.frame = 1;// Open
		});
		this.treasure.tl.delay(24);
		this.treasure.tl.then(function(){
			this.frame = 1;
		});
	},
	intersect: function(target){
		if(this.itemFlg == true && this.treasure.intersect(target)){
			return true;
		}
		return false;
	}
});

/**
 * DgEnemy
 */
enchant.dg.DgEnemy = enchant.Class.create(enchant.Sprite, {
	
	initialize: function(width, height, 
		pathImage, tag, pathBullet, range, stay){
		enchant.Sprite.call(this, width, height);

		this.pathImage  = pathImage;
		this.tag        = tag;
		this.pathBullet = pathBullet;
		this.range      = range;
		this.stay       = stay;

		// Image
		this.pathMask   = "images/dg_mask.png";
		this.image      = core.assets[this.pathMask];

		this.direction  = enchant.dg.DIR_NONE;
		this.frame      = [5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9];
		this.moveFlg    = false;

		// Locking
		this.LOCK_DISTANCE_DEF = -1;
		this.lockFlg      = false;
		this.lockDistance = this.LOCK_DISTANCE_DEF;

		// ID
		this.spriteId = -1;

		// Sleep
		this.sleepFlg = false;
	},
	getTag: function(){
		return this.tag;
	},
	setTag: function(tag){
		this.tag = tag;
	},
	maskOn: function(){
		this.image = core.assets[this.pathMask];
	},
	maskOff: function(){
		this.image = core.assets[this.pathImage];
	},
	setSpriteId: function(spriteId){
		this.spriteId = spriteId;
	},
	getSpriteId: function(){
		return this.spriteId;
	},
	getSpriteHP: function(){
		return this.pHP;
	},
	getSpriteMP: function(){
		return this.pMP;
	},
	getDirection: function(){
		return this.direction;
	},
	setDirection: function(direction){
		this.direction = direction;
		if(this.sleepFlg == true) return;
		if(this.moveFlg == true) return;
		if(this.direction == enchant.dg.DIR_NONE){
			return;
		}else if(this.direction == enchant.dg.DIR_UP){
			this.frame = [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 0, 0, 0, null];
		}else if(this.direction == enchant.dg.DIR_DOWN){
			this.frame = [5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 5, 5, 5, null];
		}else if(this.direction == enchant.dg.DIR_LEFT){
			this.frame = [10, 10, 10, 11, 11, 11, 12, 12, 12, 13, 13, 13, null];
		}else if(this.direction == enchant.dg.DIR_RIGHT){
			this.frame = [15, 15, 15, 16, 16, 16, 17, 17, 17, 18, 18, 18, null];
		}
	},
	setDirectionRandom: function(){
		var directions = [
			enchant.dg.DIR_UP, enchant.dg.DIR_DOWN,
			enchant.dg.DIR_LEFT, enchant.dg.DIR_RIGHT];
		var selects = new Array();
		for(var i=0; i<directions.length; i++){
			if(this.direction != directions[i]) selects.push(directions[i]);
		}
		var rdm = Math.floor(Math.random() * selects.length);
		if(selects.length <= rdm) rdm = 0;
		this.direction = selects[rdm];
	},
	moveUp: function(moveDone){
		if(this.sleepFlg == true) return;
		if(this.moveFlg == true) return;
		this.moveFlg = true;
		this.tl.then(function(){
			this.direction = enchant.dg.DIR_UP;
			this.frame     = [0, 1, 2, 3, 0];
		});
		this.tl.moveBy(0, -this.height, 16);
		this.tl.then(function(){
			this.frame = [];
			this.moveFlg = false;
			moveDone(this);
		});
	},
	moveDown: function(moveDone){
		if(this.sleepFlg == true) return;
		if(this.moveFlg == true) return;
		this.moveFlg = true;
		this.tl.then(function(){
			this.direction = enchant.dg.DIR_DOWN;
			this.frame     = [5, 6, 7, 8, 5];
		});
		this.tl.moveBy(0, this.height, 16);
		this.tl.then(function(){
			this.frame = [];
			this.moveFlg = false;
			moveDone(this);
		});
	},
	moveLeft: function(moveDone){
		if(this.sleepFlg == true) return;
		if(this.moveFlg == true) return;
		this.moveFlg = true;
		this.tl.then(function(){
			this.direction = enchant.dg.DIR_LEFT;
			this.frame     = [10, 11, 12, 13];
		});
		this.tl.moveBy(-this.width, 0, 16);
		this.tl.then(function(){
			this.frame = [];
			this.moveFlg = false;
			moveDone(this);
		});
	},
	moveRight: function(moveDone){
		if(this.sleepFlg == true) return;
		if(this.moveFlg == true) return;
		this.moveFlg = true;
		this.tl.then(function(){
			this.direction = enchant.dg.DIR_RIGHT;
			this.frame     = [15, 16, 17, 18];
		});
		this.tl.moveBy(this.width, 0, 16);
		this.tl.then(function(){
			this.frame = [];
			this.moveFlg = false;
			moveDone(this);
		});
	},
	actionKeep: function(moveDone){
		if(this.direction == enchant.dg.DIR_NONE){
			return;
		}else if(this.direction == enchant.dg.DIR_UP){
			this.moveUp(moveDone);
		}else if(this.direction == enchant.dg.DIR_DOWN){
			this.moveDown(moveDone);
		}else if(this.direction == enchant.dg.DIR_LEFT){
			this.moveLeft(moveDone);
		}else if(this.direction == enchant.dg.DIR_RIGHT){
			this.moveRight(moveDone);
		}
	},
	actionAttack: function(moveDone){
		if(this.sleepFlg == true) return;
		if(this.moveFlg == true) return;
		this.tl.then(function(){
			actionAttack(this, this.getDirection(), this.pAttack, this.pathBullet, this.range);
			if(this.direction == enchant.dg.DIR_UP)    this.frame = [0, 1, 2, 3];
			if(this.direction == enchant.dg.DIR_DOWN)  this.frame = [5, 6, 7, 8];
			if(this.direction == enchant.dg.DIR_LEFT)  this.frame = [10, 11, 12, 13];
			if(this.direction == enchant.dg.DIR_RIGHT) this.frame = [15, 16, 17, 18];
		});
		this.tl.delay(16);
		this.tl.then(function(){
			this.frame = [];
			this.moveFlg = false;
			moveDone(this);
		});
	},
	actionDie: function(moveDone){
		if(this.moveFlg == true) return;
		this.tl.then(function(){
			this.frame = [20, 21, 22, 23, 21, 22, 23, 24, null];
		});
		this.tl.delay(16);
		this.tl.then(function(){
			this.frame = [];
			this.moveFlg = false;
			this.remove();
			moveDone(this);
		});
	},
	calcAttack: function(){
		return this.pAttack;
	},
	calcGuard: function(num, moveDone, defX, defY){
		var damage = num - this.pGuard;
		if(damage <= 0) damage = 1;
		this.pHP -= damage;
		if(this.pHP < 0) this.pHP = 0;
		return damage;
	},
	equipInit: function(pHP, pMP, pAttack, pGuard){
		// DEFAULT
		this.pHP      = pHP;
		this.pMP      = pMP;
		this.pAttack  = pAttack;
		this.pGuard   = pGuard;
	},
	lockOn: function(distance){
		this.lockFlg = true;
		this.lockDistance = distance;
		return this.lockFlg;
	},
	lockOff: function(){
		this.lockFlg = false;
		this.lockDistance = this.LOCK_DISTANCE_DEF;
		return this.lockFlg;
	},
	lockApproach: function(){
		this.lockDistance--;
		if(0 < this.lockDistance){
			return true;
		}
		this.lockDistance = this.LOCK_DISTANCE_DEF;
		this.lockOff();// LockOff
		return false;
	},
	setCounter: function(direction){
		this.lockOff();// LockOff
		this.setDirection(direction);
	},
	sleepToggle: function(flg){
		if(this.sleepFlg == flg) return;
		this.sleepFlg = flg;
		if(this.sleepFlg == false){
			this.frame = [5, 6, 7, 8];
		}else{
			this.frame = [20, 21, 22, 23, 24, null];
		}
	}
});

/**
 * DgTrap
 */
enchant.dg.DgTrap = enchant.Class.create(enchant.Group, {
	
	initialize: function(width, height, path, tag, attack){
		enchant.Group.call(this);

		this.width      = width;
		this.height     = height;
		this.path       = path;
		this.tag        = tag;
		this.attack     = attack;
		this.trapFlg    = false;

		this.trap = new Sprite(width, height);
		this.trap.image = core.assets[path];
		this.addChild(this.trap);

		this.tl.delay(64);
		this.tl.then(this.trapToggle);
		this.tl.loop();

		this.visibleFlg = false;
		this.visibleOff();
	},
	getTag: function(){
		return this.tag;
	},
	setTag: function(tag){
		this.tag = tag;
	},
	getAttack: function(){
		return this.attack;
	},
	getTrapFlg: function(){
		return this.trapFlg;
	},
	trapToggle: function(){
		if(this.trapFlg == false){
			this.trapOn();
		}else{
			this.trapOff();
		}
	},
	trapOn: function(){
		this.trapFlg = true;
		this.trap.frame = [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, null];
	},
	trapOff: function(){
		this.trapFlg = false;
		this.trap.frame = [4, 4, 4, 3, 3, 3, 2, 2, 2, 1, 1, 1, 0, 0, 0, null];
	},
	visibleOn: function(){
		this.trap.visible = true;
	},
	visibleOff: function(){
		this.trap.visible = false;
	},
	intersect: function(target){
		if(this.trapFlg == true && this.trap.intersect(target)){
			this.trapOff();
			return true;
		}
		return false;
	}
});

/**
 * DgInvader
 */
enchant.dg.DgInvader = enchant.Class.create(enchant.Sprite, {
	
	initialize: function(width, height, path, tag){
		enchant.Sprite.call(this, width, height);

		this.image     = core.assets[path];
		this.tag       = tag;
		this.index     = 0;
		this.direction = 1;
	},
	getTag: function(){
		return this.tag;
	},
	setTag: function(tag){
		this.tag = tag;
	},
	startWave: function(min, max, c, r){
		this.tl.delay(r);
		this.tl.then(function(){
			this.tl.clear();
			this.tl.delay(32);
			this.tl.then(function(){
				this.x = Math.floor(this.x + (this.width * 0.5 * this.direction));
				if(this.index <= min || max <= this.index){
					this.y = Math.floor(this.y + (this.height * 0.5));
					this.direction *= -1;
				}
				this.index += this.direction;
			});
			this.tl.loop();
		});
	}
});

/**
 * DgBullet
 */
enchant.dg.DgBullet = enchant.Class.create(enchant.Sprite, {

	initialize: function(width, height, path, direction, attack){
		enchant.Sprite.call(this, width, height);

		this.image     = core.assets[path];
		this.direction = direction;
		this.attack    = attack;
		this.frame     = [0, 1, 2, 3];
	},
	getCounter: function(){
		if(this.direction == enchant.dg.DIR_UP)    return enchant.dg.DIR_DOWN;
		if(this.direction == enchant.dg.DIR_DOWN)  return enchant.dg.DIR_UP;
		if(this.direction == enchant.dg.DIR_LEFT)  return enchant.dg.DIR_RIGHT;
		if(this.direction == enchant.dg.DIR_RIGHT) return enchant.dg.DIR_LEFT;
		return this.direction;
	},
	getAttack: function(){
		return this.attack;
	}
});

/**
 * DgBomb
 */
enchant.dg.DgBomb = enchant.Class.create(enchant.Sprite, {
	
	initialize: function(width, height, path, tag){
		enchant.Sprite.call(this, width, height);

		this.image     = core.assets[path];
		this.tag       = tag;
		this.direction = enchant.dg.DIR_NONE;
		this.frame     = [0, 0, 1, 1, 0, 0, 2, 2, 3, 3, 4, 4, null];
		this.tl.delay(16);
		this.tl.then(function(){
			this.remove();
		});
	},
	getTag: function(){
		return this.tag;
	},
	setTag: function(tag){
		this.tag = tag;
	}
});

/**
 * DgPopper
 */
enchant.dg.DgPopper = enchant.Class.create(enchant.Group, {
	
	initialize: function(str, x, y, size, width, color){
		enchant.Group.call(this);

		this.label = new Label(str);
		this.label.x = x;
		this.label.y = y;
		this.label.color = color;
		this.label.font = size + "px 'PixelMplus10-Bold'";
		this.label.x += Math.floor(width*0.5 - this.label._boundWidth*0.5);
		this.label.y -= Math.floor(this.label._boundHeight);
		this.addChild(this.label);

		this.tl.moveBy(0, -16, 3);
		this.tl.moveBy(0, 16, 3);
		this.tl.delay(16);
		this.tl.then(function(){
			this.remove();
		});
	}
});

/**
 * DgMap
 */
enchant.dg.DgMap = enchant.Class.create(enchant.Group, {

	initialize: function(width, height, data, collision, path){
		enchant.Group.call(this);

		// Data(Map, Fog)
		this.dataMap = data;
		this.dataFog = new Array();
		this.dataFog = new Array();
		for(var r=0; r<this.dataMap.length; r++){
			this.dataFog.push(new Array());
			for(var c=0; c<this.dataMap[0].length; c++){
				if(
					0 < r && r < this.dataMap.length-1 && 
					0 < c && c < this.dataMap[0].length-1){
					this.dataFog[r].push(0);
				}else{
					this.dataFog[r].push(1);
				}
			}
		}

		// Map
		this.map = new Map(width, height);
		this.map.image = core.assets[path];
		this.map.loadData(this.dataMap);
		this.map.collisionData = collision;
		this.addChild(this.map);

		this.width = width * this.dataMap[0].length;
		this.height = height * this.dataMap.length;

		this.portalGridX = 0;
		this.portalGridY = 0;

		this.fog = new Map(width, height);
		this.fog.image = core.assets["images/dg_fog.png"];
		this.fog.loadData(this.dataFog);
		this.addChild(this.fog);

		this.marker = new Sprite(32, 32);
		this.marker.backgroundColor = "blue";
		this.marker.x = 0;
		this.marker.y = 0;
		this.marker.visible = false;
		this.addChild(this.marker);
	},
	getWidth: function(){
		return this.width;
	},
	getHeight: function(){
		return this.height;
	},
	checkTile: function(x, y){
		var offsetX = x - this.x;
		var offsetY = y - this.y;
		return this.map.checkTile(offsetX, offsetY);
	},
	hitTestPos: function(x, y){
		if(x < this.x) return true;
		if(this.x + this.width < x) return true;
		if(y < this.y) return true;
		if(this.y + this.height < y) return true;
		var offsetX = x - this.x;
		var offsetY = y - this.y;
		return this.map.hitTest(offsetX, offsetY);
	},
	hitTestGrid: function(x, y){
		if(x < 0 || this.dataMap[0].length <= x) return true;
		if(y < 0 || this.dataMap.length <= y) return true;
		var offsetX = x * this.tileWidth;
		var offsetY = y * this.tileHeight;
		return this.map.hitTest(offsetX, offsetY);
	},
	tileWidth: {
		get: function(){
			return this.map.tileWidth;
		}
	},
	tileHeight: {
		get: function(){
			return this.map.tileHeight;
		}
	},
	setPortalGridX: function(gridX){
		this.portalGridX = Math.floor(gridX);
	},
	setPortalGridY: function(gridY){
		this.portalGridY = Math.floor(gridY);
	},
	getPortalGridX: function(){
		return this.portalGridX;
	},
	getPortalGridY: function(){
		return this.portalGridY;
	},
	getPortalPosX: function(){
		return this.tileWidth * this.portalGridX + this.x;
	},
	getPortalPosY: function(){
		return this.tileHeight * this.portalGridY + this.y;
	},
	knockDoor(x, y, pItems){

		// Grid
		var gridX = Math.floor((x - this.x) / this.tileWidth);
		var gridY = Math.floor((y - this.y) / this.tileHeight);

		// Door and Key
		var tile = this.checkTile(x, y);
		if(tile == enchant.dg.MAP_DOOR_BRONZE[0] && pItems[enchant.dg.MAP_DOOR_BRONZE[2]] == 1){
			console.log("BRONZE Open!!");
			this.dataMap[gridY][gridX] = enchant.dg.MAP_DOOR_BRONZE[1];
			this.map.loadData(this.dataMap);
			this.map.collisionData[gridY][gridX] = 0;
			return true;
		}else if(tile == enchant.dg.MAP_DOOR_SILVER[0] && pItems[enchant.dg.MAP_DOOR_SILVER[2]] == 1){
			console.log("SILVER Open!!");
			this.dataMap[gridY][gridX] = enchant.dg.MAP_DOOR_SILVER[1];
			this.map.loadData(this.dataMap);
			this.map.collisionData[gridY][gridX] = 0;
			return true;
		}else if(tile == enchant.dg.MAP_DOOR_GOLD[0] && pItems[enchant.dg.MAP_DOOR_GOLD[2]] == 1){
			console.log("GOLD Open!!");
			this.dataMap[gridY][gridX] = enchant.dg.MAP_DOOR_GOLD[1];
			this.map.loadData(this.dataMap);
			this.map.collisionData[gridY][gridX] = 0;
			return true;
		}
		return false;
	},
	lightAround: function(x, y){

		// Grid
		var gridX = Math.floor((x - this.x) / this.tileWidth);
		var gridY = Math.floor((y - this.y) / this.tileHeight);

		var target = [
			[+0, -2], [-1, -1], [+0, -1], [+1, -1],
			[-2, +0], [-1, +0], [+0, +0], [+1, +0], [+2, +0],
			[-1, +1], [+0, +1], [+1, +1], [+0, +2]
		];
		for(var i=0; i<target.length; i++){
			this.lightOn(gridX+target[i][1], gridY+target[i][0]);
		}
	},
	lightOn: function(gridX, gridY){
		if(gridX < 0 || this.dataFog[0].length <= gridX) return;
		if(gridY < 0 || this.dataFog.length    <= gridY) return;
		this.dataFog[gridY][gridX] = 1;// On
		this.fog.loadData(this.dataFog);
	},
	lightOff: function(gridX, gridY){
		if(gridX < 0 || this.dataFog[0].length <= gridX) return;
		if(gridY < 0 || this.dataFog.length    <= gridY) return;
		this.dataFog[gridY][gridX] = 0;// Off
		this.fog.loadData(this.dataFog);
	},
	getLightFlg: function(gridX, gridY){
		if(gridX < 0 || this.dataFog[0].length <= gridX) return false;
		if(gridY < 0 || this.dataFog.length    <= gridY) return false;
		if(this.dataFog[gridY][gridX] == 1){
			return true;
		}
		return false;
	},
	blowMarker: function(gridX, gridY){
		if(this.hitTestGrid(gridX, gridY) == true){
			this.marker.x = 0;
			this.marker.y = 0;
			this.marker.visible = false;
		}else{
			this.marker.x = gridX * this.tileWidth;
			this.marker.y = gridY * this.tileWidth;
			this.marker.visible = true;
		}
	}
});

/**
 * DgFc
 */
enchant.dg.DgFc = enchant.Class.create(enchant.Group, {

	initialize: function(){
		enchant.Group.call(this);

		// Body
		var fcBody = new Sprite(108, 256);
		fcBody.image = core.assets["images/gc_body.png"];
		this.addChild(fcBody);
		this.width = fcBody.width;
		this.height = fcBody.height;

		// Toggle
		this.fcBtnToggle;

		// Power
		this.ctlPower;
	},
	getWidth: function(){
		return this.width;
	},
	getHeight: function(){
		return this.height;
	},
	setup: function(cbUp, cbDown, cbLeft, cbRight, cbA, cbB, cbC, cbD, cbOption){

		var center = new Sprite(20, 22);
		center.image = core.assets["images/gc_btn_center.png"];
		center.x = 43;
		center.y = 45;
		this.addChild(center);

		var fcBtnUp = new Sprite(22, 20);
		fcBtnUp.image = core.assets["images/gc_btn_up.png"];
		fcBtnUp.x = 43;
		fcBtnUp.y = 25;
		this.addChild(fcBtnUp);
		fcBtnUp.addEventListener(Event.TOUCH_START, cbUp);

		var fcBtnDown = new Sprite(22, 20);
		fcBtnDown.image = core.assets["images/gc_btn_down.png"];
		fcBtnDown.x = 43;
		fcBtnDown.y = 67;
		this.addChild(fcBtnDown);
		fcBtnDown.addEventListener(Event.TOUCH_START, cbDown);

		var fcBtnLeft = new Sprite(20, 22);
		fcBtnLeft.image = core.assets["images/gc_btn_left.png"];
		fcBtnLeft.x = 23;
		fcBtnLeft.y = 45;
		this.addChild(fcBtnLeft);
		fcBtnLeft.addEventListener(Event.TOUCH_START, cbLeft);

		var fcBtnRight = new Sprite(20, 22);
		fcBtnRight.image = core.assets["images/gc_btn_right.png"];
		fcBtnRight.x = 65;
		fcBtnRight.y = 45;
		this.addChild(fcBtnRight);
		fcBtnRight.addEventListener(Event.TOUCH_START, cbRight);

		var fcBtnA = new Sprite(32, 48);
		fcBtnA.image = core.assets["images/gc_btn_a.png"];
		fcBtnA.x = 20;
		fcBtnA.y = 100;
		this.addChild(fcBtnA);
		fcBtnA.addEventListener(Event.TOUCH_START, cbA);

		var fcBtnB = new Sprite(32, 48);
		fcBtnB.image = core.assets["images/gc_btn_b.png"];
		fcBtnB.x = 55;
		fcBtnB.y = 100;
		this.addChild(fcBtnB);
		fcBtnB.addEventListener(Event.TOUCH_START, cbB);

		var fcBtnC = new Sprite(32, 48);
		fcBtnC.image = core.assets["images/gc_btn_c.png"];
		fcBtnC.x = 20;
		fcBtnC.y = 150;
		this.addChild(fcBtnC);
		fcBtnC.addEventListener(Event.TOUCH_START, cbC);

		var fcBtnD = new Sprite(32, 48);
		fcBtnD.image = core.assets["images/gc_btn_c.png"];
		fcBtnD.x = 55;
		fcBtnD.y = 150;
		this.addChild(fcBtnD);
		fcBtnD.addEventListener(Event.TOUCH_START, cbD);

		var fcBtnOption = new Sprite(64, 32);
		fcBtnOption.image = core.assets["images/gc_btn_option.png"];
		fcBtnOption.x = 22;
		fcBtnOption.y = 205;
		this.addChild(fcBtnOption);
		fcBtnOption.addEventListener(Event.TOUCH_START, cbOption);

		//==========
		// Toggle
		this.fcBtnToggle         = new Sprite(20, 54);
		this.fcBtnToggle.image   = core.assets["images/gc_btn_toggle.png"];
		this.fcBtnToggle.x       = - this.fcBtnToggle.width;
		this.fcBtnToggle.y       = this.height * 0.5 - this.fcBtnToggle.height * 0.5;
		this.fcBtnToggle.closedX = this.x;
		this.fcBtnToggle.openedX = this.x - 110;
		this.fcBtnToggle.defY    = this.y;

		this.fcBtnToggle.showFlg = false;
		this.addChild(this.fcBtnToggle);
		this.fcBtnToggle.addEventListener(Event.TOUCH_START, function(){
			if(this.showFlg == false){
				this.parentNode.tl.moveTo(this.openedX, this.defY, 4);
				this.frame   = 1;
				this.showFlg = true;
			}else{
				this.parentNode.tl.moveTo(this.closedX, this.defY, 4);
				this.frame   = 0;
				this.showFlg = false;
			}
			// Sound
			var sound = core.assets["sounds/btn_push.mp3"].clone().play();
		});

		//==========
		// Power
		this.ctlPower = new Sprite(33, 35);
		this.ctlPower.image = core.assets["images/gc_power.png"];
		this.ctlPower.x = this.getWidth() - this.ctlPower.width - 5;
		this.ctlPower.y = 5;
		this.addChild(this.ctlPower);
	},
	setPowerOn: function(){
		this.ctlPower.frame = 1;
	},
	openController(){
		if(this.fcBtnToggle.showFlg == false){
			this.tl.moveTo(this.fcBtnToggle.defX, this.fcBtnToggle.openedY, 4);
			this.fcBtnToggle.frame   = 1;
			this.fcBtnToggle.showFlg = true;
		}
	},
	closeController(){
		if(this.fcBtnToggle.showFlg == true){
			this.tl.moveTo(this.fcBtnToggle.defX, this.fcBtnToggle.closedY, 4);
			this.fcBtnToggle.frame   = 0;
			this.fcBtnToggle.showFlg = false;
		}
	}
});

/*
enchant.dg.DgFc = enchant.Class.create(enchant.Group, {

	initialize: function(){
		enchant.Group.call(this);

		// Body
		var fcBody = new Sprite(256, 108);
		fcBody.image = core.assets["images/fc_body.png"];
		this.addChild(fcBody);
		this.width = fcBody.width;
		this.height = fcBody.height;

		// Toggle
		this.fcBtnToggle;

		// Power
		this.ctlPower;
	},
	getWidth: function(){
		return this.width;
	},
	getHeight: function(){
		return this.height;
	},
	setup: function(cbUp, cbDown, cbLeft, cbRight, cbA, cbB, cbOption){

		var center = new Sprite(22, 22);
		center.image = core.assets["images/fc_btn_center.png"];
		center.x = 45;
		center.y = 50;
		this.addChild(center);

		var fcBtnUp = new Sprite(22, 20);
		fcBtnUp.image = core.assets["images/fc_btn_up.png"];
		fcBtnUp.x = 45;
		fcBtnUp.y = 30;
		this.addChild(fcBtnUp);
		fcBtnUp.addEventListener(Event.TOUCH_START, cbUp);

		var fcBtnDown = new Sprite(22, 20);
		fcBtnDown.image = core.assets["images/fc_btn_down.png"];
		fcBtnDown.x = 45;
		fcBtnDown.y = 72;
		this.addChild(fcBtnDown);
		fcBtnDown.addEventListener(Event.TOUCH_START, cbDown);

		var fcBtnLeft = new Sprite(20, 22);
		fcBtnLeft.image = core.assets["images/fc_btn_left.png"];
		fcBtnLeft.x = 25;
		fcBtnLeft.y = 50;
		this.addChild(fcBtnLeft);
		fcBtnLeft.addEventListener(Event.TOUCH_START, cbLeft);

		var fcBtnRight = new Sprite(20, 22);
		fcBtnRight.image = core.assets["images/fc_btn_right.png"];
		fcBtnRight.x = 67;
		fcBtnRight.y = 50;
		this.addChild(fcBtnRight);
		fcBtnRight.addEventListener(Event.TOUCH_START, cbRight);

		var fcBtnA = new Sprite(32, 48);
		fcBtnA.image = core.assets["images/fc_btn_a.png"];
		fcBtnA.x = 205;
		fcBtnA.y = 48;
		this.addChild(fcBtnA);
		fcBtnA.addEventListener(Event.TOUCH_START, cbA);

		var fcBtnB = new Sprite(32, 48);
		fcBtnB.image = core.assets["images/fc_btn_b.png"];
		fcBtnB.x = 170;
		fcBtnB.y = 48;
		this.addChild(fcBtnB);
		fcBtnB.addEventListener(Event.TOUCH_START, cbB);

		var fcBtnOption = new Sprite(64, 32);
		fcBtnOption.image = core.assets["images/fc_btn_option.png"];
		fcBtnOption.x = 95;
		fcBtnOption.y = 58;
		this.addChild(fcBtnOption);
		fcBtnOption.addEventListener(Event.TOUCH_START, cbOption);

		//==========
		// Toggle
		this.fcBtnToggle         = new Sprite(20, 54);
		this.fcBtnToggle.image   = core.assets["images/fc_btn_toggle.png"];
		this.fcBtnToggle.x       = - this.fcBtnToggle.width;
		this.fcBtnToggle.y       = this.height * 0.5 - this.fcBtnToggle.height * 0.5;
		this.fcBtnToggle.closedX = this.x;
		this.fcBtnToggle.openedX = this.x - 260;
		this.fcBtnToggle.defY    = this.y;

		this.fcBtnToggle.showFlg = false;
		this.addChild(this.fcBtnToggle);
		this.fcBtnToggle.addEventListener(Event.TOUCH_START, function(){
			if(this.showFlg == false){
				this.parentNode.tl.moveTo(this.openedX, this.defY, 4);
				this.frame   = 1;
				this.showFlg = true;
			}else{
				this.parentNode.tl.moveTo(this.closedX, this.defY, 4);
				this.frame   = 0;
				this.showFlg = false;
			}
			// Sound
			var sound = core.assets["sounds/btn_push.mp3"].clone().play();
		});

		//==========
		// Power
		this.ctlPower = new Sprite(33, 35);
		this.ctlPower.image = core.assets["images/fc_power.png"];
		this.ctlPower.x = this.getWidth() - this.ctlPower.width - 8;
		this.ctlPower.y = 8;
		this.addChild(this.ctlPower);
	},
	setPowerOn: function(){
		this.ctlPower.frame = 1;
	},
	openController(){
		if(this.fcBtnToggle.showFlg == false){
			this.tl.moveTo(this.fcBtnToggle.defX, this.fcBtnToggle.openedY, 4);
			this.fcBtnToggle.frame   = 1;
			this.fcBtnToggle.showFlg = true;
		}
	},
	closeController(){
		if(this.fcBtnToggle.showFlg == true){
			this.tl.moveTo(this.fcBtnToggle.defX, this.fcBtnToggle.closedY, 4);
			this.fcBtnToggle.frame   = 0;
			this.fcBtnToggle.showFlg = false;
		}
	}
});
*/

/**
 * DgTopPanel
 */
enchant.dg.DgTopPanel = enchant.Class.create(enchant.Group, {

	initialize: function(panelWidth, panelHeight){
		enchant.Group.call(this);
		// Width, Height
		this.width  = panelWidth;
		this.height = panelHeight;
	},
	setup: function(){

		// Back
		this.back = new Sprite(this.width, this.height);
		this.back.backgroundColor = "black";
		this.back.opacity = 0.5;
		this.addChild(this.back);

		//==========
		// Toggle
		this.btnToggle         = new Sprite(54, 20);
		this.btnToggle.image   = core.assets["images/btn_toggle_t.png"];
		this.btnToggle.x       = this.width * 0.5 - this.btnToggle.width * 0.5;
		this.btnToggle.y       = this.height;
		this.btnToggle.defX    = this.x;
		this.btnToggle.closedY = this.y - this.height;
		this.btnToggle.openedY = this.y;
		this.btnToggle.showFlg = true;
		this.addChild(this.btnToggle);
		this.btnToggle.addEventListener(Event.TOUCH_START, function(){
			if(this.showFlg == false){
				this.parentNode.tl.moveTo(this.defX, this.openedY, 4);
				this.frame   = 1;
				this.showFlg = true;
			}else{
				this.parentNode.tl.moveTo(this.defX, this.closedY, 4);
				this.frame   = 0;
				this.showFlg = false;
			}
			// Sound
			var sound = core.assets["sounds/btn_push.mp3"].clone().play();
		});
	}
});

/**
 * DgBottomPanel
 */
enchant.dg.DgBottomPanel = enchant.Class.create(enchant.Group, {

	initialize: function(panelWidth, panelHeight){
		enchant.Group.call(this);
		// Width, Height
		this.width  = panelWidth;
		this.height = panelHeight;
	},
	setup: function(){

		// Back
		this.back = new Sprite(this.width, this.height);
		this.back.backgroundColor = "black";
		this.back.opacity = 0.5;
		this.addChild(this.back);

		//==========
		// Toggle
		this.btnToggle         = new Sprite(54, 20);
		this.btnToggle.image   = core.assets["images/btn_toggle_b.png"];
		this.btnToggle.x       = this.width * 0.5 - this.btnToggle.width * 0.5;
		this.btnToggle.y       = - this.btnToggle.height;
		this.btnToggle.defX    = this.x;
		this.btnToggle.closedY = this.y;
		this.btnToggle.openedY = this.y - this.height;
		this.btnToggle.showFlg = false;
		this.addChild(this.btnToggle);
		this.btnToggle.addEventListener(Event.TOUCH_START, function(){
			if(this.showFlg == false){
				this.parentNode.tl.moveTo(this.defX, this.openedY, 4);
				this.frame   = 1;
				this.showFlg = true;
			}else{
				this.parentNode.tl.moveTo(this.defX, this.closedY, 4);
				this.frame   = 0;
				this.showFlg = false;
			}
			// Sound
			var sound = core.assets["sounds/btn_push.mp3"].clone().play();
		});
	}
});

/**
 * DgLeftPanel
 */
enchant.dg.DgLeftPanel = enchant.Class.create(enchant.Group, {

	initialize: function(panelWidth, panelHeight){
		enchant.Group.call(this);
		// Width, Height
		this.width  = panelWidth;
		this.height = panelHeight;
	},
	setup: function(){

		// Back
		this.back = new Sprite(this.width, this.height);
		this.back.backgroundColor = "black";
		this.back.x = -this.width;
		this.back.y = Math.floor(this.height * -0.5);
		this.back.opacity = 0.5;
		this.addChild(this.back);

		//==========
		// Toggle
		this.btnToggle         = new Sprite(20, 54);
		this.btnToggle.image   = core.assets["images/btn_toggle_l.png"];
		this.btnToggle.x       = 0;
		this.btnToggle.y       = Math.floor(this.btnToggle.height * -0.5);
		this.btnToggle.defY    = this.y;
		this.btnToggle.closedX = this.x;
		this.btnToggle.openedX = this.x + this.width;
		this.btnToggle.showFlg = false;
		this.addChild(this.btnToggle);
		this.btnToggle.addEventListener(Event.TOUCH_START, function(){
			if(this.showFlg == false){
				this.parentNode.tl.moveTo(this.openedX, this.defY, 4);
				this.frame   = 1;
				this.showFlg = true;
			}else{
				this.parentNode.tl.moveTo(this.closedX, this.defY, 4);
				this.frame   = 0;
				this.showFlg = false;
			}
			// Sound
			var sound = core.assets["sounds/btn_push.mp3"].clone().play();
		});
	}
});

/**
 * DgController
 */
enchant.dg.DgController = enchant.Class.create(enchant.Group, {

	initialize: function(){
		enchant.Group.call(this);

		// Body
		var ctlBody = new Sprite(480, 274);
		ctlBody.image = core.assets["images/ctl_back_main.png"];
		this.addChild(ctlBody);
		this.width = ctlBody.width;
		this.height = ctlBody.height;

		// Display, Power
		this.dispLabelH;
		this.dispLabelM;
		this.ctlPower;
	},
	getWidth: function(){
		return this.width;
	},
	getHeight: function(){
		return this.height;
	},
	setup: function(cbUp, cbDown, cbLeft, cbRight, cbA, cbB){

		var ctlBtnUp = new Sprite(51, 61);
		ctlBtnUp.image = core.assets["images/ctl_btn_up.png"];
		ctlBtnUp.x = 70;
		ctlBtnUp.y = 180;
		this.addChild(ctlBtnUp);
		ctlBtnUp.addEventListener(Event.TOUCH_START, function(e){
			this.frame = 1;
			cbUp(e);
		});

		var ctlBtnDown = new Sprite(51, 61);
		ctlBtnDown.image = core.assets["images/ctl_btn_down.png"];
		ctlBtnDown.x = 125;
		ctlBtnDown.y = 180;
		this.addChild(ctlBtnDown);
		ctlBtnDown.addEventListener(Event.TOUCH_START, function(e){
			this.frame = 1;
			cbDown(e);
		});

		var ctlBtnLeft = new Sprite(51, 61);
		ctlBtnLeft.image = core.assets["images/ctl_btn_left.png"];
		ctlBtnLeft.x = 180;
		ctlBtnLeft.y = 180;
		this.addChild(ctlBtnLeft);
		ctlBtnLeft.addEventListener(Event.TOUCH_START, function(e){
			this.frame = 1;
			cbLeft(e);
		});

		var ctlBtnRight = new Sprite(51, 61);
		ctlBtnRight.image = core.assets["images/ctl_btn_right.png"];
		ctlBtnRight.x = 240;
		ctlBtnRight.y = 180;
		this.addChild(ctlBtnRight);
		ctlBtnRight.addEventListener(Event.TOUCH_START, function(e){
			this.frame = 1;
			cbRight(e);
		});

		var ctlBtnA = new Sprite(71, 61);
		ctlBtnA.image = core.assets["images/ctl_btn_a.png"];
		ctlBtnA.x = 390;
		ctlBtnA.y = 180;
		this.addChild(ctlBtnA);
		ctlBtnA.addEventListener(Event.TOUCH_START, function(e){
			this.frame = 1;
			cbA(e);
		});

		var ctlBtnB = new Sprite(71, 61);
		ctlBtnB.image = core.assets["images/ctl_btn_b.png"];
		ctlBtnB.x = 310;
		ctlBtnB.y = 180;
		this.addChild(ctlBtnB);
		ctlBtnB.addEventListener(Event.TOUCH_START, function(e){
			this.frame = 1;
			cbB(e);
		});

		//==========
		// Display
		var dispBack = new Sprite(148, 70);
		dispBack.image = core.assets["images/ctl_display.png"];
		dispBack.x = 20;
		dispBack.y = 40;
		this.addChild(dispBack);

		this.dispLabelH = new Label("00");
		this.dispLabelH.x = 40;
		this.dispLabelH.y = 48;
		this.dispLabelH.color = 'darkgreen';
		this.dispLabelH.font = "52px 'PixelMplus10-Regular'";
		this.addChild(this.dispLabelH);

		this.dispLabelM = new Label("00");
		this.dispLabelM.x = 100;
		this.dispLabelM.y = 48;
		this.dispLabelM.color = 'darkgreen';
		this.dispLabelM.font = "52px 'PixelMplus10-Regular'";
		this.addChild(this.dispLabelM);

		var dispLabelC = new Label(":");
		dispLabelC.x = 80;
		dispLabelC.y = 48;
		dispLabelC.color = 'darkgreen';
		dispLabelC.font = "52px 'PixelMplus10-Regular'";
		this.addChild(dispLabelC);
		dispLabelC.tl.delay(16);
		dispLabelC.tl.then(function(){
			if(dispLabelC.visible){
				dispLabelC.visible = false;
			}else{
				dispLabelC.visible = true;
			}
		});
		dispLabelC.tl.loop();
		
		//==========
		// Dial
		var dialMin = 0;
		var dialMax = 4;

		var dialA = new Sprite(45, 47);
		dialA.image = core.assets["images/ctl_dial.png"];
		dialA.x = 20;
		dialA.y = 120;
		this.addChild(dialA);
		dialA.num = dialMin;// Default
		dialA.addEventListener(Event.TOUCH_START, function(e){
			if(e.localX < this.width*0.5){
				if(this.num <= dialMin) return;
				this.num--;
				this.frame = this.num;
			}else{
				if(dialMax <= this.num) return;
				this.num++;
				this.frame = this.num;
			}
		});

		var dialB = new Sprite(45, 47);
		dialB.image = core.assets["images/ctl_dial.png"];
		dialB.x = 70;
		dialB.y = 120;
		this.addChild(dialB);
		dialB.num = dialMin;
		dialB.addEventListener(Event.TOUCH_START, function(e){
			if(e.localX < this.width*0.5){
				if(this.num <= dialMin) return;
				this.num--;
				this.frame = this.num;
			}else{
				if(dialMax <= this.num) return;
				this.num++;
				this.frame = this.num;
			}
		});

		var dialC = new Sprite(45, 47);
		dialC.image = core.assets["images/ctl_dial.png"];
		dialC.x = 120;
		dialC.y = 120;
		this.addChild(dialC);
		dialC.num = dialMin;
		dialC.addEventListener(Event.TOUCH_START, function(e){
			if(e.localX < this.width*0.5){
				if(this.num <= dialMin) return;
				this.num--;
				this.frame = this.num;
			}else{
				if(dialMax <= this.num) return;
				this.num++;
				this.frame = this.num;
			}
		});

		//==========
		// Destruction
		var destBack = new Sprite(115, 130);
		destBack.image = core.assets["images/ctl_back_dest.png"];
		destBack.x = 175;
		destBack.y = 40;
		this.addChild(destBack);

		var destBtn = new Sprite(67, 67);
		destBtn.image = core.assets["images/ctl_dest.png"];
		destBtn.x = 198;
		destBtn.y = 50;
		this.addChild(destBtn);
		destBtn.addEventListener(Event.TOUCH_START, function(e){
			this.frame = 1;
		});

		//==========
		// Toggle
		var toggleBack = new Sprite(168, 115);
		toggleBack.image = core.assets["images/ctl_back_toggle.png"];
		toggleBack.x = 295;
		toggleBack.y = 40;
		this.addChild(toggleBack);

		var toggleA = new Sprite(27, 68);
		toggleA.image = core.assets["images/ctl_toggle.png"];
		toggleA.x = 305;
		toggleA.y = 60;
		this.addChild(toggleA);
		toggleA.addEventListener(Event.TOUCH_START, function(){
			if(this.frame == 0){
				this.frame = 1;
			}else{
				this.frame = 0;
			}
		});

		var toggleB = new Sprite(27, 68);
		toggleB.image = core.assets["images/ctl_toggle.png"];
		toggleB.x = 345;
		toggleB.y = 60;
		this.addChild(toggleB);
		toggleB.addEventListener(Event.TOUCH_START, function(){
			if(this.frame == 0){
				this.frame = 1;
			}else{
				this.frame = 0;
			}
		});

		var toggleC = new Sprite(27, 68);
		toggleC.image = core.assets["images/ctl_toggle.png"];
		toggleC.x = 385;
		toggleC.y = 60;
		this.addChild(toggleC);
		toggleC.addEventListener(Event.TOUCH_START, function(){
			if(this.frame == 0){
				this.frame = 1;
			}else{
				this.frame = 0;
			}
		});

		var toggleD = new Sprite(27, 68);
		toggleD.image = core.assets["images/ctl_toggle.png"];
		toggleD.x = 425;
		toggleD.y = 60;
		this.addChild(toggleD);
		toggleD.addEventListener(Event.TOUCH_START, function(){
			if(this.frame == 0){
				this.frame = 1;
			}else{
				this.frame = 0;
			}
		});

		//==========
		// TOUCH_END
		this.addEventListener(Event.TOUCH_END, function(){
			ctlBtnUp.frame = 0;
			ctlBtnDown.frame = 0;
			ctlBtnLeft.frame = 0;
			ctlBtnRight.frame = 0;
			ctlBtnA.frame = 0;
			ctlBtnB.frame = 0;
			destBtn.frame = 0;
		});

		//==========
		// Power
		this.ctlPower = new Sprite(33, 35);
		this.ctlPower.image = core.assets["images/ctl_power.png"];
		this.ctlPower.x = 25;
		this.ctlPower.y = 190;
		this.addChild(this.ctlPower);
	},
	setDisplayH: function(num){
		if(num < 0){
			num = "**";
		}else if(num < 10){
			num = "0" + num;
		}else if(99 < num){
			num = "**";
		}
		this.dispLabelH.text = num;
	},
	setDisplayM: function(num){
		if(num < 0){
			num = "**";
		}else if(num < 10){
			num = "0" + num;
		}else if(99 < num){
			num = "**";
		}
		this.dispLabelM.text = num;
	},
	setPowerOn: function(){
		this.ctlPower.frame = 1;
	}
});

/**
 * DgKeyBoard
 */
enchant.dg.DgKeyBoard = enchant.Class.create(enchant.Group, {

	initialize: function(){
		enchant.Group.call(this);

		this.str = "";

		// Body
		var kbdBody = new Sprite(540, 300);
		kbdBody.image = core.assets["images/kbd_back_main.png"];
		this.addChild(kbdBody);
		this.width = kbdBody.width;
		this.height = kbdBody.height;

		// Label
		this.display = new Label(this.str);
		this.display.x = 35;
		this.display.y = 32;
		this.display.width = 500;
		this.display.color = 'white';
		this.display.font = "28px 'PixelMplus10-Regular'";
		this.addChild(this.display);
	},
	getWidth: function(){
		return this.width;
	},
	getHeight: function(){
		return this.height;
	},
	getStr: function(){
		return this.str;
	},
	setup: function(){
		//==========
		// Toggle
		this.kbdBtnToggle         = new Sprite(54, 20);
		this.kbdBtnToggle.image   = core.assets["images/kbd_btn_toggle.png"];
		this.kbdBtnToggle.x       = this.width * 0.5 - this.kbdBtnToggle.width * 0.5;
		this.kbdBtnToggle.y       = - this.kbdBtnToggle.height;
		this.kbdBtnToggle.defX    = this.x;
		this.kbdBtnToggle.closedY = this.y;
		this.kbdBtnToggle.openedY = this.y - 310;
		this.kbdBtnToggle.showFlg = false;
		this.addChild(this.kbdBtnToggle);
		this.kbdBtnToggle.addEventListener(Event.TOUCH_START, function(){
			if(this.showFlg == false){
				this.parentNode.tl.moveTo(this.defX, this.openedY, 4);
				this.frame   = 1;
				this.showFlg = true;
			}else{
				this.parentNode.tl.moveTo(this.defX, this.closedY, 4);
				this.frame   = 0;
				this.showFlg = false;
			}
			// Sound
			var sound = core.assets["sounds/btn_push.mp3"].clone().play();
		});
	},
	makeKeys: function(baseX, baseY, padding, array){
		for(var r=0; r<array.length; r++){
			for(var c=0; c<array[0].length; c++){
				var char = array[r][c];
				if(char != ""){
					var btn = new DgKeyBtn(32, 32, "images/kbd_btn_32.png", char);
					btn.x = baseX + padding * c;
					btn.y = baseY + padding * r;
					btn.addEventListener(Event.TOUCH_START, this.typeKey);
					this.addChild(btn);
				}
			}
		}
	},
	makeCtls: function(callback){
		var btnBack = new DgKeyBtn(75, 32, "images/kbd_btn_75.png", "もどす");
		btnBack.x = 440;
		btnBack.y = 90;
		btnBack.addEventListener(Event.TOUCH_START, this.typeCtl);
		this.addChild(btnBack);

		var btnDel = new DgKeyBtn(75, 32, "images/kbd_btn_75.png", "けす");
		btnDel.x = 440;
		btnDel.y = 128;
		btnDel.addEventListener(Event.TOUCH_START, this.typeCtl);
		this.addChild(btnDel);

		var btnSend = new DgKeyBtn(75, 32, "images/kbd_btn_75.png", "はなす");
		btnSend.x = 440;
		btnSend.y = 242;
		btnSend.addEventListener(Event.TOUCH_START, callback);// Callback
		this.addChild(btnSend);
	},
	typeKey: function(e){
		this.parentNode.str += e.target.getValue();
		this.parentNode.display.text = this.parentNode.str;
	},
	typeCtl: function(e){
		var value = e.target.getValue();
		if(value == "もどす"){
			var length = this.parentNode.str.length;
			this.parentNode.str = this.parentNode.str.slice(0, length-1);
			this.parentNode.display.text = this.parentNode.str;
		}
		if(value == "けす"){
			this.parentNode.str = "";
			this.parentNode.display.text = this.parentNode.str;
		}
	}
});

enchant.dg.DgKeyBtn = enchant.Class.create(enchant.Group, {

	initialize: function(width, height, path, value){
		enchant.Group.call(this);

		// Value
		this.value = value;

		// Body
		this.back = new Sprite(width, height);
		this.back.image = core.assets[path];
		this.addChild(this.back);
		this.width = this.back.width;
		this.height = this.back.height;

		// Label
		this.label = new Label(this.value);
		this.label.x = 0;
		this.label.y = 5;
		this.label.width = width;
		this.label.color = 'white';
		this.label.font = "20px 'PixelMplus10-Regular'";
		this.label.textAlign = "center";
		this.addChild(this.label);

		this.addEventListener(Event.TOUCH_START, this.touchStart);
		this.addEventListener(Event.TOUCH_END, this.touchEnd);
	},
	getValue: function(){
		return this.value;
	},
	getWidth: function(){
		return this.width;
	},
	getHeight: function(){
		return this.height;
	},
	touchStart: function(){
		this.back.frame = 1;
	},
	touchEnd: function(){
		this.back.frame = 0;
	}
});

/**
 * DgStatusPanel
 */
enchant.dg.DgStatusPanel = enchant.Class.create(enchant.Group, {

	initialize: function(){
		enchant.Group.call(this);

		this.width = 75;
		this.height = 85;

		// Body
		this.back = new Sprite(this.width, this.height);
		this.back.image = core.assets["images/dg_status.png"];
		this.addChild(this.back);

		// Name
		this.labelName = new Label("****");
		this.labelName.x = 0;
		this.labelName.y = 10;
		this.labelName.color = 'white';
		this.labelName.font = "14px 'PixelMplus10-Regular'";
		this.labelName.x += Math.floor(this.width*0.5 - this.labelName._boundWidth*0.5);
		this.addChild(this.labelName);

		// HP
		this.labelHP = new Label("HP:00/00");
		this.labelHP.x = 10;
		this.labelHP.y = 28;
		this.labelHP.color = 'white';
		this.labelHP.font = "14px 'PixelMplus10-Regular'";
		this.addChild(this.labelHP);

		// MP
		this.labelMP = new Label("MP:00/00");
		this.labelMP.x = 10;
		this.labelMP.y = 46;
		this.labelMP.color = 'white';
		this.labelMP.font = "14px 'PixelMplus10-Regular'";
		this.addChild(this.labelMP);

		// Attack
		this.labelAttack = new Label("A:00");
		this.labelAttack.x = 10;
		this.labelAttack.y = 64;
		this.labelAttack.color = 'white';
		this.labelAttack.font = "12px 'PixelMplus10-Regular'";
		this.addChild(this.labelAttack);

		// Guard
		this.labelGuard = new Label("G:00");
		this.labelGuard.x = 42;
		this.labelGuard.y = 64;
		this.labelGuard.color = 'white';
		this.labelGuard.font = "12px 'PixelMplus10-Regular'";
		this.addChild(this.labelGuard);
	},
	updateParam: function(tag, pHP, pMP, pHPMax, pMPMax, pAttack, pGuard){

		// Trim
		pHP     = pHP.trim();
		pMP     = pMP.trim();
		pHPMax  = pHPMax.trim();
		pMPMax  = pMPMax.trim();
		pAttack = pAttack.trim();
		pGuard  = pGuard.trim();

		// Color
		var percent = pHP / pHPMax * 100;
		var color = "white";
		this.back.frame = 0;
		if(percent < 20){
			color = "red";
			this.back.frame = 2;
		}else if(percent < 60){
			color = "orange";
			this.back.frame = 1;
		}
		this.labelName.color   = color;
		this.labelHP.color     = color;
		this.labelMP.color     = color;
		this.labelAttack.color = color;
		this.labelGuard.color  = color;

		// Format
		if(pHP < 10) pHP         = "0" + pHP;
		if(pMP < 10) pMP         = "0" + pMP;
		if(pHPMax < 10) pHPMax   = "0" + pHPMax;
		if(pMPMax < 10) pMPMax   = "0" + pMPMax;
		if(pAttack < 10) pAttack = "0" + pAttack;
		if(pGuard < 10) pGuard   = "0" + pGuard;

		// Text
		this.labelName.text   = tag;
		this.labelName.x      = Math.floor(this.width*0.5 - this.labelName._boundWidth*0.5);
		this.labelHP.text     = "HP:" + pHP + "/" + pHPMax;
		this.labelMP.text     = "MP:" + pMP + "/" + pMPMax;
		this.labelAttack.text = "A:" + pAttack;
		this.labelGuard.text  = "G:" + pGuard;
	}
});

/**
 * DgItemPanel
 */
enchant.dg.DgItemPanel = enchant.Class.create(enchant.Group, {

	initialize: function(width, height){
		enchant.Group.call(this);

		this.width   = width;
		this.height  = height;

		this.bWidth  = 48;
		this.bHeight = 48;

		this.cols    = Math.floor(this.width / this.bWidth);
		this.padding = Math.floor((this.width - this.bWidth * this.cols) * 0.5);

		// Items
		this.pItems = new Array();
		for(var i=0; i<itemTypes.length; i++){
			this.pItems.push(0);// Default
		}

		// Box, Artifact
		this.boxes = new Array();
		this.artifacts = new Array();
		for(var i=0; i<this.pItems.length; i++){
			// Box
			var box = new Sprite(46, 46);
			box.image = core.assets["images/dg_artifact_box.png"];
			box.x = this.bWidth * (i % this.cols) + this.padding;
			box.y = this.bHeight * Math.floor(i / this.cols);
			this.boxes.push(box);
			this.addChild(box);

			var af = new Sprite(32, 32);
			af.image = core.assets["images/dg_artifact.png"];
			af.x = box.x + box.width * 0.5 - af.width * 0.5;
			af.y = box.y + box.height * 0.5 - af.height * 0.5;
			af.frame = i;
			if(i != 0) af.visible = false;
			this.artifacts.push(af);
			this.addChild(af);
		}
	},
	updateParam: function(
		iNone, iSword, iShield, iHelmet, iArmour,
		iJem, iBook, iKeyBronze, iKeySilver, iKeyGold, iPortionRed, iPortionBlue){
		console.log("updateParam!!(ItemPanel)");

		var visible = false;
		//iNone == 1      ? visible = true : visible = false;
		//this.artifacts[0].visible = visible;
		iSword == 1       ? visible = true : visible = false;
		this.artifacts[1].visible = visible;
		iShield == 1      ? visible = true : visible = false;
		this.artifacts[2].visible = visible;
		iHelmet == 1      ? visible = true : visible = false;
		this.artifacts[3].visible = visible;
		iArmour == 1      ? visible = true : visible = false;
		this.artifacts[4].visible = visible;
		iJem == 1         ? visible = true : visible = false;
		this.artifacts[5].visible = visible;
		iBook == 1        ? visible = true : visible = false;
		this.artifacts[6].visible = visible;
		iKeyBronze == 1   ? visible = true : visible = false;
		this.artifacts[7].visible = visible;
		iKeySilver == 1   ? visible = true : visible = false;
		this.artifacts[8].visible = visible;
		iKeyGold == 1     ? visible = true : visible = false;
		this.artifacts[9].visible = visible;
		iPortionRed == 1  ? visible = true : visible = false;
		this.artifacts[10].visible = visible;
		iPortionBlue == 1 ? visible = true : visible = false;
		this.artifacts[11].visible = visible;
	}
});

/**
 * DgPuppet
 */
enchant.dg.DgPuppet = enchant.Class.create(enchant.Group, {

	initialize: function(){
		enchant.Group.call(this);

		this.width  = 108;
		this.height = 108;

		var tanu = new Sprite(this.width, this.height);
		tanu.image = core.assets["images/dg_puppet.png"];
		this.addChild(tanu);

		// Items
		this.pItems = new Array();
		for(var i=0; i<itemTypes.length; i++){
			this.pItems.push(0);// Default
		}

		// Artifact
		this.artifacts = new Array();
		var aNone = new Sprite(108, 108);
		aNone.image = core.assets["images/dg_equip.png"];
		aNone.frame = 0;
		aNone.visible = true;
		this.artifacts.push(aNone);

		var aSword = new Sprite(108, 108);
		aSword.image = core.assets["images/dg_equip.png"];
		aSword.frame = 1;
		aSword.visible = false;
		this.artifacts.push(aSword);

		var aShield = new Sprite(108, 108);
		aShield.image = core.assets["images/dg_equip.png"];
		aShield.frame = 2;
		aShield.visible = false;
		this.artifacts.push(aShield);

		var aHelmet = new Sprite(108, 108);
		aHelmet.image = core.assets["images/dg_equip.png"];
		aHelmet.frame = 3;
		aHelmet.visible = false;
		this.artifacts.push(aHelmet);

		var aArmour = new Sprite(108, 108);
		aArmour.image = core.assets["images/dg_equip.png"];
		aArmour.frame = 4;
		aArmour.visible = false;
		this.artifacts.push(aArmour);

		this.addChild(aHelmet);
		this.addChild(aArmour);
		this.addChild(aNone);
		this.addChild(aSword);
		this.addChild(aShield);
	},
	updateParam: function(
		iNone, iSword, iShield, iHelmet, iArmour,
		iJem, iBook, iKeyBronze, iKeySilver, iKeyGold){
		console.log("updateParam!!(Puppet)");

		var visible = false;
		//iNone == 1      ? visible = true : visible = false;
		//this.artifacts[0].visible = visible;
		iSword == 1     ? visible = true : visible = false;
		this.artifacts[1].visible = visible;
		iShield == 1    ? visible = true : visible = false;
		this.artifacts[2].visible = visible;
		iHelmet == 1    ? visible = true : visible = false;
		this.artifacts[3].visible = visible;
		iArmour == 1    ? visible = true : visible = false;
		this.artifacts[4].visible = visible;
	}
});

/**
 * DgMarker
 */
enchant.dg.DgMarkerItem = enchant.Class.create(enchant.Sprite, {
	
	initialize: function(width, height, pathImage, tag, spriteId){
		enchant.Sprite.call(this, width, height);

		this.pathImage = pathImage;
		this.tag       = tag;
		this.spriteId  = spriteId;

		// Image
		this.image     = core.assets[pathImage];
	},
	getTag: function(){
		return this.tag;
	},
	getSpriteId: function(){
		return this.spriteId;
	}
});

enchant.dg.DgMarkerEnemy = enchant.Class.create(enchant.Sprite, {
	
	initialize: function(width, height, pathImage, tag, spriteId){
		enchant.Sprite.call(this, width, height);

		this.pathImage = pathImage;
		this.tag       = tag;
		this.spriteId  = spriteId;

		// Image
		this.image     = core.assets[pathImage];
	},
	getTag: function(){
		return this.tag;
	},
	getSpriteId: function(){
		return this.spriteId;
	},
	markAlive(){
		this.frame = 0;
	},
	markDead(){
		this.frame = 1;
	}
});

enchant.dg.DgMarkerTrap = enchant.Class.create(enchant.Sprite, {
	
	initialize: function(width, height, pathImage, tag, spriteId){
		enchant.Sprite.call(this, width, height);

		this.pathImage = pathImage;
		this.tag       = tag;
		this.spriteId  = spriteId;

		// Image
		this.image     = core.assets[pathImage];
	},
	getTag: function(){
		return this.tag;
	},
	getSpriteId: function(){
		return this.spriteId;
	}
});

/**
/* DgMonsterPanel
*/
enchant.dg.DgMonsterPanel = enchant.Class.create(enchant.Group, {

	initialize: function(width, height){
		enchant.Group.call(this);

		this.width   = width;
		this.height  = height;

		this.bWidth  = 48;
		this.bHeight = 48;

		this.cols    = Math.floor(this.width / this.bWidth);
		this.padding = Math.floor((this.width - this.bWidth * this.cols) * 0.5);

		// Box, Artifact
		this.boxes = new Array();
		this.monsters = new Array();
		for(var i=0; i<enemyTypes.length; i++){

			// Box
			var box = new Sprite(46, 46);
			box.image = core.assets["images/dg_artifact_box.png"];
			box.x = Math.floor(this.bWidth * (i % this.cols) + this.padding);
			box.y = Math.floor(this.bHeight * Math.floor(i / this.cols));
			this.boxes.push(box);
			this.addChild(box);

			// Monster
			var monster = new Sprite(32, 32);
			monster.x = Math.floor(box.x + box.width * 0.5 - monster.width * 0.5);
			monster.y = Math.floor(box.y + box.height * 0.5 - monster.height * 0.5);
			monster.frame = [5, null];
			this.monsters.push(monster);
			this.addChild(monster);
			if(enemyTypes[i] != null){
				monster.image = core.assets[enemyTypes[i][0]];
			}

			monster.addEventListener(Event.TOUCH_START, function(){
				this.frame = [5, 5, 6, 6, 7, 7, 8, 8];
				this.opacity = 0.5;
				this.pickedMonster = this;
			});

			monster.addEventListener(Event.TOUCH_END, function(){
				this.frame = [5, null];
				this.opacity = 1.0;
				this.pickedMonster = null;
			});
		}
	},
	getWidth: function(){
		return this.width;
	},
	getHeight: function(){
		return this.height;
	},
	getPickedIndex: function(x, y){
		//console.log("pickedMonster:" + x + ", " + y);
		for(var i=0; i<this.monsters.length; i++){
			var sprite = this.monsters[i];
			var left   = sprite.x + this.x;
			var right  = sprite.x + sprite.width + this.x;
			var top    = sprite.y + this.y;
			var bottom = sprite.y + sprite.height + this.y;
			if(left < x && x < right && top < y && y < bottom){
				return i;
			}
		}
		return -1;
	}
});

/**
 * DgPin
 */
enchant.dg.DgMonsterPin = enchant.Class.create(enchant.Sprite, {
	
	initialize: function(width, height, pathImage, type){
		enchant.Sprite.call(this, width, height);

		this.pathImage = pathImage;
		this.type      = type;

		// Image
		this.image     = core.assets[pathImage];
		this.frame     = [5, 5, 6, 6, 7, 7, 8, 8];
	},
	getPathImage: function(){
		return this.pathImage;
	},
	getType: function(){
		return this.type;
	}
});

/**
/* DgFirepattern
*/
enchant.dg.DgFirepattern = enchant.Class.create(enchant.Group, {

	initialize: function(width, height){
		enchant.Group.call(this);

		this.width   = width;
		this.height  = height;

		this.top = new Sprite(scene.width, 128);
		this.top.image = core.assets["images/dg_firepattern_x2.png"];
		this.top.x     = Math.floor(-this.width * 0.5);
		this.top.y     = Math.floor(-this.height * 0.5 - this.top.height);
		this.top.defX  = this.top.x;
		this.top.defY  = this.top.y;
		this.top.opacity = 0.8;
		this.top.rotate(180);
		this.addChild(this.top);

		this.bottom = new Sprite(scene.width, 128);
		this.bottom.image = core.assets["images/dg_firepattern_x2.png"];
		this.bottom.x     = Math.floor(-this.width * 0.5);
		this.bottom.y     = Math.floor(this.height * 0.5);
		this.bottom.defX  = this.bottom.x;
		this.bottom.defY  = this.bottom.y;
		this.bottom.opacity = 0.8;
		this.addChild(this.bottom);

		this.fireFlg = false;
	},
	getWidth: function(){
		return this.width;
	},
	getHeight: function(){
		return this.height;
	},
	fireToggle: function(){
		if(this.fireFlg == false){
			this.fireOn();
		}else{
			this.fireOff();
		}
	},
	fireOn: function(){
		if(this.fireFlg == true) return;
		this.fireFlg = true;

		this.top.tl.moveTo(
			this.top.defX,
			this.top.defY + this.top.height, 32);

		this.bottom.tl.moveTo(
			this.bottom.defX, 
			this.bottom.defY - this.bottom.height, 32);
	},
	fireOff: function(){
		if(this.fireFlg == false) return;
		this.fireFlg = false;

		this.top.tl.moveTo(
			this.top.defX, 
			this.top.defY, 8);

		this.bottom.tl.moveTo(
			this.bottom.defX, 
			this.bottom.defY, 8);
	}
});

/**
 * DgSoul
 */
enchant.dg.DgSoul = enchant.Class.create(enchant.Sprite, {
	
	initialize: function(width, height, pathImage, index, delay){
		enchant.Sprite.call(this, width, height);
		this.image = core.assets[pathImage];

		var colors = new Array();
		for(var i=index*5; i<index*5+5; i++){
			colors.push(i);
		}
		this.frame = colors;
		this.actionMove(delay);
	},
	actionMove: function(delay){
		this.tl.delay(delay);
		this.tl.moveBy(0, -32, 16);
		this.tl.then(function(){
			this.remove();
		});
	}
});