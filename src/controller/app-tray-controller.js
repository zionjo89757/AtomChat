const {
    app,
    Menu,
    nativeImage,
    Tray,
    ipcMain
} = require('electron');
const path = require('path');

class AppTrayController {
    constructor(mainController) {
        this.mainController = mainController
        this.unreadType = 'none'
        this.platform = require('os').platform()
        this.init()
    }

    init() {
        // 创建一个托盘图标
        this.tray = new Tray(this.createTrayIcon())
        this.tray.setToolTip('Wechat Desktop')

        // 设置右键菜单
        const context = Menu.buildFromTemplate([{
                label: '切换聊天窗口',
                click: () => this.mainController.toggle()
            },
            {
                label: '退出',
                click: () => this.cleanupAndExit()
            }
        ])

        this.tray.setContextMenu(context)

        this.tray.on('click', () => this.clickEvent())
        
        // 出现消息时的变化
        ipcMain.on('updateUnread', (event, value) => {
            value !== this.unreadType && this.tray.setImage(this.getUnreadImage(value))
        })
    }


    // 让主窗体显现
    clickEvent() {
        this.mainController.toggle()
    }

    // 根据平台传入图标
    createTrayIcon() {
        switch (this.platform) {
            case 'darwin':
                let trayIcon = nativeImage.createFromPath(path.join(__dirname, '../../assets/icon.png'))
                trayIcon.setTemplateImage(true)
                return trayIcon
            default:
                return nativeImage.createFromPath(path.join(__dirname, '../../assets/original/icon_tray.png'))
        }
    }

    // 设置信息到来时的图标
    getUnreadImage(value) {
        this.unreadType = value
        switch (value) {
            case 'important':
                if ('darwin' === this.platform) {
                    let trayIcon = nativeImage.createFromPath(path.join(__dirname, '../../assets/iconImportant.png'))
                    return trayIcon
                } else {
                    return nativeImage.createFromPath(path.join(__dirname, '../../assets/original/icon_tray_important.png'))
                }
            case 'minor':
                if ('darwin' === this.platform) {
                    let trayIcon = nativeImage.createFromPath(path.join(__dirname, '../../assets/iconUnread.png'))
                    return trayIcon
                } else {
                    return nativeImage.createFromPath(path.join(__dirname, '../../assets/original/icon_tray_unread.png'))
                }
            default:
                if ('darwin' === this.platform) {
                    let trayIcon = nativeImage.createFromPath(path.join(__dirname, '../../assets/icon.png'))
                    trayIcon.setTemplateImage(true)
                    return trayIcon
                } else {
                    return nativeImage.createFromPath(path.join(__dirname, '../../assets/original/icon_tray.png'))
                }
        }
    }

    // 推出程序
    cleanupAndExit() {
        app.exit(0);
    }
}

module.exports = AppTrayController