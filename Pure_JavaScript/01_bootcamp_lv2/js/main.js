"use strict";

//==========
// JavaScript文法
// Level_02

//==========
// [定数を使ってみよう]
//   1, 定数は、宣言時に値を確定させます
//   2, 定数は値を変更することができません
//   3, 定数を使う事でバグを減らす事ができます

// 定数を宣言して初期化する
const hoge = 100;
console.log(hoge);

//hoge = 200;// 定数の値を変更しようとしたのでエラー
//console.log(hoge);

//==========
// [true / falseを使ってみよう]
//   1, trueには"真", falseには"偽"という意味があります
//   2, ifとセットで使う事が多く、判定に使います
//   3, "true / false"は、変数に格納することができます

// 変数を宣言して初期値を"true"にする
let fuga = true;
console.log(fuga);

// もしfugaが"true"だったら...
if(fuga){
	console.log("貴様、見ているな!!");
}

// 変数を宣言して初期値を"false"にする
let piyo = false;
console.log(piyo);

// もしpiyoが"true"だったら...
if(piyo){
	console.log("ロードローラーだ!!");
}

//==========
// [2つに分岐する判定をしてみよう]
//   1, elseは、if文とセットで記述します
//   2, elseには"その他"という意味があります
//   3, 必ずどちらかの分岐処理を行うことを覚えましょう

// 変数を宣言して初期値を"true"にする
let puyo = true;
console.log(puyo);

console.log("今日のお昼ご飯は...");
if(puyo){
	console.log("生姜焼き定食です!!");
}else{
	console.log("ビーフステーキセットです!!");
}

//==========
// [配列をつかってみよう]
//   1, 配列には、沢山のデータを格納することができます
//   2, [] 角カッコを使って宣言します
//   3, 添字(整数)を使ってそれぞれのデータにアクセスすることができます
//   4, 先頭のデータは添字[0]、2番目以降からは1,2,3...とアクセスします

// 配列を宣言して初期値を設定する
let teisyoku = ["ごはん", "みそしる", "しょうが焼き"];
console.log(teisyoku[0]);
console.log(teisyoku[1]);
console.log(teisyoku[2]);
//console.log(teisyoku[3]);// これはエラーです

// 配列に格納されている値を変更する
teisyoku[0] = "パン";
teisyoku[1] = "赤ワイン";
teisyoku[2] = "ビーフステーキ";
console.log(teisyoku[0]);
console.log(teisyoku[1]);
console.log(teisyoku[2]);

//==========
// [配列とfor文]
//   1, for文を使うと、配列の要素に一つづつ順番にアクセスできます
//   2, lengthパラメーターは配列の要素数(総件数)を取得できます

// 配列を宣言して初期値を設定する
let family = ["ひろし", "みさえ", "しんちゃん", "シロ"];
// 配列に格納されている要素数を取得する
let total = family.length;

// 添字(i)を利用して配列の要素にアクセスする
for(let i=0; i<total; i++){
	console.log(family[i]);
}

// 配列を宣言して初期値を設定する
let ages = [35, 29, 5, 2];
for(let i=0; i<total; i++){
	// 一つの文章にまとめる(連結する)
	let str = family[i] + "は" + ages[i] + "歳です!!";
	console.log(str);
}

//==========
// [for文を2重に使ってみよう]
//   1, for文を2つ組み合わせる事ができます
//   2, 初期化部分で使う変数名(iとj)は同じにしない様にしましょう

console.log("掛け算自動計算システム")
// iの値が 1, 2, 3, 4, 5... 9まで繰り返す
for(let i=1; i<10; i++){
	console.log(i + "の段");
	// jの値が 1, 2, 3, 4, 5... 9まで繰り返す
	for(let j=1; j<10; j++){
		// iとjとを掛け算する
		console.log(i * j);
	}
}

//==========
// [関数を使ってみよう]
//   1, 関数は、処理を一つにまとめることができます
//   2, 処理のまとまりを何度も使い回すことができます
//   3, 関数を作っても、実行するまでは動きません

console.log("むかしむかし");
console.log("あるところに");
console.log("お爺さんと");
console.log("お婆さんが");
console.log("住んでいました。");
console.log("お爺さんは山へ芝刈りに、");
console.log("お婆さんは川へ洗濯にいきました。");

// 関数を定義する
function myFuncA(){
	console.log("関数が実行された!!");
}

// 関数を実行する
myFuncA();
// 関数を実行する
myFuncA();
// 関数を実行する
myFuncA();

//==========
// [引数を使ってみよう]
//   1, 引数を使って関数を実行する事ができます
//   2, 引数があることで、様々な処理をさせることができます
//   3, 引数は、何個でも用意する事ができます
//   4, 引数は、関数内だけで使う事ができます

// 引数が一つの場合
function myFuncA(a){
	console.log(a + "の、奇妙な冒険");
}

// 使ってみる
myFuncA("ジョジョ")
myFuncA("アンパンマン");
myFuncA("サザエさん");

// 引数が二つの場合
function myFuncB(a, b){
	console.log(a + "の、" + b + "な冒険");
}

myFuncB("ジョジョ", "奇妙");
myFuncB("アンパンマン", "孤独");
myFuncB("サザエさん", "ワガママ");

// 引数が三つの場合
function myFuncC(a, b, c){
	console.log(a + "の、" + b + "な" + c);
}

myFuncC("ジョジョ", "奇妙", "冒険");
myFuncC("アンパンマン", "激辛" "顔")
myFuncC("サザエさん", "情熱的", "昼下がり");

//==========
// [返り値を使ってみよう]
//   1, returnを使うと、処理をした結果を返すことができます
//   2, 引数とセットで使われる事が多いです
//   3, 複雑な計算を関数でまとめ、その結果を返す関数がよく使われます

// 引数に与えられた値の合計を計算して返す処理
function myFuncA(a, b){
	// aとbを足し算し、実行元に返す
	return a + b;
}

// 関数を実行し、その結果をresultA変数に格納する
let resultA = myFuncA(100, 200);
console.log("足し算した結果は" + resultA);

// 引数に与えられた値を掛け算して返す処理
function myFuncB(a, b){
	// aとbを掛け算し、実行元に返す
	return a * b;
}

// 関数を実行し、その結果をresultB変数に格納する
let resultB = myFuncB(100, 200);
console.log("足し算した結果は" + resultB);






// 判定
// if / && ||
// if / else if

// くり返し処理
// for(){for(){}}

// 配列と繰り返し処理
// array / for

// 関数
// function
// function(a, b)
// function() return

// スコープ
// scope / {}
// global / local

