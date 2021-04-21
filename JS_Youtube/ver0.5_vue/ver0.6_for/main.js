console.log("Hello Vue.js!!");

// Vue.jsの最新版を確認する
// https://github.com/vuejs/vue/releases

// 繰り返し処理を使う
//   "v-for"を記述します(*key属性を忘れずに記述)
//   例) v-for="要素 in 配列" v-bind:key="要素"

const vue = new Vue({
	el: "#app",
	data: {
		items: ["カレー", "ハンバーグ", "スパゲティ"]
	}
});

