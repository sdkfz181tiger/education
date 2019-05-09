console.log("utility.js!!");

//==========
// Character
//==========

const SIZE_FBX = 0.05;

function initFBXCharacter(modelFile){
	console.log("initFBXCharacter:" + modelFile);

	// Clock
	clock = new THREE.Clock();

	let loader = new THREE.FBXLoader();
	loader.load(modelFile, (fbx)=>{
		animationMixer = new THREE.AnimationMixer(fbx);
		let action = animationMixer.clipAction(fbx.animations[0]);
		action.play();
		fbx.traverse((child)=>{
			if(child.isMesh){
				child.castShadow = true;
				child.receiveShadow = true;
			}
		});
		fbx.position.set(0, 0, 0);
		fbx.scale.set(SIZE_FBX, SIZE_FBX, SIZE_FBX);
		fbx.rotation.set(0, Math.PI, 0);
		scene.add(fbx);

		console.log(fbx);
	});
}