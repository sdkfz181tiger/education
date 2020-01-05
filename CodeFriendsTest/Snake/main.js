var assets = [
    "images/title.png"// タイトル
];

function gameStart(){
    var scene = new Scene();
    core.replaceScene(scene); core.resume();

    //==========
    // ここから
    //==========
    
    scene.backgroundColor = "gray";

    //==========
    // コントローラー
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
    head.backgroundColor = "blue";
    head.centerX = 160;
    head.centerY = 160;
    head.vX = 0;
    head.vY = 0;
    scene.addChild(head);

    //==========
    // 1秒おきに処理を繰り返す
    scene.tl.clear();
    scene.tl.delay(8);
    scene.tl.then(function(){
        // スネークを移動させる関数を実行する
        moveSnake();
    });
    scene.tl.loop();

    //==========
    // 尻尾グループ
    var tailGroup = new Group();
    scene.addChild(tailGroup);

    //==========
    // スネークを移動させる関数
    function moveSnake() {

        // 尻尾が1つ以上ある場合に処理をする
        if(0 < tailGroup.childNodes.length){
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
        }

        // 頭を1歩移動する
        head.centerX += head.vX * 16;
        head.centerY += head.vY * 16;
    }

    //==========
    // 餌グループ
    var foodGroup = new Group();
    scene.addChild(foodGroup);

    putFood();// 餌を配置する関数を実行する

    //==========
    // 当たり判定
    head.addCollision(tailGroup);// x 尻尾
    head.addCollision(foodGroup);// x 餌
    head.addEventListener(Event.COLLISION, function(e){
        // 当たった対象
        var target = e.collision.target;
        // 餌ならば...
        if(target.tag == "food"){
            e.collision.target.remove();// 餌を削除する
            putFood();// 餌を配置する関数を実行する
            putTail();// 尻尾を伸ばす関数を実行する

        }
        // 尻尾ならば...
        if(target.tag == "tail"){
            scene.backgroundColor = "purple";
            core.stop();// ゲームオーバー
        }
    });

    //==========
    // 餌を配置する関数
    function putFood(){
        var gridX = scene.width / 16;
        var gridY = scene.height / 16;
        var food = new Sprite(10, 10);
        food.backgroundColor = "red";
        food.centerX = getRandom(1, gridX) * 16;
        food.centerY = getRandom(1, gridY) * 16;
        food.tag = "food";// タグ名をつける(餌)
        foodGroup.addChild(food);
    }

    //==========
    // 尻尾を伸ばす関数
    function putTail(){
        var tail = new Sprite(10, 10);
        tail.backgroundColor = "skyblue";
        tail.centerX = head.centerX + head.vX * -16;
        tail.centerY = head.centerY + head.vY * -16;
        tail.tag = "tail";// タグ名をつける(尻尾)
        tailGroup.addChild(tail);
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