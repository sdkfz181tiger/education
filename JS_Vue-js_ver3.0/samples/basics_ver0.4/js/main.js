console.log("main.js!!");

// Data
let data = {
	info: "***",
	infos: "",
}

// Vue
let app = new Vue({
	el: "#app",
	data: data
});

function doInput(e){
	data.info = e.target.value;
}

function doAction(){
	data.infos += "<li>" + data.info + "</li>";
}
