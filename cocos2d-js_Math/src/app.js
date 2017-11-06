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
	enemySprite:null,
	tSpriteA:null,
	tSpriteB:null,
	tSpriteC:null,

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

		// エネミー
		enemySprite = new EnemySprite("res/hat_ume_base.png");
		enemySprite.setAnchorPoint(cc.p(0.5, 0.5));
		enemySprite.setPosition(cc.p(
			dispSize.width * 0.5, dispSize.height * 0.5));
		backSprite.addChild(enemySprite);

		// トライアングル
		tSpriteA = new EnemySprite("res/hat_ume_base.png");
		tSpriteA.setAnchorPoint(cc.p(0.5, 0.5));
		tSpriteA.setPosition(cc.p(
			dispSize.width * 0.5, dispSize.height * 0.5 + 50));
		backSprite.addChild(tSpriteA);

		tSpriteB = new EnemySprite("res/hat_ume_base.png");
		tSpriteB.setAnchorPoint(cc.p(0.5, 0.5));
		tSpriteB.setPosition(cc.p(
			dispSize.width * 0.5 - 50, dispSize.height * 0.5 - 50));
		backSprite.addChild(tSpriteB);

		tSpriteC = new EnemySprite("res/hat_ume_base.png");
		tSpriteC.setAnchorPoint(cc.p(0.5, 0.5));
		tSpriteC.setPosition(cc.p(
			dispSize.width * 0.5 + 50, dispSize.height * 0.5 - 50));
		backSprite.addChild(tSpriteC);

		// タッチイベント
		cc.eventManager.addListener({
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			onTouchBegan:function(touch, event){
				//cc.log("onTouchBegan");

				// var touchX = touch.getLocationX();
				// if(touchX < dispSize.width * 0.5){
				// 	var actionBy = cc.MoveBy.create(0.5, cc.p(-32.0, 0.0));
				// 	playerSprite.runAction(actionBy);
				// }else{
				// 	var actionBy = cc.MoveBy.create(0.5, cc.p(+32.0, 0.0));
				// 	playerSprite.runAction(actionBy);
				// }

				// Test(Vector2d)
				var enemyX = enemySprite.getPositionX();
				var enemyY = enemySprite.getPositionY();
				var touchX = touch.getLocationX();
				var touchY = touch.getLocationY();
				var judgeFlg = judgeInsight(
						180, 30, enemyX, enemyY, touchX, touchY);
				console.log("judgeFlg:" + judgeFlg);

				// Test(Matrix3x3)
				var a = createMatrix3x3();
				a[0][0] = 1; a[0][1] = 2; a[0][2] = 3;
				a[1][0] = 4; a[1][1] = 5; a[1][2] = 6;
				a[2][0] = 7; a[2][1] = 8; a[2][2] = 9;
				var b = createMatrix3x3();
				b[0][0] = 1; b[0][1] = 2; b[0][2] = 3;
				b[1][0] = 4; b[1][1] = 5; b[1][2] = 6;
				b[2][0] = 7; b[2][1] = 8; b[2][2] = 9;

				var c = scaleMatrix3x3(a, 2);
				printMatrix3x3(c);

				var d = translateMatrix2d(100, 200, 50, 60);
				console.log(d);

				console.log("tSpriteA:" + tSpriteA.getPositionX());

				// 1, Center of display
				var centerX = dispSize.width * 0.5;
				var centerY = dispSize.height * 0.5;

				// 2, Create matrix
				var matrix1 = createTranslateMatrix3x3(-centerX, -centerY);// 原点に戻す
				var matrix2 = createRotateMatrix3x3(45);// 回転する
				var matrix3 = createTranslateMatrix3x3(centerX, centerY);// 元に戻す
				var step = multiMatrix3x3(matrix3, matrix2);
				step = multiMatrix3x3(step, matrix1);

				// 3, Use
				var resultA = multiMatrix3x1(step,
						[tSpriteA.getPositionX(), tSpriteA.getPositionY(), 1]);
				tSpriteA.setPositionX(Math.floor(resultA[0]));
				tSpriteA.setPositionY(Math.floor(resultA[1]));

				var resultB = multiMatrix3x1(step,
						[tSpriteB.getPositionX(), tSpriteB.getPositionY(), 1]);
				tSpriteB.setPositionX(Math.floor(resultB[0]));
				tSpriteB.setPositionY(Math.floor(resultB[1]));

				var resultC = multiMatrix3x1(step,
						[tSpriteC.getPositionX(), tSpriteC.getPositionY(), 1]);
				tSpriteC.setPositionX(Math.floor(resultC[0]));
				tSpriteC.setPositionY(Math.floor(resultC[1]));

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

var EnemySprite = cc.Sprite.extend({

	animationRoll:null,

	ctor:function(fileName, rect, rotated){
		this._super(fileName, rect, rotated);

		// Animation
		animationRoll = createAnimation(
			"res/hat_ume_roll.png", 0, 3, 32, 32);
		var repeatForever = cc.repeatForever(
			cc.sequence(cc.Animate.create(animationRoll)));
		//this.runAction(repeatForever);
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

//==========
// Utility

//==========
// Utility(Matrix3x3)

/*
* // 1, Center of display
* var centerX = dispSize.width * 0.5;
* var centerY = dispSize.height * 0.5;

* // 2, Create matrix
* var matrix1 = createTranslateMatrix3x3(-centerX, -centerY);// 原点に戻す
* var matrix2 = createRotateMatrix3x3(45);// 回転する
* var matrix3 = createTranslateMatrix3x3(centerX, centerY);// 元に戻す
* var step = multiMatrix3x3(matrix3, matrix2);
* step = multiMatrix3x3(step, matrix1);

* // 3, Use
* var resultA = multiMatrix3x1(step,
*		[tSpriteA.getPositionX(), tSpriteA.getPositionY(), 1]);
* tSpriteA.setPositionX(Math.floor(resultA[0]));
* tSpriteA.setPositionY(Math.floor(resultA[1]));
*/

function createMatrix3x3(){
	var matrix = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]];
	return matrix;
}

function createMatrix3x1(){
	var matrix = [0, 0, 0];
	return matrix;
}

function printMatrix3x3(a){
	console.log("printMatrix3x3");
	for(var r=0; r<3; r++){
		var str = "[";
		for(var c=0; c<3; c++){
			var num = a[r][c];
			if(num < 10){
				str += "  ";
			}else if(num < 100){
				str += " ";
			}
			str += " " + a[r][c];
		}
		str += "]";
		console.log(str);
	}
}

function addMatrix3x3(a, b){
	var temp = createMatrix3x3();
	for(var r=0; r<3; r++){
		for(var c=0; c<3; c++){
			temp[r][c] = a[r][c] + b[r][c];
		}
	}
	return temp;
}

function subMatrix3x3(a, b){
	var temp = createMatrix3x3();
	for(var r=0; r<3; r++){
		for(var c=0; c<3; c++){
			temp[r][c] = a[r][c] - b[r][c];
		}
	}
	return temp;
}

function scaleMatrix3x3(a, scale){
	var temp = createMatrix3x3();
	for(var r=0; r<3; r++){
		for(var c=0; c<3; c++){
			temp[r][c] = a[r][c] * scale;
		}
	}
	return temp;
}

function multiMatrix3x3(a, b){
	var temp = createMatrix3x3();
	for(var r=0; r<3; r++){
		for(var c=0; c<3; c++){
			for(var i=0; i<3; i++){
				temp[r][c] += a[r][i] * b[i][c];
			}
		}
	}
	return temp;
}

function multiMatrix3x1(a, b){
	var temp = [0, 0, 0];
	for(var r=0; r<3; r++){
		for(var c=0; c<3; c++){
			temp[r] += a[r][c] * b[c];
		}
	}
	return temp;
}

function translateMatrix2d(x, y, dx, dy){
	var temp = [x, y, 1];
	var trans = createTranslateMatrix3x3(dx, dy);
	return multiMatrix3x1(trans, temp);
}

function scaleMatrix2d(x, y, sx, sy){
	var temp = [x, y, 1];
	var scale = createScaleMatrix3x3(sx, sy);
	return multiMatrix3x1(scale, temp);
}

function rotateMatrix2d(x, y, deg){
	var temp = [x, y, 1];
	var rotate = createRotateMatrix3x3(deg);
	return multiMatrix3x1(rotate, temp);
}

function createTranslateMatrix3x3(dx, dy){
	var trans = createMatrix3x3();
	trans[0][0] = 1; trans[1][1] = 1; trans[2][2] = 1;
	trans[0][2] = dx; trans[1][2] = dy;
	return trans;
}

function createScaleMatrix3x3(sx, sy){
	var scale = createMatrix3x3();
	scale[0][0] = sx; scale[1][1] = sy; scale[2][2] = 1;
	return scale;
}

function createRotateMatrix3x3(deg){
	var rotate = createMatrix3x3();
	var rad = DEG_TO_RAD * deg;
	rotate[0][0] = Math.cos(rad); rotate[1][1] = Math.cos(rad);
	rotate[0][1] = Math.sin(rad) * -1; rotate[1][0] = Math.sin(rad);
	rotate[2][2] = 1;
	return rotate;
}

//==========
// Utility(Vector2d)
const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

function createVector2d(){
	return {x:0, y:0};
}

/**
 * @fn
 *  Judging target in sight of camera or not
 * @param (cameraDeg) Center sight
 * @param (cameraWidth) Width of sight (left and right)
 * @param (cameraX, cameraY) Position of camera
 * @param (targetX, targetY) Position of target
 * @return true or false
 */
function judgeInsight(
	cameraDeg, cameraWidth, cameraX, cameraY,
	targetX, targetY){

	var cameraRad = cameraDeg * DEG_TO_RAD;
	var cameraVec = createVector2d();
	cameraVec.x  = Math.cos(cameraRad);
	cameraVec.y  = Math.sin(cameraRad);

	var targetRad = Math.atan2(
		targetY - cameraY, targetX - cameraX);
	var targetVec = createVector2d();
	targetVec.x  = Math.cos(targetRad);
	targetVec.y  = Math.sin(targetRad);

	var dotProduct = 
		cameraVec.x * targetVec.x + cameraVec.y * targetVec.y;
	if(dotProduct < 0) return false;

	var cameraDist = Math.sqrt(
		cameraVec.x * cameraVec.x + cameraVec.y * cameraVec.y);
	var targetDist = Math.sqrt(
		targetVec.x * targetVec.x + targetVec.y * targetVec.y);

	var sightRad = dotProduct / (cameraDist * targetDist);
	var sightDeg = Math.acos(sightRad) * RAD_TO_DEG;
	if(sightDeg <= cameraWidth) return true;
	return false;
}

/*
class Vector2d{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
}
*/


