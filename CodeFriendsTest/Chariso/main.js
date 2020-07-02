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

    // Player
    var player = new Sprite(12, 12);
    player.backgroundColor = "blue";
    player.x = 32;
    player.y = 100;
    player.vY = 0;     // Velocity
    player.gY = 2;     // Gravity
    player.aY = -12;   // Accel
    player.jumpCnt = 1;// Counter
    scene.addChild(player);

    // Land
    var landGroup = new Group();
    scene.addChild(landGroup);

    let arr = [
        95, 80, 85, 80, 75, 70, 65, 60, 55, 50,
        10, 55, 60, 65, 70, 75, 80, 85, 90, 10,
        95, 80, 85, 80, 75, 70, 65, 60, 55, 50,
        10, 55, 60, 65, 70, 75, 80, 85, 90, 10,
        95, 80, 85, 80, 75, 70, 65, 60, 55, 50,
        10, 55, 60, 65, 70, 75, 80, 85, 90, 10,
        95, 80, 85, 80, 75, 70, 65, 60, 55, 50,
        10, 55, 60, 65, 70, 75, 80, 85, 90, 10,
        95, 80, 85, 80, 75, 70, 65, 60, 55, 50,
        10, 55, 60, 65, 70, 75, 80, 85, 90, 10,
        95, 80, 85, 80, 75, 70, 65, 60, 55, 50,
        10, 55, 60, 65, 70, 75, 80, 85, 90, 10,
        95, 80, 85, 80, 75, 70, 65, 60, 55, 50,
        10, 55, 60, 65, 70, 75, 80, 85, 90, 10,
        95, 80, 85, 80, 75, 70, 65, 60, 55, 50,
        10, 55, 60, 65, 70, 75, 80, 85, 90, 10,
        95, 80, 85, 80, 75, 70, 65, 60, 55, 50,
        10, 55, 60, 65, 70, 75, 80, 85, 90, 10,
        95, 80, 85, 80, 75, 70, 65, 60, 55, 50,
        10, 55, 60, 65, 70, 75, 80, 85, 90, 10];

    let landW = 16;
    for(let i=0; i<arr.length; i++){
        var landH = arr[i];
        var land = new Sprite(landW, landH);
        land.backgroundColor = "black";
        land.x = landW * i;
        land.y = scene.width - landH;
        landGroup.addChild(land);
    }

    scene.on(Event.TOUCH_START, function(){

        if(player.jumpCnt < 0) player.jumpCnt = 0;
        if(player.jumpCnt < 2){
            if(0 < player.vY) player.y -= player.vY;
            player.vY = player.aY;
            player.jumpCnt++;// Jump!!
        }
    });

    scene.on(Event.ENTER_FRAME, function(){

        var aX = player.centerX + (landGroup.x * -1.0);
        var bX = player.x + player.width + (landGroup.x * -1.0);
        var l = Math.floor(aX / landW);
        var r = Math.floor(bX / landW);
        if(landGroup.childNodes.length <= r) return;

        landGroup.x -= 4;

        var landL = landGroup.childNodes[l];
        landL.backgroundColor = "orange";
        var landR = landGroup.childNodes[r];
        landR.backgroundColor = "red";

        // Wall
        if(landR.y < player.y){
            if(0 < player.vY){
                if(landR.y < player.y - player.vY){
                    core.stop();
                    return;
                }
            }else{
                core.stop();
                return;
            }
        }

        // Landing
        if(landL.y < player.y + player.height){
            player.y = landL.y - player.height;
            player.vY = 0;
            player.jumpCnt = 0;
        }

        // Jumping or Falling
        if(player.jumpCnt != 0){
            player.vY += player.gY;
            player.y += player.vY;
        }

        // Falling
        if(player.jumpCnt <= 0){
            if(player.y + player.height + 2 < landR.y){
                player.jumpCnt = -1;
            }
        }
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
    core = gameManager.createCore(320, 320);
    core.preload(assets);
    core.onload = function(){titleStart();};
    core.start();
};