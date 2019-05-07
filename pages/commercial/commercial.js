const app = getApp()
var searchValue = ''

var localData = require('../../data/goods.js')
var activityData = require('../../data/activity.js')

Page({

  userInfo: {},
  hasUserInfo: false,
  canIUse: wx.canIUse('button.open-type.getUserInfo'),

  /**
   * 页面的初始数据
   */
  data: {
    merchandise: [],
    activity_bg: [],
    centent_Show: true,
    searchValue: '',
  },

  searchValueInput: function (e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value,
    });
  },


  suo: function (e) {
    var id = e.currentTarget.dataset.id
    var program_id = app.program_id;
    var that = this;
    wx.request({
      url: 'aaa.php',//这里填写后台给你的搜索接口
      method: 'post',
      data: { str: that.data.searchValue, program_id: program_id, style: id },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.length == 0) {
          that.setData({
            centent_Show: false,
          });
        }
        that.setData({
          nanshen_card: res.data,
        });
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getData()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getGoods(()=>wx.stopPullDownRefresh())
  },

  /**
   * 获取商品信息，callback用于指定是否调用wx.stopPullDownRefresh()
   */
  getData(callback)
  {
    this.setData({
      merchandise: localData.goodsList
    })
    this.setData({
      activity_bg: activityData.activityList
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