// Vue.js

function createApp(){
	console.log("Hello Vue.js!!");

	new Vue({
		el: "#wrapper",
		data: {
			inputHeight: 170,
			inputWeight: 75,
			result: 0
		},
		methods:{
			calc: function(){
				console.log("calc!!");
				// BMI値を計算する
				let bmi = this.inputWeight / Math.pow(this.inputHeight*0.01, 2);
				this.result = Math.floor(bmi * 100) * 0.01;
			}
		}
	});
}

// 初期化
function initialize(){
	createApp();
}

document.addEventListener("DOMContentLoaded", initialize.bind(this));
