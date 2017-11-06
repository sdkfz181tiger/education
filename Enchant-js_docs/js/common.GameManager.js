/**
 * namespace object
 * @type {Object}
 */
var common = common || {};

common.GameManager = function(){

	var displayWidth  = 0;// 画面の幅
	var displayHeight = 0;// 画面の高
	var core;             // コア
	
	// Create Core Object
	this.createCore = function(width, height){
		enchant.ENV.USE_TOUCH_TO_START_SCENE = false;
		displayWidth  = width;
		displayHeight = height;
		core          = new Core(displayWidth, displayHeight);
		core.fps      = 16;
		return core;
	};

	//==========
	// クラス関連(基本)
	//==========

	// Sceneを生成(Title)
	this.createTitleScene = function(){
		var scene = new Scene();
		var title = new Sprite(248, 165);
		title.image = core.assets["images/title.png"];
		title.x = 160 - title.width * 0.5;
		title.y = 240 - title.height * 0.5;
		scene.addChild(title);
		return scene;
	}

	// Sceneを生成(Game)
	this.createGameScene = function(){
		var scene = new Scene();
		return scene;
	}

	// 画像を生成
	this.createSprite = function(urlImg, width, height, x, y){
		var sprite = new Sprite(width, height);
		sprite.image = core.assets[urlImg];
		sprite.x = x - sprite.width * 0;
		sprite.y = y - sprite.height * 0;
		return sprite;
	};

	// ラベルを生成
	this.createLabel = function(textStr, x, y){
		var label = new Label(textStr);
		label.x = x;
		label.y = y;
		return label;
	};
};

//==========
// Android / WebBrowserで切り替え
function playEffect(core, fileName){
	// Browser用メソッド
	core.assets[fileName].play(true);
	// Android用メソッド
	//jsHandler.playEffect(fileName);
};