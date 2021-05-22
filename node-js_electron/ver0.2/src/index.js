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