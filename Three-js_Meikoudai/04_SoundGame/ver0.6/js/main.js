console.log("main.js!!");

let font     = null;    // フォント
let cam      = null;    // カメラコンテナ

let combo    = 0;   // コンボ
let comboMng = null;// コンボマネージャー
let score    = 0;   // スコア
let scoreMng = null;// スコアマネージャー

let comboChecker = [2, 4, 6, 8];
let scoreChecker = [100, 200, 300, 400];

// 背景の準備
function setScenery(){
	console.log("setScenery");

	// フォント, カメラ
	font = fontLoader.findFonts("MisakiGothic");
	cam = tm.getCameraContainer();

	score = 0;// リセット(スコア)
	combo = 0;// リセット(コンボ)

	// コンボマネージャー(サイズ, 間隔, 最大桁数)
	comboMng = new CounterManager(rootGroup, font, 2, 2, 2);
	comboMng.init(-5, 3, 8, -45);// x, y, z, x軸角度
	comboMng.setNum(combo);// コンボ表示

	// スコアマネージャー(サイズ, 間隔, 最大桁数)
	scoreMng = new CounterManager(rootGroup, font, 2, 2, 4);
	scoreMng.init(+5, 3, 8, -45);// x, y, z, x軸角度
	scoreMng.setNum(score);// スコア表示

	// アニメーションオブジェクト(繰り返し, ヨーヨー, 終了時関数)
	// let tl = createTimeline(-1, true, null);
	// tl.to(cam.position, 1.0, {delay: 0.2, x: 0,  y: 15, z: 15});// "0, 0, 0"はカメラ初期位置
	// tl.to(cam.position, 1.0, {delay: 3.0, x: +20, y: 20, z: 20}); 
	// tl.to(cam.position, 1.0, {delay: 3.0, x: -20, y: 20, z: 20});
	// tl.to(cam.position, 1.5, {});// 1.5秒何もしない
	// tl.to(cam.position, 3.0, {delay: 1.0, x: "+=5", y: "+=5", z: "+=5"});// 相対位置
	// tl.to(cam.position, 1.0, {delay: 1.0, x: "-=5", y: "-=5", z: "-=5"});

	// "rootGroup(背景)"に配置する
	let obj2 = objLoader.findModels("8x8x8.obj", 1.0);
	obj2.position.set(0, 0, -30);
	obj2.name = "noname";
	rootGroup.add(obj2);// 譜面に追加

	// "noteGroup(譜面)"に配置する
	let obj1 = objLoader.findModels("8x8x8.obj", 1.0);
	obj1.position.set(0, 5, -30);
	obj1.name = "noname";
	noteGroup.add(obj1);// 譜面に追加
}

// 音楽再生時
function onSeek(){
	console.log("onSeek");
}

// ミス!!
function onMissed(sensor, marker){
	// コンボ(リセット)
	combo = 0;
	comboMng.setNum(combo);// スコア表示
}

// ヒット!!
function onHit(sensor, marker){

	// センサーとマーカーの反応
	let distance = noteGroup.position.z + marker.position.z;
	console.log("ヒット距離:" + distance);

	let x = sensor.position.x;
	let y = sensor.position.y;
	let z = sensor.position.z;

	// Great!!, Good!!, Bad...
	if(distance < 0.8){
		showPopup(x, y, z, "logo_great.obj");// Great!!
	}else if(distance < 2.5){
		showPopup(x, y, z, "logo_good.obj"); // Good!!
	}else{
		showPopup(x, y, z, "logo_bad.obj");  // Bad...
	}
	
	soundLoader.playSound(marker.sound, 0.2);// Sound

	// コンボ
	combo += 1;
	comboMng.setNum(combo);// スコア表示

	// スコア
	score += 10 + combo;
	scoreMng.setNum(score);// スコア表示

	// 記録更新(コンボ)
	if(comboChecker[0] <= combo){
		console.log("コンボ更新:" + comboChecker[0]);
		comboChecker.splice(0, 1);
		// TODO: コンボ更新でオブジェクトを配置する!!
	}

	// 記録更新(スコア)
	if(0 < scoreChecker.length && scoreChecker[0] <= score){
		console.log("スコア更新:" + scoreChecker[0]);
		scoreChecker.splice(0, 1);
		// TODO: スコア更新でオブジェクトを配置する!!
	}
}

// ゲームクリア
function onEnd(){
	console.log("onEnd");

	// ゲームクリアロゴ
	let logo = objLoader.findModels("logo_finish.obj", 2.0);
	logo.position.set(0, 0, 0);
	logo.name = "logo_finish";
	rootGroup.add(logo);

	// アニメーションオブジェクト(繰り返し, ヨーヨー, 終了時関数)
	let tl = createTimeline(0, false, ()=>{
		// アニメーション終了時
		soundLoader.playSound("tap.mp3", 1.0);// Sound
		// ロゴを削除
		rootGroup.remove(logo);
	});
	// "logo"オブジェクトを2.0秒の時間をかけて、0.2秒後に0, 10, 0の座標に移動する
	tl.to(logo.position, 2.0, {delay: 0.2, x: 0, y: 10, z: 0});
	tl.to(logo.position, 10.0, {});

	// パーフェクト花火演出
	showFireworks(0, 5, 0, 10, 30);
}

// Great!!, Good!!, Bad...
function showPopup(x, y, z, obj){

	let logo = objLoader.findModels(obj, 2.0);
	logo.position.set(x, y, z);
	rootGroup.add(logo);

	// アニメーションオブジェクト(繰り返し, ヨーヨー, 終了時関数)
	let tl = createTimeline(0, false, ()=>{
		// アニメーション終了時
		soundLoader.playSound("tap.mp3", 1.0);// Sound
		// ロゴを削除
		rootGroup.remove(logo);
	});
	// "logo"オブジェクトを3.0秒の時間をかけて、1.0秒後に+0, +3, +0の座標に移動する
	tl.to(logo.position, 0.8, {delay: 0, x: "+=0", y: "+=3", z: "+=0"});
}

// Fireworks
function showFireworks(x, y, z, area=10, total=30){
	let fw = new Fireworks(rootGroup, x, y, z, area, total);
	fireworks.push(fw);
}

// コントローラー
window.addEventListener("keydown", (e)=>{
	let keyCode = e.keyCode;
	//console.log("keyDown:" + keyCode);
	if(keyCode == 49) sensors[0].jump();// 1
	if(keyCode == 50) sensors[1].jump();// 2
	if(keyCode == 51) sensors[2].jump();// 3
	if(keyCode == 52) sensors[3].jump();// 4
	if(keyCode == 53) sensors[4].jump();// 5
	if(keyCode == 54) sensors[5].jump();// 6
});

// アニメーションオブジェクト生成
function createTimeline(repeat=0, yoyo=false, onComplete=null){
	let tl = new TimelineMax({repeat:repeat, yoyo:yoyo, onComplete:onComplete});
	return tl;
}