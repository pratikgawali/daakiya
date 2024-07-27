const { app, BrowserWindow } = require('electron');
const path = require('path');

const REACT_APP_DEV = 'http://localhost:3000';
const REACT_APP_PROD = `file://${path.join(__dirname, 'build', 'index.html')}`;

const createWindow = () => {

    const window = new BrowserWindow({
        width: 800,
        height: 800
    });

    const isDevelopmentMode = !app.isPackaged;
    const url = isDevelopmentMode ? REACT_APP_DEV : REACT_APP_PROD;
    
    window.loadURL(url);
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        // macOS apps generally continue running even without any windows open
        // activating the app when no windows are available should open a new one.
        if (BrowserWindow.getAllWindows().length == 0) {
            createWindow();
        }
    });
})

app.on('window-all-closed', () => {
    // since on Windows and Linux, exiting all windows generally quits an application entirely.
    if (process.platform !== 'darwin') {
        app.quit();
    }
})