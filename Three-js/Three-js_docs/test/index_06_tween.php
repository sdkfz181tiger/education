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
	<script>
		var width  = window.innerWidth;
		var height = window.innerHeight;
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

		// TextureLoader
		var txLoader = new THREE.TextureLoader();

		// Tween
		var tween = new TWEEN.Tween({y: 50}).to({y: 0}, 1000).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function(){
			// Position
			moon.position.set(0, this.y, 0);
		});

		// Moon
		var moon = null;
		txLoader.load("../images/moon.jpg", function(texture){
			var geometry = new THREE.SphereGeometry(5, 5, 5);
			var material = new THREE.MeshBasicMaterial({map:texture, overdraw:0.5});
			moon = new THREE.Mesh(geometry, material);
			moon.position.set(0, 50, 0);
			scene.add(moon);

			tween.start();
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

			// Tween
			TWEEN.update();

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
			var intersects = raycaster.intersectObjects([moon]);
			if(intersects.length > 0){
				intersects[0].object.material.transparent = true;
				intersects[0].object.material.opacity = 0.5;
			}
		}, false);
	</script>
</body>
</html>