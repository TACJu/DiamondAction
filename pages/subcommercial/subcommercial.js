var localData = require('../../data/goods.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    merchandise: {
      "id": 0,
      "photopath": '/images/Diamond/',
      "name": '道路千万条，安全第一条',
      "type": 'new',
      "activity": 'liulangdiqiu',
      "price": 1,
      "number": 1000,
      "description": '武家伟于2019年2月28日软工课上挖出了这颗钻石'
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id,
      merchandise:localData.goodsList[options.id]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})