console.log("Hello, JavaScript!!");

// H26春_午後問3
//    フロイドの循環検出アルゴリズム

window.onload = (event)=>{

	let num = 56;
	console.log("Test:"+ n , "計算結果:" + 1 / n);// 0.017857142857142856
	junkan(n);// 4~9桁目である"857142"が循環小数である
}

function junkan(n){
	let m = 1;// カメの位置
	let p = 1;// ウサギの位置
	let s = 0;// 循環の先頭
	let t = 0;// 循環の末尾
	// 余りが一致するまで
	while(true){
		m = amari(m * 10, n);// カメは1歩
		p = amari(amari(p * 10, n) * 10, n);// ウサギは2歩
		if(m == p) break;
	}
	//console.log("一致:" + m + " <-> " + p);
	if(p != 0){
		// 循環の先頭を検出
		p = 1;// ウサギをリセット
		s = 1;// 循環の先頭を先頭の位置と一致させる
		while(m != p){// カメ値とウサギ値が一致するまで
			s++;
			m = amari(m * 10, n);// カメは1歩
			p = amari(p * 10, n);// ウサギは1歩
		}
		//console.log("一致:" + m + " <-> " + p);
		console.log("循環の先頭:" + s);
		// 循環の末尾を検出
		p = amari(p * 10, n);// ウサギは1歩
		t = s;// 循環の末尾を先頭の位置と一致させる
		while(m != p){// カメ値とウサギ値が一致するまで
			t++;
			p = amari(p * 10, n);// ウサギは1歩
		}
		//console.log("一致:" + m + " <-> " + p);
		console.log("循環の末尾:" + t);
		return;
	}
	console.log(n + "は循環小数ではありません");
}

function amari(a, b){
	return a % b;
}