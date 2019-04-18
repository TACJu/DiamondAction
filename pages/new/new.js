var localData = require('../../data/goods.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchandise: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getGoods()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getGoods(() => wx.stopPullDownRefresh())
  },

  /**
   * 获取商品信息，callback用于指定是否调用wx.stopPullDownRefresh()
   */
  getGoods(callback) {
    this.setData({
      merchandise: localData.goodsList
    })
  },

  goToSubpage(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/subcommercial/subcommercial?id=' + id,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})