console.log("app.js");

const resources = [
	"res/HelloWorld.png"
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
				cc.color(255, 200, 200, 255),
				wSize.width, wSize.height);
			cLayer.ignoreAnchorPointForPosition(false);
			cLayer.x = wSize.width * 0.5;
			cLayer.y = wSize.height * 0.5;
			this.addChild(cLayer);

			// Sprite
			var sprite = cc.Sprite.create("res/HelloWorld.png");
			sprite.setPosition(wSize.width * 0.5, wSize.height * 0.5);
			sprite.setScale(0.8);
			this.addChild(sprite, 0);
		}
	});
	var scene = new MyScene();
	cc.director.runScene(scene);
}