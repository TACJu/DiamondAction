const app = getApp()
var util = require('../../utils/util.js')
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
    console.log("diamondinfo")
    console.log(options)
    this.setData({
      classid: options.classid,
      innerid: options.innerid,
      time: options.time,
      description: options.description,
      content: options.content,
      price: options.price,
      nickname: options.nickname,
      ownerid: options.ownerid,
    });
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
	//arg =  {"action":"transfer","arg":"{\"cid\": 1 , \"iid\": 1 , \"owner\": 1 , \"receiver\": 1 , \"time\":\"201904201114\"}"}
  goToTransfer() {
    var _this = this
    _this.setData({
      banable: true
    })
    var time = util.formatTime(new Date())
    var privKey = app.globalData.privKey;
    wx.request({
      url: 'https://diamondaction.internetapi.cn:8443/SCIDE/SCManager',
      data: {
        "action": "executeContract",
        "contractID": "DiamondOperation",
        "operation": "transfer",
        "arg": "{\"cid\":" + _this.data.classid + ", \"iid\":\"" + _this.data.innerid + "\", \"owner\":\"" + _this.data.ownerid + "\", \"receiver\":\"" + app.globalData.openId  + "\", \"time\":\"" + time + "\"}",
        "privKey": privKey
      },

      dataType: "jsonp",
      success: function (res) {
        if (res.data) {
          if (JSON.parse(JSON.parse(res.data).data).result.match("success")){
            wx.showToast({
              title: '转赠成功',
              icon: 'success',
              duration: 2000
            })
          }
          else{
            wx.showToast({
              title: '该钻石已被领取',
              icon: 'none',
              duration: 2000
            })
          }
        }
        // console.log(JSON.parse(res.data).data)
        console.log(JSON.parse(JSON.parse(res.data).data).result)

      }
    })
  },
})


