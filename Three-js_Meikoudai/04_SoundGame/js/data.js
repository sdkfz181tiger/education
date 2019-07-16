console.log("data.js!!");

const SOUND_BGM     = "./sounds/minuet_bach.mp3";
const SOUND_VOLUME  = 1.0;// 音量: 0.0 ~ 1.0
const TIME_TO_PIXEL = 50; // 1秒が何ピクセルか
const TIME_TO_SPAN  = 0.5;// ブロック間隔(秒数)

const CAM_X = 0;  // カメラの座標
const CAM_Y = 15;
const CAM_Z = 20;

const TGT_X = 0;  // カメラの向き
const TGT_Y = 0;
const TGT_Z = -10;

// Data
const models = {data:[
	{dir:"./models/obj/", mtl:"city_1.mtl",    obj:"city_1.obj"},
	{dir:"./models/obj/", mtl:"city_2.mtl",    obj:"city_2.obj"},
	{dir:"./models/obj/", mtl:"obj_red.mtl",   obj:"obj_red.obj"},
	{dir:"./models/obj/", mtl:"obj_green.mtl", obj:"obj_green.obj"},
	{dir:"./models/obj/", mtl:"obj_blue.mtl",  obj:"obj_blue.obj"}
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
	{"name": "t1", "sound": "tap.mp3", "x": -10, "y": 0, 
		"z": [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0]},
	{"name": "t1", "sound": "tap.mp3", "x":   0, "y": 0, 
		"z": [0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0]},
	{"name": "t1", "sound": "tap.mp3", "x": +10, "y": 0, 
		"z": [0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1]}
];