console.log("main.js!!");

// Component
Vue.component("hello", {
	template: "<p>This is hello component!!</p>"
});

// Vue
let app = new Vue({
	el: "#app"
});