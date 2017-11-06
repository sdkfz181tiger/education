console.log("Hello p5.js!!");

class AnimA{

	constructor(){
		console.log(this.constructor.name);
		this._size = width;
		this._vol  = 0;
	}

	draw(){
		console.log("vol:" + analyzer.getLevel());
		background(200);
		fill(230, 100, 100);
		noStroke();
		this._vol = analyzer.getLevel();
		ellipse(width*0.5, height*0.5, 
			this._size * this._vol, this._size * this._vol);
	}
}