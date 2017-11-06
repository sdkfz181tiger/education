console.log("Hello Enchant.js!!");

enchant();
var game = new Core(320, 320); // game stage
game.preload("assets/t_daruma.png"); // preload image
game.fps = 20;

game.onload = function(){
	var scene = new Scene();
	scene.backgroundColor = "darkgray";
    game.replaceScene(scene);

	var sprite = new Sprite(32, 32);
	sprite.image = game.assets["assets/t_daruma.png"];
	scene.addChild(sprite);

	sprite.tl.addEventListener(Event.ACTION_ADDED, function(){
		//console.log("ACTION_ADDED!!");
	});

	var btnA = new Sprite(32, 32);
	btnA.image = game.assets["assets/t_daruma.png"];
	btnA.x = 0;
	btnA.y = 200;
	scene.addChild(btnA);

	btnA.addEventListener(Event.TOUCH_START, function(){
		console.log("Timeline!!");
		console.log(sprite.tl.queue);
	});

	var btnB = new Sprite(32, 32);
	btnB.image = game.assets["assets/t_daruma.png"];
	btnB.x = 60;
	btnB.y = 200;
	scene.addChild(btnB);

	btnB.addEventListener(Event.TOUCH_START, function(){
		console.log("push!!");
		sprite.tl
			.scaleTo(0.1, 0.1, 8)
			.scaleTo(1.0, 1.0, 8);
	});

	var btnC = new Sprite(32, 32);
	btnC.image = game.assets["assets/t_daruma.png"];
	btnC.x = scene.width - 120;
	btnC.y = 200;
	scene.addChild(btnC);

	btnC.addEventListener(Event.TOUCH_START, function(){
		console.log("Pause!!");
		sprite.tl
			.pause();
	});

	var btnD = new Sprite(32, 32);
	btnD.image = game.assets["assets/t_daruma.png"];
	btnD.x = scene.width - 60;
	btnD.y = 200;
	scene.addChild(btnD);

	btnD.addEventListener(Event.TOUCH_START, function(){
		console.log("Resume!!");
		sprite.tl
			.resume();
	});

	var btnE = new Sprite(32, 32);
	btnE.image = game.assets["assets/t_daruma.png"];
	btnE.x = 0;
	btnE.y = 260;
	scene.addChild(btnE);

	btnE.addEventListener(Event.TOUCH_START, function(){
		console.log("Interecept!!");
		test();
	});

	function intercept(){
		console.log("Interecept!!");

		var length = sprite.tl.queue.length;
		var slice = sprite.tl.queue.slice((length-1) * -1);

		sprite.tl.scaleTo(0.1, 0.1, 8);
		sprite.tl.scaleTo(1.2, 1.2, 8);
		sprite.tl.scaleTo(1.0, 1.0, 2);

		var lengthAfter = sprite.tl.queue.length - length;
		var sliceAfter = sprite.tl.queue.slice(lengthAfter * -1);
		console.log(sliceAfter);

		if(1 < length){
			sprite.tl.clear();
			for(var i=0; i<sliceAfter.length; i++) sprite.tl.add(sliceAfter[i]);
			for(var i=0; i<slice.length; i++) sprite.tl.add(slice[i]);
		}
	}

	function test(){
		console.log("test");

		sprite.tl.moveBy(290, 0, 20);
		sprite.tl.moveBy(-200, 0, 20);
		// Then / If
		sprite.tl.then(function(){
			if(sprite.x < scene.width*0.5){
				var length = sprite.tl.queue.length;
				var slice = sprite.tl.queue.slice((length-1) * -1);

				sprite.tl.delay(0);// Dummy
				sprite.tl.scaleTo(0.1, 0.1, 8);
				sprite.tl.scaleTo(1.2, 1.2, 8);
				sprite.tl.scaleTo(1.0, 1.0, 2);

				var lengthAfter = sprite.tl.queue.length - length;
				var sliceAfter = sprite.tl.queue.slice(lengthAfter * -1);
				console.log(sliceAfter);

				if(1 < length){// Swap
					sprite.tl.clear();
					for(var i=0; i<sliceAfter.length; i++) sprite.tl.add(sliceAfter[i]);
					for(var i=0; i<slice.length; i++) sprite.tl.add(slice[i]);
				}
			}
		});
		sprite.tl.moveBy(100, 100, 9);
		sprite.tl.moveBy(-100, -100, 9);
		sprite.tl.moveBy(100, 100, 9);
		sprite.tl.moveBy(-100, -100, 9);
		sprite.tl.moveTo(0, 0, 8);
	}
};

game.start();