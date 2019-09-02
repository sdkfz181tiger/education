console.log("custom.js");

const KEY_STORAGE = "mydata";

// データを格納する配列
let items;

window.onload = function(){

	console.log("onload");

	// データのロード
	items = loadData();

	// データを表示
	showData();

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

		if(name == "" || email == "" || password == "" || check == false){
			// Error
			$("#alert").attr("class", "alert alert-danger");
			$("#alert").text("入力エラーです");
		}else{
			// 1件分のデータを用意する
			let item = {
				name: name,
				email: email,
				password: password,
				check: check
			};
			items.push(item);

			// データのセーブ
			saveData();

			// データを表示
			showData();
		}

		return false;
	});
}

// データのロード
function loadData(){
	// Webstorageから文字列を読み込む
	let jsonStr = localStorage.getItem(KEY_STORAGE);
	// JSONオブジェクトに変換する
	let jsonObj = JSON.parse(jsonStr);
	if(jsonObj == null) return [];
	return jsonObj;
}

// データのセーブ
function saveData(){
	// 配列をJSON文字列に変換する
	let jsonStr = JSON.stringify(items);
	// Webstorageに文字列を保存する
	localStorage.setItem(KEY_STORAGE, jsonStr);
}

// データを表示する
function showData(){
	// テーブルを空にする
	$("#info").empty();
	// テーブルに追加する
	for(let i=0; i<items.length; i++){
		let th  = '<th scope="row">' + i + '</th>';
		let td1 = '<td>' + items[i].name + '</td>';
		let td2 = '<td>' + items[i].email + '</td>';
		let td3 = '<td>' + items[i].password + '</td>';
		let td4 = '<td><button class="btn btn-danger btn-sm" index="' + i + '">x</button></td>';
		$("#info").append('<tr>' + th + td1 + td2 + td3 + td4 + '</tr>');
	}
	// 削除ボタンにクリックイベント
	$("#info tr button").click(function(){
		let index = $(this).attr("index");
		items.splice(index, 1);
		saveData();// データのセーブ
		showData();// データを表示
	});
}