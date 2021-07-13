console.log("custom.js");

window.onload = (event)=>{
	console.log("onload!!");

	const option = {responseType: "blob"};

	// CSV
	axios.get("./data/data.csv", option).then(res=>{
		// CSV
		let csv = res.data;
		csv.text().then(str=>{
			let arr = convertToArr(str);
			console.table(arr);
		});
	});

	// JSON
	axios.get("./data/data.json", option).then(res=>{
		// CSV
		let csv = res.data;
		csv.text().then(str=>{
			let arr = JSON.parse(str);
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