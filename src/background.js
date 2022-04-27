//'use strict'

import { app, protocol,view, BrowserWindow, Menu, ipcMain   } from 'electron'
import path from 'path'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'
 
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true } }])
 
function createWindow () {
  // 关闭顶部导航菜单栏
  Menu.setApplicationMenu(null)
  // Create the browser window.
  win = new BrowserWindow({
    width: 450,
    // minWidth: 300,
    // maxWidth:1100,
    // maxHeight:1000,
    // minHeight:400,
    height: 830,
    center: true, // 窗口居中
    resizable: false, // 窗口大小是否可改变
    maximizable: false, // 窗口是否可以最大化
    frame: true, // 是否显示顶部导航栏
    title: 'LHQuery',
    backgroundColor: '#fff',
    icon: path.join(__static, '/favicon.ico'), // 更换图标， 这里的图标仅支持svg 和icon 图标
    webPreferences: {
      nodeIntegration: true
    }
  })
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // 打开开发者调试工具
    //if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
 
  win.on('closed', () => {
    win = null
  })
  win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
      event.preventDefault()
      Object.assign(options, {
        modal: true,
        parent: win,
        title: frameName,
        frame: false,
        width: 300,
        height: 400
      })
      // 创建新的窗口
     var a  = new BrowserWindow(options)
      a.loadURL(url)
      ipcMain.on('close-app', () => {
          // 通知关闭
          a.close();
          ipcMain.removeAllListeners('close-app')
      });
    // if (!process.env.IS_TEST) a.webContents.openDevTools()
  })
}
 
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
 
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
 
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
 
  }
  createWindow()
})
 
// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
