/*
    教育フェア用教材
*/

const TIME_LIMIT = 30;

function gameStart(){
    var scene = new Scene();
    core.replaceScene(scene);

    var world = new PhysicsWorld(0, 4);
    scene.addEventListener(Event.ENTER_FRAME, ()=>{world.step(core.fps);});
    scene.backgroundColor = "black";

    //==========
    // ここから
    //==========

    // setImpulse("遅延", 加速度(x), 加速度(y));

    function fire(){
        console.log("Fire!!");
    }

    //==========
    // ここまで
    //==========

    function setImpulse(dt, vx, vy){
        bullet.tl.delay(dt).then(()=>{
            playSound("sounds/cf001/cannon.mp3");
            bullet.vx = 0; bullet.vy = 0;
            bullet.addImpulse(vx, vy);
        });
    }

    var area = new Group();
    scene.addChild(area);

    var sky = new Sprite(320*30, 320*30);
    sky.image = core.assets["images/cf001/sky.png"];
    sky.x = -320; sky.y = 320 - sky.height;
    area.addChild(sky);

    var back1 = new Sprite(320*30, 120);
    back1.image = core.assets["images/cf001/back1.png"];
    back1.x = -320; back1.y = 30;
    area.addChild(back1);

    var back2 = new Sprite(320*30, 200);
    back2.image = core.assets["images/cf001/back2.png"];
    back2.x = -320; back2.y = 150;
    area.addChild(back2);

    var title = new Sprite(260, 85);
    title.image = core.assets["images/cf001/codefriends.png"];
    title.centerX = 160; title.centerY = 100;
    area.addChild(title);

    var bgm = core.assets["sounds/cf001/bgm_game.mp3"];
    bgm.src.loop = true;
    bgm.play();

    var ground = new PhyBoxSprite(320*30, 64, enchant.box2d.STATIC_SPRITE);
    ground.x = -320; ground.y = 350-32;
    ground.backgroundColor = "green";
    area.addChild(ground);

    var wL = new PhyBoxSprite(32, 350*30, enchant.box2d.STATIC_SPRITE);
    wL.x = -320-32; wL.y = 350*-29;
    wL.backgroundColor = "orange";
    area.addChild(wL);

    var wR = new PhyBoxSprite(32, 350*30, enchant.box2d.STATIC_SPRITE);
    wR.x = 320*29; wR.y = 350*-29;
    wR.backgroundColor = "orange";
    area.addChild(wR);

    var wT = new PhyBoxSprite(350*30, 32, enchant.box2d.STATIC_SPRITE);
    wT.x = 0; wT.y = 350*-29;
    wT.backgroundColor = "orange";
    area.addChild(wT);

    createTable(100, 280);
    
    createBonus(80,   -2200,  5,  5, 8, 10, "images/cf001/coin.png", 10);
    createBonus(1500, -5300, 10, 10, 8, 10, "images/cf001/coin.png", 10);
    createBonus(1700, -1000, 10, 10, 8, 10, "images/cf001/coin.png", 10);
    createBonus(2600, -1200, 10, 10, 8, 10, "images/cf001/coin.png", 10);
    createBonus(4600, -5300, 20, 20, 8, 10, "images/cf001/coin.png", 10);

    createPlanet(300, -2000,
                 48, 48, "images/cf001/pl_moon.png", 
                 32, 32, "images/cf001/musubi.png", 1000);

    createBonus(4800, -1800, 10, 10, 8, 10, "images/cf001/coin.png", 10);
    createBonus(5100, -1800, 10, 10, 8, 10, "images/cf001/coin.png", 10);
    createPlanet(5000, -1800,
                 72, 72, "images/cf001/pl_mars.png", 
                 36, 60, "images/cf001/oshiruko.png", 3000);

    var offX = 320;
    var offY = 280;
    var padX = 640;
    for(var i=0; i<20; i++){
        if(i < 5){
            createTable(offX+padX*i, offY, 32, 32, 
                        "images/cf001/medal.png", 100);
        }else if(i < 8){
            createTable(offX+padX*i, offY, 32, 32, 
                        "images/cf001/tebasaki.png", 300);
        }else if(i < 15){
            createTable(offX+padX*i, offY, 32, 32, 
                        "images/cf001/musubi.png", 900);
        }else{
            createTable(offX+padX*i, offY, 36, 60, 
                        "images/cf001/oshiruko.png", 1200);
        }
    }

    var bullet = createBox(100, 220, 18, 23, "images/cf001/bullet.png", 0, true);
    bullet.density = 3; bullet.friction = 0; bullet.restitution = 0;
    bullet.angle = getRandom(0, 90);
    bullet.setAwake(false);
    area.addChild(bullet);
    area.setScrollRange(bullet, 90, 90, 90, 90);

    var bLabel = createLabel(bullet.centerX, bullet.y+20, 120, "center");
    bLabel.font = "10px 'PixelMplus10'";
    bLabel.text = "*,*";
    bLabel.baseX = Math.floor(bullet.centerX);
    bLabel.baseY = Math.floor(bullet.centerY);
    area.addChild(bLabel);

    bullet.on(Event.ENTER_FRAME, ()=>{
        // Label
        bLabel.centerX = bullet.centerX;
        bLabel.y = bullet.y+30;
        let x = Math.floor(bullet.centerX) - bLabel.baseX;
        let y = bLabel.baseY - Math.floor(bullet.centerY);
        bLabel.text = x + "m," + y + "m";
        // Contact
        bullet.contact((spr)=>{
            if(spr.tag == "table"){
                updateScore(spr);// Score
                spr.tag = "";
            }
            if(spr.tag == "bonus"){
                updateScore(spr);// Score
                spr.tag = "";
                spr.remove();
            }
            if(spr.tag == "item"){
                bullet.vx = 0; bullet.vy = 0;// Slow
                updateScore(spr);// Score
                spr.tag = "";
                spr.remove();
            }
        });
        // GameOver
        if(280 < bullet.y) gameOver();
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

    function createTable(x, y, iW=8, iH=10, iPath="", s=10){
        var podL = new Sprite(29, 53);
        podL.image = core.assets["images/cf001/pod.png"];
        podL.centerX = x - 50; podL.centerY = y;
        area.addChild(podL);
        var podR = new Sprite(29, 53);
        podR.image = core.assets["images/cf001/pod.png"];
        podR.centerX = x + 50; podR.centerY = y;
        area.addChild(podR);
        var deco = new Sprite(64, 64);
        deco.image = core.assets["images/cf001/table.png"];
        deco.centerX = x; deco.centerY = y;
        area.addChild(deco);
        var table = createBox(x, y-25, 64, 32);
        table.tag = "table";
        table.score = 0;
        area.addChild(table);
        if(iPath == "") return;
        // Items
        var item = createBox(x, table.y-iH, iW, iH, iPath);
        item.tag = "item";
        item.score = s;
        area.addChild(item);
    }

    function createBonus(bX, bY, rows, cols, iW=8, iH=10, iPath="", s=10){
        let pad = 12;
        for(let r=0; r<rows; r++){
            for(let c=0; c<cols; c++){
                let x = bX + c * pad; let y = bY + r * pad;
                var item = createBox(x, y, iW, iH, iPath, 0, true);
                item.tag = "bonus"; item.score = s;
                item.density = 0; item.friction = 0; item.restitution = 0;
                item.setAwake(false);
                area.addChild(item);
            }
        }
    }

    function createPlanet(x, y, wP, hP, iPathP="", wI, hI, iPathI="", s=10){
        var planet = new Sprite(wP, hP);
        planet.image = core.assets[iPathP];
        planet.centerX = x; planet.centerY = y;
        area.addChild(planet);
        var step = createBox(x, y, wP, hP);
        step.centerX = x; step.centerY = y;
        area.addChild(step);
        // Items
        var item = createBox(x, y, wI, hI, iPathI);
        item.y = planet.y - item.height;
        item.tag = "item";
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
        // Score
        score += target.score;
        if(score < 0) gameOver();// Game Over!!
        // Sound
        if(100 <= target.score){
            core.assets["sounds/cf001/medal.mp3"].clone().play();
        }else if(10 <= target.score){
            core.assets["sounds/cf001/coin.mp3"].clone().play();
        }
        if(0 < target.score){
            // Sprite
            var pSprite = new Sprite(target.width, target.height);
            pSprite.image = target.image;
            pSprite.centerX = target.centerX; pSprite.centerY = target.centerY;
            pSprite.opacity = 0.4;
            area.addChild(pSprite);
            pSprite.tl.moveBy(0, -32, 8);
            pSprite.tl.then(()=>{
                pSprite.remove();
                // Label
                var pLabel = createLabel(pSprite.centerX, pSprite.centerY);
                pLabel.text = target.score; area.addChild(pLabel);
                if(target.score<0) pLabel.color = "red";
                pLabel.tl.moveBy(0, -30, 32);
                pLabel.tl.then(()=>{pLabel.remove();});
                sLabel.text = "SCORE:" + score;
            });
        }
    }

    function startTimer(){
        // Count down
        scene.tl.delay(core.fps);
        scene.tl.then(()=>{
            time--;
            tLabel.text = "TIME:" + time;
            if(time <= 0){
                if(100 <= score){
                    gameClear();// Game Clear!!
                }else{
                    gameOver();// Game Over!!
                }
            }
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

    function playSound(path){
        var sound = core.assets[path].clone();
        sound.play();
    }
}

function titleStart(){
    var scene = new Scene();
    core.replaceScene(scene);
    
    // 背景色
    scene.backgroundColor = "black";

    // 文字を表示    
    var title = new Label();
    title.width = 320;
    title.x = 0;
    title.y = 150;
    title.color = "white";
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

var assets = [
    "images/cf001/b_left.png",    "images/cf001/b_right.png",
    "images/cf001/b_red.png",     "images/cf001/b_blue.png",
    "images/cf001/sky.png",       "images/cf001/back1.png",
    "images/cf001/back2.png",     "images/cf001/bullet.png",
    "images/cf001/pod.png",       "images/cf001/table.png",
    "images/cf001/cannon.png",    "images/cf001/codefriends.png",
    "images/cf001/medal.png",     "images/cf001/coin.png",
    "images/cf001/gameclear.png", "images/cf001/gameover.png",
    "images/cf001/tebasaki.png",  "images/cf001/musubi.png",
    "images/cf001/oshiruko.png",  "images/cf001/pl_earth.png",
    "images/cf001/pl_mars.png",   "images/cf001/pl_moon.png",
    "sounds/cf001/medal.mp3",     "sounds/cf001/coin.mp3",
    "sounds/cf001/cannon.mp3",    "sounds/cf001/omg.mp3",
    "sounds/cf001/bgm_game.mp3", 
    "sounds/cf001/bgm_clear.mp3", "sounds/cf001/bgm_over.mp3",
];

/*

// 月を狙う
//setImpulse(16*0, 0, -40);
//setImpulse(16*2.5, 1, -3);

// 火星を狙う
setImpulse(16*0, 21, -22);
setImpulse(16*6.8, 1, -1);
setImpulse(16*3, 1, -1);

*/