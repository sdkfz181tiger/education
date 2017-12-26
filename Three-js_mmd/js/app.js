console.log("Hello Three.js!!");

const DEG_TO_RAD = Math.PI / 180;

const width  = 480;
const height = 320;
const fov    = 60;
const aspect = width / height;
const near   = 1;
const far    = 100;

// Scene
let scene = new THREE.Scene();
//scene.background = new THREE.Color(0x333333);

// Axes
let axes = new THREE.AxisHelper(20);
scene.add(axes);

// Stats
let stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = "absolute";
stats.domElement.style.left = "0px";
stats.domElement.style.top  = "0px";
document.getElementById("stage").appendChild(stats.domElement);

// Camera
let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 20, 8);
camera.lookAt(scene.position);

// Light
let directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0, 0.5, 0.7);
scene.add(directionalLight);

// Renderer
let renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize(width, height);
renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById("stage").appendChild(renderer.domElement);

// Plane
var geometry = new THREE.PlaneGeometry(15, 15);
var material = new THREE.MeshBasicMaterial({color: 0xcccccc});
var plane = new THREE.Mesh(geometry, material);
plane.position.set(0, 0, 0);
plane.rotation.set(-90 * Math.PI / 180, 0, 0);
scene.add(plane);

// Effect
let effect = new THREE.OutlineEffect(renderer);

// Pronama
let clock = new THREE.Clock();
let helper = new THREE.MMDHelper();
let phyHelper, ikHelper;

let pmxs = [
	// プロ生ちゃん_著作表示不要、改変/再配布可、商用利用(許諾要)
	'./models/mmd/pronama/pronama.pmx',
	// 香風智乃 Ver. 1.02 (ニコニ・コモンズ)
	// './models/mmd/chino/Chino and Tippy.pmx',
	// './models/mmd/chino/Chino Kafuu Ver. 1.02.pmx',
	// './models/mmd/chino/Chino Winter Uniform.pmx',
	// 中野シスターズ_表記不要、改変可、商業利用可(法人含む)、二次創作可
	//'./models/mmd/nakashis/naka/naka.pmx',
	//'./models/mmd/nakashis/kano/kano.pmx',
	// ニコニ立体ちゃん_表記不要、改変/配布可、商用利用可(法人除く)
	//'./models/mmd/alicia/Alicia_solid.pmx',
	// 九十九みる_表記必要、改変可、再配布可、個人同人利用可、企業商用利用(連絡要)
	//'./models/mmd/tsukumo/TsukumoMil_mmd.pmx',
	// KizunaAI
	'./models/mmd/kizunaai/kizunaai.pmx'
];

let index = Math.floor(Math.random() * pmxs.length);
initMMD(pmxs[index], ['./models/mmd/vmds/wavefile_v2.vmd']);

// Camera
let deg    = 90;
let radius = 25;
let radian = DEG_TO_RAD * deg;

// Loop
loop();
function loop(){

	// Stats
	stats.update();

	// Pronama
	helper.animate(clock.getDelta());
	if(phyHelper !== undefined && phyHelper.visible) phyHelper.update();
	if(ikHelper !== undefined && ikHelper.visible) ikHelper.update();
	effect.render(scene, camera);

	// Camera
	deg += 0.5;
	if(360 <= deg) deg = 0;
	radian = DEG_TO_RAD * deg;
	camera.position.x = Math.cos(radian) * radius;
	camera.position.z = Math.sin(radian) * radius;
	camera.lookAt({x: 0, y: 10, z: 0});

	renderer.render(scene, camera);
	window.requestAnimationFrame(loop);
};