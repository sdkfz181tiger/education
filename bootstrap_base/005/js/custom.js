console.log("custom.js");

window.onload = function(){

	console.log("onload");

	// カウンター初期化
	let counter = 0;

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

		// カウンターを1つ増やす
		counter++;

		// Tableに追加する
		appendInfo(counter, name, email, password);

		return false;
	});
}

// Tableに追加する関数
function appendInfo(counter, name, email, password){

	let th  = '<th scope="row">' + counter + '</th>';
	let td1 = '<td>' + name + '</td>';
	let td2 = '<td>' + email + '</td>';
	let td3 = '<td>' + password + '</td>';

	$("#info").append('<tr>' + th + td1 + td2 + td3 + '</tr>');
}