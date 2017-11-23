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
	<script src="../js/loaders/MMDLoader.js"></script>
	<script src="../js/effects/OutlineEffect.js"></script>
	<script src="../js/animation/CCDIKSolver.js"></script>
	<script src="../js/animation/MMDPhysics.js"></script>


		<script src="../js/animation/CCDIKSolver.js"></script>
		<script src="../js/animation/MMDPhysics.js"></script>

	<script src="../tween-js/Tween.min.js"></script>
	<script src="../physi-js/physi.js"></script>
	<script>

		

			var container, stats;

			var mesh, camera, scene, renderer, effect;
			var helper, ikHelper, physicsHelper;

			var mouseX = 0, mouseY = 0;

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;

			var clock = new THREE.Clock();

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.z = 30;

				// scene

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xffffff );

				var gridHelper = new THREE.PolarGridHelper( 30, 10 );
				gridHelper.position.y = -10;
				scene.add( gridHelper );

				var ambient = new THREE.AmbientLight( 0x666666 );
				scene.add( ambient );

				var directionalLight = new THREE.DirectionalLight( 0x887766 );
				directionalLight.position.set( -1, 1, 1 ).normalize();
				scene.add( directionalLight );

				//

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				effect = new THREE.OutlineEffect( renderer );

				// STATS

				stats = new Stats();
				container.appendChild( stats.dom );

				// model

				var onProgress = function ( xhr ) {
					if ( xhr.lengthComputable ) {
						var percentComplete = xhr.loaded / xhr.total * 100;
						console.log( Math.round(percentComplete, 2) + '% downloaded' );
					}
				};

				var onError = function ( xhr ) {
				};

				var modelFile = '../models/mmd/pronama/pronama.pmx';
				var vmdFiles = [ '../models/mmd/vmds/wavefile_v2.vmd' ];

				helper = new THREE.MMDHelper();

				var loader = new THREE.MMDLoader();

				loader.load( modelFile, vmdFiles, function ( object ) {
					console.log("Ha?");
					mesh = object;
					mesh.position.y = -10;
					scene.add( mesh );

					helper.add( mesh );
					helper.setAnimation( mesh );

					/*
					 * Note: create CCDIKHelper after calling helper.setAnimation()
					 */
					ikHelper = new THREE.CCDIKHelper( mesh );
					ikHelper.visible = false;
					scene.add( ikHelper );

					/*
					 * Note: You're recommended to call helper.setPhysics()
					 *       after calling helper.setAnimation().
			 		 */
					helper.setPhysics( mesh );
					physicsHelper = new THREE.MMDPhysicsHelper( mesh );
					physicsHelper.visible = false;
					scene.add( physicsHelper );

					helper.unifyAnimationDuration( { afterglow: 2.0 } );

					//initGui();

				}, onProgress, onError );

			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				effect.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );

				stats.begin();
				render();
				stats.end();

			}

			function render() {

				helper.animate( clock.getDelta() );
				if ( physicsHelper !== undefined && physicsHelper.visible ) physicsHelper.update();
				if ( ikHelper !== undefined && ikHelper.visible ) ikHelper.update();
				effect.render( scene, camera );

			}



	</script>
</body>
</html>