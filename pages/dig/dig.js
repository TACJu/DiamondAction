const app = getApp()
var util = require('../../utils/util.js')
var wxCharts = require('../../data/wxcharts.js')
var lineChart = null

Page({

  /**
   * Page initial data
   */
  data: {
    query: '',
    mined: false,
    items: [
      { name: 'provision', value: '我已阅读并同意', checked: false},
    ],
    clicked: false
  },

  touchHandler: function (e) {
    lineChart.scrollStart(e);
  },

  moveHandler: function (e) {
    lineChart.scroll(e);
  },

  touchEndHandler: function (e) {
    lineChart.scrollEnd(e);
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + '号 ' + item.name + ':' + item.data + '元'
      }
    });
  },

  checkChange(e) {
    var items = this.data.items
    items[0].checked = !(items[0].checked)
    this.setData({
      items: items,
    })
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },

  goToTerm() {
    wx.navigateTo({
      url: '/pages/term/term',
    })
  },

  goToDig() {
    var _this = this
    var time = util.formatTime(new Date())
    if (_this.data.items[0].checked == true || _this.data.mined == true)
    {
      _this.setData({
        clicked: true
      })
    }
    var time = util.formatTime(new Date())
    var privKey = app.globalData.privKey;
    if (_this.data.items[0].checked == false && _this.data.mined == false)
    {
      wx.showToast({
        title: '请先同意挖掘条款',
        icon: 'none',
        // image: '../../images/icon/fail.jpg',
        duration: 2000
      })
    }
    else
    {
      wx.request({
        url: 'https://diamondaction.internetapi.cn:8443/SCIDE/SCManager',
        data: {
          "action": "executeContract",
          "contractID": "DiamondOperation",
          "operation": "mining",
          "arg": encodeURIComponent("{\"user\":\"" + app.globalData.openId + "\", \"content\":\"" + _this.data.query + "\", \"time\":\"" + time + "\"}"),
          "privKey": privKey
        },
        dataType: "jsonp",
        success: function (res) {
          if (res.data) {
            console.log(res.data)
            wx.showToast({
              title: '成功，请耐心等待审核',
              icon: 'none',
              duration: 2000
            })
            wx.request({
              url:'https://diamondaction.internetapi.cn:8443/SCIDE/SCManager',
              data: {
                "action": "executeContract",
                "contractID": "DiamondOperation",
                "operation": "publish",
                "arg": "{\"num\":" + 100 + ", \"content\":\"" + encodeURIComponent(_this.data.query) + "\", \"type\":\"" + "other" + "\", \"miner\":\"" + app.globalData.openId + "\", \"activity\":\"" + "none" + "\", \"priceType\":\"" + "linear" + "\", \"beginPrice\":" + 0.99 + ", \"priceParam\":" + 1 + ", \"photoPath\":\"" + "https://6d61-master-27262a-1259058618.tcb.qcloud.la/images/Icon/hello.jpg?sign=962697fdbf63636aad12c2ced450b9db&t=1558368470" + "\",\"photoPathAfter\":\"" + "https://6d61-master-27262a-1259058618.tcb.qcloud.la/images/Icon/hello.jpg?sign=962697fdbf63636aad12c2ced450b9db&t=1558368470" + "\",\"description\":\"" + encodeURIComponent(app.globalData.userInfo.nickName + "于2019年6月4日软工课上挖出了这颗钻石") + "\"}",
                "privKey": privKey
              },
              dataType: "jsonp",
              success: function (res) {
                if (res.data) {
                  wx.request({
                    url: 'https://diamondaction.internetapi.cn:8443/SCIDE/SCManager',
                    data: {
                      "action": "executeContract",
                      "contractID": "DiamondOperation",
                      "operation": "buy",
                      "arg": "{\"cid\":" + JSON.parse((JSON.parse(JSON.parse(res.data).data)).result) + ", \"buyer\":\"" + app.globalData.openId + "\", \"price\":" + 0.99 + ", \"time\":\"" + time + "\"}",
                      "privKey": privKey
                    },
                    dataType: "jsonp",
                    success: function (res) {
                    }
                  })
                }
              }
            })
          }
        }
      })
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      query: options.query,
      mined: options.mined
    })
    if (this.data.mined == 'false')
    {
      this.setData({
        mined: false
      })
    }
    else
    {
      this.setData({
        mined: true
      })
    }
    var price = new Array(20).fill(0);
    var catagory = new Array(20).fill(0)
    for (var i = 0; i < 20; i++) {
      price[i] = i + 0.99;
    }
    for (var i = 0; i < 20; i++) {
      catagory[i] = i + 1;
    }


    lineChart = new wxCharts({
      canvasId: 'lineGraph',
      type: 'line',
      categories: catagory,
      series: [{
        name: '',
        data: price
      }],
      yAxis: {
        title: '价格',
        min: 0
      },
      width: 400,
      height: 200,
      dataLabel: true,
      legend: false,
      dataPointShape: true,
      enableScroll: true,
      extra: {
        lineStyle: 'curve'
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})