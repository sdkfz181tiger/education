// Vue.js

function createApp(){
	console.log("Hello Vue.js!!");
	
	const vue = new Vue({
		el: "#wrapper",
		data: {
			filter: "completed", // inbox / completed
			text: "",
			todos: [
				{
					id: 1,                    // ID
					text: "松坂牛を買う",       // TODOテキスト
					createdAt: 1619009699120, // 登録日
					done: false,              // 終了フラグ
					isEditing: false          // 編集中フラグ
				},
				{
					id: 2,                    // ID
					text: "松坂牛を売る",       // TODOテキスト
					createdAt: 1619009699120, // 登録日
					done: false,              // 終了フラグ
					isEditing: false          // 編集中フラグ
				},
				{
					id: 3,                    // ID
					text: "松坂牛を食す",       // TODOテキスト
					createdAt: 1619009699120, // 登録日
					done: true,               // 終了フラグ
					isEditing: false          // 編集中フラグ
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
			},
			setFilter: function(filter){
				this.filter = filter;
			},
			toggleTodo: function(id) {
				this.todos = this.todos.map(function(todo){
					if(todo.id == id) todo.done = !todo.done;
					return todo;
				});
			},
			handleSubmit: function(event){
				this.addTodo(this.text);
				this.text = "";
			},
			addTodo: function(text){
				this.todos.push({
					id: this.todosLength + 1, // ID
					text: text,               // TODOテキスト
					createdAt: Date.now(),    // 登録日
					done: false               // 終了フラグ
				});
			},
			editTodo: function(id){
				this.todos = this.todos.map(function(todo){
					if(todo.id === id) todo.isEditing = true;
					return todo;
				});
			},
			saveTodo: function(id){
				this.todos = this.todos.map(function(todo){
					if(todo.id === id) todo.isEditing = false;
					return todo;
				});
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
			},
			disabled: function(){
				return this.text === "";
			}
		}
	});
}

// 初期化
function initialize(){
	createApp();
}

document.addEventListener("DOMContentLoaded", initialize.bind(this))
