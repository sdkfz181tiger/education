console.log("Hello Three.js!!");

// Effect
let effect    = null;

// Clock, Helper
let clock     = null;
let helper    = null;
let phyHelper = null;
let ikHelper  = null;

function initMMD(modelFile, vmdFiles){

	// Effect
	effect = new THREE.OutlineEffect(renderer);

	// Pronama
	clock = new THREE.Clock();
	helper = new THREE.MMDHelper();

	let loader = new THREE.MMDLoader();

	// ModelData
	loader.loadModel(modelFile, (mesh)=>{
		console.log("Loaded:" + modelFile);

		// Add to scene
		mesh.position.set(0, 0, 0);
		scene.add(mesh);

		// Load vmds
		loadVmdsChain(mesh);

	}, (e)=>{
		// onProgress
		if(e.lengthComputable){
			let percentComplete = e.loaded / e.total * 100;
			console.log(Math.round(percentComplete, 2) + "% downloaded");
		}
	}, (e)=>{
		// onEffor
		console.log("onError:" + e);
	});

	// Load vmds
	function loadVmdsChain(mesh, index=0){
		console.log("loadVmdsChain:" + index);

		// VMD
		loader.loadVmd(vmdFiles[index].path, (vmd)=>{
			console.log("Loaded:" + vmdFiles[index].name + ", " +  vmdFiles[index].path);

			loader.createAnimation(mesh, vmd, vmdFiles[index].name);

			// Next
			if(index < vmdFiles.length-1){
				loadVmdsChain(mesh, ++index);
			}else{
				loadVmdsCompleted(mesh);
			}

		}, (e)=>{
			// onProgress
			if(e.lengthComputable){
				let percentComplete = e.loaded / e.total * 100;
				console.log(Math.round(percentComplete, 2) + "% downloaded");
			}
		}, (e)=>{
			// onEffor
			console.log("onError:" + e);
		});
	}

	// Completed vmds
	function loadVmdsCompleted(mesh){
		console.log("loadVmdsCompleted");

		// Helper
		helper.add(mesh);
		helper.setAnimation(mesh);
		helper.setPhysics(mesh);

		ikHelper = new THREE.CCDIKHelper(mesh);
		ikHelper.visible = false;
		scene.add(ikHelper);

		physicsHelper = new THREE.MMDPhysicsHelper(mesh);
		physicsHelper.visible = false;
		scene.add(physicsHelper);

		helper.unifyAnimationDuration({afterglow: 2.0});

		// UI
		for(let i=0; i<vmds.length; i++){
			$(vmds[i].id).click((e)=>{
				console.log("Click:" + vmds[i].id);
				changeAction(mesh, vmds[i].name);
			});
		}
	}

	// Change
	function changeAction(mesh, name){



		for(let i=0; i<mesh.geometry.animations.length; ++i){
			if(mesh.geometry.animations[i].name === name){

				mesh.mixer.stopAllAction();

				// Bone
				let clipA = mesh.geometry.animations[i];
				let actionA = mesh.mixer.clipAction(clipA);
				actionA.repetitions = 0;
				actionA.reset(); actionA.play();
				// Morph
				let clipB = mesh.geometry.animations[i+1];
				let actionB = mesh.mixer.clipAction(clipB);
				actionB.repetitions = 0;
				actionB.reset(); actionB.play();
			} 
		}
	}
}

function updateMMD(){
	if(helper != null) helper.animate(clock.getDelta());
	if(phyHelper != null && phyHelper !== undefined && phyHelper.visible) phyHelper.update();
	if(ikHelper != null && ikHelper !== undefined && ikHelper.visible) ikHelper.update();
	if(effect != null) effect.render(scene, camera);
}