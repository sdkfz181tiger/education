console.log("Hello Vue.js!!");

// Vue.jsの最新版を確認する
// https://github.com/vuejs/vue/releases

// 条件分岐を使う
//   HTMLに"v-if"を記述します
//   例) v-if="inStock"

const vue = new Vue({
	el: "#app",
	data: {
		inStock: true// true/falseで表示/非表示
	}
});

