console.log("main.js!!");

// Component
Vue.component("hello", {
	data: ()=>{
		return {
			msg: "Cocoichi"
		};
	},
	template: "<p>I feel like to go to {{msg}}!!</p>"
});

// Vue
let app = new Vue({
	el: "#app"
});