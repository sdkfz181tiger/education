console.log("utility.js!!");

// Effect
let effect    = null;

// Clock, Helper
let clock     = null;
let helper    = null;
let phyHelper = null;
let ikHelper  = null;

// MMD
let mmd       = null;

//==========
// Character
//==========

function initMMDCharacter(modelFile, vmdFiles){

	// Effect
	effect = new THREE.OutlineEffect(renderer);

	// Pronama
	clock = new THREE.Clock();
	helper = new THREE.MMDHelper();

	let loader = new THREE.MMDLoader();

	// ModelData
	loader.loadModel(modelFile, (mesh)=>{
		console.log("Loaded:" + modelFile);

		// MMD
		mmd = mesh;

		// Add to scene
		mmd.position.set(3, 1, -13);
		scene.add(mmd);

		// Load vmds
		if(vmdFiles != null && 0 < vmdFiles.length){
			loadVmdsChain();
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

	// Load vmds
	function loadVmdsChain(index=0){
		console.log("loadVmdsChain:" + index);

		// VMD
		loader.loadVmd(vmdFiles[index].name, (vmd)=>{
			console.log("Loaded:" + vmdFiles[index].name);

			// Create
			loader.createAnimation(mmd, vmd, vmdFiles[index].name);

			// Next
			if(index < vmdFiles.length-1){
				loadVmdsChain(++index);
			}else{
				initHelper();
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
	function initHelper(){
		console.log("initHelper");

		// Helper
		helper.add(mmd);
		helper.setAnimation(mmd);
		helper.setPhysics(mmd);

		ikHelper = new THREE.CCDIKHelper(mmd);
		ikHelper.visible = false;
		scene.add(ikHelper);

		physicsHelper = new THREE.MMDPhysicsHelper(mmd);
		physicsHelper.visible = false;
		scene.add(physicsHelper);

		helper.unifyAnimationDuration({afterglow: 2.0});
	}
}

function updateMMD(){
	if(helper != null) helper.animate(clock.getDelta());
	if(phyHelper != null && phyHelper !== undefined && phyHelper.visible) phyHelper.update();
	if(ikHelper != null && ikHelper !== undefined && ikHelper.visible) ikHelper.update();
	if(effect != null) effect.render(scene, camera);
}

// Change
function changeAction(name){

	if(mmd == null) return;

	for(let i=0; i<mmd.geometry.animations.length; ++i){

		if(mmd.geometry.animations[i].name === name){

			mmd.mixer.stopAllAction();

			// Bone
			let clipA = mmd.geometry.animations[i];
			let actionA = mmd.mixer.clipAction(clipA);
			actionA.repetitions = 0;
			actionA.reset(); actionA.play();
			
			// Morph
			let clipB = mmd.geometry.animations[i+1];
			let actionB = mmd.mixer.clipAction(clipB);
			actionB.repetitions = 0;
			actionB.reset(); actionB.play();
		} 
	}
}

//==========
// Scene
//==========

function initMMDScene(modelFile){

	let loader = new THREE.MMDLoader();

	// ModelData
	loader.loadModel(modelFile, (mesh)=>{
		console.log("Loaded:" + modelFile);

		// Add to scene
		mesh.position.set(0, 0, 0);
		scene.add(mesh);

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