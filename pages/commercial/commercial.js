const app = getApp()
var searchValue = ''

var activityData = require('../../data/activity.js')

Page({

  bindGetUserInfo(e) {
    console.log('1')
    console.log(app.globalData.userInfo)
    console.log('2')
    console.log(e.detail.userInfo)
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
      }
    })
    console.log('3')
    console.log(app.globalData.userInfo)
    // app.globalData.userInfo = e.datail.userInfo
    this.onLoad()
  },

  /**
   * 页面的初始数据
   */
  data: {
    merchandise: [],
    activity_bg: [],
    centent_Show: true,
    searchValue: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  searchValueInput: function (e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    console.log('0')
    console.log(app.globalData.userInfo)
    this.getData()
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
      query = '北京大学高富帅向东伟'
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

  goToNew(event)
  {
    wx.navigateTo({
      url: '/pages/type/new/new',
    })
  },

  goToHeart(event) {
    wx.navigateTo({
      url: '/pages/type/heart/heart',
    })
  },

  goToPoem(event) {
    wx.navigateTo({
      url: '/pages/type/poem/poem',
    })
  },

  goToHumor(event) {
    wx.navigateTo({
      url: '/pages/type/humor/humor',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})