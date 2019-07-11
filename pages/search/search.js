const app = getApp()
// { "action": "onExecuteResult", "data": "{\"status\":\"Success\",\"result\":\"[]\"}", "executeTime": 51 }
// { "action": "onExecuteResult", "data": "{\"status\":\"Success\",\"result\":\"[false]\"}", "executeTime": 55 }
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: '',
    searchValue: '',
    searchcid: [],
    merchandise: [],
    mined: false,
    flag: false
  },

  searchValueInput: function (e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value,
    });
  },

  goToSearch(event) {
    var query = ''
    if (this.data.searchValue == '') {
      query = this.data.query
    }
    else {
      query = this.data.searchValue
    }
    wx.redirectTo({
      url: '/pages/search/search?query=' + query,
    })
  },

  goToSubpage(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/subcommercial/subcommercial?id=' + id,
    })
  },

  goToDig(event) {
    var query = this.data.query
    var mined = this.data.mined
    wx.navigateTo({
      url: '/pages/dig/dig?query=' + query + '&mined=' + mined, 
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.openId)
    this.setData({
      query: options.query,
    })
    var _this = this
    var privKey = app.globalData.privKey;
    wx.request({
      url: 'https://diamondaction.internetapi.cn:8443/SCIDE/SCManager',
      data: {
        "action": "executeContract",
        "contractID": "DiamondOperation",
        "operation": "fuzzySearch",
        "arg": encodeURIComponent(this.data.query),
        "privKey": privKey
      },
      dataType: "jsonp",
      success: function (res) {
        if (res.data) {
          console.log(res.data)
          _this.setData({
            searchcid: JSON.parse((JSON.parse(JSON.parse(res.data).data)).result),
            mined: JSON.parse((JSON.parse(JSON.parse(res.data).data)).result).pop()
          })
          for (var i = 0; i < _this.data.searchcid.length - 1; i++)
          {
            if (_this.data.searchcid[i].sim == 1)
            {
              _this.data.flag = true
            }
            _this.data.merchandise.push(app.globalData.goodsInfo[_this.data.searchcid[i].cid - 1])
          }
          _this.setData({
            merchandise: _this.data.merchandise,
            flag: _this.data.flag
          })
        }
      }
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