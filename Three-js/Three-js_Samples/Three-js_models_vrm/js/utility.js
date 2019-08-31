console.log("utility.js!!");

//==========
// Character
//==========

function initVRMCharacter(modelFile){
	console.log("initVRMCharacter:" + modelFile);

	// VRM
	let loader = new THREE.VRMLoader();
	loader.load(modelFile, (vrm)=>{
		// VRMLoader doesn't support VRM Unlit extension yet so
		// converting all materials to MeshBasicMaterial here as workaround so far.
		vrm.scene.traverse((obj)=>{
			if(obj.material){
				// Array or not
				if(Array.isArray(obj.material)){
					for (let i=0, il=obj.material.length; i<il; i++){
						let material = new THREE.MeshBasicMaterial();
						THREE.Material.prototype.copy.call(material, obj.material[i]);
						material.color.copy(obj.material[i].color);
						material.map = obj.material[i].map;
						material.lights = false;
						material.skinning = obj.material[i].skinning;
						material.morphTargets = obj.material[i].morphTargets;
						material.morphNormals = obj.material[i].morphNormals;
						obj.material[i] = material;
					}
				}else{
					var material = new THREE.MeshBasicMaterial();
					THREE.Material.prototype.copy.call(material, obj.material);
					material.color.copy(obj.material.color);
					material.map = obj.material.map;
					material.lights = false;
					material.skinning = obj.material.skinning;
					material.morphTargets = obj.material.morphTargets;
					material.morphNormals = obj.material.morphNormals;
					obj.material = material;
				}
			}
			scene.add(vrm.scene);
		});

		console.log(vrm);
	});
}