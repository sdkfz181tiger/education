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

// 読み込む3Dモデリングデータ
const models = {data:[
	{dir:"./models/obj/", mtl:"4x4x4.mtl",       obj:"4x4x4.obj"},
	{dir:"./models/obj/", mtl:"6x6x6.mtl",       obj:"6x6x6.obj"},
	{dir:"./models/obj/", mtl:"8x8x8.mtl",       obj:"8x8x8.obj"},
	{dir:"./models/obj/", mtl:"10x10x10.mtl",    obj:"10x10x10.obj"},
	{dir:"./models/obj/", mtl:"logo_great.mtl",  obj:"logo_great.obj"},
	{dir:"./models/obj/", mtl:"logo_good.mtl",   obj:"logo_good.obj"},
	{dir:"./models/obj/", mtl:"logo_bad.mtl",    obj:"logo_bad.obj"},
	{dir:"./models/obj/", mtl:"logo_finish.mtl", obj:"logo_finish.obj"},
]};

// 読み込むサウンドデータ
const sounds = {data:[
	{dir:"./sounds/", mp3:"tap.mp3"},
	{dir:"./sounds/", mp3:"piano1_do.mp3"}, {dir:"./sounds/", mp3:"piano1_re.mp3"},
	{dir:"./sounds/", mp3:"piano1_mi.mp3"}, {dir:"./sounds/", mp3:"piano1_fa.mp3"},
	{dir:"./sounds/", mp3:"piano1_so.mp3"}, {dir:"./sounds/", mp3:"piano1_ra.mp3"},
	{dir:"./sounds/", mp3:"piano1_si.mp3"}, {dir:"./sounds/", mp3:"piano2_do.mp3"}
]};

// 読み込むフォントデータ
const fonts = {data:[
	{dir:"./fonts/", font:"MisakiGothic_Regular.json"},
	{dir:"./fonts/", font:"MisakiMincho_Regular.json"}
]};

// 譜面データ
const noteData = [
	{name: "t1", sensor: "4x4x4.obj", marker: "10x10x10.obj", sound: "tap.mp3", key: "1", x: -10, y: 5, 
		z: [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0]},
	{name: "t1", sensor: "4x4x4.obj", marker: "10x10x10.obj", sound: "tap.mp3", key: "2", x:   0, y: 5, 
		z: [0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0]},
	{name: "t1", sensor: "4x4x4.obj", marker: "10x10x10.obj", sound: "tap.mp3", key: "3", x: +10, y: 5, 
		z: [0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1]}
];