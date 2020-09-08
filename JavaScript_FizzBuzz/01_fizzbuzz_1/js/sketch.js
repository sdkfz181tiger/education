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
// 問題
//	下記の文字を順番に表示しなさい(","は出力しなくてもよい)
//	Fizz, Buzz

//==========
// 解答
console.log("Fizz");
console.log("Buzz");

//==========
// 問題
//	下記の文字を順番に表示しなさい(","は出力しなくてもよい)
//	Fizz, Buzz, Fizz, Buzz

//==========
// 解答
console.log("Fizz");
console.log("Buzz");
console.log("Fizz");
console.log("Buzz");

//==========
// 問題
//	下記の文字を順番に表示しなさい(","は出力しなくてもよい)
//	条件: for文を1回以上使う事。
//	Fizz, Fizz, Fizz, Fizz

//==========
// 解答
for(let i=0; i<4; i++){
	console.log("Fizz");
}

//==========
// 問題
//	下記の文字を順番に表示しなさい(","は出力しなくてもよい)
//	条件: for文を1回以上使う事。
//	Fizz, Buzz, Fizz, Buzz

//==========
// 解答
for(let i=0; i<4; i++){
	if(i%2 == 0){
		console.log("Fizz");
	}else{
		console.log("Buzz");
	}
}

//==========
// 問題
//	0~3までの数値を順番に表示しなさい。

//==========
// 解答
console.log("0");
console.log("1");
console.log("2");
console.log("3");

//==========
// 問題
//	0~3までの数値を"逆"順に表示しなさい。

//==========
// 解答
console.log("3");
console.log("2");
console.log("1");
console.log("0");

//==========
// 問題
//	コンソールに、0~9までの数値を順番に表示しなさい。
//	条件: for文を1回以上使う事。

//==========
// 解答
for(let i=0; i<10; i++){
	console.log(i);
}

//==========
// 問題
//	コンソールに、0~9までの数値を順番に表示しなさい。
//	条件: for文を1回以上使う事。
//	条件: 7の時は、数値の代わりに"Fizz"を表示する事。

//==========
// 解答
for(let i=0; i<10; i++){
	if(i == 7){
		console.log("Fizz");
	}else{
		console.log(i);
	}
}

//==========
// 問題
//	コンソールに、0~9までの数値を順番に表示しなさい。
//	条件: for文を1回以上使う事。
//	条件: 7以上の数値の時は、代わりに"Fizz"を表示する事。

//==========
// 解答
for(let i=0; i<10; i++){
	if(i >= 7){
		console.log("Fizz");
	}else{
		console.log(i);
	}
}

//==========
// 問題
//	コンソールに、0~9までの数値を順番に表示しなさい。
//	条件: for文を1回以上使う事。
//	条件: 3の倍数の時は数値の代わりに"Fizz"を表示する事。

//==========
// 解答
for(let i=0; i<10; i++){
	if(i%3 == 0){
		console.log("Fizz");
	}else{
		console.log(i);
	}
}

//==========
// 問題
//	コンソールに、0~9までの数値を順番に表示しなさい。
//	条件: for文を1回以上使う事。
//	条件: 3の倍数の時は数値の代わりに"Fizz"を表示する事。
//	条件: 5の倍数の時は数値の代わりに"Buzz"を表示する事。

//==========
// 解答
for(let i=0; i<10; i++){
	if(i%3 == 0){
		console.log("Fizz");
	}else if(i%5 == 0){
		console.log("Buzz");
	}else{
		console.log(i);
	}
}

//==========
// 問題
//	コンソールに、0~19までの数値を順番に表示しなさい。
//	条件: for文を1回以上使う事。
//	条件: 3の倍数の時は数値の代わりに"Fizz"を表示する事。
//	条件: 5の倍数の時は数値の代わりに"Buzz"を表示する事。
//	条件: 3,5の両方で割り切れる場合は"FizzBuzz"を表示する事。

//==========
// 解答
for(let i=0; i<20; i++){
	if(i%3 == 0 && i%5 == 0){
		console.log("FizzBuzz");
	}else if(i%3 == 0){
		console.log("Fizz");
	}else if(i%5 == 0){
		console.log("Buzz");
	}else{
		console.log(i);
	}
}

//==========
// 問題
//	次の配列に格納されている要素を順番に表示しなさい。
let foods = ["Apple", "Berry", "Cherry", "Daikon"];

//==========
// 解答
console.log(foods[0]);
console.log(foods[1]);
console.log(foods[2]);
console.log(foods[3]);

//==========
// 問題
//	次の配列に格納されている要素を"逆"順に表示しなさい。
//let foods = ["Apple", "Berry", "Cherry", "Daikon"];

//==========
// 解答
console.log(foods[3]);
console.log(foods[2]);
console.log(foods[1]);
console.log(foods[0]);

//==========
// 問題
//	次の配列に格納されている要素を順番に表示しなさい。
//	条件: for文を1回以上使う事。
//let foods = ["Apple", "Berry", "Cherry", "Daikon"];

//==========
// 解答
for(let i=0; i<4; i++){
	console.log(foods[i]);
}

//==========
// 問題
//	次の配列に格納されている要素を"逆"順に表示しなさい。
//	条件: for文を1回以上使う事。
//let foods = ["Apple", "Berry", "Cherry", "Daikon"];

//==========
// 解答
for(let i=3; 0<=i; i--){
	console.log(foods[i]);
}