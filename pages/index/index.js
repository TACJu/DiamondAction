//index.js
//获取应用实例
const app = getApp()

var util = require("../../utils/util.js");
var localData = require('../../data/goods.js');

Page({
  data: {
    //motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    timeString: '你',
    hotMottos: [],
    array: [{
      mode: 'scaleToFill',
      //text: 'scaleToFill：不保持纵横比缩放图片，使图片完全适应'
    }],
    src: '../../images/goods.jpg',
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  setTimeString: function () {
    let time = new Date().getHours();
    if (time >= 5 && time < 9) {
      this.setData({
        timeString: "早上"
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
    else if (time >= 18 && time < 24) {
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

  goToMerchant: function(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/subcommercial/subcommercial?id=' + id,
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
    this.setTimeString();
    let hotList = [];
    for (let index in localData.goodsList) {
      hotList.push(localData.goodsList[index]);
    }
    this.setData({hotMottos:hotList});
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
