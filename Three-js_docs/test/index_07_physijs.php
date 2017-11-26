<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="utf-8">
	<title>Hello Three.js</title>
	<style>
	body{
		margin: 0;
		overflow: hidden;
	}
	</style>
</head>
<body>
	<div id="stage"></div>
	<script src="../three.min.js"></script>
	<script src="../js/libs/stats.min.js"></script>
    <script src="../js/renderers/Projector.js"></script>
	<script src="../js/loaders/TGALoader.js"></script>
	<script src="../../tween-js/Tween.min.js"></script>
	<script src="../../physi-js/physi.js"></script>
	<script>

		// Physijs
		Physijs.scripts.worker = '../../physi-js/physijs_worker.js';
		Physijs.scripts.ammo   = '../physi-js/ammo.js';

		var width  = window.innerWidth;
		var height = window.innerHeight;
		var fov    = 60;
		var aspect = width / height;
		var near   = 1;
		var far    = 1000;

		// Scene
		var scene = new Physijs.Scene();
		scene.setGravity(new THREE.Vector3(0, -10, 0));

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

		// Floor
		var geometry = new THREE.BoxGeometry(100, 0, 100);
		var material = new THREE.MeshBasicMaterial({color: 0xcccccc});
		var floor = new Physijs.BoxMesh(geometry, material);
		floor.position.set(0, 0, 0);
		scene.add(floor);

		// Cube
		var geometry = new THREE.BoxGeometry(10, 10, 10);
		var material = new THREE.MeshBasicMaterial({color: 0x66ff66});
		var cube = new Physijs.BoxMesh(geometry, material);
		cube.position.set(0, 30, 0);
		scene.add(cube);

		// TextureLoader
		var txLoader = new THREE.TextureLoader();

		// Earth
		var earth = null;
		txLoader.load("../images/earth.jpg", function(texture){
			var geometry = new THREE.SphereGeometry(30, 30, 30);
			var material = new THREE.MeshBasicMaterial({map:texture, overdraw:0.5});
			earth = new Physijs.SphereMesh(geometry, material);
			earth.position.set(0, 120, 0);
			scene.add(earth);
		});

		// Moon
		var moon = null;
		txLoader.load("../images/moon.jpg", function(texture){
			var geometry = new THREE.SphereGeometry(10, 10, 10);
			var material = new THREE.MeshBasicMaterial({map:texture, overdraw:0.5});
			moon = new Physijs.SphereMesh(geometry, material);
			moon.position.set(0, 60, 0);
			scene.add(moon);
		});

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

		// Loop
		loop();
		function loop(){

			// Stats
			stats.update();

			// Physijs
			scene.simulate();

			renderer.render(scene, camera);
			window.requestAnimationFrame(loop);
		};

		// Projector
		var projector = new THREE.Projector();
		document.addEventListener("mousedown", function(e){
			var vector = new THREE.Vector3(
				(e.clientX / width) * 2 - 1,
				-(e.clientY / height) * 2 + 1,
				0.5);
			vector = vector.unproject(camera);

			var raycaster = new THREE.Raycaster(
				camera.position, vector.sub(camera.position).normalize());
			var intersects = raycaster.intersectObjects([cube, earth, moon]);
			console.log(intersects);

			if(intersects.length > 0){
				intersects[0].object.material.transparent = true;
				intersects[0].object.material.opacity = 0.5;
			}
		}, false);
	</script>
</body>
</html>