/*==========
 Ch02-012:
 当たり判定の再調整(RectとPoint)
 ==========*/

var levelIndex = 0;
var levelArray = [
	[2.0,  30],[2.0,  60],[2.0,  90],[2.0, 120],[2.0, 150],
	[2.0, 180],[2.0, 210],[2.0, 240],[2.0, 270],[2.0, 300],
	[1.0,  30],[1.0,  60],[1.0,  90],[1.0, 120],[1.0, 150],
	[1.0, 180],[1.0, 210],[1.0, 240],[1.0, 270],[1.0, 300]
]; 

// シーン
var HelloWorldScene = cc.Scene.extend({

	onEnter:function(){
		this._super();
		var layer = new HelloWorldLayer();
		this.addChild(layer);
	}
});

// レイヤー
var HelloWorldLayer = cc.Layer.extend({
	
	self:null,
	dispSize:null,
	backSprite:null,
	playerSprite:null,
	spikeArray:null,
	spikePaddingY:null,
	spikeOffsetY:null,
	spikePosY:null,
	gameoverSprite:null,
	scoreSprite:null,

	ctor:function(){
		this._super();

		// Self
		self = this;
		
		// ディスプレイサイズ
		dispSize = cc.director.getWinSize();

		// 背景
		backSprite = new BackgroundNode(["res/background_640x960_0.png",
										"res/background_640x960_1.png",
										"res/background_640x960_2.png",
										"res/background_640x960_3.png"]);
		backSprite.setAnchorPoint(cc.p(0.5, 0.0));
		backSprite.setPosition(cc.p(0.0, 0.0));
		this.addChild(backSprite);
		
		// プレイヤー
		playerSprite = new PlayerSprite("res/main_player.png");
		playerSprite.setAnchorPoint(cc.p(0.5, 0.5));
		playerSprite.setPosition(cc.p(
			dispSize.width * 0.5, dispSize.height * 0.2));
		playerSprite.land(dispSize.height * 0.2);
		backSprite.addChild(playerSprite);

		// 障害物
		spikeArray = new Array();
		spikePaddingY = 100;
		spikeOffsetY = playerSprite.y + spikePaddingY;// 障害物の発生箇所の調整
		spikePosY = 0.0;
		for(var i=0; i<15; i++){
			var spikeSprite = new SpikeSprite("res/main_spike.png");
			spikeSprite.setAnchorPoint(cc.p(0.5, 0.5));
			var x = dispSize.width * Math.random();
			var y = spikeOffsetY + spikePaddingY * i;
			if(spikePosY < y) spikePosY = y;
			spikeSprite.setPosition(cc.p(x, y));
			spikeSprite.slide(
				levelArray[levelIndex][0],
				levelArray[levelIndex][1]);
			if(levelIndex < levelArray.length-1){
				levelIndex++;
			}else{
				levelIndex = 0;
			}
			spikeArray.push(spikeSprite);
			backSprite.addChild(spikeSprite);
		}

		// ゲームオーバーアニメーション
		gameoverSprite = new GameOverSprite("res/title_gameover.png");
		gameoverSprite.setAnchorPoint(cc.p(0.5, 0.5));
		gameoverSprite.setPosition(cc.p(dispSize.width*0.5, dispSize.height*0.5));
		this.addChild(gameoverSprite);

		// スコア
		scoreSprite = new ScoreSprite("res/background_score.png");
		scoreSprite.setAnchorPoint(cc.p(1.0, 1.0));
		scoreSprite.setPosition(cc.p(
			dispSize.width-5.0, dispSize.height-5.0));
		scoreSprite.initScore(playerSprite.y);
		scoreSprite.setScore(playerSprite.y);
		this.addChild(scoreSprite);

		// タッチイベント
		cc.eventManager.addListener({
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			onTouchBegan:function(touch, event){
				//cc.log("onTouchBegan");
				var touchX = touch.getLocationX();
				if(touchX < dispSize.width / 2){
					playerSprite.jumpLeft();
				}else{
					playerSprite.jumpRight();
				}
				return true;
			},
			onTouchMoved:function(touch, event){
				//cc.log("onTouchMoved");
			},
			onTouchEnded:function(touch, event){
				//cc.log("onTouchEnded");
			}}, this);

		// スケジュール
		this.scheduleUpdate();

		return true;
	},
	update:function(dt){

		// 背景
		backSprite.update(playerSprite);

		// プレイヤーUpdate
		playerSprite.update(dt);

		// 障害物
		for(var i=0; i<spikeArray.length; i++){
			var spikeSprite = spikeArray[i];

			// 画面外判定
			if(spikeSprite.y < -backSprite.y){
				// 再配置
				var spikeSprite = spikeArray[i];
				var x = dispSize.width * Math.random();
				var y = spikePosY + spikePaddingY;
				spikePosY = y;
				spikeSprite.x = x;
				spikeSprite.y = y;
				spikeSprite.stop();
				spikeSprite.slide(
					levelArray[levelIndex][0],
					levelArray[levelIndex][1]);
				if(levelIndex < levelArray.length-1){
					levelIndex++;
				}else{
					levelIndex = 0;
				}
			}else{
				// 衝突判定
				if(playerSprite.collision(spikeSprite)){
					// ゲームオーバー
					self.gameOver();
				}
			}
		}

		// ゲームオーバー判定
		if(playerSprite.y < -backSprite.y){
			playerSprite.land(-backSprite.y);
			self.gameOver();
		}

		// スコアを更新
		scoreSprite.setScore(playerSprite.y);
	},
	gameOver:function(){
		cc.log("gameOver");
		cc.eventManager.removeListener(this);
		this.unscheduleUpdate();

		// プレイヤー
		playerSprite.die();

		// ゲームオーバー
		gameoverSprite.show(1.0, 50.0);
	}
});

// 背景クラス
var BackgroundNode = cc.Node.extend({

	fileNames:null,// 背景素材の名前
	bSprites:null, // 背景素材のスプライト
	borderY:null,  // 基準線

	ctor:function(fileNames){
		var self = this;
		cc.Node.prototype.ctor.call(self);
		
		this.fileNames = fileNames;
		bSprites = new Array();
		var basePosY = 0.0;
		for(var i=0; i<fileNames.length; i++){
			var bSprite = new cc.Sprite(fileNames[i]);
			bSprite.setAnchorPoint(cc.p(0.0, 0.0));
			bSprite.setPosition(cc.p(0.0, basePosY));
			basePosY += bSprite.getBoundingBox().height;
			bSprites.push(bSprite);
			this.addChild(bSprite);
		}
		
		// 基準線を決める
		borderY = bSprites[0].getBoundingBox().height * 0.7;
	},
	update:function(playerSprite){
	
		if(borderY < playerSprite.y){
			var disY = playerSprite.y - borderY;
			this.y -= disY; // ボジションを移動
			
			var indexFirst = bSprites.length-2;// 最後から2番目のスプライト
			var indexLast = bSprites.length-1; // 最後のスプライト
			for(var i=indexFirst; i<=indexLast; i++){
				
				if(this.y + bSprites[i].y + bSprites[i].getBoundingBox().height < 0){
					var indexTarget;
					if(i == indexFirst){
						indexTarget = indexLast;
					}else{
						indexTarget = i-1;
					}
					// ターゲットのスプライトの上へ移動
					bSprites[i].setPosition(cc.p(0.0,
						bSprites[indexTarget].y + bSprites[indexTarget].getBoundingBox().height));
				}
			}
			
			borderY += disY;// ボーダー基準を更新
		}
	}
});

// プレイヤークラス
var PlayerSprite = cc.Sprite.extend({

	jumpFlg:null,
	vX:null,
	vY:null,
	jumpX:null,
	jumpY:null,
	gravityY:null,

	animationStay:null,
	animationJump:null,
	animationDie:null,

	ctor:function(fileName, rect, rotated){
		this._super(fileName, rect, rotated);

		jumpFlg = false;
		vX = 0.0;
		vY = 0.0;
		jumpX = 120.0;
		jumpY = 240.0;
		gravityY = -9.8;

		// Animation
		animationStay = createAnimation(
			"res/main_player_stay.png", 0, 1, 100, 100);
		animationJump = createAnimation(
			"res/main_player_jump.png", 0, 2, 100, 100);
		animationDie = createAnimation(
			"res/main_player_die.png", 0, 1, 100, 100);
	},
	update:function(dt){

		this.x += vX * dt;
		this.y += vY * dt;
		if(jumpFlg == true){
			vY += gravityY;
		}
	},
	jumpLeft:function(){

		jumpFlg = true;
		vX = -jumpX;
		vY = +jumpY;
		// Animation
		playerSprite.stopAllActions();
		playerSprite.runAction(cc.Animate.create(animationJump));
		this.setFlippedX(false);
	},
	jumpRight:function(){

		jumpFlg = true;
		vX = +jumpX;
		vY = +jumpY;
		// Animation
		playerSprite.stopAllActions();
		playerSprite.runAction(cc.Animate.create(animationJump));
		this.setFlippedX(true);
	},
	land:function(groundY){

		jumpFlg = false;
		vX = 0.0;
		vY = 0.0;
		this.y = groundY;
		// Animation
		playerSprite.stopAllActions();
		var repeatForever = cc.repeatForever(
			cc.sequence(cc.Animate.create(animationStay)));
		playerSprite.runAction(repeatForever);
	},
	die:function(){

		// Animation
		playerSprite.stopAllActions();
		var repeatForever = cc.repeatForever(
			cc.sequence(cc.Animate.create(animationDie)));
		playerSprite.runAction(repeatForever);
	},
	collision:function(spike){
		if(cc.rectContainsPoint(
			spike.getBoundingBox(), this.getPosition())){
				return true;
			}
		return false;
	}
});

// 障害物クラス
var SpikeSprite = cc.Sprite.extend({

	slideFlg:null,

	ctor:function(fileName, rect, rotated){
		this._super(fileName, rect, rotated);

		slideFlg = false;
	},
	slide:function(time, width){
		if(slideFlg == true) return;
		slideFlg = true;
		var random = Math.random();
		if(random < 0.5) width *= -1.0;
		var mBy0 = cc.moveBy(time, cc.p(+width, 0.0));
		var mBy1 = cc.moveBy(time, cc.p(-width, 0.0));
		var mBy2 = cc.moveBy(time, cc.p(-width, 0.0));
		var mBy3 = cc.moveBy(time, cc.p(+width, 0.0));
		var seq = cc.sequence([mBy0, mBy1, mBy2, mBy3]);
		this.stopAllActions();
		this.runAction(cc.repeatForever(seq));
	},
	stop:function(){
		slideFlg = false;
		this.stopAllActions();
	}
});

//==========
// GameOverクラス
var GameOverSprite = cc.Sprite.extend({

	showFlg:null,

	ctor:function(fileName, rect, rotated){
		this._super(fileName, rect, rotated);

		showFlg = false;
		this.setVisible(showFlg);
	},
	show:function(time, distance){
		if(showFlg == true) return;
		showFlg = true;
		this.setVisible(showFlg);
		
		var jBy = cc.jumpBy(time, cc.p(0, 0), distance, 1);
		var dTime = cc.delayTime(1.0);
		var cFunc = cc.callFunc(this.hide, this);
		this.stopAllActions();
		this.runAction(cc.sequence(jBy, dTime, cFunc));
	},
	hide:function(){
		showFlg = false;
		this.setVisible(showFlg);
		this.stopAllActions();
	}
});

// スコアクラス
var ScoreSprite = cc.Sprite.extend({

	score:null,
	offset:null,
	unit:null,
	label:null,

	ctor:function(fileName, rect, rotated){
		this._super(fileName, rect, rotated);

		score  = 0;
		offset = 0;
		unit   = "m";
		label  = cc.LabelTTF.create(score + unit, "Arial", 40);
		label.setAnchorPoint(cc.p(1.0, 0.5));
		label.setPosition(cc.p(
			this.getBoundingBox().width - 5.0,
			this.getBoundingBox().height*0.5));
		this.addChild(label);
	},
	initScore:function(num){
		offset = num;
	},
	setScore:function(num){
		if(num - offset < score) return;
		score = Math.floor(num) - offset;
		label.setString(score + unit);
	},
	getScore:function(){
		return score;
	}
});

//==========
// アニメーション
function createAnimation(fileName, begin, end, width, height){
	var animFrames = new Array();
	for(var i=begin; i<=end; i++){
		var frame = cc.SpriteFrame.create(fileName,cc.rect(width*i,0,width,height));
		animFrames.push(frame);
	}
	var animation = cc.Animation.create(animFrames, 0.1);
	return animation;
}

