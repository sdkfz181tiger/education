// Vue.js

function createApp(){
	console.log("Hello Vue.js!!");
	
	const vue = new Vue({
		el: "#wrapper",
		data: {
			todos: [
				{
					id: 1,                    // ID
					text: "松坂牛を買う",       // TODOテキスト
					createdAt: 1567940003455, // 登録日
					done: false               // 終了フラグ
				},
				{
					id: 2,                    // ID
					text: "松坂牛を売る",       // TODOテキスト
					createdAt: 1567940003455, // 登録日
					done: false               // 終了フラグ
				},
				{
					id: 3,                    // ID
					text: "松坂牛を食す",       // TODOテキスト
					createdAt: 1567940003455, // 登録日
					done: false               // 終了フラグ
				}
			]
		}
	});
}

// 初期化
function initialize(){
	createApp();
}

document.addEventListener("DOMContentLoaded", initialize.bind(this))
