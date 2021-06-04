"use strict";
//==========
// JavaScript

// 処理開始時間
let now = Date.now();

// 素数, 合成数を求める
let primes = [];
let composites = [];
for(let i=2; i<1000; i++){
	if(isPrime(i)){
		primes.push(i);
	}else{
		composites.push(i);
	}
}
console.log("素　数:", primes);
console.log("合成数:", composites);

// 合成数それぞれを因数分解していく
for(let c of composites){
	let arr = [];
	factorize(arr, c);
	console.log(c, arr);
}

// 経過時間を算出する
let diff = Date.now() - now;
console.log("経過時間(ミリ秒):", diff);

// 素数かどうかを判定する関数
function isPrime(n){
	for(let i=2; i<n; i++) if(n%i == 0) return false;
	return true;
}

// 因数分解する関数
function factorize(arr, n){
	for(let p of primes){
		if(n%p == 0){
			arr.push(p);
			factorize(arr, n/p);
			return;
		}
	}
}
