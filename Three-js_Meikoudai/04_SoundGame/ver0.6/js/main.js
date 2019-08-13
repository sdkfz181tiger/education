console.log("main.js!!");

let combo = 0;      // コンボ
let comboMng = null;// コンボマネージャー
let score = 0;      // スコア
let scoreMng = null;// スコアマネージャー

function setScenery(){
	console.log("setScenery");

	score = 0;// リセット(スコア)
	combo = 0;// リセット(コンボ)

	// フォント
	let font = fontLoader.findFonts("MisakiGothic");

	// コンボマネージャー(サイズ, 間隔, 桁数)
	comboMng = new CounterManager(rootGroup, font, 2, 2, 2);
	comboMng.init(-5, 3, 8, -45);// x, y, z, x軸角度
	comboMng.setNum(combo);// コンボ表示

	// スコアマネージャー(サイズ, 間隔, 桁数)
	scoreMng = new CounterManager(rootGroup, font, 2, 2, 4);
	scoreMng.init(+5, 3, 8, -45);// x, y, z, x軸角度
	scoreMng.setNum(score);// スコア表示

	// カメラコンテナ
	let cam = tm.getCameraContainer();
	// アニメーションオブジェクト(繰り返し, ヨーヨー, 終了時関数)
	let tl = createTimeline(-1, false, null);
	tl.to(cam.position, 3.0,
		{delay: 1.0, x: "+=5", y: "+=5", z: "+=5"});
	tl.to(cam.position, 1.0,
		{delay: 1.0, x: "-=5", y: "-=5", z: "-=5"});
	tl.to(cam.position, 1.0,
		{delay: 3.0, x: 20, y: 20, z: 20});
	tl.to(cam.position, 1.0,
		{delay: 3.0, x: 0, y: 0, z: 0});

	// "noteGroup(譜面)"に配置する
	for(let i=0; i<10; i++){
		let x = 0;
		let y = 7;
		let z = i * -100;
		let tree = objLoader.findModels("tree_1.obj", 1.0);
		tree.position.set(x, y, z);
		tree.name = "tree_1";
		noteGroup.add(tree);// 譜面に追加
	}

	// "rootGroup(背景)"に配置する
	let areaX = 30;
	let areaZ = 100;
	for(let i=0; i<100; i++){
		let x = Math.floor(Math.random() * areaX) - areaX*0.5;
		let z = Math.floor(Math.random() * areaZ) * -1.0;
		let scale = 0.1 + 0.1 * Math.random();
		let tree = objLoader.findModels("tree_1.obj", scale);
		tree.position.set(x, 0, z);
		tree.name = "tree_1";
		rootGroup.add(tree);// 背景に追加
	}

	console.log("譜面グループ総数:" + noteGroup.children.length);
	console.log("背景グループ総数:" + rootGroup.children.length);
}

// 音楽再生時
function onSeek(){
	console.log("onSeek");
}

// 音楽終了時
function onEnd(){
	console.log("onEnd");

	// ゲームクリアロゴ
	let logo = objLoader.findModels("tree_1.obj", 1.0);
	logo.position.set(0, 5, 0);
	logo.name = "game_over";
	rootGroup.add(logo);

	// アニメーションオブジェクト(繰り返し, ヨーヨー, 終了時関数)
	let tl = createTimeline(0, false, ()=>{
		// アニメーション終了時
		soundLoader.playSound("tap.mp3", 1.0);// Sound
	});
	// "logo"オブジェクトを3.0秒の時間をかけて、1.0秒後に0, 0, 0の座標に移動する
	tl.to(logo.position, 3.0,
		{delay: 1.0, x: 0, y: 0, z: 0});
}

// ミス!!
function onMissed(sensor, marker){
	// コンボ
	combo = 0;
	comboMng.setNum(combo);// スコア表示
}

// ヒット!!
function onHit(sensor, marker){

	// コンボ
	combo += 1;
	comboMng.setNum(combo);// スコア表示
	// スコア
	score += 10 + combo;
	scoreMng.setNum(score);// スコア表示

	// センサーとマーカーの反応
	sensor.jump();// ジャンプ(テスト)
	console.log(sensor.position);// センサーの座標
	console.log(marker.position);// マーカーの座標
	soundLoader.playSound(marker.sound, 0.2);// Sound

	// TODO: パーティクル
}

// アニメーションオブジェクト生成
function createTimeline(repeat=0, yoyo=false, onComplete=null){
	let tl = new TimelineMax({repeat: 0, yoyo: false, onComplete:onComplete});
	return tl;
}