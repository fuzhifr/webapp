//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    array: [{ id: 'tictactoe', name: '井字游戏' }, { id: 'whacamole', name: '打地鼠' }, { id: "memo", name: "备忘录" }],
    game: 'tictactoe',
    index: 1,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  getPic: function () {
    wx.chooseImage({ count: 1, success: (tempFilePaths) => { console.log(tempFilePaths) } })
  },
  goPlayGame: function () {
    const game = `../${this.data.array[this.data.index].id}/${this.data.array[this.data.index].id}`;
    wx.navigateTo({
      url: game
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.showInfo()
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.showInfo()
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          this.showInfo()
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    console.log(e.detail);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
    this.showInfo()
  },
  showInfo: function () {
    const text = `Welcome ${this.data.userInfo.nickName} from ${this.data.userInfo.country}`;
    this.setData({
      motto: text
    })
  }
})
