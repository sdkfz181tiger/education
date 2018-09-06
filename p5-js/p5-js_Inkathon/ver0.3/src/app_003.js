console.log("app.js");

const resources = [
	"res/HelloWorld.png", "res/t_daruma_96.png",
	"res/t_tanu_96.png", "res/t_ume_96.png"
];

// Main
window.onload = function(){
	cc.game.onStart = function(){
		// Load resources
		cc.LoaderScene.preload(resources, gameStart, this);
	};
	cc.game.run("gameCanvas");
};

var wSize = null;

// Game start
function gameStart(){
	console.log("gameStart");

	var tSprite;
	var dSprites;
	var uSprites;

	// Scene
	var MyScene = cc.Scene.extend({
		ctor: function(){
			this._super();
			tSprite = null;
			dSprites = new Array();
			uSprites = new Array();
		},
		onEnter:function(){
			this._super();

			// Window size
			wSize = cc.director.getWinSize();

			// Layer
			var cLayer = new cc.LayerColor(
				cc.color(33, 33, 33, 255),
				wSize.width, wSize.height);
			this.addChild(cLayer);

			// Sprite
			tSprite = cc.Sprite.create("res/t_tanu_96.png");
			tSprite.setAnchorPoint(cc.p(0.5, 0.5));
			tSprite.setPosition(cc.p(wSize.width * 0.5, wSize.height * 0.5));
			this.addChild(tSprite);

			// Label
			var label = cc.LabelTTF.create("Hello Cocos2d-js!!", "Arial", 24);
			label.setAnchorPoint(cc.p(0.5, 0.0));
			label.setPosition(cc.p(wSize.width * 0.5, wSize.height * 0.65));
			this.addChild(label, 1);

			// Darumas
			for(var i=0; i<10; i++){
				var posX = Math.floor(Math.random() * wSize.width);
				var posY = Math.floor(Math.random() * wSize.height);

				// Sprite
				var dSprite = cc.Sprite.create("res/t_daruma_96.png");
				dSprite.setPosition(cc.p(posX, posY));
				this.addChild(dSprite);
				dSprites.push(dSprite);
			}

			// Event
			cc.eventManager.addListener({
				event:cc.EventListener.TOUCH_ONE_BY_ONE,
				onTouchBegan:touchBegan}, this);

			// Schedule
			this.scheduleUpdate();
		},
		update: function(dt){
			console.log("uSprites:" + uSprites.length);

			// Collision
			for(var d=dSprites.length-1; 0<=d; d--){
				var dSprite = dSprites[d];
				for(var u=uSprites.length-1; 0<=u; u--){
					var uSprite = uSprites[u];
					if(cc.rectIntersectsRect(
						dSprite.getBoundingBox(),
						uSprite.getBoundingBox()) == true){
						dSprite.removeFromParent();
						uSprite.removeFromParent();
						dSprites.splice(d, 1);
						uSprites.splice(u, 1);
						break;
					}
				}
			}
		}
	});
	var scene = new MyScene();
	cc.director.runScene(scene);

	function touchBegan(touch, event){
		var touchX = touch.getLocationX();
		var touchY = touch.getLocationY();
		shotUme(tSprite.x, tSprite.y, touchX, touchY);
		return true;
	}

	function shotUme(fromX, fromY, toX, toY){
		// Sprite
		var uSprite = cc.Sprite.create("res/t_ume_96.png");
		uSprite.setPosition(cc.p(fromX, fromY));
		var actionTo = cc.MoveTo.create(3.0, cc.p(toX, toY));
		uSprite.runAction(actionTo);
		scene.addChild(uSprite);
		uSprites.push(uSprite);
	}
}