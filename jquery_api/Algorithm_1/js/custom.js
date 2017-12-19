console.log("custom.js");

window.onload = function(){
	console.log("onload!!");

	$("#myBtn").click(()=>{
		console.log("Hello!!");

		let numA = Number($("#myInputA").val());
		let numB = Number($("#myInputB").val());
		let answer = calc(numA, numB);
		let str = numA + "と" + numB + "の最大公約数は" + answer + "です!!";
		$("#myAnswer").append("<li>" + str + "</li>");
	});
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