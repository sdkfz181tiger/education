console.log("Hello Firebase");

const TABLE_NAME = "users";

// Initialize Firebase
const config = {
	apiKey: "",
	authDomain: "",
	databaseURL: "",
	projectId: "",
	storageBucket: "",
	messagingSenderId: ""
};
firebase.initializeApp(config);

// Database
const db = firebase.database();

// Table
let ref = db.ref().child(TABLE_NAME);
ref.on("value", (snap)=>{
	$("#info").empty();
	// Select
	let users = snap.val();
	for(key in users){
		let user = users[key];
		let th  = '<th scope="row">' + user.name + '</th>';
		let td1 = '<td>' + user.email + '</td>';
		let td2 = '<td>' + user.password + '</td>';
		let td3 = '<td><button class="btn btn-danger btn-sm" key="' + key + '">x</button></td>';
		$("#info").append('<tr>' + th + td1 + td2 + td3 + '</tr>');
	}
	// Remove
	$("#info tr button").click((e)=>{
		let key = $(e.target).attr("key");
		ref.child(key).remove()
		.then(()=>{console.log("Remove succeeded.")})
		.catch((e)=>{console.log("Remove failed: " + e.message)});
	});
});

// Submit
$("#btnSubmit").click(()=>{

	let name     = $("#inputName").val();
	let email    = $("#inputEmail").val();
	let password = $("#inputPassword").val();
	let check    = $("#inputCheck").prop("checked");

	if(name == "" || email == "" || password == ""){
		// Error
		$("#alert").attr("class", "alert alert-danger");
		$("#alert").text("入力エラーです");
	}else{
		// Push
		db.ref(TABLE_NAME).push({
			"name"    : name,
			"email"   : email,
			"password": password,
			"check"   : check
		});
	}

	return false;
});