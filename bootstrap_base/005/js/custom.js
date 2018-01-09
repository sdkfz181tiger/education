console.log("custom.js");

window.onload = function(){

	console.log("onload");

	// Form
	$("form").submit(function(){
		console.log("Submit!!");

		let name = $("#inputName").val();
		console.log("name:" + name);

		let email = $("#inputEmail").val();
		console.log("email:" + email);

		let password = $("#inputPassword").val();
		console.log("password:" + password);

		let check = $("#inputCheck").prop("checked");
		console.log("check:" + check);
	});
}