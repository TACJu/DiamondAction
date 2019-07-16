const app = getApp()
var goodsData = require('../../data/goods.js')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bc: 0,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onShow: function () {
    this.setData({
      userInfo:app.globalData.userInfo

    })
    console.log(userInfo);
  },
  
  onLoad: function () {

  },

  backdoor: function () {
    console.log(app.globalData.openId)
    var backdoorCnt = this.data.bc;
    var _this = this
    var privKey = app.globalData.privKey;
    wx.request({
      url: 'https://diamondaction.internetapi.cn:8443/SCIDE/SCManager',
      data: {
        "action": "executeContract",
        "contractID": "DiamondOperation",
        "operation": "publish",
        "arg": "{\"num\":" + goodsData.goodsList[backdoorCnt].number + ", \"content\":\"" + encodeURIComponent(goodsData.goodsList[backdoorCnt].name) + "\", \"type\":\"" + goodsData.goodsList[backdoorCnt].type + "\", \"miner\":\"" + app.globalData.openId + "\", \"activity\":\"" + goodsData.goodsList[backdoorCnt].activity + "\", \"priceType\":\"" + goodsData.goodsList[backdoorCnt].priceType + "\", \"beginPrice\":" + goodsData.goodsList[backdoorCnt].beginPrice + ", \"priceParam\":" + goodsData.goodsList[backdoorCnt].priceParam + ", \"photoPath\":\"" + goodsData.goodsList[backdoorCnt].photopath + "\",\"photoPathAfter\":\"" + "https://6d61-master-27262a-1259058618.tcb.qcloud.la/images/Icon/hello.jpg?sign=962697fdbf63636aad12c2ced450b9db&t=1558368470" + "\",\"description\":\"" + encodeURIComponent(goodsData.goodsList[backdoorCnt].description) +"\"}",
        "privKey": privKey
      },
      dataType: "jsonp",
      success: function (res) {
        if (res.data) {
          console.log(res.data);
          wx.showToast({
            title: _this.data.bc + '/14',
          })
        } 
      }
    })
    console.log(backdoorCnt);
    this.setData({bc:backdoorCnt+1});
    console.log(userInfo);
  }
})
