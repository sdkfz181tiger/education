console.log("Hello Three.js!!");

function initMMD(modelFile, vmdFiles){

	let loader = new THREE.MMDLoader();
	loader.load(modelFile, vmdFiles, function(obj){
		console.log("Loaded!!");
		obj.position.y = 0;
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

	}, (e)=>{
		// onProgress
		if (e.lengthComputable){
			let percentComplete = e.loaded / e.total * 100;
			console.log(Math.round(percentComplete, 2) + "% downloaded");
		}
	}, (e)=>{
		// onEffor
		console.log("onError:" + e);
	});
}