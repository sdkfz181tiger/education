/**
 * @author Shimeji Ozaki
 */

export default class Scroller {

	constructor() {
		console.log("Scroller");
		// Initialize listeners
		this.listeners = [];
	}

	onScroll(e) {
		// Check all listeners
		for(let listener of this.listeners){
			let elem = listener.elem;
			let top = elem.getBoundingClientRect().top;
			if(listener.toggle && top < 0){
				if(top < 0){
					listener.toggle = false;
					listener.callback();// Callback!!
				}
			}else if(!listener.toggle){
				if(0 <= top) listener.toggle = true;
			}
		}
	}

	addEventListener(id, callback) {
		// Add listener
		let elem = document.getElementById(id);
		let top = elem.getBoundingClientRect().top;
		let toggle = !(top < 0);
		this.listeners.push({elem, top, toggle, callback});
	}
}