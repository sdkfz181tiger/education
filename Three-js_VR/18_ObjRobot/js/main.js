//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

const stateTanuki = {
	base: ["tanuki_talk_1.obj"],
	talk: ["tanuki_talk_1.obj", "tanuki_talk_2.obj", "tanuki_talk_1.obj", "tanuki_talk_2.obj"],
	sad:  ["tanuki_sad_1.obj", "tanuki_sad_2.obj", "tanuki_sad_1.obj", "tanuki_sad_2.obj"]
}

// Data
const models = {data:[
	{dir:"./models/obj/", mtl:"city_1.mtl", obj:"city_1.obj"},
	{dir:"./models/obj/", mtl:"city_2.mtl", obj:"city_2.obj"},
	{dir:"./models/obj/", mtl:"tanuki_talk_1.mtl", obj:"tanuki_talk_1.obj"},
	{dir:"./models/obj/", mtl:"tanuki_talk_2.mtl", obj:"tanuki_talk_2.obj"},
	{dir:"./models/obj/", mtl:"tanuki_sad_1.mtl",  obj:"tanuki_sad_1.obj"},
	{dir:"./models/obj/", mtl:"tanuki_sad_2.mtl",  obj:"tanuki_sad_2.obj"},
	{dir:"./models/obj/", mtl:"chr_old.mtl",obj:"chr_old.obj"},
]};

const sounds = {data:[
	{dir:"./sounds/", mp3:"test_1.mp3"},
	{dir:"./sounds/", mp3:"test_2.mp3"},
	{dir:"./sounds/", mp3:"test_3.mp3"},
	{dir:"./sounds/", mp3:"test_4.mp3"},
]};

const fonts = {data:[
	{dir:"./fonts/", font:"MisakiGothic_Regular.json"},
	{dir:"./fonts/", font:"MisakiMincho_Regular.json"},
]};

let tm = null;
let objLoader   = null;
let soundLoader = null;
let fontLoader  = null;

window.onload = function(){
	console.log("OnLoad");

	// ThreeManager
	// 	Camera position(PC): pcX, pcY, pcZ
	// 	Camera position(VR): vrX, vrY, vrZ
	tm = new ThreeManager(0, 20, 35, 0, 10, 25);
	tm._renderer.setAnimationLoop(animate);

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
		()=>{
			console.log("onPressed!!");
		}, 
		()=>{console.log("onReleased!!");});

	// Ready
	function onReadyModels(){
		console.log("You are ready to use models!!");

		// Skybox
		let skybox = tm.createSkybox("./textures/skybox_space.png", 6, 300);
		tm.addScene(skybox);

		// Camera
		let cContainer = tm.getCameraContainer();

		// City, Tanuki
		let city = new City("city_2.obj", 0, 0, 0);
		let tanu = new Tanuki("tanuki_talk_1.obj", 0, 3, 12);
		tanu.startAnimation("base");

		// Cube
		let geometry = new THREE.BoxGeometry(3, 3, 3);
		let material = new THREE.MeshNormalMaterial();
		let cube1 = new THREE.Mesh(geometry, material);
		cube1.position.set(-4, 5, 25);
		cube1.name = "talk";
		tm.addGroup(cube1);

		let cube2 = new THREE.Mesh(geometry, material);
		cube2.position.set(0, 5, 25);
		cube2.name = "sad";
		tm.addGroup(cube2);

		let cube3 = new THREE.Mesh(geometry, material);
		cube3.position.set(+4, 5, 25);
		cube3.name = "stop";
		tm.addGroup(cube3);

		// Raycaster
		tm.setRaycasterListener((intersects)=>{
			for(let target of intersects){
				console.log("distance:" + target.distance + "_" + target.object.name);
				let name = target.object.name;
				if(name in stateTanuki) tanu.startAnimation(name);
				if(name == "stop") tanu.stopAnimation();
			}
		});
	}

	function onReadySounds(){
		console.log("You are ready to use sounds!!");
		// Test
		let sound = soundLoader.findSounds("test_1.mp3");
		sound.play();
	}

	function onReadyFonts(){
		console.log("You are ready to use fonts!!");
		// Test
		let font = fontLoader.findFonts("MisakiGothic");
		let text = fontLoader.createText("CROSSY!!", font, 4, 0, 20, 0);
		tm.addGroup(text);
	}

	// Error
	function onError(){
		console.log("Something went wrong...");
	}

	// Animate
	function animate(){
		tm.update();   // Manager
		ctlVR.update();// Controller
	};
}

class Tanuki{

	constructor(name, x, y, z){
		console.log("Tanuki");
		this._x = x; this._y = y; this._z = z;
		this.init();
	}

	init(){
		this._stateKey   = "base";
		this._stateIndex = 0;
		this._stateAnimation = {};
		for(let key in stateTanuki){
			this._stateAnimation[key] = [];
			for(let path of stateTanuki[key]){
				let clone = this.createClone(path);
				this._stateAnimation[key].push(clone);
			}
		}
		this._tickFlg = false;
		this._tickId  = null;
	}

	startAnimation(key){
		this._stateKey   = key;
		this._stateIndex = 0;
		for(let key in this._stateAnimation){
			let animation = this._stateAnimation[key];
			for(let animate of animation){
				animate.visible = false;
			}
		}
		this._tickFlg = true;
		this.tickAnimation();
	}

	stopAnimation(){
		this._tickFlg = false;
		if(this._tickId) clearTimeout(this._tickId);
	}

	tickAnimation(){
		//console.log("tick:" + this._stateKey + ", " + this._stateIndex);
		this._stateIndex++;
		let total = this._stateAnimation[this._stateKey].length;
		if(total <= 1) this._tickFlg = false;
		if(total <= this._stateIndex){
			this._stateIndex = 0;
		}
		for(let i=0; i<total; i++){
			if(i === this._stateIndex){
				this._stateAnimation[this._stateKey][i].visible = true;
			}else{
				this._stateAnimation[this._stateKey][i].visible = false;
			}
		}
		if(this._tickFlg == false) return;
		if(this._tickId) clearTimeout(this._tickId);
		this._tickId = setTimeout(()=>{this.tickAnimation();}, 200);
	}

	createClone(name, visible=false){
		console.log("createClone:" + name);
		let clone = objLoader.findModels(name);
		clone.scale.set(0.5, 0.5, 0.5);
		clone.position.set(this._x, this._y, this._z);
		clone.rotation.set(0, 0, 0);
		clone.visible = visible;
		tm.addGroup(clone);// Add to group!!
		return clone;
	}

	setSprite(){
		let txLoader = new THREE.TextureLoader();
		let map = txLoader.load("textures/cocos2d-x.png");
		let material = new THREE.SpriteMaterial({map:map, color:0xffffff, fog:true});
		let sprite = new THREE.Sprite(material);
		tm.addGroup(sprite);
	}
}

class City{

	constructor(name, x, y, z){
		console.log("City");
		this._name = name;
		this._x = x; this._y = y; this._z = z;
		this.init();
	}

	init(){
		this._clone = objLoader.findModels(this._name);
		this._clone.scale.set(0.5, 0.5, 0.5);
		this._clone.position.set(this._x, this._y, this._z);
		this._clone.rotation.set(0, Math.PI*-0.5, 0);
		tm.addGroup(this._clone);// Add to group!!
	}
}