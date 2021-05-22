// Electron
// Launch window
//     electron ./src

const {app, BrowserWindow} = require("electron");

function createWindow(){

	// Main
	let main = new BrowserWindow({
		width: 480, height: 320,
		backgroundColor: "#999999",
		webPreferences:{
			nodeIntegration: true
		}
	});
	main.loadFile("index.html");
	main.webContents.openDevTools();// DevTools

	// Sub
	let sub = new BrowserWindow({
		width: 240, height: 160,
		backgroundColor: "#666666",
		parent: main,
		webPreferences:{
			nodeIntegration: true
		}
	});
	sub.loadFile("index_sub.html");
}

// Ready
app.whenReady().then(createWindow);

// Launching
app.on("will-finish-launching", ()=>{
	console.log("will-finish-launching");
});

// Closed
app.on("window-all-closed", ()=>{
	console.log("window-all-closed");
	app.quit();
});

// Focus
app.on("browser-window-focus", (e)=>{
	console.log("browser-window-focus:", e.sender.id);
});

// Blur
app.on("browser-window-blur", (e)=>{
	console.log("browser-window-blur:", e.sender.id);
});

// Created(Browser window)
app.on("browser-window-created", ()=>{
	console.log("browser-window-created");
});

// Created(Web conntents)
app.on("web-contents-created", ()=>{
	console.log("web-contents-created:");
});
