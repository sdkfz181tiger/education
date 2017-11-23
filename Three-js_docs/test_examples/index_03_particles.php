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

		// Texture
		var txLoader = new THREE.TextureLoader();
		var texture = txLoader.load("../images/c_tanuki.png");

		// Particles
		var geom = new THREE.Geometry();
		var material = new THREE.PointsMaterial({
			color: 0xffffff, size: 30, vertexColors: true, transparent: true, opacity: true,
			map: texture, depthWrite: false
		});

		var range = 100;
		for(var i=0; i<10; i++){
			var x = Math.floor(Math.random() * range);
			var y = Math.floor(Math.random() * range);
			var particle = new THREE.Vector3(x, y, 0);
			geom.vertices.push(particle);
			var color = new THREE.Color(0xffffff);
			color.setHSL(color.getHSL().h, color.getHSL().s, color.getHSL().l);
			geom.colors.push(color);
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
		var renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
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