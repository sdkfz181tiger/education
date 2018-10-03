console.log("utility.js!!");

// Promise
function asyncPromise(path, mtl, obj){
	return new Promise((resolve, reject)=>{
		// MTLLoader
		let mtlLoader = new THREE.MTLLoader();
		mtlLoader.setPath(path);
		mtlLoader.load(mtl, (materials)=>{
			console.log("onLoaded:" + mtl);
			materials.preload();
			// OBJLoader
			let objLoader = new THREE.OBJLoader();
			objLoader.setPath(path);
			objLoader.setMaterials(materials);
			objLoader.load(obj, (meshes)=>{
				meshes.children.forEach((mesh)=>{
					mesh.geometry.computeFaceNormals();
					mesh.geometry.computeVertexNormals();
				});
				meshes.scale.set(1, 1, 1);
				meshes.rotation.set(0, Math.PI, 0);
				meshes.position.set(0, 0, 0);
				resolve(meshes);// Resolve
			});
		}, (progress)=>{
			console.log("onProgress");
		}, (error)=>{
			console.log("onError:" + error);
			reject(error);// Reject
		});
	});
}