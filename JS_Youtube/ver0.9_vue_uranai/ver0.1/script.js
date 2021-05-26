// Vue.js

const JSON_URL = "https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json";

function createApp(){
	console.log("Hello Vue.js!!");

	new Vue({
		el: "#wrapper",
		data: {
			items: []
		},
		methods:{
			connect: function(){
				console.log("connect!!");
				// Axios
				axios.get(JSON_URL).then(res=>{
					console.log(res);// 通信成功
					this.items = res.data[0].timeSeries[0].areas;// Areas
				}).catch(err=>{
					console.log(err);// 通信失敗
				});
			}
		}
	});
}

// 初期化
function initialize(){
	createApp();
}

document.addEventListener("DOMContentLoaded", initialize.bind(this));
