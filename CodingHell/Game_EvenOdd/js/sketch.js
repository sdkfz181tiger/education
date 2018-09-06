console.log("Hello JavaScript!!");

let number = Math.floor(Math.random() * 10);
console.log("== " + number + " ==");

if(isEven(number)){
	console.log("これは偶数です!!");
}

if(isOdd(number)){
	console.log("これは奇数です!!");
}

if(isMultiple(number, 3)){
	console.log("これは3の倍数です!!");
}

if(isEven(number) || isMultiple(number, 3)){
	console.log("これは偶数か、3の倍数です!!");
}

if(isEven(number) && isMultiple(number, 3)){
	console.log("これは偶数で、尚且つ3の倍数です!!");
}

// 偶数か?
function isEven(num){
	if(num % 2 == 0) return true;
	return false;
}

// 奇数か?
function isOdd(num){
	if(num % 2 != 0) return true;
	return false;
}

// *の倍数か?
function isMultiple(num, mlt){
	if(num % mlt == 0) return true;
	return false;
}