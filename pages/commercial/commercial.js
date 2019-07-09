const app = getApp()
var searchValue = ''

var activityData = require('../../data/activity.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    interval: '',
    sellnum: 0,
    systemInfo: [],
    merchandise: [],
    activity_bg: [],
    centent_Show: true,
    searchValue: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  startInterval: function (e) {
    var privKey = app.globalData.privKey;
    var _this = this
    _this.data.interval = setInterval(
      function () {
        wx.request({
          url: 'https://diamondaction.internetapi.cn:8443/SCIDE/SCManager',
          data: {
            "action": "executeContract",
            "contractID": "DiamondOperation",
            "operation": "returnSoldCount",
            "privKey": privKey
          },
          dataType: "jsonp",
          success: function (res) {
            if (res.data) {
              console.log(JSON.parse((JSON.parse(JSON.parse(res.data).data)).result))
              _this.setData({
                sellnum: JSON.parse((JSON.parse(JSON.parse(res.data).data)).result)
              })
            }
          }
        })
      }, 2000)
  },

  searchValueInput: function (e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value,
    });
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
    var _this = this
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        _this.setData({
          systemInfo: res
        })
      },
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getGoods(()=>wx.stopPullDownRefresh())
  },

  getData(callback)
  {
    var _this = this
    var privKey = app.globalData.privKey;
    wx.request({
      url: 'https://diamondaction.internetapi.cn:8443/SCIDE/SCManager',
      data: {
        "action": "executeContract",
        "contractID": "DiamondOperation",
        "operation": "listAllClass",
        "privKey": privKey
      },
      dataType: "jsonp",
      success: function (res) {
        if (res.data) {
          console.log(res.data)
          app.globalData.goodsInfo = JSON.parse((JSON.parse(JSON.parse(res.data).data)).result)
          _this.setData({
            merchandise: app.globalData.goodsInfo,
            activity_bg: activityData.activityList
          })
          console.log(_this.data.merchandise)
        }
      }
    })
  },

  goToSearch(event)
  {
    var query = ''
    if (this.data.searchValue == '')
    {
      query = '一句誓言，一颗永恒'
    }
    else
    {
      query = this.data.searchValue
    }
    wx.navigateTo({
      url: '/pages/search/search?query=' + query,
    })
  },

  goToSubpage(event)
  {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/subcommercial/subcommercial?id=' + id,
    })
  },

  goToActivity(event)
  {
    let name = event.currentTarget.dataset.name
    wx.navigateTo({
      url: '/pages/activity/' + name + '/' + name,
    })
  },

  goToType(event)
  {
    var hash = event.target.dataset.hash
    this.setData({
      toView: hash
    })
  },

  onShow: function () {
    this.getData()
    this.startInterval()
  },

  onHide: function () {
    clearInterval(this.data.interval)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})