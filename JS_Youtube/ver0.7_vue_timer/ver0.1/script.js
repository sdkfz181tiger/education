// Vue.js

function createApp(){
	console.log("Hello Vue.js!!");

	new Vue({
		el: "#wrapper",
		data: {
			timeInput: 15,
			timeLimit: null,
			timerID: null,
			timeRemain: 0,
		},
		methods:{
			start: function(){
				console.log("start!!");
				// 停止時刻
				this.timeLimit = Date.now() + this.timeInput * 1000;
				// インターバル開始
				this.timerID = setInterval(this.calc, 100);
			},
			stop: function(){
				console.log("stop!!");
				// インターバル停止
				clearInterval(this.timerID);
			},
			calc: function(){
				console.log("Calc!!");
				// 残り時間
				this.timeRemain = Math.floor((this.timeLimit - Date.now()) / 1000) + 1;
				// 終了判定
				if(this.timeRemain <= 0){
					this.stop();
				}
			}
		}
	});
}

// 初期化
function initialize(){
	createApp();
}

document.addEventListener("DOMContentLoaded", initialize.bind(this));
