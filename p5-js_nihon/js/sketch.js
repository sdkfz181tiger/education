console.log("Hello p5.js!!");

//==========
// var
// 変数と演算子
//==========

// 変数の宣言
var numA = 100;
var numB = 200;

// 計算
var numC = numA + numB;
var numD = numA * 2;
var numE = numA / 2;
var numF = numA % 2;

//==========
// if
// 比較演算子
//==========

// if
// numAが200と等しい場合
if(numA == 200){
	console.log("あたり!!");
}

// より小さい
if(numA < 200){
	console.log("あたり!!");
}

// より大きい
if(200 < numA){
	console.log("あたり!!");
}

// 以下
if(numA <= 200){
	console.log("あたり!!");
}

// 以上
if(200 <= numA){
	console.log("あたり!!");
}

//==========
// if
// 2つ以上の条件
//==========

// if
// numAが200と等しい場合
if(numA == 200){
	console.log("あたり!!");
}

// 2つの条件を両方満たす場合
// numAが200より大きく、かつ300より小さい
if(200 < numA && numA < 300){
	console.log("あたり!!");
}

// 2つの条件を片方満たす場合
// numAが200より小さい、もしくは300より大きい
if(numA < 200 || 300 < numA){
	console.log("あたり!!");
}

//==========
// 関数
//==========

// 関数hogeを用意
function hoge(){
	console.log("関数が呼ばれた!!");
}

// 関数を呼ぶ
hoge();

//==========
// 関数と引数
//==========

// 関数hogeを用意
function fuga(value){
	console.log("関数が呼ばれた!!");
	console.log(value);
}

// 関数を呼ぶ
fuga(100);
