/*
    教育フェア用教材
*/

const TIME_LIMIT = 10;

var assets = [
    "images/cf001/b_left.png",   "images/cf001/b_right.png",
    "images/cf001/b_red.png",    "images/cf001/b_blue.png",
    "images/cf001/sky.png",      "images/cf001/back1.png",
    "images/cf001/back2.png",    "images/cf001/bullet.png",
    "images/cf001/pod.png",      "images/cf001/table.png",
    "images/cf001/cannon.png",   "images/cf001/codefriends.png",
    "images/cf001/medal.png",    "images/cf001/coin.png",
    "images/cf001/gameclear.png", "images/cf001/gameover.png",
    "sounds/cf001/medal.mp3",     "sounds/cf001/coin.mp3",
    "sounds/cf001/omg.mp3",       "sounds/cf001/bgm_game.mp3", 
    "sounds/cf001/bgm_clear.mp3", "sounds/cf001/bgm_over.mp3",
];

function gameStart(){
    var scene = new Scene();
    core.replaceScene(scene);

    var world = new PhysicsWorld(0, 12);
    scene.addEventListener(Event.ENTER_FRAME, ()=>{world.step(core.fps);});
    scene.backgroundColor = "#86dcfe";

    function fire(){
        console.log("Fire!!");
        bullet.addImpulse(4.3, -5);
    }

    var area = new Group();
    scene.addChild(area);

    var sky = new Sprite(320*30, 320*5);
    sky.image = core.assets["images/cf001/sky.png"];
    sky.x = sky.width*-0.5, 
    sky.y = sky.height*-4/5;
    area.addChild(sky);

    var back1 = new Sprite(320*5, 120);
    back1.image = core.assets["images/cf001/back1.png"];
    back1.y = 30;
    area.addChild(back1);

    var back2 = new Sprite(320*5, 200);
    back2.image = core.assets["images/cf001/back2.png"];
    back2.y = 150;
    area.addChild(back2);

    var title = new Sprite(260, 85);
    title.image = core.assets["images/cf001/codefriends.png"];
    title.centerX = 160; title.centerY = 100;
    area.addChild(title);

    var bgm = core.assets["sounds/cf001/bgm_game.mp3"];
    bgm.src.loop = true;
    bgm.play();

    var ground = createBox(0, 350-32, 320*10, 64);
    ground.backgroundColor = "green";
    area.addChild(ground);

    createTable(100, 280);

    var offX = 320;
    var offY = 280;
    var padX = 240;
    for(var i=0; i<10; i++){
        var rdm = getRandom(0, 20);
        createTable(offX+padX*i, offY-rdm, 8, 10, "images/cf001/coin.png", "item", 10);
    }

    var bullet = createBox(100, 225, 18, 23, "images/cf001/bullet.png", 0, true);
    area.addChild(bullet);
    area.setScrollRange(bullet, 90, 90, 32, 90);

    bullet.addCollision(area);
    bullet.on(Event.COLLISION, (e)=>{
        if(e.collision.target.tag != "item") return;
        updateScore(e.collision.target);// Score
        e.collision.target.destroy();
    });

    var cannon = new Sprite(60, 60);
    cannon.image = core.assets["images/cf001/cannon.png"];
    cannon.centerX = 110; cannon.centerY = 225;
    cannon.addEventListener(Event.TOUCH_START, ()=>{
        if(cannon.frame != 0) return;
        cannon.frame = 1; 
        startTimer();// Timer
        fire();// Fire!!
    });
    area.addChild(cannon);

    var bar = new Sprite(320, 30);
    bar.backgroundColor = "black";
    scene.addChild(bar);

    // Score
    var score = 0;
    var sLabel = createLabel(5, 5, 160, "left");
    sLabel.text = "SCORE:" + score;
    scene.addChild(sLabel);

    // Timer
    var time = TIME_LIMIT;
    var tLabel = createLabel(155, 5, 160, "right");
    tLabel.text = "TIME:" + time;
    scene.addChild(tLabel);

    function createTable(x, y, iW=8, iH=10, iPath="", tag="", s=10){
        var podL = new Sprite(29, 53);
        podL.image = core.assets["images/cf001/pod.png"];
        podL.centerX = x - 50; podL.centerY = y;
        area.addChild(podL);
        var podR = new Sprite(29, 53);
        podR.image = core.assets["images/cf001/pod.png"];
        podR.centerX = x + 50; podR.centerY = y;
        area.addChild(podR);
        var table = new Sprite(64, 64);
        table.image = core.assets["images/cf001/table.png"];
        table.centerX = x; table.centerY = y;
        area.addChild(table);
        var step = createBox(x, y-25, 64, 32);
        area.addChild(step);
        if(iPath == "") return;
        // Items
        var item = createBox(x, step.y-iH, iW, iH);
        item.image = core.assets[iPath];
        item.tag = tag;
        item.score = s;
        area.addChild(item);
    }

    function createBox(x, y, w, h, path="", f=0, type=false){
        if(type){
            type = enchant.box2d.DYNAMIC_SPRITE;
        }else{
            type = enchant.box2d.STATIC_SPRITE;
        }
        var spr = new PhyBoxSprite(w, h, type);
        if(path != "") spr.image = core.assets[path];
        spr.frame = f;
        spr.centerX = x; spr.y = y;
        return spr;
    }

    function createLabel(x, y, w=120, a="center", c="white"){
        var lbl = new Label();
        lbl.x = x; lbl.y = y; lbl.width = w; lbl.textAlign = a;
        if(a == "center") lbl.x -= w * 0.5;
        lbl.color = c; lbl.font = "24px 'PixelMplus10'";
        return lbl;
    }

    function createSprite(x, y, w, h, path){
        var spr = new Sprite(w, h);
        spr.image = core.assets[path];
        spr.centerX = x; spr.centerY = y;
        return spr;
    }

    function updateScore(target){
        // Label
        var pLabel = createLabel(target.centerX, target.y-10);
        pLabel.text = target.score; area.addChild(pLabel);
        if(target.score<0) pLabel.color = "red";
        pLabel.tl.moveBy(0, -30, 16);
        pLabel.tl.then(()=>{pLabel.remove();});
        // Score
        score += target.score;
        sLabel.text = "SCORE:" + score;
        if(100 <= target.score){
            core.assets["sounds/cf001/medal.mp3"].clone().play();
        }else if(10 <= target.score){
            core.assets["sounds/cf001/coin.mp3"].clone().play();
        }else{
            core.assets["sounds/cf001/omg.mp3"].clone().play();
        }
    }

    function startTimer(){
        // Count down
        scene.tl.delay(16);
        scene.tl.then(()=>{
            time--;
            tLabel.text = "TIME:" + time;
            if(time <= 0) gameOver();
        });
        scene.tl.loop();
    }

    function gameClear(){
        bgm.stop();
        var spr = createSprite(160, 140, 230, 32, "images/cf001/gameclear.png");
        scene.addChild(spr);
        var snd = core.assets["sounds/cf001/bgm_clear.mp3"].clone();
        snd.play();
        core.stop();
    }

    function gameOver(){
        bgm.stop();
        var spr = createSprite(160, 140, 230, 32, "images/cf001/gameover.png");
        scene.addChild(spr);
        var snd = core.assets["sounds/cf001/bgm_over.mp3"].clone();
        snd.play();
        core.stop();
    }
}

function titleStart(){
    var scene = new Scene();
    core.replaceScene(scene);
    
    // 背景色
    //scene.backgroundColor = "black";

    // 文字を表示    
    var title = new Label();
    title.width = 320;
    title.x = 0;
    title.y = 150;
    title.color = "black";
    title.textAlign = "center";
    title.text = "TAP TO START";
    scene.addChild(title);

    // 画面をクリックしたとき    
    scene.on(enchant.Event.TOUCH_START, function(){
        // ゲーム画面を表示    
        gameStart();
    });
}

var core;
enchant();
window.onload = function(){
    core = new Core(320, 350);
    core.fps = 16;
    core.preload(assets);
    core.onload = function(){
        titleStart();
    };
    core.start();
};