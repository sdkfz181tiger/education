console.log("Hello p5.js!!");

const DISP_W = 64;
const DISP_H = 64;
const DEG_TO_RAD  = Math.PI / 180;

const colors = [
	[124,124,124], [0,0,252], [0,0,188], [68,40,188], [148,0,132],
	[168,0,32], [168,16,0], [136,20,0], [0,120,0],
	[0,120,248], [0,88,248], [104,68,252], [216,0,204], [228,0,88],
	[248,56,0], [228,92,16], [172,124,0], [0,184,0], [0,168,0],
	[0,168,68], [0,136,136], [248,248,248], [60,188,252], [104,136,252],
	[152,120,248], [248,120,248], [248,88,152], [248,120,88], [252,160,68],
	[248,184,0], [184,248,24], [88,216,84], [88,248,152], [0,232,216],
	[120,120,120], [252,252,252], [164,228,252], [184,184,248], [216,184,248],
	[248,184,248], [248,164,192], [240,208,176], [252,224,168], [248,216,120],
	[216,248,120], [184,248,184], [184,248,216], [0,252,252], [248,216,248]
];

let counter = 0;

let files = [

	// "exp_mid_1.png", "exp_mid_2.png", "exp_mid_3.png",
	// "exp_small_1.png", "exp_small_2.png", "exp_small_3.png",
	// "exp_small_4.png", "exp_small_5.png", "exp_small_6.png",
	// "exp_small_7.png", "exp_small_8.png", "exp_small_9.png",
	// "exp_small_10.png", "exp_small_11.png", "exp_small_12.png",
	// "exp_small_13.png", "exp_small_14.png", "exp_small_15.png",
	//
	// "title_logo_1.png",
	// "u_die_1.png", "u_die_2.png", "u_die_3.png",
	// "u_die_4.png", "u_die_5.png",
	// "u_roll_1.png", "u_roll_2.png", "u_roll_3.png",
	// "u_roll_4.png", "u_roll_5.png",
	//
	// "b_aqua_1.png",  "b_bits_1.png",   "b_blue_1.png",
	// "b_brown_1.png", "b_forest_1.png", "b_gray_1.png",
	// "b_green_1.png", "b_lime_1.png",   "b_orange_1.png",
	// "b_pink_1.png",  "b_purple_1.png", "b_red_1.png",
	// "b_rock_1.png",  "b_white_1.png",  "b_yellow_1.png",
	// "b_vanish_1.png", "b_vanish_2.png", "b_vanish_3.png", "b_vanish_4.png",
	// "b_vanish_5.png", "b_vanish_6.png", "b_vanish_7.png", "b_vanish_8.png",
	// "b_vanish_9.png", "b_vanish_10.png", "b_vanish_11.png", "b_vanish_12.png",
	// "w_left.png", "w_right.png",
	// "w_top_left.png", "w_top_right.png", "w_top_center.png",

	// "ball_1.png", "background_1.png"

	// "i_break_1.png", "i_break_2.png", "i_break_3.png",
	// "i_break_4.png", "i_break_5.png", "i_break_6.png",
	// "i_break_7.png", "i_break_8.png", "i_break_9.png",
	// "i_catch_1.png", "i_catch_2.png", "i_catch_3.png",
	// "i_catch_4.png", "i_catch_5.png", "i_catch_6.png",
	// "i_catch_7.png", "i_catch_8.png", "i_catch_9.png",
	// "i_disruption_1.png", "i_disruption_2.png", "i_disruption_3.png",
	// "i_disruption_4.png", "i_disruption_5.png", "i_disruption_6.png",
	// "i_disruption_7.png", "i_disruption_8.png", "i_disruption_9.png",
	// "i_expand_1.png", "i_expand_2.png", "i_expand_3.png",
	// "i_expand_4.png", "i_expand_5.png", "i_expand_6.png",
	// "i_expand_7.png", "i_expand_8.png", "i_expand_9.png",
	// "i_lazer_1.png", "i_lazer_2.png", "i_lazer_3.png",
	// "i_lazer_4.png", "i_lazer_5.png", "i_lazer_6.png",
	// "i_lazer_7.png", "i_lazer_8.png", "i_lazer_9.png",
	// "i_player_1.png", "i_player_2.png", "i_player_3.png",
	// "i_player_4.png", "i_player_5.png", "i_player_6.png",
	// "i_player_7.png", "i_player_8.png", "i_player_9.png",
	// "i_speeddown_1.png", "i_speeddown_2.png", "i_speeddown_3.png",
	// "i_speeddown_4.png", "i_speeddown_5.png", "i_speeddown_6.png",
	// "i_speeddown_7.png", "i_speeddown_8.png", "i_speeddown_9.png",

	"inv_00_1.png", "inv_00_2.png", "inv_01_1.png", "inv_01_2.png",
	"inv_02_1.png", "inv_02_2.png", "inv_03_1.png", "inv_03_2.png",
	"inv_04_1.png", "inv_04_2.png", "inv_05_1.png", "inv_05_2.png",
	"inv_06_1.png", "inv_06_2.png", "inv_07_1.png", "inv_07_2.png",
	"inv_08_1.png", "inv_08_2.png", "inv_09_1.png", "inv_09_2.png",
	"inv_10_1.png", "inv_10_2.png", "inv_11_1.png", "inv_11_2.png",
	"inv_12_1.png", "inv_12_2.png", "inv_13_1.png", "inv_13_2.png",
	"inv_14_1.png", "inv_14_2.png", "inv_15_1.png", "inv_15_2.png",
	"inv_16_1.png", "inv_16_2.png"
];

let imgObj = new Object();

function preload(){

	// Font
	let font = loadFont("assets/misaki_gothic.ttf");
	textFont(font); textSize(32); fill(255);

	// Images
	for(file of files){
		imgObj[file] = loadImage("assets/" + file);
	}
}

function setup(){
	console.log("setup");
	createCanvas(DISP_W, DISP_H);
	noLoop();
	clear();
	background("rgba(0, 0, 0, 0)");

	fill(255, 255, 255);
	noStroke();

	// Create
	createPng();
}

function draw(){
	console.log("draw");
}

function mousePressed(){
	console.log("mousePressed");
}

function createPng(index = 0){
	console.log("createPng:" + index);
	setTimeout(()=>{
		if(index < files.length){
			savePng(files[index], 5);// FirefoxのZoomを50%にする事
			index++;
			createPng(index);
		}
	}, 100);
}

function savePng(fileName, size){
	console.log("savePng:" + fileName);

	// Image
	let img = imgObj[fileName];
	let width  = img.width;
	let height = img.height;

	// Array
	let colors = new Array();
	for(let y=0; y<height; y++){
		let lines = new Array();
		for(let x=0; x<width; x++){
			lines.push(img.get(x, y));
		}
		colors.push(lines);
	}

	// Canvas
	let rMax = colors.length;
	let cMax = colors[0].length;
	let cvs = createCanvas(width*size, height*size);

	console.log("cvs:" + width*size + ", " + height*size);

	// Rect
	for(let r=0; r<rMax; r++){
		for(let c=0; c<cMax; c++){
			if(colors[r][c][3] != 0){
				fill(colors[r][c]);
				rect(size*c, size*r, size, size);
			}
		}
	}

 	// Save(***_x4.png)
	//let array = fileName.split(".");
	//save(cvs, array[0] + "_x" + size + "." + array[1]);
	// Save(同じファイル名)
	save(cvs, fileName);
}
