// Vue.js

// 関数とパラメータ
//   methodsは関数として
//   computedはパラメータとして

const todos = [
	{
		id: 1,
		done: false,
		title: "Bitcoinを買う",
		detail: "大人気だから"
	},
	{
		id: 2,
		done: true,
		title: "Ethereumを買う",
		detail: "今話題だから"
	},
	{
		id: 3,
		done: false,
		title: "MonaCoinを買う",
		detail: "ヲタクだから"
	},
	{
		id: 4,
		done: false,
		title: "LightCoinを買う",
		detail: "なんとなく"
	}
];

function createApp(){
	console.log("Hello Vue.js!!");

	new Vue({
		el: "#wrapper",
		data: {
			todos: todos,
			done: false,
			title: "DogeCoinを買う",
			detail: "ネタとして",
			edit: -1
		},
		mounted: function(){
			console.log("mounted!!");
			this.loadTodos();// Load
		},
		methods:{
			switchTodos: function(){
				console.log("switchTodos!!");
				this.done = (this.done) ? false:true;
			},
			toggleTodo: function(id){
				console.log("toggleTodo:" + id);
				// Map
				this.todos = this.todos.map(todo=>{
					if(todo.id == id) todo.done = !todo.done;
					return todo;
				});
				this.saveTodos();// Save
			},
			pushTodo: function(){
				console.log("pushTodo!!");
				let todo = {
					id: Date.now(),
					done: false,
					title: this.title,
					detail: this.detail,
				}
				this.todos.push(todo);
				this.saveTodos();// Save
			},
			removeTodo: function(id){
				console.log("removeTodo:" + id);
				// Filter
				this.todos = this.todos.filter(todo=>{
					return todo.id != id;
				});
				this.saveTodos();// Save
			},
			editTodo: function(id){
				console.log("editTodo:" + id);
				this.edit = id;
				this.saveTodos();// Save
			},
			updateTodo: function(id){
				console.log("updateTodo:" + id);
				this.edit = -1;
				this.saveTodos();// Save
			},
			saveTodos: function(){
				console.log("saveTodos!!");
				const json = JSON.stringify(this.todos);// Array -> JSON
				localStorage.setItem("todo", json);// Save
			},
			loadTodos: function(){
				console.log("loadTodos!!");
				const json = localStorage.getItem("todo");// Load
				this.todos = JSON.parse(json);// JSON -> Array
			}
		},
		computed:{
			getTodos: function(){
				// Filter
				const arr = this.todos.filter(todo=>{
					return this.done == todo.done;
				});
				return arr;
			}
		}
	});
}

// 初期化
function initialize(){
	createApp();
}

document.addEventListener("DOMContentLoaded", initialize.bind(this));
