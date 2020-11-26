const {
    app,
    BrowserWindow,
    session,
    shell,
    ipcMain
} = require('electron');
const path = require('path');
const CssInjector = require('../js/css-injector');

class MainController {
    constructor() {
        this.init()
    }

    init() {

        // 创建窗体
        this.window = new BrowserWindow({
            show: false,
            width: 380,
            height: 500,
            frame: true,
            autoHideMenuBar: true,
            resizable: true,
            icon: path.join(__dirname, '../../build/icons/512x512.png'),
            webPreferences: { 
                webSecurity: false,
                nodeIntegration: true,
            }
        })

        // 加载页面
        this.window.loadURL('https://wx.qq.com/?lang=zh_CN')

        // 注入js和css
        this.window.webContents.on('dom-ready', () => {

            // 注入 css
            this.window.webContents.insertCSS(CssInjector.login)
            this.window.webContents.insertCSS(CssInjector.main)

            // 注入 js
            this.addFontAwesomeCDN()
            
            this.changeTitle()
            this.addToggleContactElement()

            this.addUnreadMessageListener()

            this.show()
        })

        // triggering when user try to close the play window.
        this.window.on('close', (e) => {
            if (this.window.isVisible()) {
                e.preventDefault()
                this.window.hide()
            }
        })

        // 在新的标签页打开链接的话，就在浏览器中打开
        this.window.webContents.on('new-window', this.openInBrowser)

        // 在这些请求结束后改变窗口的形状
        session.defaultSession.webRequest.onCompleted({urls: [
            'https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxinit*',
            'https://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxinit*',
            'https://wx.qq.com/?&lang*',
            'https://wx2.qq.com/?&lang*'
        ]},
            (details) => this.handleRequest(details)
        )

        // 两种桌面形式
        ipcMain.on('resizeWindow', (event, value) => {
            if (value === 'desktop') {
                this.window.setSize(1000, this.window.getSize()[1], true)
            } else {
                this.window.setSize(450, this.window.getSize()[1], true)
            }
        })
    }

    show() {
        this.window.show()
        this.window.focus()
    }

    toggle() {
        if (this.window.isFocused()) {
            this.window.hide()
        } else {
            this.show()
        }
    }


    // 解析后URL在浏览器中打开
    openInBrowser(e, url) {
        e.preventDefault()
        // if the url start with a wechat redirect url, get the real url, decode and open in external browser
        let redirectUrl = url
        if (url.startsWith('https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxcheckurl?requrl=')) {
            const redirectRegexp = /https:\/\/wx\.qq\.com\/cgi-bin\/mmwebwx-bin\/webwxcheckurl\?requrl=(.*)&skey.*/g
            redirectUrl = decodeURIComponent(redirectRegexp.exec(url)[1])
        }
        shell.openExternal(redirectUrl)
    }

    handleRequest(details) {
        // console.log(details.url)
        details.url.startsWith('https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxinit') && this.login()
        details.url.startsWith('https://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxinit') && this.login()
        details.url.startsWith('https://wx.qq.com/?&lang') && this.logout()
        details.url.startsWith('https://wx2.qq.com/?&lang') && this.logout()
    }

    // 设置为主界面大小
    login() {
        this.window.hide()
        this.window.setSize(1000, 800, true)
        this.window.setResizable(true)
        this.window.show()
    }

    // 设置为登入页面大小
    logout() {
        this.window.setSize(380, 500, true)
    }

    // 添加外部样式
    //<head>
    //<link rel="stylesheet" type="text/css" 
    //    href="https://use.fontawesome.com/releases/v5.0.13/css/all.css"
    //    integrity = "sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp"
    //    crossOrigin = "anonymous"
    ///>
    //</head>
    addFontAwesomeCDN() {
        this.window.webContents.executeJavaScript(`
            let faLink = document.createElement('link');
            faLink.setAttribute('rel', 'stylesheet');
            faLink.type = 'text/css';
            faLink.href = 'https://use.fontawesome.com/releases/v5.0.13/css/all.css';
            faLink.integrity = 'sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp';
            faLink.crossOrigin = 'anonymous';
            document.head.appendChild(faLink);
        `)
    }

    // 设置标题
    changeTitle() {
        this.window.webContents.executeJavaScript(`
            var titleName = 'Freechat (version: ${app.getVersion()})';
            document.title = titleName;
            new MutationObserver(mutations => {
                if (document.title !== titleName) {
                    document.title = titleName;
                }
            }).observe(document.querySelector('title'), {childList: true});
        `)
    }

    // 当.icon.web_wechat_reddot或.icon.web_wechat_reddot_middle发生变动时
    // 进行ipc通信'updateUnread'
    addUnreadMessageListener() {
        this.window.webContents.executeJavaScript(`
            new MutationObserver(mutations => {
                let unread = document.querySelector('.icon.web_wechat_reddot');
                let unreadImportant = document.querySelector('.icon.web_wechat_reddot_middle');
                let unreadType = unreadImportant ? 'important' : unread ? 'minor' : 'none';
                require('electron').ipcRenderer.send('updateUnread', unreadType);
            }).observe(document.querySelector('.chat_list'), {subtree: true, childList: true});
        `)
    }
    // 添加一个切换按钮，可以改变窗体的大小
    addToggleContactElement() {
        this.window.webContents.executeJavaScript(`
            let toggleButton = document.createElement('i');
            toggleButton.className = 'toggle-mobile-button fas fa-mobile-alt';
            toggleButton.onclick = () => {
                if (toggleButton.classList.contains('mini')) {
                    toggleButton.className = 'toggle-mobile-button fas fa-mobile-alt';
                    require('electron').ipcRenderer.send('resizeWindow', 'desktop');
                } else {
                    toggleButton.className = 'toggle-mobile-button fas fa-desktop mini';
                    require('electron').ipcRenderer.send('resizeWindow', 'mobile');
                }

                document.querySelector('div.main').classList.toggle('mini');
            };
            let titleBar = document.querySelector('.header');
            titleBar.appendChild(toggleButton);
        `)   
    }
}

module.exports = MainController