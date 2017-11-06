/*==========
 ShimejiOzaki
 ==========*/

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
	playerSprite:null,

	ctor:function(){
		this._super();

		// Self
		self = this;
		
		// ディスプレイサイズ
		dispSize = cc.director.getWinSize();

		// 背景
		var backSprite = new cc.Sprite("res/hat_back_base.png");
		backSprite.setAnchorPoint(cc.p(0.0, 0.0));
		backSprite.setPosition(cc.p(0.0, 0.0));
		this.addChild(backSprite);

		// プレイヤー
		playerSprite = new PlayerSprite("res/hat_tanu_base.png");
		playerSprite.setAnchorPoint(cc.p(0.5, 0.5));
		playerSprite.setPosition(cc.p(
			dispSize.width * 0.5, dispSize.height * 0.2));
		backSprite.addChild(playerSprite);

		// タッチイベント
		cc.eventManager.addListener({
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			onTouchBegan:function(touch, event){
				//cc.log("onTouchBegan");

				var touchX = touch.getLocationX();
				if(touchX < dispSize.width * 0.5){
					var actionBy = cc.MoveBy.create(0.5, cc.p(-32.0, 0.0));
					playerSprite.runAction(actionBy);
				}else{
					var actionBy = cc.MoveBy.create(0.5, cc.p(+32.0, 0.0));
					playerSprite.runAction(actionBy);
				}

				return true;
			}
		}, this);

		return true;
	}
});

// プレイヤークラス
var PlayerSprite = cc.Sprite.extend({

	animationWalk:null,

	ctor:function(fileName, rect, rotated){
		this._super(fileName, rect, rotated);

		// Animation
		animationWalk = createAnimation(
			"res/hat_tanu_walk.png", 0, 3, 32, 32);
		var repeatForever = cc.repeatForever(
			cc.sequence(cc.Animate.create(animationWalk)));
		this.runAction(repeatForever);
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
	var animation = cc.Animation.create(animFrames, 0.3);
	return animation;
}