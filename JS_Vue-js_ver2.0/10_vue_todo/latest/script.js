// Vue.js

// 関数とパラメータ
//   methodsは関数として
//   computedはパラメータとして

const todos = [
	{
		id: 1,
		title: "Bitcoinを買う",
		date: "2021/06/01",
		done: false
	},
	{
		id: 2,
		title: "Ethereumを買う",
		date: "2021/06/02",
		done: true
	},
	{
		id: 3,
		title: "MonaCoinを買う",
		date: "2021/06/03",
		done: false
	},
	{
		id: 4,
		title: "LightCoinを買う",
		date: "2021/06/04",
		done: false
	}
];

function createApp(){
	console.log("Hello Vue.js!!");

	new Vue({
		el: "#wrapper",
		data: {
			done: false,
			todos: todos,
			title: "DogeCoinを買う"
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
					title: this.title,
					date: "2021/07/01",
					done: false
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
			saveTodos(){
				console.log("saveTodos!!");
				const json = JSON.stringify(this.todos);// Array -> JSON
				localStorage.setItem("todo", json);// Save
			},
			loadTodos(){
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
