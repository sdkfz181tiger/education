console.log("data.js!!");

const SKYBOX_SRC    = "./textures/skybox_space.png";
const SOUND_BGM     = "./sounds/minuet_bach.mp3";
const SOUND_VOLUME  = 1.0;// 音量: 0.0 ~ 1.0

const TIME_TO_PIXEL = 50; // 1秒が何ピクセルか
const TIME_TO_SPAN  = 0.5;// ブロック間隔(秒数)

const CAM_X = 20; // カメラの座標
const CAM_Y = 25;
const CAM_Z = 15;

const TGT_X = 0;  // カメラの向き
const TGT_Y = 0;
const TGT_Z = -10;

const MODEL_SCALE = 0.2;// モデルのスケール

// Data
const models = {data:[
	{dir:"./models/obj/", mtl:"tree_1.mtl", obj:"tree_1.obj"},
	{dir:"./models/obj/", mtl:"tree_2.mtl", obj:"tree_2.obj"},
	{dir:"./models/obj/", mtl:"car_1.mtl",  obj:"car_1.obj"},
	{dir:"./models/obj/", mtl:"car_2.mtl",  obj:"car_2.obj"},
	{dir:"./models/obj/", mtl:"car_3.mtl",  obj:"car_3.obj"},
	{dir:"./models/obj/", mtl:"tanuki_run_1.mtl",  obj:"tanuki_run_1.obj"}
]};

const sounds = {data:[
	{dir:"./sounds/", mp3:"tap.mp3"},
	{dir:"./sounds/", mp3:"piano1_do.mp3"}, {dir:"./sounds/", mp3:"piano1_re.mp3"},
	{dir:"./sounds/", mp3:"piano1_mi.mp3"}, {dir:"./sounds/", mp3:"piano1_fa.mp3"},
	{dir:"./sounds/", mp3:"piano1_so.mp3"}, {dir:"./sounds/", mp3:"piano1_ra.mp3"},
	{dir:"./sounds/", mp3:"piano1_si.mp3"}, {dir:"./sounds/", mp3:"piano2_do.mp3"}
]};

const fonts = {data:[
	{dir:"./fonts/", font:"MisakiGothic_Regular.json"},
	{dir:"./fonts/", font:"MisakiMincho_Regular.json"}
]};

const noteData = [
	{name: "t1", sensor: "tanuki_run_1.obj", marker: "car_1.obj", sound: "tap.mp3", key: "A", x: -10, y: 5, 
		z: [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0]},
	{name: "t1", sensor: "tanuki_run_1.obj", marker: "car_2.obj", sound: "tap.mp3", key: "B", x:   0, y: 5, 
		z: [0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0]},
	{name: "t1", sensor: "tanuki_run_1.obj", marker: "car_3.obj", sound: "tap.mp3", key: "C", x: +10, y: 5, 
		z: [0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1]}
];