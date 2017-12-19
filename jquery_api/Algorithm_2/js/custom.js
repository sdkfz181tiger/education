console.log("custom.js");

const ALPHABETS = [
	"a", "b", "c", "d", "e", "f", "g", "h", "i", 
	"j", "k", "l", "m", "n", "o", "p", "q", "r",
	"s", "t", "u", "v", "w", "x", "y", "z"];

window.onload = function(){
	console.log("onload!!");

	$("#myBtn").click(()=>{
		console.log("Hello!!");
		// Countup
		let str = $("#myInputA").val();
		let result = "文字の出現数:" + countup(str);
		console.log(result);
	});
}

function countup(chars){

	let counters = [];
	for(let i=0; i<ALPHABETS.length; i++){
		counters[i] = 0;
	}

	for(let i=0; i<ALPHABETS.length; i++){
		let alphabet = ALPHABETS[i];
		for(let j=0; j<chars.length; j++){
			let char = chars[j];
			if(alphabet == char){
				counters[i]++;
			}
		}
	}

	let result = "";
	for(let i=0; i<counters.length; i++){
		if(counters[i] != 0){
			let str = ALPHABETS[i] + ":" + counters[i];
			result += str + ", ";
		}
	}

	return result;
}

function calc(numA, numB){

	let m = numA;
	let n = numB;
	let r = numA % numB;

	console.log("=====");
	console.log("m:" + m);
	console.log("n:" + n);
	console.log("r:" + r);
	
	while(r != 0){
		m = n;
		n = r;
		r = m % n;

		console.log("=====");
		console.log("m:" + m);
		console.log("n:" + n);
		console.log("r:" + r);
	}
	return n;
}