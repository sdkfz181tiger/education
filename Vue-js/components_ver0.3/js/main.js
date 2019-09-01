console.log("main.js!!");

// Component
Vue.component("hello", {
	data: ()=>{
		return {
			counter: 0,
			isOver:  false,
		};
	},
	methods: {
		doAction: function(e){
			this.counter++;
			if(this.counter > 9) this.isOver = true;
		}
	},
	template: '<p v-on:click="doAction" v-bind:class="{over:isOver}">Counter:{{counter}}</p>'
});

// Vue
let app = new Vue({
	el: "#app"
});