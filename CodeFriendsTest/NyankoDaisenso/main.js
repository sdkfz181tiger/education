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
        startFriend();
    });

    btnB.on(Event.TOUCH_START, function(){
        startEnemy();
    });

    // 敵グループ
    var enemyGroup = new Group();
    scene.addChild(enemyGroup);

    // 味方増援
    function startFriend(){
        var friend = new Sprite(32, 32);
        friend.image = core.assets["images/janken.png"];
        friend.centerX = 40;
        friend.centerY = 160;
        friend.frame = getRandom(0, 2);
        scene.addChild(friend);

        friend.tl.moveBy(320, 0, 64);

        friend.addCollision(enemyGroup);
        friend.addEventListener(Event.COLLISION, function(e){
            // ジャンケン判定
            janken(friend, e.collision.target);
        });
    }

    // 敵増援
    function startEnemy(){
        var enemy = new Sprite(32, 32);
        enemy.image = core.assets["images/janken.png"];
        enemy.centerX = 280;
        enemy.centerY = 160;
        enemy.frame = getRandom(0, 2);
        enemyGroup.addChild(enemy);

        enemy.tl.moveBy(-320, 0, 64);
    }

    // 判定処理
    function janken(player, enemy){

        if(player.frame == enemy.frame){
            player.remove();// あいこ
            enemy.remove();
        }else if(player.frame == 0 && enemy.frame == 1){
            enemy.remove();// プレイヤーの勝ち
        }else if(player.frame == 1 && enemy.frame == 2){
            enemy.remove();// プレイヤーの勝ち
        }else if(player.frame == 2 && enemy.frame == 0){
            enemy.remove();// プレイヤーの勝ち
        }else if(player.frame == 0 && enemy.frame == 2){
            player.remove();// エネミーの勝ち
        }else if(player.frame == 1 && enemy.frame == 0){
            player.remove();// エネミーの勝ち
        }else if(player.frame == 2 && enemy.frame == 1){
            player.remove();// エネミーの勝ち
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
    core = gameManager.createCore(320, 320);
    core.preload(assets);
    core.onload = function(){titleStart();};
    core.start();
};