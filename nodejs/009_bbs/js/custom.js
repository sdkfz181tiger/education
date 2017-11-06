console.log("Hello Node JS!!");

const key = "key_name";

// Ready
$(document).ready(function(){
	console.log("custom.js");

	// LocalStorage
	$("#userName").val(getLocalStorage());
	$("#userName").change(function(){
		var value = $("#userName").val();
		setLocalStrorage(value);
	});
});

// LocalStorage
function setLocalStrorage(value){
	localStorage.setItem(key, value);
}

function getLocalStorage(){
	return localStorage.getItem(key);
}