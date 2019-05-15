Page({

  /**
   * 页面的初始数据
   */
  data: {
    classid:"",
    innerid: "",
    time: "",
    description: "",
    content:"",
    price: "",



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
      content:options.content,
      price:options.price,

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

  hello(event){
    let that = this;
    let titlename = event.currentTarget.dataset.content;
    console.log(event);
    console.log(event.currentTarget.dataset);
    console.log(event.currentTarget.dataset.content);
    return {
      title: titlename, // 转发后 所显示的title
      path: '/pages/diamonds/diamonds', // 相对的路径
      success: (res) => {    // 成功后要做的事情
        console.log(res.shareTickets[0])
        // console.log
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: (res) => {
            that.setData({
              isShow: true
            })
            console.log(that.setData.isShow)
          },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    let that = this;

    //let titlename = options.target.dataset.content;
    //console.log("share")
    //console.log(options)
    //console.log(titlename)
    let titlename="快来看我的独有钻链钻石"

    

    return {
      title: titlename, // 转发后 所显示的title
      path: '/pages/diamons/diamonds', // 相对的路径
      success: (res) => {    // 成功后要做的事情
        console.log(res.shareTickets[0])
        // console.log

        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: (res) => {
            that.setData({
              isShow: true
            })
            console.log(that.setData.isShow)
          },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  }
})