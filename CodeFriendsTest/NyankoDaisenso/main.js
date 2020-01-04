var assets = [
    "images/title.png",// タイトル
];

function gameStart(){
    var scene = new Scene();
    core.replaceScene(scene); core.resume();

    //==========
    // ここから
    //==========
    
    scene.backgroundColor = "gray";

    // ボタン
    var btnA = new Sprite(32, 32);
    btnA.backgroundColor = "orange";
    btnA.centerX = 40;
    btnA.centerY = 250;
    scene.addChild(btnA);

    var btnB = new Sprite(32, 32);
    btnB.backgroundColor = "lime";
    btnB.centerX = 280;
    btnB.centerY = 250;
    scene.addChild(btnB);

    // ボタンアクション
    btnA.on(Event.TOUCH_START, function(){
        startFriend(6, 3, 2);
    });

    btnB.on(Event.TOUCH_START, function(){
        startEnemy(2, 6, 4);
    });

    // 敵グループ
    var enemyGroup = new Group();
    scene.addChild(enemyGroup);

    // 味方増援
    function startFriend(speed, hp, power, color){
        var friend = new Sprite(32, 32);
        friend.backgroundColor = "orange";
        friend.centerX = 40;
        friend.centerY = 160;
        scene.addChild(friend);

        friend.tl.moveBy(320, 0, 64);

        friend.addCollision(enemyGroup);
        friend.addEventListener(Event.COLLISION, function(){
            console.log("Hit");
        });
    }

    // 敵増援
    function startEnemy(speed, hp, power, color){
        var enemy = new Sprite(32, 32);
        enemy.backgroundColor = "orange";
        enemy.centerX = 280;
        enemy.centerY = 160;
        enemyGroup.addChild(enemy);

        enemy.tl.moveBy(-320, 0, 64);
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