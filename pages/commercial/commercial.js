var localData = require('../../data/goods.js')
var activityData = require('../../data/activity.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchandise: [],
    activity_bg: []
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

  goToSubpage(event)
  {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/subcommercial/subcommercial?id=' + id,
    })
  },

  goToActivity(event)
  {
    console.log(event.currentTarget.dataset)
    let name = event.currentTarget.dataset.name
    wx.navigateTo({
      url: '/pages/activity/' + name + '/' + name,
    })
  },

  goToNew(event)
  {
    wx.navigateTo({
      url: '/pages/new/new',
    })
  },

  goToHeart(event) {
    wx.navigateTo({
      url: '/pages/heart/heart',
    })
  },

  goToPoem(event) {
    wx.navigateTo({
      url: '/pages/poem/poem',
    })
  },

  goToHumor(event) {
    wx.navigateTo({
      url: '/pages/humor/humor',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})