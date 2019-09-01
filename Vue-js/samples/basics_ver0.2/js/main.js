console.log("main.js!!");

// Data
let data = {
	msg: "Hello Vue.js!!",
	arr: ["itemA", "itemB", "itemC", "itemD"]
}

// Vue
let app = new Vue({
	el: "#app",
	data: data,
	render: (e)=>{
		return e("div", [
				e("msg", data.msg),
				e("ol", data.arr.map(item=>e("li", item)))
			]);
	}
});
