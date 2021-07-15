
const tdx   = [1, -1, 0, 1];// 拡散先のx相対位置
const tdy   = [0, 1, 1, 1]; // 拡散先のy相対位置
const ratio = [7, 3, 5, 1]; // 拡散先の割合の分子
const denominator = 16;     // 拡散先の割合の分母

let img, bmpFrom, bmpTo;

function preload(){
	img = loadImage("./assets/picture.png");
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
	noSmooth();
	noStroke();
	background(33);

	const H = img.height;
	const W = img.width;
	bmpFrom = Array.from(new Array(H), ()=>new Array(W).fill(0));
	bmpTo = Array.from(new Array(H), ()=>new Array(W).fill(0));

	// 輝度を取得する
	for(let y=0; y<H; y++){
		for(let x=0; x<W; x++){
			bmpFrom[y][x] = brightness(img.get(x, y));// 輝度を取得
		}
	}

	// 誤差拡散法による減色処理
	for(let y=0; y<H; y++){
		for(let x=0; x<W; x++){
			let f = bmpFrom[y][x] + bmpTo[y][x];// 同じピクセルの合計
			let d = 0;// 拡散する値
			if(100 <= f){// 白か黒かを判定する
				d = f - 255;// 誤差を確定
				bmpTo[y][x] = 255;// 白に確定
			}else{
				d = f;// 誤差を確定
				bmpTo[y][x] = 0;// 黒に確定
			}
			// 誤差を4つのピクセルに拡散
			for(let c=0; c<ratio.length; c++){
				let pX = x + tdx[c];// 拡散先のx
				let pY = y + tdy[c];// 拡散先のy
				if(pX < 0 || W-1 < pX) continue;// 範囲外であれば継続
				if(pY < 0 || H-1 < pY) continue;
				// 4方向のピクセルに加算
				bmpTo[pY][pX] = bmpTo[pY][pX] + d * ratio[c] / denominator;
			}
		}
	}
}

function draw(){
	background(33);

	fill(255);
	const size = 2;
	const sX = width / 2 - size * img.width / 2;
	const sY = height / 2 - size * img.height / 2;
	const H = img.height;
	const W = img.width;
	for(let y=0; y<H; y++){
		for(let x=0; x<W; x++){
			if(bmpTo[y][x] == 0) continue;
			square(sX+x*size, y*size, size);
		}
	}
}