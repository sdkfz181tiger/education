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
        moveSnake();
    });
    scene.tl.loop();

    // 尻尾グループ
    var tailGroup = new Group();
    scene.addChild(tailGroup);

    for(var i=0; i<3; i++){
        var size = getRandom(8, 16);
        var tail = new Sprite(size, size);
        tail.backgroundColor = "orange";
        tail.centerX = 160;
        tail.centerY = 160;
        tailGroup.addChild(tail);
    }

    function moveSnake() {

        console.log(tailGroup.childNodes.length);

        // 尻尾の2番目から1つづつ移動する
        for(var t=tailGroup.childNodes.length-1; t>0; t--){
            var front = tailGroup.childNodes[t-1];
            var back = tailGroup.childNodes[t];
            back.centerX = front.centerX;
            back.centerY = front.centerY;
        }

        // 尻尾の先頭を頭と同じ座標にする
        tailGroup.childNodes[0].centerX = head.centerX;
        tailGroup.childNodes[0].centerY = head.centerY;

        // スネークを1歩移動する
        head.centerX += head.vX * 16;
        head.centerY += head.vY * 16;
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
    core = gameManager.createCore(320, 320);
    core.preload(assets);
    core.onload = function(){titleStart();};
    core.start();
};