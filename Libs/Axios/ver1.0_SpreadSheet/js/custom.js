console.log("custom.js");

// GoogleSpreadSheet
//   1, File -> Publish to the web
//   2, Select Sheet, and Choise "Comma Separated values (csv)"
//   3, Copy the URL

const URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTNtYa2s1mYs9S2pnrm9OzE0iUrzorKNp1hy_M35hYiyQaIL-XtOSqbkd2ccx_EpXoDOa21ckCE_nK/pub?gid=0&single=true&output=csv";

window.onload = (event)=>{
	console.log("onload!!");

	const option = {responseType: "blob"};

	// CSV
	axios.get(URL, option).then(res=>{
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