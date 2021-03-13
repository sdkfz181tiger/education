console.log("Hello Phaser!!");

const D_WIDTH = 480;// ゲーム画面の横幅
const D_HEIGHT = 320;// ゲーム画面の高さ

let player;// プレイヤー
let platA;// 動く足場A

// Phaserの設定データ
const config = {
    type: Phaser.AUTO,
    width: D_WIDTH,
    height: D_HEIGHT,
    physics: {
        default: "arcade",
        arcade: {
            debug: true,// キャラに線が出る
            gravity: {y: 300}// 重力
        }
    },
    fps: {
        target: 10,// 1秒間に何回updateするか
        forceSetTimeOut: true
    },
    scene: {
        preload: preload,// 素材の読み込み時の関数
        create: create,// 画面が作られた時の関数
        update: update// 毎秒実行される関数
    }
}

// Phaser起動
let phaser = new Phaser.Game(config);

function preload(){
    console.log("preload!!");
    // 画像ファイルのロード
    this.load.image("mountain", "./assets/bkg_mountain.png");
    this.load.image("sky", "./assets/bkg_sky.png");
    this.load.image("coin", "./assets/c_coin_x3.png");
    this.load.image("koboz", "./assets/c_koboz_x2.png");
    this.load.image("osho", "./assets/c_osho_x2.png");
    this.load.image("tanu", "./assets/c_tanu_x2.png");
    this.load.image("gro32", "./assets/gro_32x32.png");
    this.load.image("gro128", "./assets/gro_128x32.png");
    this.load.image("gro256", "./assets/gro_256x32.png");
    this.load.spritesheet("s_tanu", "./assets/ss_tanu_x2.png",
                    {frameWidth: 32, frameHeight: 32});
}

function create(){
    console.log("create!!");
    // 画像を配置する(x, y, tag名)
    this.add.image(D_WIDTH/2, D_HEIGHT/2, "sky");
    this.add.image(D_WIDTH*3/2, D_HEIGHT/2, "sky");
    this.add.image(D_WIDTH/2, D_HEIGHT/2, "mountain");
    this.add.image(D_WIDTH*3/2, D_HEIGHT/2, "mountain");
    // プレイヤー
    player = this.physics.add.sprite(D_WIDTH/4, 80, "tanu");
    //player.setCollideWorldBounds(true);// 画面から飛び出さない
    // 動かないオブジェクトをまとめて配置
    let groundGroup = this.physics.add.staticGroup();
    groundGroup.create(120, 160, "gro128");
    groundGroup.create(380, 100, "gro32");
    groundGroup.create(450, 280, "gro256");
    // 動くオブジェクトをまとめて配置
    let coinGroup = this.physics.add.group();
    coinGroup.createMultiple({key:"coin", repeat: 3, setXY: {x:410, y:0, stepX:30}});
    // 動く足場A
    platA = this.physics.add.image(D_WIDTH/2, D_HEIGHT/2, "gro32");
    platA.setImmovable(true);//動かない設定にする
    platA.setVelocityX(30);// 右に速度を設定する
    platA.body.allowGravity = false;// 重力無視
    // 衝突処理
    this.physics.add.collider(player, groundGroup);// プレイヤーx足場
    this.physics.add.collider(groundGroup, coinGroup);// 足場xコイン
    this.physics.add.collider(player, platA);// プレイヤーx動く足場A
    // 衝突判定
    this.physics.add.overlap(player, coinGroup, overlapCoin, null, this);
    // カメラが追いかける範囲
    this.cameras.main.setBounds(0, 0, D_WIDTH*2, D_HEIGHT);
    this.cameras.main.startFollow(player);// 追いかける対象
}

function update(){
    console.log("update!!");

    // 動く足場Aを監視する
    if(330 < platA.x){
        platA.setVelocityX(-30);// 左に向かう
    }
    if(platA.x < 205){
        platA.setVelocityX(30);// 右に向かう
    }

    // コントロール(キーボードの情報をゲット)
    let cursors = this.input.keyboard.createCursorKeys();
    if(cursors.up.isDown){
        //console.log("Up!!");
        player.setVelocityY(-200);// 上方向の速度を設定
    }else if(cursors.left.isDown){
        //console.log("Left");
        player.setVelocityX(-200);// 左方向の速度を設定
    }else if(cursors.right.isDown){
        //console.log("Right!!");
        player.setVelocityX(200);// 右方向の速度を設定
    }else{
        player.setVelocityX(0);// 横方向の速度を0
    }
}

function overlapCoin(p, c){
    c.disableBody(true, true);// コインだけ消す
}