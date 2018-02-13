console.log("Hello Three.js!!");

const DEG_TO_RAD = Math.PI / 180;

const width  = 480;
const height = 320;
const fov    = 60;
const aspect = width / height;
const near   = 1;
const far    = 1000;

// Scene
let scene = new THREE.Scene();
scene.background = new THREE.Color(0x333366);

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
camera.position.set(-2, 18, -5);
//camera.lookAt({x:0, y:12, z:0});

// Light
let directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0.0, 30.0, 0.0);
scene.add(directionalLight);

// Renderer
let renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize(width, height);
renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById("stage").appendChild(renderer.domElement);

// Plane
let geometry = new THREE.PlaneGeometry(5, 5);
let material = new THREE.MeshBasicMaterial({color: 0xcccccc});
let plane = new THREE.Mesh(geometry, material);
plane.position.set(0, 0, 0);
plane.rotation.set(-90 * Math.PI / 180, 0, 0);
scene.add(plane);

// Controls
let controls = new THREE.TrackballControls(camera);
controls.target.set(0, 18, -8);

let pmxCharacters = [
	// KizunaAI
	"./models/mmd/kizunaai/kizunaai.pmx",
	// プロ生ちゃん_著作表示不要、改変/再配布可、商用利用(許諾要)
	//"./models/mmd/pronama_normal/pronama.pmx",
	//"./models/mmd/pronama_tshirt/pronama.pmx",
	//"./models/mmd/pronama_3d/pronama.pmx",
	// 九十九みる_表記必要、改変可、再配布可、個人同人利用可、企業商用利用(連絡要)
	// "./models/mmd/tsukumo/TsukumoMil_mmd.pmx",
	// ミライアカリ
	//"./models/mmd/miraiakari/MiraiAkari_v1.0.pmx",
	// ゴメラ
	// "./models/mmd/gomera/GOMERA_2m_Ver1.0.pmx",
	// 結月ゆかり
	//"./models/mmd/yuitsuki/yuitsuki_ver1.0.pmd",
	// アイマリン
	// "./models/mmd/imarine/iMarine_DeepBlueTown_he_Oideyo.pmx",
	// ニコニ立体ちゃん_表記不要、改変/配布可、商用利用可(法人除く)
	// "./models/mmd/alicia/Alicia_solid.pmx",
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
	// ガールズパンツァー
	// "./models/mmd/PANZER_五十鈴華/五十鈴華.pmx",
	// "./models/mmd/PANZER_冷泉麻子/冷泉麻子.pmx",
	// "./models/mmd/PANZER_武部沙織/武部沙織.pmx",
	// "./models/mmd/PANZER_秋山優花里/秋山優花里.pmx",
	// ガンダム
	//"./models/mmd/RX-93N-Gundam/N-Gundam.pmd",
];

let pmxScenes = [
	"./models/mmd/囲炉裏のある部屋ver1.0/囲炉裏のある部屋/囲炉裏のある部屋20170301.pmx",
]

let vmds = [
	{id:"#btnA",   name:"./models/vmds/motions/ahahahaha.vmd"},
	{id:"#btnB",   name:"./models/vmds/motions/asanonobi.vmd"},
	{id:"#btnC",   name:"./models/vmds/motions/baan.vmd"},
	{id:"#btnD",   name:"./models/vmds/motions/biku.vmd"},
	{id:"#btnE",   name:"./models/vmds/motions/denwakirareru.vmd"},
	{id:"#btnF",   name:"./models/vmds/motions/ehehehehe.vmd"},
	{id:"#btnG",   name:"./models/vmds/motions/ehonto.vmd"},
	{id:"#btnH",   name:"./models/vmds/motions/funn.vmd"},
	{id:"#btnI",   name:"./models/vmds/motions/furimuki1.vmd"},
	{id:"#btnJ",   name:"./models/vmds/motions/furimuki2.vmd"},
	{id:"#btnK",   name:"./models/vmds/motions/inemuri.vmd"},
	{id:"#btnL",   name:"./models/vmds/motions/itaiashikakaejump.vmd"},
	{id:"#btnM",   name:"./models/vmds/motions/kagamu.vmd"},
	{id:"#btnN",   name:"./models/vmds/motions/kokeru1.vmd"},
	{id:"#btnO",   name:"./models/vmds/motions/kokeru2.vmd"},
	{id:"#btnP",   name:"./models/vmds/motions/nagekiss.vmd"},
	{id:"#btnQ",   name:"./models/vmds/motions/nandakana1.vmd"},
	{id:"#btnR",   name:"./models/vmds/motions/nandakana2.vmd"},
	{id:"#btnS",   name:"./models/vmds/motions/nekorogarikeiren.vmd"},
	{id:"#btnT",   name:"./models/vmds/motions/nekorogarishirikaki.vmd"},
	{id:"#btnU",   name:"./models/vmds/motions/odoroki1.vmd"},
	{id:"#btnV",   name:"./models/vmds/motions/odoroki2.vmd"},
	{id:"#btnW",   name:"./models/vmds/motions/odoroki3.vmd"},
	{id:"#btnX",   name:"./models/vmds/motions/over.vmd"},
	{id:"#btnY",   name:"./models/vmds/motions/ponn.vmd"},
	{id:"#danceA", name:"./models/vmds/cinderela/a.vmd"},
	{id:"#danceB", name:"./models/vmds/seidenki/seidenki.vmd"},
	{id:"#danceC", name:"./models/vmds/wavefile_v2/wavefile_v2.vmd"},
];

// UI
for(let i=0; i<vmds.length; i++){
	$(vmds[i].id).click((e)=>{
		console.log("Click:" + vmds[i].id);
		changeAction(vmds[i].name);
	});
}

// Init
let index = Math.floor(Math.random() * pmxCharacters.length);
initMMDCharacter(pmxCharacters[index], vmds);
initMMDScene(pmxScenes[0]);

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