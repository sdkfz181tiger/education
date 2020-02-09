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
	
	scene.backgroundColor = "gray";

	let my2048 = new Smz2048();
	my2048.randomPut(2);
	my2048.randomPut(2);
	my2048.consoleBoard();

	scene.on(Event.LEFT_BUTTON_DOWN, ()=>{
		if(!my2048.slideLeft()) return;
		nextCells();
	});

	scene.on(Event.RIGHT_BUTTON_DOWN, ()=>{
		if(!my2048.slideRight()) return;
		nextCells();
	});

	scene.on(Event.UP_BUTTON_DOWN, ()=>{
		if(!my2048.slideUp()) return;
		nextCells();
	});

	scene.on(Event.DOWN_BUTTON_DOWN, ()=>{
		if(!my2048.slideDown()) return;
		nextCells();
	});

	// ラベル  
    var scLabel = new Label();
    scLabel.width = 256;
    scLabel.x = 0;
    scLabel.y = 24;
    scLabel.color = "white";
    scLabel.textAlign = "center";
    scLabel.text = "SCORE:" + my2048.getScore();
    scene.addChild(scLabel);

	// セルグループ
	var cellGroup = new Group();
	scene.addChild(cellGroup);

	refleshCells();

	function nextCells(){
		my2048.randomPut();
		my2048.consoleBoard();
		removeCells();
		refleshCells();
		if(my2048.checkGameOver()){
			gameOver();
		}
	}

	function refleshCells(){
		var board = my2048.getBoard();
		var size = my2048.getSize();
		var p = 64;
		for(var r=0; r<size; r++){
			for(var c=0; c<size; c++){
				var x = p * c;
				var y = p * r + 64;
				var n = board[r][c];
				var frame = (n<=0) ? 0 : Math.log2(n);
				var cell = new Sprite(64, 64);
				cell.image = core.assets["images/2048.png"];
				cell.frame = frame;
				cell.x = x;
				cell.y = y;
				cell.r = r;
				cell.c = c;
				cell.opacity = 0;
				cellGroup.addChild(cell);
				cell.tl.delay(2);
				cell.tl.then(function(){
					this.opacity = 1;
				});
			}
		}
		// ラベル
		scLabel.text = "SCORE:" + my2048.getScore();
	}

	function removeCells(){
		var size = cellGroup.childNodes.length;
		for(var i=size-1; 0<=i; i--){
			let cell = cellGroup.childNodes[i];
			let dist = cell.width;
			let move = my2048.getMove(cell.r, cell.c);
			if(move != null){
				cell.tl.moveBy(dist*move.gC, dist*move.gR, 2);
			}
			cell.tl.then(function(){
				this.remove();
			});
		}
	}

	function gameOver(){
		console.log("=GAME OVER=");
		console.log("SCORE:", my2048.getScore());
		scene.backgroundColor = "darkred";
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
	core = gameManager.createCore(256, 320);
	core.preload(assets);
	core.onload = function(){gameStart();};
	core.start();
};