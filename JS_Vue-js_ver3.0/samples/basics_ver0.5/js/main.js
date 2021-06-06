console.log("main.js!!");

// Data
let data = {
	fStr: "This is message!!",
	fSize: 8,
	fColor: "red"
}

// Vue
let app = new Vue({
	el: "#app",
	data: data
});

function doInputSize(e){
	data.fSize = e.target.value;
}

function doInputColor(e){
	data.fColor = e.target.value;
}