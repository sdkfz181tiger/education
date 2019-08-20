console.log("base.js!!");

// Skybox
const SKYBOX_PATH  = "./textures/sky1/";
const SKYBOX_FILES = [
	"pos-x.png", "neg-x.png", "pos-y.png",
	"neg-y.png", "pos-z.png", "neg-z.png"];

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
// Sensors, Markers, Fireworks
let sensors     = [];
let markers     = [];
let fireworks   = [];

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
		tm.update();// Manager
		// Fireworks
		for(let i=fireworks.length-1; 0<=i; i--){
			console.log("fire");
			if(fireworks[i].isFinished()){
				fireworks[i].removeFromParent();
				fireworks.splice(i, 1);
				continue;
			}
			fireworks[i].update();
		}
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
					onHit(sensors[s], s, markers[m], m);// Hit!!
					noteGroup.remove(markers[m]); // Remove marker
					markers.splice(m, 1);         // Splice marker
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
		setStats();                  // Stats
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
			let z = TIME_TO_PIXEL * TIME_TO_SPAN * rows * -1.0 + OFFSET_Z_PIXEL;
			v.vertices.push(new THREE.Vector3(x, y, 0));
			v.vertices.push(new THREE.Vector3(x, y, z));
			noteGroup.add(new THREE.Line(v, material));
			for(let r=0; r<rows; r++){
				let h = new THREE.Geometry();
				z = TIME_TO_PIXEL * TIME_TO_SPAN * r * -1.0 + OFFSET_Z_PIXEL;
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

		//[発表会用] 微調整
		sensors[0].rotateY(-3.14/2);
		sensors[1].rotateY(-3.14/2);
		sensors[2].rotateY(-3.14/2);

		sensors[0].setScale(0.5);
		sensors[1].setScale(0.5);
		sensors[2].setScale(0.5);

		// Play
		setTimeout(()=>{howl.play();}, 300);
	}

	function putSensors(note){
		console.log("putSensors");
		// Sensor
		let sensor = new Sensor(note.x, note.y-4, 0, note.sensor);
		sensors.push(sensor);
	}

	function putMarkers(note){
		console.log("putMarkers");
		let geometry = new THREE.BoxGeometry(2, 2, 2);
		let material = new THREE.MeshNormalMaterial();
		for(let i=0; i<note.z.length; i++){
			if(note.z[i] == "-") continue;
			let obj = markerType[note.z[i]];
			let marker = objLoader.findModels(obj);
			marker.index = note.z[i];            // マーカーのインデックス
			marker.obj   = markerType[note.z[i]];// マーカーのオブジェクト
			marker.position.set(note.x, note.y + 3, 
				i*TIME_TO_PIXEL*TIME_TO_SPAN*-1.0 + OFFSET_Z_PIXEL);
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

// PointManager
class PointManager{

	constructor(){
	
	}

	init(){
		$("#st_params").text("Ready");
	}

	setNum(nums){
		let str = nums.join("_");
		$("#st_params").text(str);
	}
}

// Fireworks
class Fireworks{

	constructor(root, x, y, z, area, total){
		console.log("Fireworks");
		this._root = root;
		this._dsts = [];
		this.init(x, y, z, area, total);
	}

	init(x, y, z, area, total){
		// Geometry, Material
		this._geometry = new THREE.Geometry();
		this._material = new THREE.PointsMaterial({
			size: 1.0, color: 0xffffff, vertexColors: true, 
			transparent: true, opacity: 1
		});
		for(let i=0; i<total; i++){
			let from = new THREE.Vector3(
				THREE.Math.randInt(x-1, x+1),
				THREE.Math.randInt(y-1, y+1),
				THREE.Math.randInt(z-1, z+1)
			);
			let to = new THREE.Vector3(
				THREE.Math.randInt(x-area, x+area),
				THREE.Math.randInt(y-area, y+area),
				THREE.Math.randInt(z-area, z+area)
			);
			this._geometry.vertices.push(from);
			this._dsts.push(to);
			let color = new THREE.Color();
			color.setHSL(THREE.Math.randFloat(0.1, 0.9), 1, 0.5);
			this._geometry.colors.push(color);
		}
		this._points = new THREE.Points(this._geometry, this._material);
		this._root.add(this._points);
	}

	update(){
		for(let i=0; i<this._geometry.vertices.length; i++){
			this._geometry.vertices[i].x += (this._dsts[i].x - this._geometry.vertices[i].x) / 40;
			this._geometry.vertices[i].y += (this._dsts[i].y - this._geometry.vertices[i].y) / 40;
			this._geometry.vertices[i].z += (this._dsts[i].z - this._geometry.vertices[i].z) / 40;
			this._geometry.verticesNeedUpdate = true;
		}
		this._material.opacity -= 0.015;
		this._material.colorsNeedUpdate = true;
	}

	isFinished(){
		if(this._material.opacity < 0) return true;
		return false;
	}

	removeFromParent(){
		this._root.remove(this._points);
	}
}

// Gamepad
class GamepadHelper{

	constructor(){
		console.log("GamePadHelper");
		this._gamepads        = {};
		this._prevAxes        = {};
		this._prevButtons     = {};
		this._axesListener    = null;
		this._buttonsListener = null;
		this.init();
	}

	init(){
		// Connected
		window.addEventListener("gamepadconnected", (e)=>{
			console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
				e.gamepad.index, e.gamepad.id,
				e.gamepad.buttons.length, e.gamepad.axes.length);
			this.gamepadHandler(e.gamepad, true);
		});

		// Disconeccted
		window.addEventListener("gamepaddisconnected", (e)=>{
			console.log("Gamepad disconnected from index %d: %s",
				e.gamepad.index, e.gamepad.id);
			this.gamepadHandler(e.gamepad, false);
		});
	}

	gamepadHandler(gamepad, connectFlg){
		console.log("gamepadHandler");
		// Note:
		// gamepad === navigator.getGamepads()[gamepad.index]
		if(connectFlg){
			this._gamepads[gamepad.index]    = gamepad;
			this._prevAxes[gamepad.index]    = gamepad.axes.concat();
			this._prevButtons[gamepad.index] = gamepad.buttons.concat();
			for(let i=0; i<this._prevAxes[gamepad.index].length; i++){
				this._prevAxes[gamepad.index][i] = 0;
			}
			for(let i=0; i<this._prevButtons[gamepad.index].length; i++){
				this._prevButtons[gamepad.index][i] = false;
			}
			this.loop();
		}else{
			delete this._gamepads[gamepad.index];
		}
	}

	setAxesXListener(callback){
		this._axesXCallback = callback;
	}

	setAxesYListener(callback){
		this._axesYCallback = callback;
	}

	setButtonsListener(callback){
		this._buttonsCallback = callback;
	}

	loop(){
		setTimeout(()=>{
			for(let key in this._gamepads){
				let gamepad = this._gamepads[key];

				// Axes(X)
				let disX = this._prevAxes[key][0] - Math.round(gamepad.axes[0]);
				if(disX < 0) disX *= -1.0;
				if(0.5 < disX){
					this._prevAxes[key][0] = Math.round(gamepad.axes[0]);
					if(this._axesXCallback){
						this._axesXCallback(key, this._prevAxes[key][0]);
					}
				}

				// Axes(Y)
				let disY = this._prevAxes[key][1] - Math.round(gamepad.axes[1]);
				if(disY < 0) disY *= -1.0;
				if(0.5 < disY){
					this._prevAxes[key][1] = Math.round(gamepad.axes[1]);
					if(this._axesYCallback){
						this._axesYCallback(key, this._prevAxes[key][1]);
					}
				}

				// Buttons
				for(let i=0; i<gamepad.buttons.length; i++){
					if(this._prevButtons[key][i] != gamepad.buttons[i].pressed){
						this._prevButtons[key][i] = gamepad.buttons[i].pressed;
						if(this._buttonsCallback){
							this._buttonsCallback(key, i, gamepad.buttons[i].pressed);
						}
					}
				}
			}
			if(this._gamepads.length <= 0) return;
			this.loop();
		}, 50);
	}
}