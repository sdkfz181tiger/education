console.log("data.js!!");

// Skybox
const SKYBOX_PATH  = "./textures/sky1/";
const SKYBOX_FILES = [
	"pos-x.png", "neg-x.png",
	"pos-y.png", "neg-y.png",
	"pos-z.png", "neg-z.png"];

// Sound
const SOUND_BGM     = "./sounds/minuet_bach.mp3";
const SOUND_VOLUME  = 1.0;// 音量: 0.0 ~ 1.0

const TIME_TO_PIXEL = 50; // 1秒が何ピクセルか
const TIME_TO_SPAN  = 0.5;// ブロック間隔(秒数)

const CAM_X = 0; // カメラの座標
const CAM_Y = 15;
const CAM_Z = 15;

const TGT_X = 0;  // カメラの向き
const TGT_Y = 0;
const TGT_Z = -10;

const MODEL_SCALE = 0.2;// モデルのスケール

// Data
const models = {data:[
	{dir:"./models/obj/", mtl:"4x4x4.mtl",    obj:"4x4x4.obj"},
	{dir:"./models/obj/", mtl:"6x6x6.mtl",    obj:"6x6x6.obj"},
	{dir:"./models/obj/", mtl:"8x8x8.mtl",    obj:"8x8x8.obj"},
	{dir:"./models/obj/", mtl:"10x10x10.mtl", obj:"10x10x10.obj"}
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
	{name: "t1", sensor: "4x4x4.obj", marker: "6x6x6.obj", sound: "tap.mp3", key: "A", x: -10, y: 5, 
		z: [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0]},
	{name: "t1", sensor: "4x4x4.obj", marker: "6x6x6.obj", sound: "tap.mp3", key: "B", x:   0, y: 5, 
		z: [0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0]},
	{name: "t1", sensor: "4x4x4.obj", marker: "6x6x6.obj", sound: "tap.mp3", key: "C", x: +10, y: 5, 
		z: [0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1]}
];