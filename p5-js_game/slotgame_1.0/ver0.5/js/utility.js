console.log("Hello utility.js!!");

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

// Card

class Card{

	constructor(x, y, w, h, num){
		this._x = x; this._y = y;
		this._w = w; this._h = h;
		this._speed = 0; 
		this._deg = 0; this._rad = 0;
		this._vX = 0; this._vY = 0;
		this._tX = 0; this._tY = 0;
		this._num  = num;
		this._bCol = [255, 255, 255];
		this._tCol = [33, 33, 33];
		this._tFlg = false;
	}

	draw(){
		this._x += this._vX; this._y += this._vY;
		if(this.aroundDestination()) this.stopMove();
		// Draw
		fill(this._bCol[0], this._bCol[1], this._bCol[2]);
		rect(this._x, this._y, this._w, this._h, 5);
		textAlign(CENTER);
		fill(this._tCol[0], this._tCol[1], this._tCol[2]);
		text(this._num, 
			this._x + this._w * 0.5, 
			this._y + this._h * 0.87);
	}

	setNumber(num){
		this._num = num;
	}

	getNumber(){
		return this._num;
	}

	setEnabled(){
		this._tFlg = true;
		this._bCol = [255, 255, 255];
		this._tCol = [33, 33, 33];
	}

	setDisabled(){
		this._tFlg = false;
		this._bCol = [66, 66, 66];
		this._tCol = [150, 150, 150];
	}

	setHighlight(){
		this._tFlg = true;
		this._bCol = [255, 150, 100];
		this._tCol = [33, 33, 33];
	}

	isInside(x, y){
		if(x < this._x) return false;
		if(y < this._y) return false;
		if(this._x + this._w < x) return false;
		if(this._y + this._h < y) return false;
		return true;
	}

	startMove(speed, tX, tY){
		this._speed = speed;
		this._tX = tX; this._tY = tY;
		let dX = tX - (this._x + this._w * 0.5);
		let dY = tY - (this._y + this._h * 0.5);
		this._rad = Math.atan2(dY, dX);
		this._deg = this._rad * RAD_TO_DEG;
		this._vX = this._speed * Math.cos(this._rad);
		this._vY = this._speed * Math.sin(this._rad);
	}

	stopMove(){
		this._vX = 0; this._vY = 0;
		this._speed = 0;
	}

	aroundDestination(){
		let dX = this._tX - (this._x + this._w * 0.5);
		let dY = this._tY - (this._y + this._h * 0.5);
		if(0 < this._vX && dX < 0) this._vX *= -0.5;
		if(this._vX < 0 && 0 < dX) this._vX *= -0.5;
		if(0 < this._vY && dY < 0) this._vY *= -0.5;
		if(this._vY < 0 && 0 < dY) this._vY *= -0.5;
		if(Math.abs(dX) < 5 && Math.abs(dY) < 5){
			this._x = this._tX - this._w * 0.5; 
			this._y = this._tY - this._h * 0.5;
			return true;
		}
		return false;
	}
}

// Eratosthenes

class Eratosthenes{

	constructor(min=2, max=100){
		if(min < 2)    min = 2;
		if(1000 < max) max = 1000;
		this._min    = min;
		this._max    = max;
		this._sqrt   = Math.sqrt(max);
		this._nums   = [];
		this._primes = [];
		this.setup();
	}

	setup(){
		// Numbers
		for(let n=this._min; n<this._max; n++){
			this._nums.push(n);
		}
		// Primes
		while(this._nums[0] < this._sqrt){
			// 先頭値を結果リストに追加
			this._primes.push(this._nums[0]);
			// 先頭値の倍数を元リストから削除
			for(let p=this._nums.length-1; 0<=p; p--){
				if(this._nums[p] % this._nums[0] == 0){
					this._nums.splice(p, 1);
				}
			}
		}
		// 残りの数値を結果リストに追加する
		this._primes = this._primes.concat(this._nums);
		console.log(this._primes);
	}

	getMin(){
		return this._min;
	}

	getMax(){
		return this._max;
	}

	getPrimes(){
		return this._primes;
	}

	isExists(num){
		if(num < this._min) return false;
		if(this._max < num) return false;
		for(let i=0; i<this._primes.length; i++){
			if(this._primes[i] == num) return true;
		}
		return false;
	}
}