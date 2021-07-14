console.log("Hello, 応用情報技術者試験!!");

// 応用情報_H24秋
//    Nクィーン問題

const N = 8;// 盤面のサイズ
let pos    = new Array(N).fill(-1);       // クィーンの配置位置
let col    = new Array(N).fill(false);    // 下方向
let upwd   = new Array(N*2-1).fill(false);// 右上方向
let downwd = new Array(N*2-1).fill(false);// 右下方向

window.onload = (event)=>{

	// Nクィーン問題
	if(search(0)){
		console.log("Success!!");
		showBoard();// 盤面を表示する
	}else{
		console.log("Failed...");
	}
}

function search(i){

	// i行k列のマスを確認する
	for(let k=0; k<N; k++){
		// 既に配置している場合は継続
		if(col[k]) continue;
		if(upwd[i+k-1]) continue;
		if(downwd[i+N-k]) continue;

		// クィーンを配置する
		pos[i]        = k;
		col[k]        = true;
		upwd[i+k-1]   = true;
		downwd[i+N-k] = true;

		// 全ての行で配置が完了
		if(i == N-1) return true;

		// 次の行を調べる
		if(search(i+1)) return true;

		// クィーンを取り除く
		pos[i]        = -1;
		col[k]        = false;
		upwd[i+k-1]   = false;
		downwd[i+N-k] = false;
	}
	return false;
}

function showBoard(){
	for(let p of pos){
		let line = new Array(N).fill("-");
		line[p] = "o";
		console.log(line.join(" "));
	}
}