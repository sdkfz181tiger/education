console.log("Hello p5.js!!");

// 初期化
function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(0);
	fill(0, 0, 0);
	
	noLoop();
	noStroke();// No stroke

	// Test
	let myShop = new MyShop("お店");
	console.log(myShop.constructor.name + ":" + myShop.shopName);

	let sobaShop = new SobaShop("蕎麦屋");
	console.log(sobaShop.constructor.name + ":" + sobaShop.shopName);
}

// 連続処理
function draw(){
	console.log("draw");
}

// クラス
class MyShop{

	constructor(shopName){
		this._shopName = shopName;
	}

	doSomething(){
		console.log("MyShop does something!!");
	}

	set shopName(value){
		this._shopName = value;
	}

	get shopName(){
		return this._shopName;
	}
}

class SobaShop extends MyShop{

	constructor(shopName){
		super(shopName);
	}
}