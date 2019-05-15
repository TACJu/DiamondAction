Page({

  /**
   * 页面的初始数据
   */
  data: {
    classid: "",
    innerid: "",
    time: "",
    description: "",
    content: "",
    price: "",
    nickname: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    /*
    myurl='/pages/diamonds/diamonds?classid=' +classid
    myurl+='&innerid='+innerid
    myurl+='&time='+time
    myurl+='&description'+description
    */
    this.setData({
      classid: options.classid,
      innerid: options.innerid,
      time: options.time,
      description: options.description,
      content: options.content,
      price: options.price,
      nickname: options.nickname,
    });
    console.log("diamondinfo")
    console.log(options)
    //console.log(diamondinfo)
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 获取商品信息，callback用于指定是否调用wx.stopPullDownRefresh()
   */
  getGoods(callback) {

  },
})