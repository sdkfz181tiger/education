console.log("app.js");

const FONT_SIZE = 24;
const FONT_RECT_W = 16;
const FONT_RECT_H = 26;

const FONT_REPLACE_MARK = "*";

const resources = [
	"res/HelloWorld.png", "res/t_tanu_32.png",
	"res/FiraCode-Regular.ttf"
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

			// Test
			var myWord = new MyWord("Sprite(*, *);");
			myWord.x = 100;
			myWord.y = 100;
			cLayer.addChild(myWord);




			// Event
			cc.eventManager.addListener({
				event:cc.EventListener.TOUCH_ONE_BY_ONE,
				onTouchBegan:function(touch, event){
					console.log("onTouchBegan");
					var touchX = touch.getLocationX();
					return true;
				}
			}, this);
		},
		update: function(dt){
			//console.log("update:" + dt);
		}
	});
	var scene = new MyScene();
	cc.director.runScene(scene);
}

// MyDrawDot
var MyWord = cc.DrawNode.extend({
	ctor: function(word){
		this._super();
		this._word  = word;
		this._chars = [];

		for(var i=0; i<this._word.length; i++){

			var color = cc.color(255, 255, 255, 100);
			if(this._word[i] == FONT_REPLACE_MARK){
				color = cc.color(255, 33, 33, 100);
			}

			this.drawRect(
				cc.p(FONT_RECT_W * i, 0.0), cc.p(FONT_RECT_W * i + FONT_RECT_W, FONT_RECT_H), 
				color, 0, cc.color(255, 255, 255, 0));

			var label = cc.LabelTTF.create(this._word[i], "FiraCode-Regular",
				FONT_SIZE, cc.size(FONT_RECT_W, FONT_SIZE), cc.TEXT_ALIGNMENT_CENTER);
			label.setAnchorPoint(cc.p(0.0, 0.0));
			label.setPositionX(FONT_RECT_W * i);
			this.addChild(label, 1);
		}
	}
});

/*
// MyDrawRect
var MyDrawRect = cc.DrawNode.extend({
	ctor: function(){
		this._super();
		console.log("MyDrawDot");
		this.drawRect(
			cc.p(0.0, 0.0), cc.p(50.0, 50.0), 
			null, 1, cc.color(100, 33, 33, 255));
	}
});

// MyStair
var MyStair = cc.DrawNode.extend({
	ctor: function(x, y, width, height, num){
		this._super();
		console.log("MyDrawNode");
		this.x      = x;
		this.y      = y;
		this.width  = width;
		this.height = height;
		this.num    = num;
		this.setPosition(x, y);
		// Label
		this.label = new cc.LabelBMFont(
				num, "res/MisakiGothic_42.fnt", 168, cc.TEXT_ALIGNMENT_LEFT);
		this.label.setAnchorPoint(cc.p(0.5, 0.0));
		this.label.setPositionX(width * 0.5);
		this.label.setPositionY(0);
		this.addChild(this.label, 1);
		// Color
		this.setup(cc.color(33, 33, 33, 255));
	},
	setNum: function(num){
		this.num = num;
		if(num != null) this.label.setString(num);
	},
	getNum: function(){
		return this.num;
	},
	setup: function(color){
		this.color = color;
		this.clear();
		this.drawRect(
			cc.p(0, 0), cc.p(this.width, -this.height),
			color, 1, color);
		this.drawDot(
			cc.p(0, 0), 3, color);
	}
});

// MyFrog
var MyFrog = cc.DrawNode.extend({
	ctor: function(x, y, width, height){
		this._super();
		console.log("MyDrawNode");
		this.x       = x;
		this.y       = y;
		this.width   = width;
		this.height  = height;

		this.dX      = 0.0;
		this.dY      = 0.0;
		this.gY      = -1;// Gravity(y)
		this.jX      = 3; // Jump(x)
		this.jY      = 16;// Jump(y)
		this.sX      = 2; // Step(x)
		this.sY      = 8; // Step(y)

		this.lX      = x;  // Land(center)
		this.lY      = y;
		this.lXprev  = x - stairWidth;
		this.lYprev  = y;
		this.lXnext  = x + stairWidth;
		this.lYnext  = y;
		this.jumpFlg = false;

		// Controller
		this.aiCounter = 0;

		var r = Math.floor(Math.random() * 155);
		var g = Math.floor(Math.random() * 155);
		var b = Math.floor(Math.random() * 155);
		var color = cc.color(r+100, g+100, b+100);

		this.setPosition(x, y);
		this.drawRect(
			cc.p(-width*0.5, 0), cc.p(width*0.5, height),
			color, 1, color);
		this.drawDot(
			cc.p(0, 0), 2, cc.color(50, 100, 50, 255));

		// Sprite
		var bSprite = cc.Sprite.create("res/b_red.png");
		bSprite.setAnchorPoint(cc.p(0.5, 0.0));
		this.addChild(bSprite);
	},
	setDX(dX){
		this.dX = dX;
	},
	setDY(dY){
		this.dY = dY;
	},
	setJY(jY){
		this.jY = jY;
	},
	setLPoint(lX, lY, lXprev, lYprev, lXnext, lYnext){
		this.lX     = lX;
		this.lY     = lY;
		this.lXprev = lXprev;
		this.lYprev = lYprev;
		this.lXnext = lXnext;
		this.lYnext = lYnext;
	},
	jump(){
		if(this.jumpFlg == true) return;
		this.jumpFlg = true;
		this.dY = this.jY;
		this.lY = this.y;
	},
	jumpLeft(){
		if(this.jumpFlg == true) return false;
		this.jumpFlg = true;
		this.dX = this.jX * -1.0;
		this.dY = this.jY;
		this.lY = this.y;
		return true;
	},
	jumpRight(){
		if(this.jumpFlg == true) return false;
		this.jumpFlg = true;
		this.dX = this.jX;
		this.dY = this.jY;
		this.lY = this.y;
		return true;
	},
	stepLeft(){
		if(this.jumpFlg == true) return false;
		this.jumpFlg = true;
		this.dX = this.sX * -1.0;
		this.dY = this.sY;
		this.lY = this.y;
		return true;
	},
	stepRight(){
		if(this.jumpFlg == true) return false;
		this.jumpFlg = true;
		this.dX = this.sX;
		this.dY = this.sY;
		this.lY = this.y;
		return true;
	},
	aiAction(){
		if(this.jumpFlg == true) return false;
		if(0 < this.aiCounter){
			this.aiCounter--;
			this.aiJumpLeft();
		}else{
			this.aiCounter = 0;
			this.aiJumpRight();
		}
	},
	aiJumpLeft(){
		if(this.jumpFlg == true) return false;
		this.jumpFlg = true;
		this.dX = this.sX * Math.random() * -1.0;
		this.dY = this.sY;
		this.lY = this.y;
		return true;
	},
	aiJumpRight(){
		if(this.jumpFlg == true) return false;
		this.jumpFlg = true;
		this.dX = this.jX * Math.random() * 1.0;
		this.dY = this.jY;
		this.lY = this.y;
		return true;
	},
	update(dt){
		// Fall
		if(this.lY < this.y){
			this.jumpFlg = true;
		}
		// Land or Wall
		if(this.y < this.lY){
			if(this.jumpFlg == true){
				if(this.dY < 0){
					if(this.lY + this.dY <= this.y + this.height){
						// you land on wall
						this.y = this.lY;
						this.jumpFlg = false;
						this.dX = 0.0;
						this.dY = 0.0;
					}else{
						// you hit by wall
						this.bounceWall();
						this.jumpFlg = false;
						this.dY = 0.0;
						//soundPlay(soundDamage);
						if(this.dX < 0) this.aiCounter += 1;// Ai
					}
				}else{
					// you hit by wall
					this.bounceWall();
					this.jumpFlg = false;
					this.dY = 0.0;
					//soundPlay(soundDamage);
					if(this.dX < 0) this.aiCounter += 1;// Ai
				}
			}else{
				// you hit by wall
				this.offsetWall();
				//soundPlay(soundDamage);
				if(this.dX < 0) this.aiCounter += 2;// Ai
			}
		}
		// Move
		if(this.jumpFlg == true){
			this.dY += this.gY;
			this.x  += this.dX;
			this.y  += this.dY;
		}else{
			this.dX = 0.0;
			this.dY = 0.0;
		}
		// Move
		if(this.x < wSize.width * 0.0){
			this.x = wSize.width * 1.0;
			this.y = wSize.height * 0.9;
		}
		if(wSize.width * 1.0 < this.x){
			this.x = wSize.width * 0.0;
			this.y = wSize.height * 0.9;
		}
		if(this.y < wSize.height * 0.1){
			this.x = wSize.width * 0.5;
			this.y = wSize.height * 1.0;
		}
		// Position
		this.setPositionX(this.x);
		this.setPositionY(this.y);
	},
	bounceWall(){
		if(0 <= this.dX){
			this.x  -= this.dX + this.width;
			this.dX = -this.jX;
		}else{
			this.x  += this.dX + this.width;
			this.dX = +this.jX;
		}
	},
	offsetWall(){
		if(this.x <= this.lX + stairWidth*0.5){
			this.x = this.lX - stairSpeed - this.width*0.5;
			this.y = this.lYprev;
			this.stepLeft();
		}else{
			this.x = this.lX + stairWidth;
			this.y = this.lYnext;
			this.stepRight();
		}
	}
});

//==========
// Untility
function getPrimes(num){
	var primes = [2, 3];
	for(var i=5; i<num; i+=2){
		var flg = false;
		for(var j=0; primes[j]*primes[j]<=i; j++){
			if(i % primes[j] == 0){
				flg = true;
				break;
			}
		}
		if(flg == false) primes.push(i);
	}
	return primes;
}
*/