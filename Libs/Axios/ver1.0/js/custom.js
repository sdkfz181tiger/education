console.log("custom.js");

window.onload = (event)=>{
	console.log("onload!!");

	let path = "./csv/ogaki_toilet.csv";
	let option = {responseType: "blob"};
	axios.get(path, option).then(res=>{
		// CSV
		let csv = res.data;
		csv.text().then(str=>{
			let arr = convertToArr(str);
			console.table(arr);
		});
	});
}

function convertToArr(str){
	let lines = str.split('\n');
	let arr = [];
	for(let line of lines){
		arr.push(line.split(","));
	}
	return arr;
}