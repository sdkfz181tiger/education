console.log("Hello, JavaScript!!");

// H27春 午後問3
//    データ圧縮の前処理として用いられるBlockSorting

window.onload = (event)=>{
	
	let encoded = encode("papaya");
	console.log(encoded[0], encoded[1]);
	let decoded = decode(encoded[0], encoded[1]);
	console.log(decoded);
}

function encode(str){

	// 変換用テーブルを作る
	let table = [str];
	for(let i=1; i<str.length; i++){
		table.push(rotate(table[i-1]));// 文字列を左にシフト
	}
	table.sort();// 昇順に並び替えをする

	let result = "";
	let index = -1;
	for(let i=0; i<table.length; i++){
		let len = table[i].length;// 文字列の長さ
		result += table[i][len-1];// 該当の文字列の最後尾
		if(table[i] == str) index = i;// 一致する文字列インデックス
	}
	return [result, index];
}

function rotate(str){
	if(str.length < 2) return str;
	return str.slice(1) + str[0];// 文字列を左にシフト
}

function decode(str, index){

	// 変換用テーブルを作る
	let table = [];
	for(let i=0; i<str.length; i++){
		table.push([str[i], i]);
	}
	table.sort((a, b)=>{return a[0] > b[0];});// 昇順に並び替え

	let result = table[index][0];// indexに該当する文字を結合
	let next = table[index][1];// 並び替え前の添字を取り出す
	while(result.length < table.length){
		result += table[next][0];// 並び替え前の添字を結合
		next = table[next][1];// 並び替え前の添字を取り出す
	}
	return result;
}
