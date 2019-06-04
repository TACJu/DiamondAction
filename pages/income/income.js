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
    var privKey = "YmYyYjc3MWZmNzExMGFlMmE4NDhlYzVlN2YxYTZjNWQ0MDM4YjVhMTcyMmI4NWJhMjU1MWM2NTQ3Y2U4ZGYyNmFiNzdlZjQ1ZGU1ZjJiNGE2NWNkZjhmN2UyMzJiODg4OGYwMDBjYWZhMDkyOGU3ZWZhMWI4NDU5NDg3ZDQxMDk0ODIyNjk2ZGMyNzI2ODFiMmRiMTA3YzMxYzBlMDA2N2NkNDFjOWM3NDg1MGZlNjcyZDYxMzA0Y2M0MGQzNTJlNzMwMGU2YjJiMmJhZGY5OGJkZWEyZjEzNmI0YTc2MWE4NDE0NDBlMWViZGYwNGQyYWJhMzE5Y2RkNjEzOGM2ZmRiNDdlMDc5NzdmYTIxZDc5Y2ZiZDk0MGQxOWNlNjAzNjM1ZGQ2YmI4ZGVlZDkxZjk4NzE3YTI4NGVkMzQyMTA4Yzg2MjgwMmZiMTZiMTUyYjUwYjliNWU2NzM4YzhjMDYyMDJmZDI3NmUwOWI0MTFjMDc2NTBjZGI2ZGMxYWFkNDQ4MTg5N2IxMWY5MTU4MGI3NzY1OWIxYzczOWU4ZGQ2ZWNhNDViMGNkY2Q2MGRhZWI1OWNiNjM3NzEzOGNlMWY4YTA3NzI0NmIyMWJjNjIzYTNmNGMzYTg2OTNlMDE5NjA5YzUxYWI3YTdhYTdlZmRkYTAxY2Q4ZDdhMWM5ODksMTAwMDEsYjdhYzU0NDUzMzA1N2RkNmVkZTczYWFiNDQyNWE4MGUyNDYxMTgyOWE4ZGYyNjFhMDYzNzNlN2RmODkxNjlhZGU2YmI1MWZhNjg0MDNhMDBiZTM1OWFjYWQ3ZGFmMWFmY2FlZDNhNDMxN2RkMTdlOWU5ZjViYzQwNjg0NDY3ZDMzYTJhNGRlZjc2MGVhM2Y1ZDBmZGIxM2U4NWRhZjIwYWM5OGMzNzA5MzA3MzE5MmIxYWNmYjEyZjYwODI2YzIxNTdiZjdhZTgyMDhmMjliYmMwNjQ5YjljNjVjZTYyMTBmMWViZGZiNmYxMDAxMmNiMzJiYjdmNTQ2NDI1ZGUxYzA0NzQ2NzM2ZWU4MzhkYzU0YTc2ZTQ2ZWE1M2MyZTJkNGZmNWZmN2M1YWJiMWJmOGYzMTVlZjk5OGZkOGQ5YzMzMDFhYzhhYjk4MDMxMzgyMThjNGY3MDUyMWJmZDg4ZDk0OTcxMWEzYTc3OWIwZGYxNmRkZTI4Y2NlYWI5YWMwZmQyZjdkYWEwZDUzYzhjMThiZjk0NmEzNjljZjk2MmM1YzhmYzhlMWQ3MDU3OGU4N2Q2MDNlYzlhYjYwZTFiYTg1Nzg3Zjk5MzU2ZGEwMDVkZGVmNjQxMzU0Mjg2NGNiODhhMzE3OTI0YWZkMjNkZDdmOWYzYmQwYTgwNDMxNzE=";
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
          
          _this.setData({
            mine: JSON.parse(JSON.parse(JSON.parse(res.data).data).result).mine,
            remain: (JSON.parse(JSON.parse(JSON.parse(res.data).data).result).remain).toFixed(2),
            revenue: (0.5 * JSON.parse(JSON.parse(JSON.parse(res.data).data).result).revenue).toFixed(2)
            
          })
          mine=_this.data.mine
          revenueDetail = JSON.parse(JSON.parse(JSON.parse(res.data).data).result).revenueDetail
          for (i = 0; i < mine.length; i++) {
            temp = mine[i]-1
            // mine[i] = '钻石“'
            context = app.globalData.goodsInfo[temp].content
            context += '\n¥ '
            context += (revenueDetail[temp].revenue*0.5).toFixed(2)
            flag = ((parseFloat(context.substr(context.length - 4, 4))) == 0)
            _mine.push([context, flag])
            console.log(_mine)
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
      var privKey = "YmYyYjc3MWZmNzExMGFlMmE4NDhlYzVlN2YxYTZjNWQ0MDM4YjVhMTcyMmI4NWJhMjU1MWM2NTQ3Y2U4ZGYyNmFiNzdlZjQ1ZGU1ZjJiNGE2NWNkZjhmN2UyMzJiODg4OGYwMDBjYWZhMDkyOGU3ZWZhMWI4NDU5NDg3ZDQxMDk0ODIyNjk2ZGMyNzI2ODFiMmRiMTA3YzMxYzBlMDA2N2NkNDFjOWM3NDg1MGZlNjcyZDYxMzA0Y2M0MGQzNTJlNzMwMGU2YjJiMmJhZGY5OGJkZWEyZjEzNmI0YTc2MWE4NDE0NDBlMWViZGYwNGQyYWJhMzE5Y2RkNjEzOGM2ZmRiNDdlMDc5NzdmYTIxZDc5Y2ZiZDk0MGQxOWNlNjAzNjM1ZGQ2YmI4ZGVlZDkxZjk4NzE3YTI4NGVkMzQyMTA4Yzg2MjgwMmZiMTZiMTUyYjUwYjliNWU2NzM4YzhjMDYyMDJmZDI3NmUwOWI0MTFjMDc2NTBjZGI2ZGMxYWFkNDQ4MTg5N2IxMWY5MTU4MGI3NzY1OWIxYzczOWU4ZGQ2ZWNhNDViMGNkY2Q2MGRhZWI1OWNiNjM3NzEzOGNlMWY4YTA3NzI0NmIyMWJjNjIzYTNmNGMzYTg2OTNlMDE5NjA5YzUxYWI3YTdhYTdlZmRkYTAxY2Q4ZDdhMWM5ODksMTAwMDEsYjdhYzU0NDUzMzA1N2RkNmVkZTczYWFiNDQyNWE4MGUyNDYxMTgyOWE4ZGYyNjFhMDYzNzNlN2RmODkxNjlhZGU2YmI1MWZhNjg0MDNhMDBiZTM1OWFjYWQ3ZGFmMWFmY2FlZDNhNDMxN2RkMTdlOWU5ZjViYzQwNjg0NDY3ZDMzYTJhNGRlZjc2MGVhM2Y1ZDBmZGIxM2U4NWRhZjIwYWM5OGMzNzA5MzA3MzE5MmIxYWNmYjEyZjYwODI2YzIxNTdiZjdhZTgyMDhmMjliYmMwNjQ5YjljNjVjZTYyMTBmMWViZGZiNmYxMDAxMmNiMzJiYjdmNTQ2NDI1ZGUxYzA0NzQ2NzM2ZWU4MzhkYzU0YTc2ZTQ2ZWE1M2MyZTJkNGZmNWZmN2M1YWJiMWJmOGYzMTVlZjk5OGZkOGQ5YzMzMDFhYzhhYjk4MDMxMzgyMThjNGY3MDUyMWJmZDg4ZDk0OTcxMWEzYTc3OWIwZGYxNmRkZTI4Y2NlYWI5YWMwZmQyZjdkYWEwZDUzYzhjMThiZjk0NmEzNjljZjk2MmM1YzhmYzhlMWQ3MDU3OGU4N2Q2MDNlYzlhYjYwZTFiYTg1Nzg3Zjk5MzU2ZGEwMDVkZGVmNjQxMzU0Mjg2NGNiODhhMzE3OTI0YWZkMjNkZDdmOWYzYmQwYTgwNDMxNzE=";
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