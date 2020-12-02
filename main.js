const {
  app
} = require('electron');
const MainController = require('./src/controller/main-controller')
const AppTrayController = require('./src/controller/app-tray-controller')

class ElectronWechat {
  constructor() {
    this.mainController = null
    this.tray = null
  }

  // init method, the entry point of the app.
  init() {

    // 保证单例模式运行
    const lock = app.requestSingleInstanceLock()
    if (!lock) {
      app.quit()
    } else {

      app.on('second-instance', (event, commandLine, workingDirectory) => {
        if (this.mainController) this.mainController.show()
      })

      this.initApp()
    }
  }

  // init the main app.
  initApp() {
    // This method will be called when Electron has finished initialization and is
    // ready to create browser windows. Some APIs can only be used after this event
    // occurs.
    app.commandLine.appendSwitch('enable-transparent-visuals');
    app.commandLine.appendSwitch('disable-gpu');

    
    app.on('ready', () => {

        setTimeout(() => {
          // 创建主窗体
          this.mainController = new MainController()
          // 创建托盘图标
          this.tray = new AppTrayController(this.mainController)

          // Quit when all windows are closed.
          app.on('window-all-closed', () => {
          // On OS X it is common for applications and their menu bar to stay active until
          // the user quits explicitly with Cmd + Q
            if (process.platform !== 'darwin') {
                app.quit()
            }
          })

          // 销毁托盘图标
          app.on('before-quit', () => {
            this.tray.tray.destroy()
          });

          app.on('quit', () => {
          // empty cover cache folder before exit.
          // fs.remove(`${app.getPath('userData')}/covers`);
          });
        
          // 第一次激活
          app.on('activate', () => {
          // On OS X it's common to re-create a window in the app when the dock icon is
          // clicked and there are no other windows open.
            if (this.mainController === null) {
              this.mainController = new MainController()
            } else {
              this.mainController.show()
            }
         })
        }, 300)
      })
    }

  
}



new ElectronWechat().init();