
// Surfaceについて
// http://wise9.github.io/enchant.js/doc/core/ja/symbols/enchant.Surface.html

let MINO_I = [
    [0, 1, 0, 0,
     0, 1, 0, 0,
     0, 1, 0, 0,
     0, 1, 0, 0],
    [0, 0, 0, 0,
     1, 1, 1, 1,
     0, 0, 0, 0,
     0, 0, 0, 0]
];

let MINO_O = [
    [0, 0, 0, 0,
     0, 4, 4, 0,
     0, 4, 4, 0,
     0, 0, 0, 0]
];

const MINOS  = [MINO_I, MINO_O];
const WIDTH  = 160;
const HEIGHT = 320;
const ROWS   = 20;
const COLS   = 10;
const SIZE   = 16;

var assets = [
    "images/title.png",// タイトル
];

function gameStart(){
    var scene = new Scene();
    core.replaceScene(scene); core.resume();

    //==========
    // ここから
    //==========

    // Tetris Manager
    var tMng = new TetrisManager(ROWS, COLS, MINOS, true);

    // Surface
    var sur = new Surface(WIDTH, HEIGHT);
    var ctx = sur.context;

    // Canvas
    var spr = new Sprite(WIDTH, HEIGHT);
    spr.backgroundColor = "purple";
    spr.image = sur;
    spr.x = scene.width / 2 - WIDTH / 2;
    spr.y = 100;
    scene.addChild(spr);
    
    scene.backgroundColor = "gray";

    // Step
    scene.tl.delay(16);
    scene.tl.then(function(){
        // Game Over?
        if(tMng.isGameOver()){
            console.log("GAME OVER");
            core.stop();
            return;
        }
        // Step
        let dels = tMng.stepTetris();// Step
        if(0 < dels){
            console.log("You deleted:" + dels + " lines!!");
        }
        // Data
        let data = tMng.getData();

    });
    scene.tl.loop();

    // Update
    spr.tl.delay(2);
    spr.tl.then(function(){
        // Clear
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        // Data
        let data = tMng.getData();
        for(let r=0; r<ROWS; r++){
            for(let c=0; c<COLS; c++){
                let i = r*COLS + c;
                let x = c*SIZE;
                let y = r*SIZE;
                if(data[i] == 0) continue;
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(x, y, SIZE-1, SIZE-1);
            }
        }
    });
    spr.tl.loop();

    // Keyboard
    scene.on(Event.LEFT_BUTTON_DOWN, function(){
        tMng.actionLeft();
    });

    scene.on(Event.RIGHT_BUTTON_DOWN, function(){
        tMng.actionRight();
    });

    scene.on(Event.DOWN_BUTTON_DOWN, function(){
        tMng.actionDown();
    });

    scene.on(Event.UP_BUTTON_DOWN, function(){
        tMng.actionRotateL();
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
    core = gameManager.createCore(320, 480);
    core.preload(assets);
    core.onload = function(){titleStart();};
    core.start();
};