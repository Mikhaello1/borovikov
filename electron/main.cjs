const { app, BrowserWindow } = require("electron");
const path = require("path")


function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true, // Enable Node.js integratio
            contextIsolation: false, // Important for compatibility
        },
    });
    win.loadFile(path.join(app.getAppPath(), "dist/index.html")).then(() => {
        // Установка уровня масштабирования
        win.webContents.setZoomFactor(0.8); // Уменьшение масштаба до 80%
    });

    win.webContents.on("beforeunload", (event) => {
        event.preventDefault();
        event.returnValue = ""; // Для показа диалогового окна
    });

        win.on('enter-full-screen', () => {
        win.webContents.setZoomFactor(0.8); // Устанавливаем масштаб при переходе в полноэкранный режим
    });

    // Обработчик события выхода из полноэкранного режима
    win.on('leave-full-screen', () => {
        win.webContents.setZoomFactor(0.8); // Устанавливаем масштаб при выходе из полноэкранного режима
    });

        win.on('resize', () => {
        win.webContents.setZoomFactor(0.8); // Устанавливаем масштаб при изменении размера
    });

}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
