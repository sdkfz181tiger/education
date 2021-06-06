console.log("Hello Vue.js!!");

// Vue.jsの最新版を確認する
// https://github.com/vuejs/vue/releases

// オブジェクトや配列を使う場合

// オブジェクトで指定
//   例) v-bind:xxx="{ foo: isFoo, bar: isBar }"

// 配列で指定
//   例) v-bind:xxx="[ arr ]"

const vue = new Vue({
	el: "#app",
	data: {
		isFoo: true,   // こちらは追加される
		isBar: false,  // こちらは追加されない
		arr: ["fiz", "buz"] // fizとbuzが追加される
	}
});

