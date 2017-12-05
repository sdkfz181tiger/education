console.log("Hello Three.js!!");

// Physijs
Physijs.scripts.worker = './libs/physi-js/physijs_worker.js';
Physijs.scripts.ammo   = './ammo.js';

//==========
// Handling

// For touching and moving
let blockSelected  = null;
let blockOffset    = new THREE.Vector3();
let mousePosition  = new THREE.Vector3();
let mouseVelocity  = new THREE.Vector3();

function initEventHandling(){

	// Intersect
	let intersectPlane = new THREE.Mesh(
		new THREE.PlaneGeometry(150, 150),
		new THREE.MeshBasicMaterial({opacity: 0.1, transparent: true})
	);
	intersectPlane.rotation.x = Math.PI / 2 * -1;
	scene.add(intersectPlane);

	// Vector
	let _vector = new THREE.Vector3,
		handleMouseDown, handleMouseMove, handleMouseUp;
	
	handleMouseDown = function(evt){
		let ray, intersections;
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
			intersectPlane.position.y = mousePosition.y;
		}
	};
	
	handleMouseMove = function(evt){
		let ray, intersection,
			i, scalar;
		if(blockSelected !== null){
			_vector.set((evt.clientX / width) * 2 - 1, -(evt.clientY / height) * 2 + 1, 1);
			_vector.unproject(camera);
			ray = new THREE.Raycaster(camera.position, _vector.sub(camera.position).normalize());
			intersection = ray.intersectObject(intersectPlane);
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

function loopEventHandling(){

	if(blockSelected !== null){
		// Verocity
		mouseVelocity.copy(mousePosition).add(blockOffset).sub(blockSelected.position).multiplyScalar(5);
		mouseVelocity.y = 0;
		blockSelected.setLinearVelocity(mouseVelocity);
		
		// Reactivate all of the blocks
		mouseVelocity.set(0, 0, 0);
		for (let i = 0; i<blocks.length; i++) {
			blocks[i].applyCentralImpulse(mouseVelocity);
		}
	}
}