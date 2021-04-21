console.log("Hello Vue.js!!");

// Vue.jsの最新版を確認する
// https://github.com/vuejs/vue/releases

// HTMLにデータを表示する
//   HTMLに直接"{{  }}"を記述する事でデータが表示されます

const vue = new Vue({
	el: "#app",
	data: {
		message: "Hello Vue.js!!"
	}
});

