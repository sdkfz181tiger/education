console.log("app.js");

const resources = [
	"res/HelloWorld.png", "res/t_tanu_96.png"
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

	// Scene
	var MyScene = cc.Scene.extend({
		ctor: function(){
			this._super();
		},
		onEnter:function(){
			this._super();

			// Window size
			wSize = cc.director.getWinSize();

			// Layer
			var cLayer = new cc.LayerColor(
				cc.color(33, 33, 33, 255),
				wSize.width, wSize.height);
			cLayer.ignoreAnchorPointForPosition(false);
			cLayer.x = wSize.width * 0.5;
			cLayer.y = wSize.height * 0.5;
			this.addChild(cLayer);

			// Sprite
			var tSprite = cc.Sprite.create("res/t_tanu_96.png");
			tSprite.setAnchorPoint(cc.p(0.5, 0.0));
			tSprite.setPosition(cc.p(wSize.width * 0.5, wSize.height * 0.5));
			this.addChild(tSprite);

			// Label
			var label = cc.LabelTTF.create("Hello Cocos2d-js!!", "Arial", 24);
			label.setAnchorPoint(cc.p(0.5, 0.0));
			label.setPosition(cc.p(wSize.width * 0.5, wSize.height * 0.65));
			this.addChild(label, 1);
		}
	});
	var scene = new MyScene();
	cc.director.runScene(scene);
}