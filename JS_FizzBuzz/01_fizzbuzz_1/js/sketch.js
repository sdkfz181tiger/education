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
console.log("===== Level1 =====");

//==========
// 問題
//	0から4までの数字を出力しなさい(","は出力しなくてもよい)
//	条件: for文を1回以上使う事。
//	例: 0, 1, 2, 3, 4

//==========
// 解答
console.log("==========");
for(let i=0; i<5; i++){
	console.log(i);
}

//==========
// 問題
//	5から9までの数字を出力しなさい(","は出力しなくてもよい)
//	条件: for文を1回以上使う事。
//	例: 5, 6, 7, 8, 9

//==========
// 解答
console.log("==========");
for(let i=5; i<10; i++){
	console.log(i);
}

//==========
// 問題
//	3から7までの数字を出力しなさい(","は出力しなくてもよい)
//	条件: for文を1回以上使う事。
//	例: 3, 4, 5, 6, 7

//==========
// 解答
console.log("==========");
for(let i=3; i<8; i++){
	console.log(i);
}

//==========
// 問題
//	5回Fizzを出力しなさい(","は出力しなくてもよい)
//	条件: for文を1回以上使う事。
//	例: Fizz, Fizz, Fizz, Fizz, Fizz

//==========
// 解答
console.log("==========");
for(let i=0; i<5; i++){
	console.log("Fizz");
}

//==========
// 問題
//	10回Buzzを出力しなさい(","は出力しなくてもよい)
//	条件: for文を1回以上使う事。
//	例: Buzz, Buzz, Buzz, Buzz, Buzz, Buzz, Buzz, Buzz, Buzz, Buzz

//==========
// 解答
console.log("==========");
for(let i=0; i<10; i++){
	console.log("Buzz");
}

//==========
// Lv2
console.log("===== Level2 =====");

//==========
// 問題
//	0から9までの数値を出力しなさい。ただし、4以下の時は"Fizz"と出力する事。
//	条件: for文を1回以上使う事。
//	例: Fizz, Fizz, Fizz, Fizz, Fizz, 5, 6, 7, 8, 9

//==========
// 解答
console.log("==========");
for(let i=0; i<10; i++){
	if(i < 5){
		console.log("Fizz");
	}else{
		console.log(i);
	}
}

//==========
// 問題
//	0から9までの数値を出力しなさい。ただし、5以上の時は"Buzz"と出力する事。
//	条件: for文を1回以上使う事。
//	例: 0, 1, 2, 3, 4, Buzz, Buzz, Buzz, Buzz, Buzz

//==========
// 解答
console.log("==========");
for(let i=0; i<10; i++){
	if(i > 4){
		console.log("Buzz");
	}else{
		console.log(i);
	}
}

//==========
// 問題
//	0から9までの数値を出力しなさい。ただし、7の時は"Seven"と出力する事。
//	条件: for文を1回以上使う事。
//	例: 0, 1, 2, 3, 4, 5, 6, Seven, 8, 9

//==========
// 解答
console.log("==========");
for(let i=0; i<10; i++){
	if(i == 7){
		console.log("Seven");
	}else{
		console.log(i);
	}
}

//==========
// 問題
//	0から9までの数値を出力しなさい。ただし、2の時は"Two"と出力する事。
//	条件: for文を1回以上使う事。
//	例: 0, 1, Two, 3, 4, 5, 6, 7, 8, 9

//==========
// 解答
console.log("==========");
for(let i=0; i<10; i++){
	if(i == 2){
		console.log("Two");
	}else{
		console.log(i);
	}
}

//==========
// Lv3
console.log("===== Level3 =====");

//==========
// 問題
//	0から9までの数値を出力しなさい。ただし、1の時は"One",6の時は"Six"と出力する事。
//	条件: for文を1回以上使う事。
//	例: 0, One, 2, 3, 4, 5, Six, 7, 8, 9

//==========
// 解答
console.log("==========");
for(let i=0; i<10; i++){
	if(i == 1){
		console.log("One");
	}else if(i == 6){
		console.log("Six");
	}else{
		console.log(i);
	}
}

//==========
// 問題
//	0から9までの数値を出力しなさい。ただし、4の時は"Four",9の時は"Nine"と出力する事。
//	条件: for文を1回以上使う事。
//	例: 0, 1, 2, 3, Four, 5, 6, 7, 8, Nine

//==========
// 解答
console.log("==========");
for(let i=0; i<10; i++){
	if(i == 4){
		console.log("Four");
	}else if(i == 9){
		console.log("Nine");
	}else{
		console.log(i);
	}
}

//==========
// 問題
//	0から9までの数値を出力しなさい。
//	ただし、1の時は"One",5の時は"Five",8の時は"Eight"と出力する事。
//	条件: for文を1回以上使う事。
//	例: 0, One, 2, 3, 4, Five, 6, 7, Eight, 9

//==========
// 解答
console.log("==========");
for(let i=0; i<10; i++){
	if(i == 1){
		console.log("One");
	}else if(i == 5){
		console.log("Five");
	}else if(i == 8){
		console.log("Eight");
	}else{
		console.log(i);
	}
}

//==========
// Lv4
console.log("===== Level4 =====");

//==========
// 問題
//	0から9までの数値を出力しなさい。ただし、偶数の時は"Fizz"と出力する事。
//	条件: for文を1回以上使う事。
//	例: Fizz, 1, Fizz, 3, Fizz, 5, Fizz, 7, Fizz, 9

//==========
// 解答
console.log("==========");
for(let i=0; i<10; i++){
	if(i%2 == 0){
		console.log("Fizz");
	}else{
		console.log(i);
	}
}

//==========
// 問題
//	0から9までの数値を出力しなさい。ただし、奇数の時は"Buzz"と出力する事。
//	条件: for文を1回以上使う事。
//	例: 0, Buzz, 2, Buzz, 4, Buzz, 6, Buzz, 8, Buzz

//==========
// 解答
console.log("==========");
for(let i=0; i<10; i++){
	if(i%2 == 0){
		console.log(i);
	}else{
		console.log("Buzz");
	}
}

//==========
// 問題
//	0から9までカウントし、偶数の時は"Fizz"、奇数の時は"Buzz"と出力しなさい。
//	条件: for文を1回以上使う事。
//	例: Fizz, Buzz, Fizz, Buzz, Fizz, Buzz, Fizz, Buzz, Fizz, Buzz

//==========
// 解答
console.log("==========");
for(let i=0; i<10; i++){
	if(i%2 == 0){
		console.log("Fizz");
	}else{
		console.log("Buzz");
	}
}

//==========
// Lv5
console.log("===== Level5 =====");

//==========
// 問題
//	0から9までの数値を出力しなさい。ただし、3の倍数の時は"Fizz"と出力しなさい。
//	条件: for文を1回以上使う事。
//	例: Fizz, 1, 2, Fizz, 4, 5, Fizz, 7, 8, Fizz

//==========
// 解答
console.log("==========");
for(let i=0; i<10; i++){
	if(i%3 == 0){
		console.log("Fizz");
	}else{
		console.log(i);
	}
}

//==========
// 問題
//	0から9までの数値を出力しなさい。ただし、4の倍数の時は"Fizz"と出力しなさい。
//	条件: for文を1回以上使う事。
//	例: Fizz, 1, 2, 3, Fizz, 5, 6, 7, Fizz, 9

//==========
// 解答
console.log("==========");
for(let i=0; i<10; i++){
	if(i%4 == 0){
		console.log("Fizz");
	}else{
		console.log(i);
	}
}

//==========
// 問題
//	0から29までの数値を出力しなさい。ただし、2と3の公倍数(0,6,12...)の時は"Fizz"と出力しなさい。
//	条件: for文を1回以上使う事。
//	例: Fizz, 1, 2, 3, 4, 5, Fizz, 7, 8, 9, ...29

//==========
// 解答
console.log("==========");
for(let i=0; i<30; i++){
	if(i%2 == 0 && i%3 == 0){
		console.log("Fizz");
	}else{
		console.log(i);
	}
}

//==========
// 問題
//	0から29までの数値を出力しなさい。
//	ただし、3の倍数の時は"Fizz"、5の倍数の時は"Buzz"、
//	3と5の公倍数(0,15...)の時は"FizzBuzz"と出力しなさい。
//	条件: for文を1回以上使う事。
//	例: FizzBuzz, 1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, 9, Buzz, ...29

//==========
// 解答
console.log("==========");
for(let i=0; i<30; i++){
	if(i%2 == 0 && i%3 == 0){
		console.log("Fizz");
	}else{
		console.log(i);
	}
}
