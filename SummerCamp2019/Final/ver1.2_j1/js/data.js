console.log("data.js!!");

// Sound
const SOUND_BGM     = "./sounds/utiage.mp3";// 課題曲
const SOUND_VOLUME  = 1.0;// 音量: 0.0 ~ 1.0

const OFFSET_Z_PIXEL = -210;  // 最初のブロックのz位置(開始位置を調整する時に変更)216
const TIME_TO_PIXEL  = 100; // 1秒が何ピクセルか
const TIME_TO_SPAN   = 0.310;// ブロック間隔(秒数)

const CAM_X = 0; // カメラの座標
const CAM_Y = 15;
const CAM_Z = 15;

const TGT_X = 0; // カメラの向き
const TGT_Y = 0;
const TGT_Z = -10;

const MODEL_SCALE = 4;// モデルのスケール

// 読み込む3Dモデリングデータ
const models = {data:[
	{dir:"./models/obj/", mtl:"4x4x4.mtl",       obj:"4x4x4.obj"},
	{dir:"./models/obj/", mtl:"6x6x6.mtl",       obj:"6x6x6.obj"},
	{dir:"./models/obj/", mtl:"8x8x8.mtl",       obj:"8x8x8.obj"},
	{dir:"./models/obj/", mtl:"10x10x10.mtl",    obj:"10x10x10.obj"},

	{dir:"./models/obj/", mtl:"logo_great.mtl",  obj:"logo_great.obj"},
	{dir:"./models/obj/", mtl:"logo_good.mtl",   obj:"logo_good.obj"},
	{dir:"./models/obj/", mtl:"logo_bad.mtl",    obj:"logo_bad.obj"},
	//{dir:"./models/obj/", mtl:"logo_finish.mtl", obj:"logo_finish.obj"}, //ゆいぴー更新

    //こたろう
	{dir:"./models/designer1/", mtl:"ground.mtl",       obj:"ground.obj"},
	{dir:"./models/designer1/", mtl:"house_gole.mtl",   obj:"house_gole.obj"},
	{dir:"./models/designer1/", mtl:"buill.mtl",        obj:"buill.obj"},

    //YUP
	{dir:"./models/designer2/", mtl:"ki.mtl",           obj:"ki.obj"},
	{dir:"./models/designer2/", mtl:"logo_finish.mtl",  obj:"logo_finish.obj"},

    //KKB2
	{dir:"./models/designer3/", mtl:"Diamondsword.mtl", obj:"Diamondsword.obj"},
	{dir:"./models/designer3/", mtl:"hanabi.mtl",       obj:"hanabi.obj"},
	{dir:"./models/designer3/", mtl:"huwaif.mtl",       obj:"huwaif.obj"},
	{dir:"./models/designer3/", mtl:"TanksH.mtl",       obj:"TanksH.obj"},
	{dir:"./models/designer3/", mtl:"TNT.mtl",          obj:"TNT.obj"},

	//ほのか
	{dir:"./models/designer4/", mtl:"chest.mtl",        obj:"chest.obj"},
	{dir:"./models/designer4/", mtl:"juice.mtl",        obj:"juice.obj"},
	{dir:"./models/designer4/", mtl:"kusa.mtl",         obj:"kusa.obj"},

	//UMA
	{dir:"./models/designer5/", mtl:"3.mtl",            obj:"3.obj"},
	{dir:"./models/designer5/", mtl:"murabito.mtl",     obj:"murabito.obj"},
	{dir:"./models/designer5/", mtl:"kuri-oer-.mtl",    obj:"kuri-oer-.obj"},
	{dir:"./models/designer5/", mtl:"sannzu.mtl",       obj:"sannzu.obj"},
]};

// 読み込むサウンドデータ
const sounds = {data:[
	{dir:"./sounds/", mp3:"tap.mp3"},
	{dir:"./sounds/", mp3:"piano1_do.mp3"}, {dir:"./sounds/", mp3:"piano1_re.mp3"},
	{dir:"./sounds/", mp3:"piano1_mi.mp3"}, {dir:"./sounds/", mp3:"piano1_fa.mp3"},
	{dir:"./sounds/", mp3:"piano1_so.mp3"}, {dir:"./sounds/", mp3:"piano1_ra.mp3"},
	{dir:"./sounds/", mp3:"piano1_si.mp3"}, {dir:"./sounds/", mp3:"piano2_do.mp3"},
	{dir:"./sounds/", mp3:"cheer_j1.mp3"},
]};

// 読み込むフォントデータ
const fonts = {data:[
	{dir:"./fonts/", font:"MisakiGothic_Regular.json"},
	{dir:"./fonts/", font:"MisakiMincho_Regular.json"}
]};

// 譜面データ
const noteData = [
	{name: "t1", sensor: "TanksH.obj", sound: "tap.mp3", 
		x: -15, y: 5, z: "1-1---1-------1-1-1-----1-1-1-1-1---1---1-1-1-----1-----1-1-1-1-1"},
	{name: "t1", sensor: "murabito.obj", sound: "tap.mp3", 
		x:   0, y: 5, z: "2-----2-2---2---2---2-2-2-----2---------2-----2-2---2-----2-2-2-2"},
	{name: "t1", sensor: "murabito.obj", sound: "tap.mp3", 
		x: +15, y: 5, z: "3---3-3---3-----3-3---3---3-3-3---3---3-3-3-3-----3---3-3-3-3-3-3"},
];

const markerType = {
	1: "TNT.obj",
	2: "chest.obj",
	3: "juice.obj"
}