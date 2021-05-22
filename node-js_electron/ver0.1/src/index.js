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
}

app.whenReady().then(createWindow);