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

	console.log("frequency:" + frequency.length);

	loop();
	function loop(){
		analyser.getFloatTimeDomainData(timeDomain);
		analyser.getByteFrequencyData(frequency);
		// update
		updateThree(timeDomain, frequency);
		window.requestAnimationFrame(loop);
	}
}

function onError(e){
	console.log("onError:" + e);
}

// Points
var points;

// Draw
function updateThree(timeDomain, frequency){

	// Stats
	stats.update();

	// Remove Points
	if(points != null) scene.remove(points);

	// Particles
	var geom = new THREE.Geometry();
	var material = new THREE.PointsMaterial({
		color: 0xffffff, size: 2, vertexColors: true, transparent: true, opacity: 1.0
	});

	var paddingX = 2;  // パーティクルの間隔
	var offset   = 4;  // 1024を4分割
	var total    = Math.floor(frequency.length / offset);

	var minX     = total * paddingX / -2;  // 開始位置x
	var maxY     = 100;// 最大の高さy

	console.log(total);

	for(var i=0; i<total; i++){

		var particle = new THREE.Vector3(
			minX + i * paddingX,
			Math.max(0, frequency[i*offset] * maxY / 255), 0);
		geom.vertices.push(particle);

		var color = new THREE.Color(0x00ff00);
		color.setHSL(color.getHSL().h, color.getHSL().s, color.getHSL().l);
		geom.colors.push(color);
	}

	// Add Points
	points = new THREE.Points(geom, material);
	scene.add(points);

	// Render
	renderer.render(scene, camera);
}