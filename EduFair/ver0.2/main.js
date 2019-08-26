/*
    教育フェア用教材
*/

const TIME_LIMIT = 30;

var poses = "";

function gameStart(){
    var scene = new Scene();
    core.replaceScene(scene);

    var world = new PhysicsWorld(0, 4);
    scene.addEventListener(Event.ENTER_FRAME, ()=>{world.step(core.fps);});
    scene.backgroundColor = "black";

    //==========
    // ここから
    //==========

    // = ヒント =
    // 1 ~ 100までの数字だよwww

    function fire(){
        console.log("Fire!!");
        setImpulse(1, 1);
    }

    //==========
    // ここまで
    //==========

    function setImpulse(vx, vy){
        let delay = 8;
        bullet.tl.delay(delay).then(()=>{
            playSound("sounds/cf001/cannon.mp3");
            bullet.vx = 0; bullet.vy = 0;
            bullet.addImpulse(vx, vy*-1);
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
    //bgm.src.loop = true;
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
    wR.x = 320*18; wR.y = 350*-29;
    wR.backgroundColor = "orange";
    area.addChild(wR);

    createTable(100, 280);
    
    createBonus(80,   -1000,  5,  5, 8, 10, "images/cf001/coin.png", 10);
    createBonus(240,  -1400,  5, 10, 8, 10, "images/cf001/coin.png", 10);
    createBonus(1700, -1000,  5,  5, 8, 10, "images/cf001/coin.png", 10);
    createBonus(2000, -1500, 15, 15, 8, 10, "images/cf001/coin.png", 10);
    createBonus(2600, -1800, 15, 15, 8, 10, "images/cf001/coin.png", 10);
    createBonus(3600, -1200, 20, 20, 8, 10, "images/cf001/coin.png", 10);
    createBonus(5200, -1800,  8,  8, 8, 10, "images/cf001/coin.png", 10);
    createBonus(5400, -2000,  5,  5, 8, 10, "images/cf001/coin.png", 10);
    createBonus(5450, -1800, 10, 10, 8, 10, "images/cf001/coin.png", 10);
    createBonus(5400, -2800, 20, 20, 8, 10, "images/cf001/coin.png", 10);

    createPlanet(5350, -1800,
                 72, 72, "images/cf001/pl_mars.png",
                 36, 60, "images/cf001/oshiruko.png", 10000);

    //createDots();
    createLandmarks();

    var offX = 280;
    var offY = 280;
    var padX = 640;
    for(var i=0; i<9; i++){
        if(i <= 5){
            createTable(offX+padX*i, offY, 32, 32, 
                        "images/cf001/medal.png", 100, i);
        }else if(i == 6){
            createTable(offX+padX*i, offY, 32, 32, 
                        "images/cf001/tebasaki.png", 1000, i);
        }else if(i == 7){
            createTable(offX+padX*i, offY, 32, 32, 
                        "images/cf001/musubi.png", 3000, i);
        }else{
            createTable(offX+padX*i, offY, 36, 60, 
                        "images/cf001/oshiruko.png", 10000, i);
        }
    }

    var bullet = createBox(100, 220, 18, 23, "images/cf001/bullet.png", 0, true);
    bullet.density = 3; bullet.friction = 0; bullet.restitution = 0;
    //bullet.angle = getRandom(0, 90);
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
    
    // Logger
    cannon.tl.delay(3);
    cannon.tl.then(()=>{
        let posX = Math.floor(bullet.centerX);
        let posY = Math.floor(bullet.centerY);
        poses += "[" + posX + ", " + posY + "],";
    });
    cannon.tl.loop();
    
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

    //scene.y = 350 * 9;// Test

    function createTable(x, y, iW=8, iH=10, iPath="", s=10, i=0){
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
        deco.frame = i;
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
        if(10000 <= score){
            setTimeout(()=>{
                gameClear();// Game Clear!!
            }, 1000);
        }
    }

    function startTimer(){
        // Count down
        scene.tl.delay(core.fps);
        scene.tl.then(()=>{
            time--;
            tLabel.text = "TIME:" + time;
            if(time <= 0){
                if(score < 100){
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

        cannon.tl.unloop();
        console.log(poses);
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

    function createDots(){
        for(let dot of dots){
            let spr = new Sprite(6, 6);
            spr.backgroundColor = "orange";
            spr.x = dot[0]; spr.y = dot[1];
            area.addChild(spr);
        }
    }

    function createLandmarks(){

        var teba = new Sprite(32, 32);
        teba.image = core.assets["images/cf001/tebasaki.png"];
        teba.centerX = 200; teba.centerY = -500;
        teba.scale(3.0);
        area.addChild(teba);

        var musubi = new Sprite(32, 32);
        musubi.image = core.assets["images/cf001/musubi.png"];
        musubi.centerX = 1200; musubi.centerY = -1000;
        musubi.scale(3.0);
        area.addChild(musubi);

        var basho = new Sprite(200, 181);
        basho.image = core.assets["images/cf001/basho.png"];
        basho.centerX = 5100; basho.centerY = -2700;
        basho.scale(3.0);
        area.addChild(basho);

        var bear = new Sprite(85, 90);
        bear.image = core.assets["images/cf001/bear.png"];
        bear.centerX = 4500; bear.centerY = -2000;
        bear.scale(3.0);
        area.addChild(bear);

        var sate = new Sprite(96, 54);
        sate.image = core.assets["images/cf001/satelite.png"];
        sate.centerX = 2000; sate.centerY = -2000;
        sate.scale(3.0);
        area.addChild(sate);

        var moon = new Sprite(48, 48);
        moon.image = core.assets["images/cf001/pl_moon.png"];
        moon.centerX = 1250; moon.centerY = -2000;
        moon.scale(3.0);
        area.addChild(moon);

        var earth = new Sprite(72, 72);
        earth.image = core.assets["images/cf001/pl_earth.png"];
        earth.centerX = 3300; earth.centerY = -2850;
        earth.scale(3.0);
        area.addChild(earth);
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
    core = new Core(320, 350);// Test
    //core = new Core(320*18, 350*10);// Test
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
    "images/cf001/basho.png", "images/cf001/bear.png",
    "images/cf001/satelite.png",
    "sounds/cf001/medal.mp3",     "sounds/cf001/coin.mp3",
    "sounds/cf001/cannon.mp3",    "sounds/cf001/omg.mp3",
    "sounds/cf001/bgm_game.mp3", 
    "sounds/cf001/bgm_clear.mp3", "sounds/cf001/bgm_over.mp3",
];

var dots = [[100, 231],[128, 174],[186, 61],[243, -50],[300, -159],[358, -266],
    [415, -371],[473, -474],[530, -575],[587, -673],[645, -770],[702, -865],
    [760, -958],[817, -1049],[874, -1138],[932, -1225],[989, -1310],[1047, -1393],
    [1104, -1474],[1161, -1553],[1219, -1629],[1276, -1704],[1334, -1777],[1391, -1848],
    [1448, -1917],[1506, -1984],[1563, -2049],[1621, -2112],[1678, -2173],[1735, -2232],
    [1793, -2289],[1850, -2343],[1908, -2396],[1965, -2447],[2022, -2496],[2080, -2543],
    [2137, -2588],[2195, -2631],[2252, -2672],[2309, -2711],[2367, -2748],[2424, -2783],
    [2482, -2815],[2539, -2846],[2596, -2875],[2654, -2902],[2711, -2927],[2769, -2950],
    [2826, -2971],[2883, -2990],[2941, -3007],[2998, -3022],[3055, -3035],[3113, -3045],
    [3170, -3054],[3228, -3061],[3285, -3066],[3342, -3069],[3400, -3070],[3457, -3069],
    [3515, -3066],[3572, -3061],[3629, -3054],[3687, -3045],[3744, -3033],[3802, -3020],
    [3859, -3005],[3916, -2988],[3974, -2969],[4031, -2948],[4089, -2925],[4146, -2900],
    [4203, -2873],[4261, -2844],[4318, -2813],[4376, -2779],[4433, -2744],[4490, -2707],
    [4548, -2668],[4605, -2627],[4663, -2584],[4720, -2539],[4777, -2492],[4835, -2443],
    [4892, -2392],[4950, -2339],[5007, -2283],[5064, -2226],[5122, -2167],[5179, -2106],
    [5237, -2043],[5294, -1978],[5351, -1911]];

/*

// ヒント
// 横の威力: 0 ~ 20
// 縦の威力: -35 ~ -20
// setImpulse(横の威力, 縦の威力);
// setImpulse(14, 31);

*/