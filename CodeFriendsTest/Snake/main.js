var assets = [
    "images/title.png",// タイトル
    "images/janken.png"
];

function gameStart(){
    var scene = new Scene();
    core.replaceScene(scene); core.resume();

    //==========
    // ここから
    //==========
    
    scene.backgroundColor = "gray";

    // ボタン
    var btnU = new Sprite(32, 32);
    btnU.backgroundColor = "orange";
    btnU.centerX = 160;
    btnU.centerY = 240;
    scene.addChild(btnU);

    var btnB = new Sprite(32, 32);
    btnB.backgroundColor = "pink";
    btnB.centerX = 160;
    btnB.centerY = 280;
    scene.addChild(btnB);

    var btnL = new Sprite(32, 32);
    btnL.backgroundColor = "skyblue";
    btnL.centerX = 120;
    btnL.centerY = 260;
    scene.addChild(btnL);

    var btnR = new Sprite(32, 32);
    btnR.backgroundColor = "lime";
    btnR.centerX = 200;
    btnR.centerY = 260;
    scene.addChild(btnR);

    // ボタンアクション
    btnU.on(Event.TOUCH_START, function(){
        head.vX = 0;
        head.vY = -1;
    });

    btnB.on(Event.TOUCH_START, function(){
        head.vX = 0;
        head.vY = 1;
    });

    btnL.on(Event.TOUCH_START, function(){
        head.vX = -1;
        head.vY = 0;
    });

    btnR.on(Event.TOUCH_START, function(){
        head.vX = 1;
        head.vY = 0;
    });

    // スネーク(頭)
    var head = new Sprite(16, 16);
    head.backgroundColor = "red";
    head.centerX = 160;
    head.centerY = 160;
    head.vX = 0;
    head.vY = 0;
    scene.addChild(head);

    // 1秒おきに処理を繰り返す
    scene.tl.clear();
    scene.tl.delay(16);
    scene.tl.then(function(){
        head.centerX += head.vX * 16;
        head.centerY += head.vY * 16;
    });
    scene.tl.loop();
    
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
    core = gameManager.createCore(320, 320);
    core.preload(assets);
    core.onload = function(){titleStart();};
    core.start();
};