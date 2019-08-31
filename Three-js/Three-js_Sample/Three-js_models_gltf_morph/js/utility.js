console.log("utility.js!!");

const STATES = ["Idle", "Walking", "Running", "Dance", "Death", "Sitting", "Standing"];
const EMOTES = ["Jump", "Yes", "No", "Wave", "Punch", "ThumbsUp"];

// GLTF
let api            = {state:STATES[0]};
let animationMixer = null;
let activeAction   = null;
let previousAction = null;

//==========
// Character
//==========

function initGLTFCharacter(modelFile){
	console.log("initGLTFCharacter:" + modelFile);

	// GLTF
	var loader = new THREE.GLTFLoader();
	loader.load(modelFile, (model)=>{
		let gltf       = model.scene;
		let animations = model.animations;
		scene.add(gltf);
		ready(gltf, animations);
	}, undefined, (e)=>{
		console.log(e);
	});
}

function ready(gltf, animations){
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

	// Active
	activeAction = actions[STATES[0]];
	activeAction.play();

	// Buttons
	$(".btnStates").click((e)=>{
		let index = $(e.target).attr("index");
		changeAction(actions[STATES[index]]);
	});

	$(".btnEmotes").click((e)=>{
		let index = $(e.target).attr("index");
		changeAction(actions[EMOTES[index]]);
	});
}

function changeAction(action){
	previousAction = activeAction;
	activeAction   = action;
	if(activeAction !== previousAction){
		previousAction.fadeOut(0.5);
	}

	activeAction.reset()
					.setEffectiveTimeScale(1)
					.setEffectiveWeight(1)
					.fadeIn(0.5)
					.play();
}