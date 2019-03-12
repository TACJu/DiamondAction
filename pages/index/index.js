//index.js
//获取应用实例
const app = getApp()

var util = require("../../utils/util.js");

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    timeString: '你'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
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
        }
      })
    }
    let time = new Date().getHours();
    if (time >= 5 && time < 9) {
      this.setData({
        timeString : "早上"
      })
    }
    else if (time >= 9 && time < 11) {
      this.setData({
        timeString: "上午"
      })
    }
    else if (time >= 11 && time < 13) {
      this.setData({
        timeString: "中午"
      })
    }
    else if (time >= 13 && time < 18) {
      this.setData({
        timeString: "下午"
      })
    }
    if (time >= 18 && time < 24) {
      this.setData({
        timeString: "晚上"
      })
    }
    else {
      this.setData({
        timeString: "你"
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
