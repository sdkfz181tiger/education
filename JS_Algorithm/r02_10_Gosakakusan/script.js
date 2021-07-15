console.log("Hello, 応用情報技術者試験!!");

// 応用情報_R02秋
//    誤差拡散法による減色処理

const W = 5;// 画像の横幅
const H = 4;// 画像の高さ

// 処理前の画像データ(値は輝度)
const bmpFrom = [
	[0,  223, 128, 35,  220],
	[30, 22,  18,  55,  197],
	[35, 122, 250, 105, 15],
	[38, 153, 251, 120, 18]
];

// 処理後の画像データ(最終的に0もしくは255が入る)
const bmpTo = Array.from(new Array(H), ()=>new Array(W).fill(0));

const tdx   = [1, -1, 0, 1];// 拡散先のx相対位置
const tdy   = [0, 1, 1, 1]; // 拡散先のy相対位置
const ratio = [7, 3, 5, 1]; // 拡散先の割合の分子
const denominator = 16;     // 拡散先の割合の分母

window.onload = (event)=>{

	// 誤差拡散法による減色処理
	for(let y=0; y<H; y++){
		for(let x=0; x<W; x++){
			let f = bmpFrom[y][x] + bmpTo[y][x];// 同じピクセルの合計
			let d = 0;// 拡散する値
			if(128 <= f){// 白か黒かを判定する
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

	// 処理後の画像データを確認
	console.table(bmpTo);
}