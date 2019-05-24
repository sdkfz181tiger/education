console.log("Hello Node JS!!");

// Characters
let jsonObjs = [];

//==========
// WebSocket
let ws = null;

// Load
$(window).on("load", ()=>{
	console.log("Load!!");

	// Initialize
	ws = new WebSocket("ws://localhost:4040");
	ws.onopen = (e)=>{
		console.log("onOpen");
	}
	ws.onmessage = (e)=>{
		console.log("onMessage:" + e.data);
	}
	ws.onclose = (e)=>{
		console.log("onClose");
	}
	ws.onerror = (e)=>{
		console.log("onError");
	}

	$(".bShow").click((e)=>{
		let msg = $(e.target).attr("msg");
		if(ws !== null) ws.send(msg);
	});

	// Gamepad
	let actions  = ["typing.fbx", "jump.fbx", "breakdance.fbx", "rumba.fbx", 
					"sitting.fbx", "bow_1.fbx", "bored_1.fbx"];
	let gpHelper = new GamepadHelper();

	gpHelper.setAxesXListener((key, num)=>{
		console.log("X[" + key + "]:" + num);
	});
	gpHelper.setAxesYListener((key, num)=>{
		console.log("Y[" + key + "]:" + num);
	});

	gpHelper.setButtonsListener((key, i, flg)=>{
		console.log("Button[" + key + "]:" + i + "_" + flg);
		if(flg == false) return;
		if(ws !== null) ws.send(actions[i]);
	});
});

class GamepadHelper{

	constructor(){
		console.log("GamePadHelper");
		this._gamepads        = {};
		this._prevAxes        = {};
		this._prevButtons     = {};
		this._axesListener    = null;
		this._buttonsListener = null;
		this.init();
	}

	init(){
		// Connected
		window.addEventListener("gamepadconnected", (e)=>{
			console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
				e.gamepad.index, e.gamepad.id,
				e.gamepad.buttons.length, e.gamepad.axes.length);
			this.gamepadHandler(e.gamepad, true);
		});

		// Disconeccted
		window.addEventListener("gamepaddisconnected", (e)=>{
			console.log("Gamepad disconnected from index %d: %s",
				e.gamepad.index, e.gamepad.id);
			this.gamepadHandler(e.gamepad, false);
		});
	}

	gamepadHandler(gamepad, connectFlg){
		console.log("gamepadHandler");
		// Note:
		// gamepad === navigator.getGamepads()[gamepad.index]
		if(connectFlg){
			this._gamepads[gamepad.index]    = gamepad;
			this._prevAxes[gamepad.index]    = gamepad.axes.concat();
			this._prevButtons[gamepad.index] = gamepad.buttons.concat();
			for(let i=0; i<this._prevAxes[gamepad.index].length; i++){
				this._prevAxes[gamepad.index][i] = 0;
			}
			for(let i=0; i<this._prevButtons[gamepad.index].length; i++){
				this._prevButtons[gamepad.index][i] = false;
			}
			this.loop();
		}else{
			delete this._gamepads[gamepad.index];
		}
	}

	setAxesXListener(callback){
		this._axesXCallback = callback;
	}

	setAxesYListener(callback){
		this._axesYCallback = callback;
	}

	setButtonsListener(callback){
		this._buttonsCallback = callback;
	}

	loop(){
		setTimeout(()=>{
			for(let key in this._gamepads){
				let gamepad = this._gamepads[key];

				// Axes(X)
				let disX = this._prevAxes[key][0] - Math.round(gamepad.axes[0]);
				if(disX < 0) disX *= -1.0;
				if(0.5 < disX){
					this._prevAxes[key][0] = Math.round(gamepad.axes[0]);
					if(this._axesXCallback){
						this._axesXCallback(key, this._prevAxes[key][0]);
					}
				}

				// Axes(Y)
				let disY = this._prevAxes[key][1] - Math.round(gamepad.axes[1]);
				if(disY < 0) disY *= -1.0;
				if(0.5 < disY){
					this._prevAxes[key][1] = Math.round(gamepad.axes[1]);
					if(this._axesYCallback){
						this._axesYCallback(key, this._prevAxes[key][1]);
					}
				}

				// Buttons
				for(let i=0; i<gamepad.buttons.length; i++){
					if(this._prevButtons[key][i] != gamepad.buttons[i].pressed){
						this._prevButtons[key][i] = gamepad.buttons[i].pressed;
						if(this._buttonsCallback){
							this._buttonsCallback(key, i, gamepad.buttons[i].pressed);
						}
					}
				}
			}
			if(this._gamepads.length <= 0) return;
			this.loop();
		}, 200);
	}
}