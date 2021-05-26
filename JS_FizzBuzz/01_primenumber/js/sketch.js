"use strict";
//==========
// JavaScript

//==========
// FizzBuzzとは?
//	FizzとBuzzを、指示通りにコンソール画面に表示します。
//	プログラミング言語の基本的な動きを理解しているかどうかを問われます。
//
// Wiki
//	https://ja.wikipedia.org/wiki/Fizz_Buzz

//==========
// Lv1
console.log("===== 素数じゃない数字を判定します =====");

for(let i=2; i<10; i++){
	console.log("今から" + i + "が素数かどうかを調べ申し上げ候!!");
	for(let j=2; j<i; j++){
		console.log("-> j:" + j);
		if((i%j) == 0){
			console.log("   -> " + i + "は" + j + "で割り切れるので素数にあらず!!");
		}
	}
}