console.log("app.js");

const resources = [
	"res/HelloWorld.png", "res/t_tanu_32.png",
	"res/b_red.png", "res/b_green.png", "res/b_blue.png", "res/b_yellow.png",
	"res/MisakiGothic_42.fnt", "res/MisakiGothic_42.png"
];

// Main
window.onload = function(){
	cc.game.onStart = function(){
		// Load resources
		cc.LoaderScene.preload(resources, gameStart, this);
	};
	cc.game.run("gameCanvas");
};

var wSize        = null;

var stairWidth   = 0;
var stairHeight  = 0;
var stairPadding = 0;
var stairTotal   = 0;
var stairBaseX   = 0;
var stairBaseY   = 0;
var stairSpeed   = 0;

var stairLimit   = 0;
var stairCounter = 0;

var colorPrime;
var colorNormal;

var frogs;
var player;

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

			stairWidth   = 64;
			stairHeight  = wSize.height;
			stairPadding = 64;
			stairTotal   = Math.floor(wSize.width / stairWidth) + 2;
			stairBaseX   = 0;
			stairBaseY   = 32;
			stairSpeed   = 0.2;

			stairLimit   = 500 + 2;
			stairCounter = 0;

			colorPrime   = cc.color(64, 192, 64, 255);
			colorNormal  = cc.color(128, 128, 128, 255);

			// Create primes
			primes = getPrimes(stairLimit);
			console.log(primes);

			// Layer
			var cLayer = new cc.LayerColor(
				cc.color(33, 33, 33, 255),
				wSize.width, wSize.height);
			cLayer.ignoreAnchorPointForPosition(false);
			cLayer.x = wSize.width * 0.5;
			cLayer.y = wSize.height * 0.5;
			this.addChild(cLayer);

			// Create stairs
			stairs = new Array();
			stairBaseToggle = 1;
			for(var i=0; i<stairTotal; i++){
				var num = i + stairCounter;
				if(primes.includes(num)){
					stairBaseY += stairPadding;
				}
				var x = stairBaseX + stairWidth * i;
				var y = stairBaseY;
				var stair = new MyStair(
					x, y, stairWidth, stairHeight, num);
				// Color
				if(primes.includes(num)){
					stair.setup(colorPrime);
				}else{
					stair.setup(colorNormal);
				}
				stairs.push(stair);
				this.addChild(stair);
			}

			// Frogs
			frogs = new Array();
			for(var i=0; i<30; i++){
				var paddingX = wSize.width * 0.01;
				var posX = wSize.width*0.2 + paddingX*i;
				var posY = wSize.height * 0.9;
				var frog = new MyFrog(posX, posY, 16, 16);
				frog.jump();
				this.addChild(frog);
				frogs.push(frog);
			}

			// Player
			player = new MyFrog(posX, posY, 16, 16);
			player.jump();
			this.addChild(player);
			var tSprite = cc.Sprite.create("res/t_tanu_32.png");
			tSprite.setAnchorPoint(cc.p(0.5, 0.0));
			player.addChild(tSprite);

			// Schedule(Frogs)
			this.schedule(function(dt){
				for(var i=0; i<frogs.length; i++){
					frogs[i].aiAction();
				}
			}, 1.0);
			this.scheduleUpdate();

			// Event
			cc.eventManager.addListener({
				event:cc.EventListener.TOUCH_ONE_BY_ONE,
				onTouchBegan:function(touch, event){
					console.log("onTouchBegan");
					var touchX = touch.getLocationX();
					if(touchX < wSize.width * 0.5){
						player.stepLeft();
					}else{
						player.jumpRight();
					}
					return true;
				}
			}, this);
		},
		update: function(dt){
			//console.log("update:" + dt);

			// Stairs
			stairBaseX -= stairSpeed;
			if(stairBaseX <= -stairWidth){
				stairBaseX = 0;
				this.levelUp();
			}
			for(var i=0; i<stairs.length; i++){
				var offsetX = stairBaseX + stairWidth * i;
				var offsetY = stairs[i].getPositionY();
				stairs[i].setPosition(cc.p(offsetX, offsetY));
			}

			// Frogs
			for(var i=0; i<frogs.length; i++){
				var playerX = frogs[i].getPositionX() - stairBaseX;
				var index = Math.floor(playerX / stairWidth);
				var indexPrev = index - 1;
				var indexNext = index + 1;
				if(indexPrev < 0) indexPrev = 0;
				if(stairs.length <= indexNext) indexNext = stairs.length - 1;
				frogs[i].setLPoint(
					stairs[index].getPositionX(), stairs[index].getPositionY(),
					stairs[indexPrev].getPositionX(), stairs[indexPrev].getPositionY(),
					stairs[indexNext].getPositionX(), stairs[indexNext].getPositionY());
				frogs[i].update(dt);
			}

			// Player
			var playerX = player.getPositionX() - stairBaseX;
			var index = Math.floor(playerX / stairWidth);
			var indexPrev = index - 1;
			var indexNext = index + 1;
			if(indexPrev < 0) indexPrev = 0;
			if(stairs.length <= indexNext) indexNext = stairs.length - 1;
			player.setLPoint(
				stairs[index].getPositionX(), stairs[index].getPositionY(),
				stairs[indexPrev].getPositionX(), stairs[indexPrev].getPositionY(),
				stairs[indexNext].getPositionX(), stairs[indexNext].getPositionY());
			player.update(dt);
		},
		levelUp: function(){
			//console.log("levelUp!!");

			// Countup
			stairCounter++;

			// Stairs
			for(var i=0; i<stairs.length-1; i++){
				var offsetX = stairBaseX + stairWidth * i;
				var offsetY = stairs[i+1].getPositionY();
				var num = i + stairCounter;
				stairs[i].setPosition(cc.p(offsetX, offsetY));
				stairs[i].setNum(stairs[i+1].getNum());
				stairs[i].setup(stairs[i+1].color);
			}

			// Last stair
			var index = stairs.length - 1;
			var num = index + stairCounter;
			if(primes.includes(num)){
				stairBaseY += stairPadding * stairBaseToggle;
				if(stairBaseY < wSize.height * 0.1) stairBaseToggle = +1;// Go up
				if(wSize.height * 0.8 < stairBaseY) stairBaseToggle = -1;// Go down
			}
			var offsetX = stairBaseX + stairWidth * index;
			var offsetY = stairBaseY;

			// Color
			if(primes.includes(num)){
				stairs[index].setup(colorPrime);
				offsetY = stairPadding;
			}else{
				stairs[index].setup(colorNormal);
			}

			// Position
			stairs[index].setPosition(cc.p(offsetX, offsetY));
			stairs[index].setNum(num);

			// Unschedule
			if(stairLimit <= num){
				this.unscheduleUpdate();
			}
		}
	});
	var scene = new MyScene();
	cc.director.runScene(scene);
}

// MyDrawDot
var MyDrawDot = cc.DrawNode.extend({
	ctor: function(){
		this._super();
		console.log("MyDrawDot");
		this.drawDot(
			cc.p(0.0, 0.0), 50.0, 
			cc.color(200, 200, 200, 255));
	}
});

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