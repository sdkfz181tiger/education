
// Test
let my2048 = new My2048();
my2048.randomPut();
my2048.randomPut();
my2048.checkBoard();

window.addEventListener("keydown", (event)=>{
	if(event.preventDefaulted) return;
	// Left
	if(event.code == "ArrowLeft"){
		if(!my2048.slideLeft()) return;
		my2048.randomPut();
		my2048.checkBoard();
		if(my2048.checkGameOver()) console.log("GAME OVER!!");
	}
	// Right
	if(event.code == "ArrowRight"){
		if(!my2048.slideRight()) return;
		my2048.randomPut();
		my2048.checkBoard();
		if(my2048.checkGameOver()) console.log("GAME OVER!!");
	}
	// Up
	if(event.code == "ArrowUp"){
		if(!my2048.slideUp()) return;
		my2048.randomPut();
		my2048.checkBoard();
		if(my2048.checkGameOver()) console.log("GAME OVER!!");
	}
	// Right
	if(event.code == "ArrowDown"){
		if(!my2048.slideDown()) return;
		my2048.randomPut();
		my2048.checkBoard();
		if(my2048.checkGameOver()) console.log("GAME OVER!!");
	}
});

/*
var assets = [
	"images/title.png",// タイトル
];

function gameStart(){
	var scene = new Scene();
	core.replaceScene(scene); core.resume();

	//==========
	// ここから
	//==========
	
	scene.backgroundColor = "darkblue";

	let my2048 = new My2048();
	my2048.randomPut();
	my2048.randomPut();
	my2048.checkBoard();

	scene.on(Event.LEFT_BUTTON_DOWN, ()=>{
		if(!my2048.slideLeft()) return;
		my2048.randomPut();
		my2048.checkBoard();
		if(my2048.checkGameOver()) console.log("GAME OVER!!");
	});

	scene.on(Event.RIGHT_BUTTON_DOWN, ()=>{
		if(!my2048.slideRight()) return;
		my2048.randomPut();
		my2048.checkBoard();
		if(my2048.checkGameOver()) console.log("GAME OVER!!");
	});

	scene.on(Event.UP_BUTTON_DOWN, ()=>{
		if(!my2048.slideUp()) return;
		my2048.randomPut();
		my2048.checkBoard();
		if(my2048.checkGameOver()) console.log("GAME OVER!!");
	});

	scene.on(Event.DOWN_BUTTON_DOWN, ()=>{
		if(!my2048.slideDown()) return;
		my2048.randomPut();
		my2048.checkBoard();
		if(my2048.checkGameOver()) console.log("GAME OVER!!");
	});
	
	//==========
	// ここまで
	//==========

};

function titleStart(){// タイトル画面
	var scene = gameManager.createTitleScene();
	core.replaceScene(scene); core.pause();
	scene.on(enchant.Event.TOUCH_START, function(){gameStart();});
}

//==========
//EnchantJS
enchant();
var gameManager;
var core;
var scene;
window.onload = function(){
	gameManager = new common.GameManager();
	core = gameManager.createCore(240, 240);
	core.preload(assets);
	core.onload = function(){gameStart();};
	core.start();
};
*/




