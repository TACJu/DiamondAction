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
    this.getGoods(()=>wx.stopPullDownRefresh())
  },

  /**
   * 获取商品信息，callback用于指定是否调用wx.stopPullDownRefresh()
   */
  getGoods(callback)
  {
    let merchandise = []
    for (let i = 0; i < 8; i += 1)
    {
      merchandise.push({
        photopath: '/images/goods.jpg',
        name: '贫穷限制了我的想象力',
        price: '价格：0.1',
        number: '剩余数量：1111111',
      })
    }
    this.setData({
      merchandise: merchandise
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})