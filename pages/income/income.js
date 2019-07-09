const app = getApp()
var myurl
var i
var temp
var mine
var revenueDetail

Page({

  /**
   * Page initial data
   */
  data: {
    revenue: 0,
    already: 0,
    remain:0,
    mine:[]

  },
  goToBuy(event) {
    wx.navigateTo({
      url: '/pages/commercial/commercial',
    })
  },
  // goToSubpage(event) {
  //   let classid = event.currentTarget.dataset.diamondinfo.classId
  //   let innerid = event.currentTarget.dataset.diamondinfo.innerId
  //   let time = event.currentTarget.dataset.diamondinfo.time
  //   let content = event.currentTarget.dataset.diamondinfo.content
  //   let price = event.currentTarget.dataset.diamondinfo.price
  //   let description = event.currentTarget.dataset.diamondinfo.description
  //   let photoPathAfter = event.currentTarget.dataset.diamondinfo.photoPathAfter
  //   console.log(typeof classid)
  //   myurl = '/pages/diamonds/diamonds?classid=' + classid
  //   myurl += '&innerid=' + innerid
  //   myurl += '&time=' + time
  //   myurl += '&description=' + description
  //   myurl += '&content=' + content
  //   myurl += '&price=' + price
  //   myurl += '&photoPathAfter=' + photoPathAfter
  //   console.log("mydiamondinfo")
  //   console.log(myurl)
  //   console.log(event.currentTarget.dataset.diamondinfo)




  //   /*
  //       <view>{{diamondInfo.classId}}</view>
  //       <view>{{diamondInfo.innerId}}</view>
  //       <view>{{diamondInfo.time}}</view>
  //       <view>{{diamondInfo.description}}</view>
  //       <view>{{diamondInfo.append}}</view>
  //       <view>{{diamondInfo.appendTime}}</view>
  //   */

  //   wx.navigateTo({
  //     url: myurl,
  //     //url: '/pages/subcommercial/subcommercial?id=1'
  //   })
  // },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log("console.log(merchandise[0])")
    console.log(app.globalData.goodsInfo[0])
    
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
    this.getData()
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
    var _mine = []
    var context = ""
    var flag = false
    var privKey = app.globalData.privKey;
    wx.request({
      url: 'https://diamondaction.internetapi.cn:8443/SCIDE/SCManager',
      data: {
        "action": "executeContract",
        "contractID": "DiamondOperation",
        "operation": "returnRevenue",
        "arg": "{\"user\": \"" + app.globalData.openId + "\"}",
        "privKey": privKey
      },
      dataType: "jsonp",
      success: function (res) {
        if (res.data) {
          console.log(res.data)
          _this.setData({
            mine: JSON.parse(JSON.parse(JSON.parse(res.data).data).result).mine,
            remain: (JSON.parse(JSON.parse(JSON.parse(res.data).data).result).remain).toFixed(2),
            revenue: (0.5 * JSON.parse(JSON.parse(JSON.parse(res.data).data).result).revenue).toFixed(2)
            
          })
          mine=_this.data.mine
          revenueDetail = JSON.parse(JSON.parse(JSON.parse(res.data).data).result).revenueDetail
          for (i = 0; i < mine.length; i++) {
            temp = mine[i]-1
            console.log(temp)
            // mine[i] = '钻石“'
            context = app.globalData.goodsInfo[temp].content
            context += '\n¥ '
            context += (revenueDetail[i].revenue*0.5).toFixed(2)
            flag = ((parseFloat(context.substr(context.length - 4, 4))) == 0)
            _mine.push([context, flag])
          }
          //  _this.data.mine=mine
          _this.setData({
            mine: _mine
          })
          console.log("hello mine")
          // console.log(JSON.parse(JSON.parse(JSON.parse(res.data).data).result))
          // console.log((JSON.parse(JSON.parse(JSON.parse(res.data).data).result)).remain)
          //JSON.parse



          console.log(revenueDetail)
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

  },

  cashout: function () {
    if (this.data.remain ==  0)
    {
      wx.showToast({
        title: '无待提现金额',
        icon: 'none'
      })
    }
    else
    {
      console.log(app.globalData.openId)
      // var backdoorCnt = this.data.bc;
      var _this = this
      var privKey = app.globalData.privKey;
      wx.request({
        url: 'https://diamondaction.internetapi.cn:8443/SCIDE/SCManager',
        data: {
          "action": "executeContract",
          "contractID": "DiamondOperation",
          "operation": "cashOut",
          "arg": "{\"user\": \"" + app.globalData.openId + "\"}",
          "privKey": privKey
        },
        dataType: "jsonp",
        success: function (res) {
          if (res.data) {
            console.log(res.data);
            wx.showToast({
              title: "微信已到账",
            })
            _this.onShow()
          }
        }
      })
    }
  }
})