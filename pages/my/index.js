const app = getApp()
var goodsData = require('../../data/goods.js')

Page({
  data: {
    revenue: 0,
    remain: 0,
    already : 0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bc: 0,
    diamondNum: 0
    //mine: []
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    this.getData()
    this.getData_list()
  },

  onLoad: function () {
    this.getData()
    this.getData_list()

  },
  getData(callback) {
    var _this = this
    //var _mine = []
    //var context = ""
    //var flag = false
    var privKey = app.globalData.privKey;
    wx.request({
      url: 'https://diamondaction.internetapi.cn:8443/SCIDE/SCManager',
      data: {
        "action": "executeContract",
        "contractID": "DiamondOperation",
        "operation": "returnRevenue",
        "arg": "{\"user\": \"" + app.globalData.openId + "\"}",
        "privKey": privKey
      },
      dataType: "jsonp",
      success: function (res) {
        if (res.data) {
          console.log(res.data)
          _this.setData({
            //mine: JSON.parse(JSON.parse(JSON.parse(res.data).data).result).mine,
            remain: ( JSON.parse(JSON.parse(JSON.parse(res.data).data).result).remain).toFixed(2),
            revenue: (0.5 * JSON.parse(JSON.parse(JSON.parse(res.data).data).result).revenue).toFixed(2)

          })
          //mine = _this.data.mine
          //revenueDetail = JSON.parse(JSON.parse(JSON.parse(res.data).data).result).revenueDetail
          // for (i = 0; i < mine.length; i++) {
          //   temp = mine[i] - 1
          //   console.log(temp)
            // mine[i] = '钻石“'
            // context = app.globalData.goodsInfo[temp].content
            // context += '\n¥ '
            // context += (revenueDetail[i].revenue * 0.5).toFixed(2)
            //flag = ((parseFloat(context.substr(context.length - 4, 4))) == 0)
            //_mine.push([context, flag])
          // }
          //  _this.data.mine=mine
          _this.setData({
            //mine: _mine
          })
          //console.log("hello mine")
          // console.log(JSON.parse(JSON.parse(JSON.parse(res.data).data).result))
          // console.log((JSON.parse(JSON.parse(JSON.parse(res.data).data).result)).remain)
          //JSON.parse



          //console.log(revenueDetail)
          //console.log(diamondNum)


        }
      }
    })
  },
  getData_list(callback) {
    var _this = this
    var privKey = app.globalData.privKey;
    wx.request({
      url: 'https://diamondaction.internetapi.cn:8443/SCIDE/SCManager',
      data: {
        "action": "executeContract",
        "contractID": "DiamondOperation",
        "operation": "myDiamonds",
        "arg": "{\"user\": \"" + app.globalData.openId + "\"}",
        "privKey": privKey
      },
      dataType: "jsonp",
      success: function (res) {
        if (res.data) {
          _this.setData({
            diamondNum: JSON.parse(JSON.parse(JSON.parse(res.data).data).result).length
          })
          //console.log("hello hello")
           console.log(res.data)
    


          
          //console.log(diamondNum)


        }
      }
    })
  },
  aboutUs: function () {
    wx.showModal({
      title: '关于我们',
      content: '本系统基于北大数链搭建，祝大家使用愉快！',
      showCancel: false
    })
  },
})
