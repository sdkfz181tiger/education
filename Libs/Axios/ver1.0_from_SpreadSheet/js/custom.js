console.log("custom.js");

// GoogleSpreadSheet
//   1, File -> Publish to the web
//   2, Select Sheet, and Choise "Comma Separated values (csv)"

const PATH_1 = "https://docs.google.com/spreadsheets/d/e/";
const PATH_2 = "2PACX-1vTG2n5l9d-BKSR0P-9K3NuyEpZOXu7PYBwR1Wt2O1oE7FVvu0QV0sZ4Wv440DYPY5AX_a33yuselYmg/";
const PATH_3 = "pub?gid=0&single=true&output=csv";
const URL = PATH_1 + PATH_2 + PATH_3;

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