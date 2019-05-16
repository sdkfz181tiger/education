console.log("utility.js!!");

//==========
// Character
//==========

// FbxLoader
class FbxLoader{

	constructor(){
		console.log("FbxLoader");
	}

	loadModels(models, onSuccess, onError){
		let promises = [];
		for(let i=0; i<models.data.length; i++){
			let data = models.data[i];
			promises.push(
				this.asyncModel(data.dir, data.fbx));
		}
		Promise.all(promises).then((results)=>{
			this._models = results;// Models
			onSuccess();
		}, (error)=>{
			console.log(error);
			onError();
		});
	}

	showModel(name){
		for(let i=0; i<this._models.length; i++){
			if(this._models[i].name == name){
				this._models[i].visible = true;
				this._models[i].action.play();// Play
			}else{
				this._models[i].visible = false;
				this._models[i].action.stop();// Stop
			}
		}
	}

	getAllModels(){
		return this._models;
	}

	asyncModel(dir, fbx){
		return new Promise((resolve, reject)=>{
			// FBXLoader
			let loader = new THREE.FBXLoader();
			let path = dir + fbx;
			loader.load(path, (meshes)=>{
				let animationMixer = new THREE.AnimationMixer(meshes);
				let action = animationMixer.clipAction(meshes.animations[0]);
				//action.play();// Default
				meshes.traverse((child)=>{
					if(child.isMesh){
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});
				meshes.position.set(0, 0, 0);
				meshes.scale.set(SIZE_FBX, SIZE_FBX, SIZE_FBX);
				meshes.rotation.set(0, Math.PI, 0);
				meshes.name = fbx;// Name
				meshes.animationMixer = animationMixer;// AnimationMixer
				meshes.action = action;// Action
				resolve(meshes);       // Resolve
			}, (progress)=>{
				//console.log("onProgress");
			}, (error)=>{
				console.log("onError:" + error);
				reject(error);// Reject
			});
		});
	}
}