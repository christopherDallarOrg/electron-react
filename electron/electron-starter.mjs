import * as electron from 'electron';
// import * as electronReload from 'electron-reload';
import { format, fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { app, BrowserWindow } = electron;

let mainWindow;
// let newProductWindow;
// https://medium.com/free-code-camp/building-an-electron-application-with-create-react-app-97945861647c
const createWindow = () => {
	// Create the browser window.
	mainWindow = new BrowserWindow({ width: 800, height: 600 });

	// const startUrl =
	// 	process.env.ELECTRON_START_URL ||
	// 	format({
	// 		pathname: join(__dirname, '/../dist/index.html'),
	// 		protocol: 'file:',
	// 		slashes: true,
	// 	});
	// mainWindow.loadURL(startUrl);

	console.log(process.env.ELECTRON_START_URL);
	// and load the index.html of the app.
	mainWindow.loadURL('http://localhost:5173');

	// Open the DevTools.
	mainWindow.webContents.openDevTools();

	// const mainMenu = Menu.buildFromTemplate(templateMenu);
	// Set The Menu to the Main Window
	// Menu.setApplicationMenu(mainMenu);

	// If we close main Window the App quit
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
};

// Reload in Development for Browser Windows
// if (process.env.NODE_ENV !== 'production') {
// 	electronReload(__dirname, {
// 		electron: join(__dirname, '../node_modules', '.bin', 'electron'),
// 	});
// }

app.whenReady().then(() => {
	createWindow();

	app.on('activate', function() {
		// if (BrowserWindow.getAllWindows().length === 0) createWindow();
		// On OS X it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (mainWindow === null) {
			createWindow();
		}
	});
});

// app.on('ready', createWindow);

app.on('window-all-closed', () => {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// Menu Template
// const templateMenu = [
// 	{
// 		label: 'File',
// 		submenu: [
// 			{
// 				label: 'Exit',
// 				accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
// 				click() {
// 					app.quit();
// 				},
// 			},
// 		],
// 	},
// ];

// if you are in Mac, just add the Name of the App
// if (process.platform === 'darwin') {
// 	templateMenu.unshift({
// 		label: app.getName(),
// 	});
// }

// Developer Tools in Development Environment
// if (process.env.NODE_ENV !== 'production') {
// 	templateMenu.push({
// 		label: 'DevTools',
// 		submenu: [
// 			{
// 				label: 'Show/Hide Dev Tools',
// 				accelerator: process.platform == 'darwin' ? 'Comand+D' : 'Ctrl+D',
// 				click(item, focusedWindow) {
// 					focusedWindow.toggleDevTools();
// 				},
// 			},
// 			{
// 				role: 'reload',
// 			},
// 		],
// 	});
// }
