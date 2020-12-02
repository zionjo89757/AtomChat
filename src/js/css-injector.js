class CssInjector {}

CssInjector.theme01 = `
    /*背景图片*/

    button,a {
        -webkit-app-region: no-drag; 
    }

    body {
        /*background: url(https://images.weserv.nl/?url=https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/453b8ebcdefa46a69c620da13f346ce2~tplv-k3u1fbpfcp-zoom-1.image?imageView2/2/w/800/q/85) !important ;*/
        background: rgba(0, 0, 0, 0.1) !important ;
        background-size: cover !important ;
        /*background-size: contain !important ;*/
        height: 100% !important ;
        width: 100% !important ;
        /*background-repeat:no-repeat !important ;*/
        color: #e6e6e6 !important ;
    }

    #heroCanvas { 
    display: none !important ;
    }
    /*登陆QR*/
    .login_box {
        background: rgba(0, 0, 0, .65) !important ;
        border-radius: 5px !important ;
        -webkit-app-region: drag;
    }
    /*登录界面*/
    .login_box .qrcode .sub_title {
        color: #e6e6e6 !important ;
    }

    .login_box .avatar .action {
        color: #e6e6e6 !important ;
        border-color: rgba(256,256,256,0.8) !important ;
    }

    .login_box .association .button.button_default {
        color: #e6e6e6 !important ;
        border-color: rgba(256,256,256,0.8) !important ;
    }
    /*
    .waiting_confirm {
        color: #e6e6e6 !important ;
    }
    */

    /*聊天界面*/
    .main_inner{
        border-radius: 5px !important ;
    }

    /*右侧窗口*/
    .box {
        background: rgba(0, 0, 0, 0.65) !important ;
    }

    .title_wrap{
        -webkit-app-region: drag;
    }

    /*聊天窗口*/
    /*
    #chatArea {
        background: rgba(0, 0, 0, 0.65) !important ;
    }
    */
    /*聊天人顶框*/
    .box_hd {
        background: rgba(256, 256, 256, 0.1) !important ;
    }

    .box_hd .title_wrap {
        background: rgba(256, 256, 256, 0) !important ;
        border-bottom: none !important ;
    }


    .box_hd .title .title_name {
        color: #e6e6e6 !important ;
    }

    #mmpop_chatroom_members {
        background: rgba(0, 0, 0, 0.5) !important ;
    }

    .members {
        background: rgba(0, 0, 0, 0) !important ;
    }



    /*聊天气泡*/
    .bubble.bubble_default {
        background: rgba(256, 256, 256, 0.2) !important ;
    }

    .bubble.bubble_primary {
        color: #0a0a0a !important ;
    }


    .bubble::before,
    .bubble::after {
        display: none !important ;
    }


    .bubble.bubble_primary{
        background: rgba(178, 256, 129,0.6) !important;
    }


    /*工具栏*/
    #tool_bar {
        background: rgba(256, 256, 256, 0.2) !important ;
    }

    .web_wechat_face{
        background: url("https://github.com/zionjo89757/AtomChat/raw/main/assets/toolbar_icon/face.png") !important;
        background-size: cover !important;
    }
    
    
    .web_wechat_pic{
        background: url("https://github.com/zionjo89757/AtomChat/raw/main/assets/toolbar_icon/file.png") !important;
        background-size: cover !important;
    }
    

    .chat .box_ft {
        margin-right: 0px !important ;
    }


    /*输入框*/
    #editArea {
        padding-right: 20px !important ;
        padding-top: 10px !important ;
    }

    /*发送按钮*/
    .btn_send {
        background: rgba(178, 256, 129,0.6) !important ;
        margin-right: 19px !important ;
        border: none !important;
    }

    .btn_send:hover {
        background: rgba(178, 256, 129,0.8) !important ;
    }






    /*左边面板*/
    .panel {
        background: rgba(0, 0, 0, 0.8) !important ;
    }


    /*聊天对象*/
    .chat_item.active {
        background: rgba(256, 256, 256, 0.1) !important ;
    }


    /*订阅号*/

    .read_list .just_for_bg{
        background: rgba(0, 0, 0, 0) !important ;
    }

    .read_item_hd {
        background: rgba(256, 256, 256, 0.05) !important ;
    }

    .read_item {
        background: rgba(0, 0, 0, 0) !important ;
    }

    .read_item.active {
        background: rgba(256, 256, 256, 0.1) !important ;
    }

    /*订阅号右边窗口*/
    /*
    .reader {
        background: rgba(0, 0, 0, 0.65) !important ;
    }
    */




    .reader .box_bd {
        background: rgba(0, 0, 0, 0) !important ;
    }

    /*涉及到跨域问题
    iframe body {
        background: rgba(0, 0, 0, 0.65) !important ;
    }
    */
    /*设置框*/
    .mmpop {
        background: rgba(230, 230, 230, 0)  !important ;
    }
    /*表情框*/
    .expression {
        border: none !important;
    }

    .exp_hd_item.active{
        background: rgba(230, 230, 230, 0.5) ！important;
    }

    .exp_hd {
        background: rgba(230, 230, 230, 0.5) !important ;
        border-radius: 10px 10px 0px 0px !important ;
    }
    .exp_bd {
        background: rgba(230, 230, 230, 0.5) !important ;
        border-radius: 0px 0px 10px 10px !important ;
    }

    .expression:after,
    .expression:before {
        display: none; !important ;
    }

    .qq_face a {
        border-color: transparent !important ;
    }

    .emoji_face a {
        border-color: transparent !important ;
    }


    

    /*下拉框*/
    .dropdown_menu{
        background: rgba(230, 230, 230, 0.9) !important ;
    }

    /*转发框*/

    .ngdialog.default .ngdialog-content{
        background: rgba(230, 230, 230, 0.9) !important ;
    }

    .transpond-dialog .dialog_hd .title{
        background: rgba(230, 230, 230, 0) !important ;
    }

    .selector{
        background: rgba(230, 230, 230, 0) !important ;
    }

    input{
        background: rgba(230, 230, 230, 0) !important ;
    }

    .chooser .contact_title{
        background: rgba(230, 230, 230, 0) !important ;
    }
`

CssInjector.login = `

    body {
        overflow: hidden;
    } 
    
    .logo, .lang, .copyright {
        display: none !important;
    }

    
    .login_box {
        
        top: 0 !important;
        left: 0 !important;
        margin: 0 !important;
    }

    
`

CssInjector.main = `
    .main {
        padding: 0 !important;
        height: 100% !important;
    }

    .main_inner {
        max-width: 100% !important;
    }

    a.web_wechat_screencut {
        display: none;
    }

    span.display_name {
        width: 130px !important;
    }

    /*i.toggle-mobile-button {
        display: table-cell;
        padding: 12px 0 0 12px;
        cursor: pointer;
        color: gray;
        transition: 0.5s ease-out;
    }

    i.toggle-mobile-button.mini {
        margin: 12px 12px 0 0;
        display: block;
    }
    */
    .panel {
        transition: width .2s;
    }
    /*
    .mini .panel {
        width: 80px;
    }

    .mini #chatArea {
        width: calc(100vw - 80px);
    }

    .mini .panel .nickname {
        display: none;
    }

    .mini .panel .search_bar {
        display: none;
    }

    .mini .panel .tab {
        display: none;
    }

    .mini .panel .nav_view {
        top: 100px;
    }

    .mini .panel .ext {
        display: none;
    }*/
`

module.exports = CssInjector