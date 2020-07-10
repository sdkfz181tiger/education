var assets = {
    player: "images/sukebo.png",
    land: "images/land42x320.png",
    title: "images/title.png",
    jump: "sounds/jump.mp3"
};

function gameStart(){
    var scene = new Scene();
    core.replaceScene(scene);

    scene.backgroundColor = "gray";

    var stage = new Group();
    scene.addChild(stage);

    // 背景
    var back = new Sprite(scene.width, scene.height);
    back.backgroundColor = "skyblue";
    stage.addChild(back);

    // Player
    var player = new Sprite(32, 32);
    player.image = core.assets.player;
    player.x = 60;
    player.y = 400;
    player.vY = 0;     // 垂直速度
    player.gY = 0.2;   // 垂直に働く重力
    player.aY = -4;    // ジャンプの速度
    player.jumpCnt = 0;// ジャンプカウンター
    scene.addChild(player);

    // 地面の高さを格納した配列
    let arr = [
        100, 100, 100, 100, 100, 110, 120, 130, 140, 150,
        150, 140, 130, 120, 110, 100, 90, 80, 70, 60, 80
    ];

    // 地面グループ
    var landGroup = new Group();
    scene.addChild(landGroup);

    // 配列から地面オブジェクトを作る
    let landW = 42;
    for (let i = 0; i < arr.length; i++){
        // 地面オブジェクト
        var land = new Sprite(landW, arr[i]);
        land.image = core.assets.land;
        land.x = land.width * i;
        land.y = scene.height - land.height;
        landGroup.addChild(land);
    }

    // タッチイベント
    scene.on(Event.TOUCH_START, function(){

        // ジャンプ回数が2未満の時
        if(player.jumpCnt < 2){
            // ジャンプの力を加速度に設定
            player.vY = player.aY;
            // 1フレーム分移動しておく
            player.y += player.vY;
            // ジャンプカウンターをカウントアップ
            player.jumpCnt++;
            return;
        }
    });

    // エンターフレーム (連続処理)
    scene.on(Event.ENTER_FRAME, function(){
        // プレイヤーが画面下に落ちた場合はゲームオーバー
        if (scene.height < player.y) {
            gameOver();
        }
        // 地に足がついているかどうか
        if (player.isCollision == false) {
            // 重力を速度に加算
            player.vY += player.gY;
            // 速度を座標に反映
            player.y += player.vY;
        }
        // 地面グループを左に移動させる
        landGroup.x -= 2;
    });

    player.addCollision(landGroup);
    player.on(Event.COLLISION, function(e) {

        player.jumpCnt = 0;// ジャンプカウンターのリセット

        // プレイヤーより高い壁だった場合はゲームオーバー
        if (e.collision.target.y < player.y) {
            gameOver();
        }

        // プレイヤーが地面オブジェクトと衝突した場合
        if (e.collision.target.y < player.y + player.height) {
            // 地面の高さまでプレイヤーを移動する（1ピクセル接触している状態）
            player.y = e.collision.target.y - player.height + 1;
            // 速度を初期化
            player.vY = 0;
        }
    });
    
};

function gameOver() {
    var scene = new Scene();
    core.pushScene(scene);

    var label = new Label();
    label.width = scene.width;
    label.font = "32px PixelMplus10";
    label.y = scene.height * 0.4;
    label.textAlign = "center";
    label.text = "ゲームオーバー";
    scene.addChild(label);

    scene.on(Event.TOUCH_START, function() {
        titleStart();
    });
}

// タイトル画面
function titleStart(){
    var scene = new Scene();
    core.replaceScene(scene);

    scene.backgroundColor = "black";

    var back = new Sprite();
    back.image = core.assets.title;
    back.width = back.image.width;
    back.height = back.image.height;
    back.centerX = scene.width * 0.5;
    back.centerY = scene.height * 0.5;
    scene.addChild(back);

    scene.on(enchant.Event.TOUCH_START, function () {
        gameStart();
    });
}


//==========
//EnchantJS
enchant();
var core;
window.onload = function(){
    core = new Core(640, 640);
    core.fps = 60;
    core.preload(assets);
    core.onload = function(){
        titleStart();
    };
    core.start();
};