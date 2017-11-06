console.log("Hello Three.js!!");

var width  = 480;
var height = 320;
var fov    = 60;
var aspect = width / height;
var near   = 1;
var far    = 1000;

// Scene
var scene = new THREE.Scene();

// Axes
var axes = new THREE.AxisHelper(20);
scene.add(axes);

// Stats
var stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = "absolute";
stats.domElement.style.left = "0px";
stats.domElement.style.top  = "0px";
document.getElementById("stage").appendChild(stats.domElement);

// Plane
var geometry = new THREE.PlaneGeometry(100, 200);
var material = new THREE.MeshBasicMaterial({color: 0x666666});
var plane = new THREE.Mesh(geometry, material);
plane.position.set(0, 0, 0);
plane.rotation.set(-90 * Math.PI / 180, 0, 0);
scene.add(plane);

// Camera
var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 100, 200);
camera.lookAt(scene.position);

// Light
var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0, 0.7, 0.7);
scene.add(directionalLight);

// Renderer
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(width, height);
renderer.setClearColor(0x333333);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById("stage").appendChild(renderer.domElement);

//==========
// Web Audio
navigator.getUserMedia = 
	navigator.getUserMedia || navigator.webkitGetUserMedia || 
	navigator.mozGetUserMedia || navigator.msGetUserMedia;

navigator.getUserMedia({audio : true}, onSuccess, onError);

function onSuccess(stream){
	console.log("onSuccess");

	document.querySelector("audio").src = URL.createObjectURL(stream);
	var audioContext = new AudioContext();
	var analyser     = audioContext.createAnalyser();
	var timeDomain   = new Float32Array(analyser.frequencyBinCount);
	var frequency    = new Uint8Array(analyser.frequencyBinCount);
	audioContext.createMediaStreamSource(stream).connect(analyser);

	//==========
	// 拍手を検出するクラス
	// 第一引数:次の拍手までの待機時間(ミリ秒)
	// 第二引数:反応する拍手音量の閾値
	var cManager = new CrapManager(1000, 100);

	loop();
	function loop(){
		// Analiser
		analyser.getFloatTimeDomainData(timeDomain);
		analyser.getByteFrequencyData(frequency);

		// Stats
		stats.update();

		// 拍手の判定
		if(cManager.trigger(timeDomain, frequency) == true){
			// Cubeを追加する
			addCube();
		}

		// Render
		renderer.render(scene, camera);
		// Request
		window.requestAnimationFrame(loop);
	}
}

function onError(e){
	console.log("onError:" + e);
}

//==========
// Cubeをランダムで配置する関数
function addCube(){
	var x = getRandom(-80, 80);
	var y = getRandom(0, 80);
	var z = getRandom(-80, 80);
	var cube = createCube(5, 0xffffff, x, y, z);
	scene.add(cube);
}

//==========
// Cubeを指定のサイズ、色、座標で作り出す関数
function createCube(size, color, x, y, z){
	var geometry = new THREE.BoxBufferGeometry(size, size, size);
	var material = new THREE.MeshBasicMaterial({color: 0xccffcc, wireframe: true});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	return mesh;
}

function getRandom(min, max){
	return Math.floor(Math.random()*(max-min+1))+min;
}

//==========
// CrapManager
class CrapManager{
	constructor(interTime, interThreshold){
		this.interTime      = interTime;
		this.interThreshold = interThreshold;
		this.interFlg       = false;
	}
	trigger(timeDomain, frequency){
		if(this.interFlg == true) return false;
		var offset = 30;
		var total  = Math.floor(frequency.length / offset);
		var volume = 0;
		for(var i=0; i<total; i+=offset){
			volume += frequency[i * offset];
		}
		if(volume < this.interThreshold) return false;
		this.interFlg = true;
		setInterval(()=>{this.interFlg = false;}, this.interTime);
		return true;
	}
}