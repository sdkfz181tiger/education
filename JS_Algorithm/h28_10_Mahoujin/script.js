console.log("Hello, 応用情報技術者試験!!");

// 応用情報_H28秋
//    魔法陣

const N = 3;// 奇数である事
let houjin = Array.from(new Array(N), ()=>new Array(N).fill(0));
let num = 1;

window.onload = (event)=>{
	
	create();// 魔法陣を作成する
	console.table(houjin);
}

function create(){

	let y = N - 1;
	let x = Math.floor(N / 2);
	houjin[y][x] = num;// 最下段中央を1とする

	while(num < N * N){
		let bY = y;// 現在のマスを記憶
		let bX = x;
		y = y + 1;// 現在のマスの右下へ
		x = x + 1;

		if(N - 1 < y) y = 0;// 魔法陣から出た場合修正
		if(N - 1 < x) x = 0;

		// 右下の値が0でない場合
		if(houjin[y][x] != 0){
			y = bY - 1;// 真上のマスを対象にする
			x = bX;
		}

		num++;
		houjin[y][x] = num;
	}
}