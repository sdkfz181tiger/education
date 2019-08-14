console.log("base.js!!");

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
let totalLoader = null;
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
	tm = new ThreeManager(CAM_X, CAM_Y, CAM_Z);
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
	loaderCounter = 3;// Counter
	// Controller
	let ctlVR = new CtlVR();
	ctlVR.setTouchpadListener(
		(axes)=>{console.log("onPressed:"  + axes[0] + ", " + axes[1]);}, 
		(axes)=>{console.log("onReleased:" + axes[0] + ", " + axes[1]);});
	ctlVR.setTriggerListener(
		()=>{console.log("onPressed!!");}, 
		()=>{console.log("onReleased!!");});

	// Ready(Models)
	function onReadyModels(){
		console.log("You are ready to use models!!");
		// Skybox
		tm.setSkybox();
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
		howl.on("seek", onSeek);
		howl.on("end",  onEnd);
		checkLoaders();// Check
	}

	// Ready(Sounds)
	function onReadySounds(){
		console.log("You are ready to use sounds!!");
		checkLoaders();// Check
	}

	// Ready(Fonts)
	function onReadyFonts(){
		console.log("You are ready to use fonts!!");
		checkLoaders();// Check
	}

	function checkLoaders(){
		loaderCounter--;
		if(loaderCounter <= 0) readyNotes();
	}

	// Error
	function onError(){
		console.error("Something went wrong...");
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
		for(let s=sensors.length-1; 0<=s; s--){
			for(let m=markers.length-1; 0<=m; m--){
				let z = noteGroup.position.z + markers[m].position.z;
				if(z < -10) continue;// Important
				if(20 < z){
					onMissed(sensors[s], markers[m]);// Missed...
					noteGroup.remove(markers[m]);
					markers.splice(m, 1);
					continue;
				}
				let box3A = new THREE.Box3().setFromObject(sensors[s].group);
				let box3B = new THREE.Box3().setFromObject(markers[m]);
				if(box3A.intersectsBox(box3B)){
					onHit(sensors[s], markers[m]);// Hit!!
					noteGroup.remove(markers[m]);// Remove marker
					markers.splice(m, 1);        // Splice marker
				}
			}
		}
	};

	// Notes
	function readyNotes(){
		console.log("readyNotes");
		let cTime = howl.seek() || 0;// 開始時間
		let tTime = howl.duration(); // 終了時間
		setWire(cTime, tTime);       // Wire
		setGUI(cTime, tTime);        // GUI
		setScenery();                // Scenery
		//resetNotes();                // Reset
	}

	function setWire(cTime, tTime){
		console.log("setWire");
		let cols = noteData.length;
		let rows = Math.floor(tTime / TIME_TO_SPAN);
		let material = new THREE.LineBasicMaterial({color: 0x999999});
		for(let c=0; c<cols; c++){
			let v = new THREE.Geometry();
			let x = noteData[c].x;
			let y = noteData[c].y;
			let z = TIME_TO_PIXEL * TIME_TO_SPAN * rows * -1.0;
			v.vertices.push(new THREE.Vector3(x, y, 0));
			v.vertices.push(new THREE.Vector3(x, y, z));
			noteGroup.add(new THREE.Line(v, material));
			for(let r=0; r<rows; r++){
				let h = new THREE.Geometry();
				z = TIME_TO_PIXEL * TIME_TO_SPAN * r * -1.0;
				h.vertices.push(new THREE.Vector3(x-2, y, z));
				h.vertices.push(new THREE.Vector3(x+2, y, z));
				noteGroup.add(new THREE.Line(h, material));
			}
		}
	}

	function setGUI(cTime, tTime){
		console.log("setGUI");
		let GuiCtl = function(){
			this.toggle = ()=>{toggleNotes();};
			this.reset  = ()=>{resetNotes();};
			this.seek  = 0;
		};
		let gui    = new dat.GUI();
		gui.close();
		let guiCtl = new GuiCtl();
		let folder = gui.addFolder("Controller");
		folder.add(guiCtl, "toggle");
		folder.add(guiCtl, "reset");
		folder.add(guiCtl, "seek",
			cTime, tTime, 0.02).onFinishChange(resetNotes);
		folder.open();
	}

	function toggleNotes(){
		console.log("toggleNotes");
		if(!howl.playing()){
			howl.play();
		}else{
			howl.pause();
		}
	}

	function resetNotes(seek=0.0){
		console.log("resetNotes");
		howl.volume(SOUND_VOLUME);// Volume
		howl.stop();              // Stop
		howl.seek(seek);          // Seek
		// Clear
		for(let i=sensors.length-1; 0<=i; i--){
			sensorGroup.remove(sensors[i].group);
			sensors.splice(i, 1);
		}
		for(let i=markers.length-1; 0<=i; i--){
			noteGroup.remove(markers[i]);
			markers.splice(i, 1);
		}
		// Put
		sensors = [];
		markers = [];
		for(let i=0; i<noteData.length; i++){
			putSensors(noteData[i]);
			putMarkers(noteData[i]);
		}
		// Play
		setTimeout(()=>{howl.play();}, 300);
	}

	function putSensors(note){
		console.log("putSensors");
		// Sensor
		let sensor = new Sensor(note.x, 0, 0, note.sensor, note.key);
		sensors.push(sensor);
	}

	function putMarkers(note){
		console.log("putMarkers");
		let geometry = new THREE.BoxGeometry(2, 2, 2);
		let material = new THREE.MeshNormalMaterial();
		for(let i=0; i<note.z.length; i++){
			if(note.z[i] == 0) continue;
			let marker = objLoader.findModels(note.marker);
			marker.position.set(note.x, note.y, 
				i*TIME_TO_PIXEL*TIME_TO_SPAN*-1.0);
			marker.name  = note.name;
			marker.sound = note.sound;
			noteGroup.add(marker);
			markers.push(marker);
		}
	}
}

// CounterManager
class CounterManager{

	constructor(root, font, size=2, padding=2, digits=4){
		this._root      = root;
		this._font      = font;
		this._size      = size;
		this._padding   = padding;
		this._digits    = digits;
		this._rootGroup = new THREE.Group();
	}

	init(x=0, y=0, z=0, rX=0, rY=0, rZ=0){

		this._rootGroup.position.x = x;
		this._rootGroup.position.y = y;
		this._rootGroup.position.z = z;
		this._rootGroup.rotation.x = DEG_TO_RAD * rX;
		this._rootGroup.rotation.y = DEG_TO_RAD * rY;
		this._rootGroup.rotation.z = DEG_TO_RAD * rZ;
		this._root.add(this._rootGroup);

		let midX = ((this._digits-1)*this._padding)*0.5;
		for(let d=0; d<this._digits; d++){

			let group = new THREE.Group();
			group.position.x = this._padding * d - midX;
			this._rootGroup.add(group);

			for(let i=0; i<10; i++){
				let str = "" + i;
				let label = fontLoader.createText2D(str, this._font, this._size);
				group.add(label);
				if(i != 0) label.visible = false;
			}
		}
	}

	setNum(num){
		let str = String(Math.floor(num)).substr(-this._digits);
		if(str.length < this._digits){
			let pre = "";
			for(let i=0; i<this._digits-str.length; i++) pre += "0";
			str = pre + str;
		}
		for(let d=0; d<this._rootGroup.children.length; d++){
			let group = this._rootGroup.children[d];
			for(let i=0; i<group.children.length; i++){
				group.children[i].visible = (i == Number(str[d]));
			}
		}
	}
}