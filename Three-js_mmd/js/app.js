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

// Axis
let axis = new THREE.AxisHelper(20);
scene.add(axis);

// Stats
let stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = "absolute";
stats.domElement.style.left = "0px";
stats.domElement.style.top  = "0px";
document.getElementById("stage").appendChild(stats.domElement);

// Camera
let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 15, 25);
camera.lookAt({x:0, y:12, z:0});

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
let geometry = new THREE.PlaneGeometry(15, 15);
let material = new THREE.MeshBasicMaterial({color: 0xcccccc});
let plane = new THREE.Mesh(geometry, material);
plane.position.set(0, 0, 0);
plane.rotation.set(-90 * Math.PI / 180, 0, 0);
scene.add(plane);

// Controls
let controls = new THREE.TrackballControls(camera);
controls.target.set(0, 12, 0);

let pmxs = [
	// KizunaAI
	"./models/mmd/kizunaai/kizunaai.pmx",
	// プロ生ちゃん_著作表示不要、改変/再配布可、商用利用(許諾要)
	//"./models/mmd/pronama_normal/pronama.pmx",
	//"./models/mmd/pronama_tshirt/pronama.pmx",
	//"./models/mmd/pronama_3d/pronama.pmx",
	// 九十九みる_表記必要、改変可、再配布可、個人同人利用可、企業商用利用(連絡要)
	//"./models/mmd/tsukumo/TsukumoMil_mmd.pmx",
	// ミライアカリ
	//"./models/mmd/miraiakari/MiraiAkari_v1.0.pmx",
	// ゴメラ
	//"./models/mmd/gomera/GOMERA_2m_Ver1.0.pmx",
	// 結月ゆかり
	//"./models/mmd/yuitsuki/yuitsuki_ver1.0.pmd",
	// アイマリン
	//"./models/mmd/imarine/iMarine_DeepBlueTown_he_Oideyo.pmx"
	// ニコニ立体ちゃん_表記不要、改変/配布可、商用利用可(法人除く)
	//"./models/mmd/alicia/Alicia_solid.pmx",
	// 中野シスターズ_表記不要、改変可、商業利用可(法人含む)、二次創作可
	//"./models/mmd/nakashis/naka/naka.pmx",
	//"./models/mmd/nakashis/kano/kano.pmx",
	// 香風智乃 Ver. 1.02 (ニコニ・コモンズ)
	//"./models/mmd/chino/Chino and Tippy.pmx",
	//"./models/mmd/chino/Chino Kafuu Ver. 1.02.pmx",
	//"./models/mmd/chino/Chino Winter Uniform.pmx",
	// 涼風青葉
	//"./models/mmd/aoba/Aoba Suzukaze_Normal.pmx",
	//"./models/mmd/aoba/Aoba Suzukaze_Swimsuit.pmx",
	// 社畜ちゃん
	//"./models/mmd/office_syachiku/syachiku_Ver.2.1.pmd",
	// フェリス
	//"./models/mmd/felix/Felix Argyle Ver. 1.01.pmx",
];

// let vmds = [
// 	"./models/vmds/cinderela/a.vmd",
// 	"./models/vmds/cinderela/b.vmd"
// ];

// let vmds = [
// 	{id:"#btnA", name: "cinderela",   path:"./models/vmds/cinderela/a.vmd"},
// 	{id:"#btnB", name: "seidenki",    path:"./models/vmds/seidenki/seidenki.vmd"},
// 	{id:"#btnC", name: "wavefile_v2", path:"./models/vmds/wavefile_v2/wavefile_v2.vmd"}
// ];

let vmds = [
	{id:"#btnA", name: "ahahahaha", path:"./models/vmds/motions/ahahahaha.vmd"},
	{id:"#btnB", name: "ehehehehe", path:"./models/vmds/motions/ehehehehe.vmd"},
	{id:"#btnC", name: "ehonto",    path:"./models/vmds/motions/ehonto.vmd"}
];

// Init
let index = Math.floor(Math.random() * pmxs.length);
initMMD(pmxs[index], vmds);

// Loop
loop();
function loop(){

	// Stats
	stats.update();

	// Update
	updateMMD();

	controls.update();
	renderer.render(scene, camera);
	window.requestAnimationFrame(loop);
};