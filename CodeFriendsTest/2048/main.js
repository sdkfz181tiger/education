var assets = [
	"images/title.png",
	"images/2048.png"
];

function gameStart(){
	var scene = new Scene();
	core.replaceScene(scene); core.resume();

	//==========
	// ここから
	//==========
	
	scene.backgroundColor = "darkblue";

	let my2048 = new Smz2048();
	my2048.randomPut(2);
	my2048.randomPut(2);
	my2048.checkBoard();

	scene.on(Event.LEFT_BUTTON_DOWN, ()=>{
		if(!my2048.slideLeft()) return;
		my2048.randomPut();
		my2048.checkBoard();
		if(my2048.checkGameOver()){
			console.log("=GAME OVER=");
			console.log("SCORE:", my2048.getScore());
		}
		removeCells();
		refleshCells();
	});

	scene.on(Event.RIGHT_BUTTON_DOWN, ()=>{
		if(!my2048.slideRight()) return;
		my2048.randomPut();
		my2048.checkBoard();
		if(my2048.checkGameOver()){
			console.log("=GAME OVER=");
			console.log("SCORE:", my2048.getScore());
		}
		removeCells();
		refleshCells();
	});

	scene.on(Event.UP_BUTTON_DOWN, ()=>{
		if(!my2048.slideUp()) return;
		my2048.randomPut();
		my2048.checkBoard();
		if(my2048.checkGameOver()){
			console.log("=GAME OVER=");
			console.log("SCORE:", my2048.getScore());
		}
		removeCells();
		refleshCells();
	});

	scene.on(Event.DOWN_BUTTON_DOWN, ()=>{
		if(!my2048.slideDown()) return;
		my2048.randomPut();
		my2048.checkBoard();
		if(my2048.checkGameOver()){
			console.log("=GAME OVER=");
			console.log("SCORE:", my2048.getScore());
		}
		removeCells();
		refleshCells();
	});

	// セルグループ
	var cellGroup = new Group();
	scene.addChild(cellGroup);

	refleshCells();

	function refleshCells(){
		var board = my2048.getBoard();
		var size = my2048.getSize();
		var p = 64;
		for(var r=0; r<size; r++){
			for(var c=0; c<size; c++){
				var x = p * c;
				var y = p * r;
				var n = board[r][c];
				var frame = (n<=0) ? 0 : Math.log2(n);
				var cell = new Sprite(64, 64);
				cell.image = core.assets["images/2048.png"];
				cell.frame = frame;
				cell.x = x;
				cell.y = y;
				cellGroup.addChild(cell);
			}
		}
	}

	function removeCells(){
		var board = my2048.getBoard();
		var size = my2048.getSize();
		for(var i=size-1; 0<i; i--){
			cellGroup.childNodes[i].remove();
		}
	}
	
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
	core = gameManager.createCore(256, 256);
	core.preload(assets);
	core.onload = function(){gameStart();};
	core.start();
};