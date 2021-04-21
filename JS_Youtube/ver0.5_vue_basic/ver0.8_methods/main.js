console.log("Hello Vue.js!!");

// Vue.jsの最新版を確認する
// https://github.com/vuejs/vue/releases

// 関数を実行する場合
//   methodsオプションに関数を定義します
//   例) v-on=イベント名="関数名"

const vue = new Vue({
	el: "#app",
	data: {
		count: 0
	},
	methods: {
		addCount: function() {
			this.count++;
		}
	}
});

