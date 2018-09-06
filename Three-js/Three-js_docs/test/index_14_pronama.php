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
	<script src="../js/libs/mmdparser.min.js"></script>
	<script src="../js/libs/ammo.js"></script>
	<script src="../js/renderers/Projector.js"></script>
	<script src="../js/loaders/TGALoader.js"></script>
	<script src="../js/loaders/OBJLoader.js"></script>
	<script src="../js/loaders/MTLLoader.js"></script>
	<script src="../js/loaders/MMDLoader.js"></script>
	<script src="../js/effects/OutlineEffect.js"></script>
	<script src="../js/animation/CCDIKSolver.js"></script>
	<script src="../js/animation/MMDPhysics.js"></script>

	<script>

		var width  = 480;
		var height = 320;
		var fov    = 60;
		var aspect = width / height;
		var near   = 1;
		var far    = 100;

		// Scene
		var scene = new THREE.Scene();
		scene.background = new THREE.Color(0x333333);

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

		var modelFile = '../models/mmd/pronama/pronama.pmx';
		var vmdFiles  = ['../models/mmd/vmds/wavefile_v2.vmd'];

		var clock = new THREE.Clock();
		var helper = new THREE.MMDHelper();
		var physicsHelper, ikHelper;

		var loader = new THREE.MMDLoader();
		loader.load( modelFile, vmdFiles, function (obj){
			console.log("Loaded!!");
			obj.position.y = -7;
			scene.add(obj);

			// Helper
			helper.add(obj);
			helper.setAnimation(obj);

			/*
			 * Note: create CCDIKHelper after calling helper.setAnimation()
			 */
			ikHelper = new THREE.CCDIKHelper(obj);
			ikHelper.visible = false;
			scene.add(ikHelper);

			/*
			 * Note: You're recommended to call helper.setPhysics()
			 *       after calling helper.setAnimation().
	 		 */
			helper.setPhysics(obj);
			physicsHelper = new THREE.MMDPhysicsHelper(obj);
			physicsHelper.visible = false;
			scene.add(physicsHelper);

			helper.unifyAnimationDuration({afterglow: 2.0});

		}, onProgress, onError);

		var onProgress = function(e){
			if (e.lengthComputable){
				var percentComplete = e.loaded / e.total * 100;
				console.log(Math.round(percentComplete, 2) + "% downloaded");
			}
		};

		var onError = function(e){
			console.log("onError:" + e);
		};

		// Camera
		var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
		camera.position.set(0, 5, 28);
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

		// Effect
		var effect = new THREE.OutlineEffect( renderer );

		// Loop
		loop();
		function loop(){

			// Stats
			stats.update();

			// Pronama
			helper.animate(clock.getDelta());
			if(physicsHelper !== undefined && physicsHelper.visible) physicsHelper.update();
			if(ikHelper !== undefined && ikHelper.visible) ikHelper.update();
			effect.render(scene, camera);

			renderer.render(scene, camera);
			window.requestAnimationFrame(loop);
		};
	</script>
</body>
</html>