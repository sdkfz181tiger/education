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
	<script src="../js/loaders/OBJLoader.js"></script>
	<script src="../js/loaders/MTLLoader.js"></script>
	<script src="../../tween-js/Tween.min.js"></script>
	<script src="../../physi-js/physi.js"></script>
	<script>

		// Physijs
		Physijs.scripts.worker = '../../physi-js/physijs_worker.js';
		Physijs.scripts.ammo   = '../physi-js/ammo.js';

		var width  = 800;
		var height = 800;
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
		var floor    = new Physijs.BoxMesh(geometry, material);
		floor.position.set(0, 0, 0);
		scene.add(floor);

		// MTLLoader
		var mtlLoader = new THREE.MTLLoader();
		mtlLoader.setPath("../models/");
		mtlLoader.load("tanuki.mtl", function(materials){
			materials.preload();

			// OBJLoader
			var objLoader = new THREE.OBJLoader();
			objLoader.setPath("../models/");
			objLoader.setMaterials(materials);
			objLoader.load("tanuki.obj", function(meshes){
				meshes.children.forEach(function(mesh){
					mesh.geometry.computeFaceNormals();
					mesh.geometry.computeVertexNormals();
				});
				meshes.scale.set(1, 1, 1);
				meshes.rotation.set(0, Math.PI, 0);
				meshes.position.set(0, 0, 0);
				scene.add(meshes);
			});
		});

		// TextureLoader
		var txLoader = new THREE.TextureLoader();

		txLoader.load("../images/wood.jpg", function(texture){
			for(var y=0; y<10; y++){
				for(var x=-1; x<2; x++){
					var geometry = new THREE.BoxGeometry(10, 5, 30);
					var material = new THREE.MeshBasicMaterial({map:texture, overdraw:0.5});
					var block    = new Physijs.BoxMesh(geometry, material);
					if(y%2 == 0){
						block.position.set(
							paddingX * x, 
							paddingY * y + paddingY * 0.5,
							0);
					}else{
						block.position.set(
							0, 
							paddingY * y + paddingY * 0.5,
							paddingX * x);
						block.rotation.set(0, Math.PI/2, 0);
					}
					scene.add(block);
					blocks.push(block);
				}
			}
		});

		// Block
		var blocks   = new Array();
		var paddingX = 10;
		var paddingY = 5;
		var paddingZ = 30;

		// TextureLoader
		var txLoader = new THREE.TextureLoader();

		// Camera
		var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
		camera.position.set(50, 100, 100);
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

		// For touching and moving
		var blockSelected  = null;
		var blockOffset    = new THREE.Vector3();
		var mousePosition  = new THREE.Vector3();
		var mouseVelocity  = new THREE.Vector3();

		var intersect_plane = new THREE.Mesh(
			new THREE.PlaneGeometry( 150, 150 ),
			new THREE.MeshBasicMaterial({ opacity: 0, transparent: true})
		);
		intersect_plane.rotation.x = Math.PI / 2 * -1;
		scene.add(intersect_plane);

		// Loop
		loop();
		function loop(){

			// Stats
			stats.update();

			if(blockSelected !== null){
				// Verocity
				mouseVelocity.copy(mousePosition).add(blockOffset).sub(blockSelected.position).multiplyScalar(5);
				mouseVelocity.y = 0;
				blockSelected.setLinearVelocity(mouseVelocity);
				
				// Reactivate all of the blocks
				mouseVelocity.set(0, 0, 0);
				for (var i = 0; i<blocks.length; i++) {
					blocks[i].applyCentralImpulse(mouseVelocity);
				}
			}

			// Physijs
			scene.simulate();

			renderer.render(scene, camera);
			window.requestAnimationFrame(loop);
		};

		// Handling
		initEventHandling();
		function initEventHandling(){
			// Vector
			var _vector = new THREE.Vector3,
				handleMouseDown, handleMouseMove, handleMouseUp;
			
			handleMouseDown = function(evt){
				var ray, intersections;
				_vector.set((evt.clientX / width) * 2 - 1, -(evt.clientY / height) * 2 + 1, 1);
				_vector.unproject(camera);
				ray = new THREE.Raycaster( camera.position, _vector.sub(camera.position).normalize());
				intersections = ray.intersectObjects(blocks);
				if(intersections.length > 0){
					blockSelected = intersections[0].object;

					_vector.set(0, 0, 0);
					blockSelected.setAngularFactor(_vector);
					blockSelected.setAngularVelocity(_vector);
					blockSelected.setLinearFactor(_vector);
					blockSelected.setLinearVelocity(_vector);

					mousePosition.copy(intersections[0].point);
					blockOffset.subVectors(blockSelected.position, mousePosition);
					intersect_plane.position.y = mousePosition.y;
				}
			};
			
			handleMouseMove = function(evt){
				var ray, intersection,
					i, scalar;
				if(blockSelected !== null){
					_vector.set((evt.clientX / width) * 2 - 1, -(evt.clientY / height) * 2 + 1, 1);
					_vector.unproject(camera);
					ray = new THREE.Raycaster(camera.position, _vector.sub(camera.position).normalize());
					intersection = ray.intersectObject(intersect_plane);
					if(intersection.length > 0){
						mousePosition.copy(intersection[0].point);
					}
				}
			};
			
			handleMouseUp = function(evt){
				if(blockSelected !== null){
					_vector.set(1, 1, 1);
					blockSelected.setAngularFactor(_vector);
					blockSelected.setLinearFactor(_vector);
					blockSelected = null;
				}
			};
			
			renderer.domElement.addEventListener("mousedown", handleMouseDown);
			renderer.domElement.addEventListener("mousemove", handleMouseMove);
			renderer.domElement.addEventListener("mouseup",   handleMouseUp);
		};
	</script>
</body>
</html>