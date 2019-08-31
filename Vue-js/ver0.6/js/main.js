console.log("main.js!!");

// Data
let data = {
	cName: "testA"
}

// Vue
let app = new Vue({
	el: "#app",
	data: data
});

function doInputClass(e){
	data.cName = e.target.value;
}