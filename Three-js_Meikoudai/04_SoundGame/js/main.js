//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

const SOUND_BGM     = "./sounds/bgm_1.mp3";
const SOUND_VOLUME  = 0.02;// 音量: 0.0 ~ 1.0
const SOUND_SEEK    = 0.0;// 再生時間: 0.0 ~
const TIME_TO_PIXEL = 20;

const noteData = [
	{"name": "n1", "x": -10, "y": 0, "z": [0.6, 1.0, 2.8, 3.5, 3.9], "sound": "effect_1.mp3"},
	{"name": "n2", "x":   0, "y": 0, "z": [1.0, 2.0, 2.5, 2.7, 2.9], "sound": "effect_1.mp3"},
	{"name": "n3", "x": +10, "y": 0, "z": [0.5, 1.8, 2.0, 2.2, 3.2], "sound": "effect_1.mp3"}
];

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
// Group
let rootGroup   = null;
let sonsorGroup = null;
let noteGroup   = null;
// Loader
let objLoader   = null;
let soundLoader = null;
let fontLoader  = null;
// Sensors, Markers
let sensors     = [];
let markers     = [];

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

	// RootGroup, SensorGroup, NoteGroup
	rootGroup = tm.getGroup();
	sensorGroup = new THREE.Group();
	rootGroup.add(sensorGroup);
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
		// NoteGroup
		noteGroup.position.z = cTime * TIME_TO_PIXEL;
		// Sensors x Markers
		for(let s=0; s<sensors.length; s++){
			for(let m=markers.length-1; 0<=m; m--){
				let disX = sensors[s].position.x - (markers[m].position.x+noteGroup.position.x);
				let disY = sensors[s].position.y - (markers[m].position.y+noteGroup.position.y);
				let disZ = sensors[s].position.z - (markers[m].position.z+noteGroup.position.z);
				let distance = Math.sqrt(disX*disX + disY*disY + disZ*disZ);
				if(distance < 2){
					soundLoader.playSound(markers[m].sound);// Sound
					noteGroup.remove(markers[m]);
					markers.splice(m, 1);
				}
			}
		}
	};

	// Notes
	function readyNotes(){
		console.log("readyNotes");

		let cTime = howl.seek() || 0;
		let tTime = howl.duration();

		// Cube
		let geometry = new THREE.BoxGeometry(32, 0.2, 0.2);
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
			this.check = ()=>{check();};
			this.play  = ()=>{howl.play();};
			this.stop  = ()=>{howl.stop();};
			this.pause = ()=>{howl.pause();};
			this.seek  = 0;
		};
		let gui    = new dat.GUI();
		let guiCtl = new GuiCtl();

		let folder = gui.addFolder("Controller");
		folder.add(guiCtl, "check");
		folder.add(guiCtl, "play");
		folder.add(guiCtl, "stop");
		folder.add(guiCtl, "pause");
		folder.add(guiCtl, "seek", cTime, tTime).onFinishChange((s)=>{
			if(howl.playing()) howl.stop();
			howl.seek(s); howl.play();
		});
		folder.open();

		// Markers, Sensors
		sensors = [];
		markers = [];
		// Note
		for(let i=0; i<noteData.length; i++){
			putSensors(noteData[i]);
			putMarkers(noteData[i]);
		}

		// Play
		setTimeout(()=>{
			howl.volume(SOUND_VOLUME);// Volume
			howl.seek(SOUND_SEEK);    // Seek
			howl.play();
		}, 1000);
	}

	function putSensors(note){
		let geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
		let material = new THREE.MeshNormalMaterial();
		for(let i=0; i<note.z.length; i++){
			let sensor = new THREE.Mesh(geometry, material);
			sensor.position.set(note.x, note.y, 0);
			sensor.name = "sensor";
			sensorGroup.add(sensor);
			sensors.push(sensor);
		}
	}

	function putMarkers(note){
		let geometry = new THREE.BoxGeometry(2, 2, 2);
		let material = new THREE.MeshNormalMaterial();
		for(let i=0; i<note.z.length; i++){
			let time = note.z[i];
			let marker = new THREE.Mesh(geometry, material);
			marker.position.set(note.x, note.y, time*TIME_TO_PIXEL*-1.0);
			marker.name  = note.name;
			marker.sound = note.sound;
			noteGroup.add(marker);
			markers.push(marker);
		}
	}

	function onPlay(){
		console.log("onPlay");
	}

	function onEnd(){
		console.log("onEnd");
	}

	function check(){
		console.log("check:" + noteGroup.position.z);
	}
}

