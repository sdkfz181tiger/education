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
    btnB.centerX = 80;
    btnB.centerY = 250;
    scene.addChild(btnB);

    // ボタンアクション
    btnA.on(Event.TOUCH_START, function(){
        startFriend(6, 3, 2);
    });

    btnB.on(Event.TOUCH_START, function(){
        startFriend(2, 6, 4);
    });

    var friendGroup = new Group();
    scene.addChild(friendGroup);
    function startFriend(speed, hp, power, color){
        var friend = new Sprite(32, 32);
        friend.backgroundColor = "orange";
        friend.centerX = 40;
        friend.centerY = 160;
        friendGroup.addChild(friend);
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