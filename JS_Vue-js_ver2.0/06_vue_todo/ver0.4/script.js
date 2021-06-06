// Vue.js

function createApp(){
	console.log("Hello Vue.js!!");
	
	const vue = new Vue({
		el: "#wrapper",
		data: {
			filter: "inbox", // inbox / completed
			todos: [
				{
					id: 1,                    // ID
					text: "松坂牛を買う",       // TODOテキスト
					createdAt: 1619009699120, // 登録日
					done: false               // 終了フラグ
				},
				{
					id: 2,                    // ID
					text: "松坂牛を売る",       // TODOテキスト
					createdAt: 1619009699120, // 登録日
					done: false               // 終了フラグ
				},
				{
					id: 3,                    // ID
					text: "松坂牛を食す",       // TODOテキスト
					createdAt: 1619009699120, // 登録日
					done: true                // 終了フラグ
				}
			]
		},
		methods:{
			formatDate: function(timestamp) {
				const date = new Date(timestamp);// Dateオブジェクトに変換
				const year = date.getFullYear();
				const month = date.getMonth() + 1;
				const day = date.getDate();
				return year + "." + month + "." + day;
			}
		},
		computed:{
			todosLength: function(){
				return this.todos.length;
			},
			filteredTodos: function(){
				const filter = this.filter;// 現在のフィルター(inbox / completed)
				return this.todos.filter(function(todo){
					return filter === "inbox" ? !todo.done : todo.done;
				});
			}
		}
	});
}

// 初期化
function initialize(){
	createApp();
}

document.addEventListener("DOMContentLoaded", initialize.bind(this))
