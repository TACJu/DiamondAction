const app = getApp()
var myurl
// pages/myDiamondList/myDiamondList.js
Page({

  /**
   * Page initial data
   */
  data: {
    myDiamond:[],
    diamondNum:0

  },
  goToSubpage(event) {
    let classid = event.currentTarget.dataset.diamondinfo.classId
    let innerid = event.currentTarget.dataset.diamondinfo.innerId
    let time = event.currentTarget.dataset.diamondinfo.time
    let content = event.currentTarget.dataset.diamondinfo.content
    let price = event.currentTarget.dataset.diamondinfo.price
    let description = event.currentTarget.dataset.diamondinfo.description
    let photoPathAfter = event.currentTarget.dataset.diamondinfo.photoPathAfter
    console.log(typeof classid)
    myurl = '/pages/diamonds/diamonds?classid=' + classid
    myurl+='&innerid='+ innerid
    myurl+='&time='+ time
    myurl+='&description='+description
    myurl += '&content=' + content
    myurl += '&price=' + price
    myurl += '&photoPathAfter=' + photoPathAfter 
    console.log("mydiamondinfo")
    console.log(myurl)
    console.log(event.currentTarget.dataset.diamondinfo)
    
   
    

/*
    <view>{{diamondInfo.classId}}</view>
    <view>{{diamondInfo.innerId}}</view>
    <view>{{diamondInfo.time}}</view>
    <view>{{diamondInfo.description}}</view>
    <view>{{diamondInfo.append}}</view>
    <view>{{diamondInfo.appendTime}}</view>
*/

    wx.navigateTo({
      url: myurl,
      //url: '/pages/subcommercial/subcommercial?id=1'
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getData()
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },
  getData(callback) {
    var _this = this
    var privKey = app.globalData.privKey;
    wx.request({
      url: 'https://diamondaction.internetapi.cn:8443/SCIDE/SCManager',
      data: {
        "action": "executeContract",
        "contractID": "DiamondOperation",
        "operation": "myDiamonds",
        "arg": "{\"user\": \"" + app.globalData.openId + "\"}",
        "privKey": privKey
      },
      dataType: "jsonp",
      success: function (res) {
        if (res.data) {
          _this.setData({
            myDiamond: JSON.parse(JSON.parse(JSON.parse(res.data).data).result),
            diamondNum: JSON.parse(JSON.parse(JSON.parse(res.data).data).result).length
          })
          console.log("hello hello")
          console.log(res.data)
          //JSON.parse
          
          

          //console.log(myDiamond[0])
          //console.log(diamondNum)


        }
      }
    })
  },


  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})