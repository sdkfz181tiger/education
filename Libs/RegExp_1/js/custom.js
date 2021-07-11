console.log("custom.js");

window.onload = function(){
	console.log("onload!!");

	// RegExp
	let str1 = "Today 30per OFF!!";
	let reg1 = new RegExp(/\d+/);
	let res1 = reg1.exec(str1);
	console.log("一致した文字:" + res1[0] + "_index:" + res1.index);

	let str2 = "sdfkfz181tiger@gmail.com";
	let reg2 = new RegExp(/\w+\@\w+\.\w+/);
	let res2 = reg2.exec(str2);
	console.log("一致した文字:" + res2[0] + "_index:" + res2.index);

	// Match
	let str3 = "a=10,b=20,c=30";
	let reg3 = new RegExp(/[0-9]+/g);// gがある場合は配列で返す
	let res3 = str3.match(reg3);
	console.log(res3);

	// Search
	let str4 = "Your Email is sdfkfz181tiger@gmail.com isn't it?"
	let reg4 = new RegExp(/\w+\@\w+\.\w+/);
	let res4 = str4.search(reg4);// 一致するインデックスを返す
	console.log(res4);

	// Replace
	let str5 = "Today 30per OFF!!";
	let reg5 = new RegExp(/(\d+)/);
	let res5 = str5.replace(reg5, "90");
	console.log(res5);

	let str6 = "tel:012-345-678";
	let reg6 = new RegExp(/(\d+)-(\d+)-(\d+)/);
	let res6 = str6.replace(reg6, "$1($2)$3");
	console.log(res6);

	let str7 = "tel:012-345-678";
	let reg7 = new RegExp(/(\d+)/g);// gがある場合は一致する全てに適用
	let res7 = str7.replace(reg7, (rep)=>{
		return "x";
	});
	console.log(res7);
}