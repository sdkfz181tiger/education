console.log("Hello Vue.js!!");

// Vue.jsの最新版を確認する
// https://github.com/vuejs/vue/releases

// 属性に使う場合
//   HTMLに"v-bind:属性名"を記述します

const vue = new Vue({
	el: "#app",
	data: {
		url: "https://github.com/vuejs/"
	}
});

