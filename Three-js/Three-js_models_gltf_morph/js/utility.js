console.log("utility.js!!");

const STATES = ['Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing'];
const EMOTES = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp'];

// GLTF
let gltf           = null;
let animations     = null;
let api            = {state:STATES[0]};
let activeAction   = null;
let animationMixer = null;

//==========
// Character
//==========

function initGLTFCharacter(modelFile){
	console.log("initGLTFCharacter:" + modelFile);

	// GLTF
	var loader = new THREE.GLTFLoader();
	loader.load(modelFile, (model)=>{
		gltf       = model.scene;
		animations = model.animations;
		scene.add(gltf);
		createScene();
	}, undefined, (e)=>{
		console.log(e);
	});
}

function createScene(){
	console.log("createScene");
	// AnimationMixer
	animationMixer = new THREE.AnimationMixer(gltf);
	let actions = {};
	for(let i=0; i<animations.length; i++){
		let clip   = animations[i];
		let action = animationMixer.clipAction(clip);
		actions[clip.name] = action;
		if(0 <= EMOTES.indexOf(clip.name) || 4 <= STATES.indexOf(clip.name)){
			action.clampWhenFinished = true;
			action.loop = THREE.LoopOnce;
		}
	}

	console.log(actions);

	// Active
	activeAction = actions[STATES[0]];
	activeAction.reset()
					.setEffectiveTimeScale(1)
					.setEffectiveWeight(1)
					.fadeIn(0.5)
					.play();

	console.log(activeAction);
}