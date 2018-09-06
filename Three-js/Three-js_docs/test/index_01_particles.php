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
	<script src="../js/loaders/TGALoader.js"></script>
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

		// Particles
		var geom = new THREE.Geometry();
		var material = new THREE.PointsMaterial({color: 0xffffff, size: 4, vertexColors: true});
		for(var x=0; x<10; x++){
			for(var y=0; y<10; y++){
				var particle = new THREE.Vector3(x*10, y*10, 0);
				geom.vertices.push(particle);
				geom.colors.push(new THREE.Color(Math.random() * 0x00ffff));
			}
		}
		var points = new THREE.Points(geom, material);
		scene.add(points);

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

			renderer.render(scene, camera);
			window.requestAnimationFrame(loop);
		};
	</script>
</body>
</html>