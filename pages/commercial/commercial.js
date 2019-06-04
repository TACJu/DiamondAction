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
    var privKey = "YmYyYjc3MWZmNzExMGFlMmE4NDhlYzVlN2YxYTZjNWQ0MDM4YjVhMTcyMmI4NWJhMjU1MWM2NTQ3Y2U4ZGYyNmFiNzdlZjQ1ZGU1ZjJiNGE2NWNkZjhmN2UyMzJiODg4OGYwMDBjYWZhMDkyOGU3ZWZhMWI4NDU5NDg3ZDQxMDk0ODIyNjk2ZGMyNzI2ODFiMmRiMTA3YzMxYzBlMDA2N2NkNDFjOWM3NDg1MGZlNjcyZDYxMzA0Y2M0MGQzNTJlNzMwMGU2YjJiMmJhZGY5OGJkZWEyZjEzNmI0YTc2MWE4NDE0NDBlMWViZGYwNGQyYWJhMzE5Y2RkNjEzOGM2ZmRiNDdlMDc5NzdmYTIxZDc5Y2ZiZDk0MGQxOWNlNjAzNjM1ZGQ2YmI4ZGVlZDkxZjk4NzE3YTI4NGVkMzQyMTA4Yzg2MjgwMmZiMTZiMTUyYjUwYjliNWU2NzM4YzhjMDYyMDJmZDI3NmUwOWI0MTFjMDc2NTBjZGI2ZGMxYWFkNDQ4MTg5N2IxMWY5MTU4MGI3NzY1OWIxYzczOWU4ZGQ2ZWNhNDViMGNkY2Q2MGRhZWI1OWNiNjM3NzEzOGNlMWY4YTA3NzI0NmIyMWJjNjIzYTNmNGMzYTg2OTNlMDE5NjA5YzUxYWI3YTdhYTdlZmRkYTAxY2Q4ZDdhMWM5ODksMTAwMDEsYjdhYzU0NDUzMzA1N2RkNmVkZTczYWFiNDQyNWE4MGUyNDYxMTgyOWE4ZGYyNjFhMDYzNzNlN2RmODkxNjlhZGU2YmI1MWZhNjg0MDNhMDBiZTM1OWFjYWQ3ZGFmMWFmY2FlZDNhNDMxN2RkMTdlOWU5ZjViYzQwNjg0NDY3ZDMzYTJhNGRlZjc2MGVhM2Y1ZDBmZGIxM2U4NWRhZjIwYWM5OGMzNzA5MzA3MzE5MmIxYWNmYjEyZjYwODI2YzIxNTdiZjdhZTgyMDhmMjliYmMwNjQ5YjljNjVjZTYyMTBmMWViZGZiNmYxMDAxMmNiMzJiYjdmNTQ2NDI1ZGUxYzA0NzQ2NzM2ZWU4MzhkYzU0YTc2ZTQ2ZWE1M2MyZTJkNGZmNWZmN2M1YWJiMWJmOGYzMTVlZjk5OGZkOGQ5YzMzMDFhYzhhYjk4MDMxMzgyMThjNGY3MDUyMWJmZDg4ZDk0OTcxMWEzYTc3OWIwZGYxNmRkZTI4Y2NlYWI5YWMwZmQyZjdkYWEwZDUzYzhjMThiZjk0NmEzNjljZjk2MmM1YzhmYzhlMWQ3MDU3OGU4N2Q2MDNlYzlhYjYwZTFiYTg1Nzg3Zjk5MzU2ZGEwMDVkZGVmNjQxMzU0Mjg2NGNiODhhMzE3OTI0YWZkMjNkZDdmOWYzYmQwYTgwNDMxNzE=";
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
    var privKey = "YmYyYjc3MWZmNzExMGFlMmE4NDhlYzVlN2YxYTZjNWQ0MDM4YjVhMTcyMmI4NWJhMjU1MWM2NTQ3Y2U4ZGYyNmFiNzdlZjQ1ZGU1ZjJiNGE2NWNkZjhmN2UyMzJiODg4OGYwMDBjYWZhMDkyOGU3ZWZhMWI4NDU5NDg3ZDQxMDk0ODIyNjk2ZGMyNzI2ODFiMmRiMTA3YzMxYzBlMDA2N2NkNDFjOWM3NDg1MGZlNjcyZDYxMzA0Y2M0MGQzNTJlNzMwMGU2YjJiMmJhZGY5OGJkZWEyZjEzNmI0YTc2MWE4NDE0NDBlMWViZGYwNGQyYWJhMzE5Y2RkNjEzOGM2ZmRiNDdlMDc5NzdmYTIxZDc5Y2ZiZDk0MGQxOWNlNjAzNjM1ZGQ2YmI4ZGVlZDkxZjk4NzE3YTI4NGVkMzQyMTA4Yzg2MjgwMmZiMTZiMTUyYjUwYjliNWU2NzM4YzhjMDYyMDJmZDI3NmUwOWI0MTFjMDc2NTBjZGI2ZGMxYWFkNDQ4MTg5N2IxMWY5MTU4MGI3NzY1OWIxYzczOWU4ZGQ2ZWNhNDViMGNkY2Q2MGRhZWI1OWNiNjM3NzEzOGNlMWY4YTA3NzI0NmIyMWJjNjIzYTNmNGMzYTg2OTNlMDE5NjA5YzUxYWI3YTdhYTdlZmRkYTAxY2Q4ZDdhMWM5ODksMTAwMDEsYjdhYzU0NDUzMzA1N2RkNmVkZTczYWFiNDQyNWE4MGUyNDYxMTgyOWE4ZGYyNjFhMDYzNzNlN2RmODkxNjlhZGU2YmI1MWZhNjg0MDNhMDBiZTM1OWFjYWQ3ZGFmMWFmY2FlZDNhNDMxN2RkMTdlOWU5ZjViYzQwNjg0NDY3ZDMzYTJhNGRlZjc2MGVhM2Y1ZDBmZGIxM2U4NWRhZjIwYWM5OGMzNzA5MzA3MzE5MmIxYWNmYjEyZjYwODI2YzIxNTdiZjdhZTgyMDhmMjliYmMwNjQ5YjljNjVjZTYyMTBmMWViZGZiNmYxMDAxMmNiMzJiYjdmNTQ2NDI1ZGUxYzA0NzQ2NzM2ZWU4MzhkYzU0YTc2ZTQ2ZWE1M2MyZTJkNGZmNWZmN2M1YWJiMWJmOGYzMTVlZjk5OGZkOGQ5YzMzMDFhYzhhYjk4MDMxMzgyMThjNGY3MDUyMWJmZDg4ZDk0OTcxMWEzYTc3OWIwZGYxNmRkZTI4Y2NlYWI5YWMwZmQyZjdkYWEwZDUzYzhjMThiZjk0NmEzNjljZjk2MmM1YzhmYzhlMWQ3MDU3OGU4N2Q2MDNlYzlhYjYwZTFiYTg1Nzg3Zjk5MzU2ZGEwMDVkZGVmNjQxMzU0Mjg2NGNiODhhMzE3OTI0YWZkMjNkZDdmOWYzYmQwYTgwNDMxNzE=";
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