//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

const SOUND_BGM     = "./sounds/bgm_1.mp3";
const SOUND_VOLUME  = 1.0;// 0.0 ~ 1.0
const TIME_TO_PIXEL = 20;

const noteData = {
	"n1": [0.5, 1.3, 2.5, 2.7, 2.9],
	"n2": [0.2, 0.8, 1.8, 3.4, 3.8],
	"n3": [0.5, 1.0, 1.5, 2.0, 4.5],
	"n4": [0.3, 1.8, 2.8, 3.8, 4.2],
	"n5": [0.9, 3.5, 3.8, 4.0, 4.5]
};

// Data
const models = {data:[
	{dir:"./models/obj/", mtl:"city_1.mtl",        obj:"city_1.obj"},
	{dir:"./models/obj/", mtl:"city_2.mtl",        obj:"city_2.obj"},
	{dir:"./models/obj/", mtl:"obj_red.mtl",       obj:"obj_red.obj"},
	{dir:"./models/obj/", mtl:"obj_green.mtl",     obj:"obj_green.obj"},
	{dir:"./models/obj/", mtl:"obj_blue.mtl",      obj:"obj_blue.obj"},
	{dir:"./models/obj/", mtl:"tree_1.mtl",        obj:"tree_1.obj"},
	{dir:"./models/obj/", mtl:"tree_2.mtl",        obj:"tree_2.obj"},
	{dir:"./models/obj/", mtl:"car_1.mtl",         obj:"car_1.obj"},
	{dir:"./models/obj/", mtl:"car_2.mtl",         obj:"car_2.obj"},
	{dir:"./models/obj/", mtl:"car_3.mtl",         obj:"car_3.obj"}, 
	{dir:"./models/obj/", mtl:"truck_1.mtl",       obj:"truck_1.obj"},
	{dir:"./models/obj/", mtl:"truck_2.mtl",       obj:"truck_2.obj"},
	{dir:"./models/obj/", mtl:"wood_1.mtl",        obj:"wood_1.obj"},
	{dir:"./models/obj/", mtl:"wood_2.mtl",        obj:"wood_2.obj"},
	{dir:"./models/obj/", mtl:"road_1.mtl",        obj:"road_1.obj"},
	{dir:"./models/obj/", mtl:"river_1.mtl",       obj:"river_1.obj"},
	{dir:"./models/obj/", mtl:"tanuki_talk_1.mtl", obj:"tanuki_talk_1.obj"},
	{dir:"./models/obj/", mtl:"tanuki_talk_1.mtl", obj:"tanuki_talk_1.obj"},
	{dir:"./models/obj/", mtl:"tanuki_talk_1.mtl", obj:"tanuki_talk_1.obj"},
	{dir:"./models/obj/", mtl:"tanuki_talk_2.mtl", obj:"tanuki_talk_2.obj"},
	{dir:"./models/obj/", mtl:"tanuki_sad_1.mtl",  obj:"tanuki_sad_1.obj"},
	{dir:"./models/obj/", mtl:"tanuki_sad_2.mtl",  obj:"tanuki_sad_2.obj"},
	{dir:"./models/obj/", mtl:"tanuki_run_1.mtl",  obj:"tanuki_run_1.obj"},
	{dir:"./models/obj/", mtl:"tanuki_run_2.mtl",  obj:"tanuki_run_2.obj"},
	{dir:"./models/obj/", mtl:"tanuki_run_3.mtl",  obj:"tanuki_run_3.obj"},
]};

const sounds = {data:[
	{dir:"./sounds/", mp3:"effect_1.mp3"}
]};

const fonts = {data:[
	{dir:"./fonts/", font:"MisakiGothic_Regular.json"},
	{dir:"./fonts/", font:"MisakiMincho_Regular.json"},
]};

// Howler
let howl        = null;

// ThreeManager
let tm          = null;
let rootGroup   = null;
let noteGroup   = null;

// Loader
let objLoader   = null;
let soundLoader = null;
let fontLoader  = null;

window.onload = function(){
	console.log("OnLoad");
	// Howler
	howl = new Howl({src: [SOUND_BGM]});
	howl.on("load", readyThreeJS);// Load
}

// Three.js
function readyThreeJS(){
	console.log("readyThreeJS");
	// ThreeManager
	// 	Camera position(PC): pcX, pcY, pcZ
	tm = new ThreeManager(0, 15, 20);

	// RootGroup, NoteGroup
	rootGroup = tm.getGroup();
	noteGroup = new THREE.Group();
	rootGroup.add(noteGroup);

	// Loader
	objLoader = new ObjLoader();
	objLoader.loadModels(models, onReadyModels, onError);
	soundLoader = new SoundLoader(tm.getCamera());
	soundLoader.loadSounds(sounds, onReadySounds, onError);
	fontLoader = new FontLoader();
	fontLoader.loadFonts(fonts, onReadyFonts, onError);

	// Controller
	let ctlVR = new CtlVR();
	ctlVR.setTouchpadListener(
		(axes)=>{console.log("onPressed:"  + axes[0] + ", " + axes[1]);}, 
		(axes)=>{console.log("onReleased:" + axes[0] + ", " + axes[1]);});
	ctlVR.setTriggerListener(
		()=>{console.log("onPressed!!");}, 
		()=>{console.log("onReleased!!");});

	// Ready
	function onReadyModels(){
		console.log("You are ready to use models!!");

		// Camera
		let cContainer = tm.getCameraContainer();

		// Skybox
		let skybox = tm.createSkybox("./textures/skybox_space.png", 6, 300);
		rootGroup.add(skybox);
		
		// Cube
		let geometry = new THREE.BoxGeometry(3, 3, 3);
		let material = new THREE.MeshNormalMaterial();

		let ctlGroup = new THREE.Group();
		ctlGroup.position.set(0, 0, 50);
		rootGroup.add(ctlGroup);

		let ctlForward = new THREE.Mesh(geometry, material);
		ctlForward.position.set(0, 0, -4);
		ctlForward.name = "hoge";
		ctlGroup.add(ctlForward);

		// Raycaster
		tm.setRaycasterListener((intersects)=>{
			for(let target of intersects){
				let name = target.object.name;
				if(name === "") continue;
				console.log("name:" + name);
			}
		});

		// Shadow
		tm._renderer.shadowMap.enabled = true;

		// Animation
		tm._renderer.setAnimationLoop(animate);

		// Howler
		howl.volume(SOUND_VOLUME);
		howl.on("play", onPlay);
		howl.on("end",  onEnd);
		readyNotes();// Ready
	}

	function onReadySounds(){
		console.log("You are ready to use sounds!!");
	}

	function onReadyFonts(){
		console.log("You are ready to use fonts!!");
		// Font
		let font = fontLoader.findFonts("MisakiGothic");
		let text = fontLoader.createText("How are you!?", font, 4, 0, 20, -50);
		rootGroup.add(text);
	}

	// Error
	function onError(){
		console.log("Something went wrong...");
	}

	// Animate
	function animate(){
		tm.update();   // Manager
		ctlVR.update();// Controller
		// Howler
		if(!howl || !howl.playing()) return;
		let cTime = howl.seek() || 0;
		let tTime = howl.duration();
		let per = Math.floor((cTime/tTime)*100);
		//console.log(per + "%");
		noteGroup.position.z = cTime * TIME_TO_PIXEL;
	};

	// Notes
	function readyNotes(){
		console.log("readyNotes");

		let cTime = howl.seek() || 0;
		let tTime = howl.duration();
		let per = Math.floor((cTime/tTime)*100);
		//console.log(per + "%");

		// Cube
		let geometry = new THREE.BoxGeometry(3, 3, 3);
		let material = new THREE.MeshNormalMaterial();

		let mkStart = new THREE.Mesh(geometry, material);
		mkStart.position.set(0, 0, 0);
		mkStart.name = "mkStart";
		noteGroup.add(mkStart);

		let mkEnd = new THREE.Mesh(geometry, material);
		mkEnd.position.set(0, 0, tTime*TIME_TO_PIXEL*-1.0);
		mkEnd.name = "mkEnd";
		noteGroup.add(mkEnd);

		// GUI
		let GuiCtl = function(){
			this.play  = ()=>{howl.play();};
			this.stop  = ()=>{howl.stop();};
			this.pause = ()=>{howl.pause();};
		};
		let gui    = new dat.GUI();
		let guiCtl = new GuiCtl();

		let folder = gui.addFolder("Controller");
		folder.add(guiCtl, "play");
		folder.add(guiCtl, "stop");
		folder.add(guiCtl, "pause");
		//folder.addColor(guiCtl , "seek").onChange();
		folder.open();


		// Data
		putMarkers(noteData.n1, "n1", -16, 0);
		putMarkers(noteData.n2, "n2",  -8, 0);
		putMarkers(noteData.n3, "n3",   0, 0);
		putMarkers(noteData.n4, "n4",  +8, 0);
		putMarkers(noteData.n5, "n5", +16, 0);

		// Play
		setTimeout(()=>{howl.play();}, 1000);
	}

	function putMarkers(times, name, x, y){
		let geometry = new THREE.BoxGeometry(3, 3, 3);
		let material = new THREE.MeshNormalMaterial();
		for(let i=0; i<times.length; i++){
			let time = times[i];
			let mk = new THREE.Mesh(geometry, material);
			mk.position.set(x, y, time*TIME_TO_PIXEL*-1.0);
			mk.name = name;
			noteGroup.add(mk);
		}
	}

	function onPlay(){
		console.log("onPlay");
	}

	function onEnd(){
		console.log("onEnd");
	}
}