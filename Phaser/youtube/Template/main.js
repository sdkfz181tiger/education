console.log("Hello Phaser!!");

const D_WIDTH = 480;// ゲーム画面の横幅
const D_HEIGHT = 320;// ゲーム画面の高さ

// Phaserの設定データ
const config = {
    type: Phaser.AUTO,
    width: D_WIDTH,
    height: D_HEIGHT,
    physics: {
        default: "arcade",
        arcade: {
            debug: true,// デバッグモード
            gravity: {y: 300}// 重力
        }
    },
    fps: {
        target: 2,// 1秒間に何回updateするか
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
}

function create(){
    console.log("create!!");
}

function update(){
    console.log("update!!");
}