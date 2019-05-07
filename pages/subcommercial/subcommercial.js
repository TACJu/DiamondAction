var localData = require('../../data/goods.js')
var wxCharts = require('../../data/wxcharts.js')
var lineChart = null

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

  touchHandler: function (e) {
    lineChart.scrollStart(e);
  },

  moveHandler: function (e) {
    lineChart.scroll(e);
  },

  touchEndHandler: function (e) {
    lineChart.scrollEnd(e);
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + '号 ' + item.name + ':' + item.data + '元'
      }
    });
  },

  excuteContract(event)
  {
    var privKey = "YmYyYjc3MWZmNzExMGFlMmE4NDhlYzVlN2YxYTZjNWQ0MDM4YjVhMTcyMmI4NWJhMjU1MWM2NTQ3Y2U4ZGYyNmFiNzdlZjQ1ZGU1ZjJiNGE2NWNkZjhmN2UyMzJiODg4OGYwMDBjYWZhMDkyOGU3ZWZhMWI4NDU5NDg3ZDQxMDk0ODIyNjk2ZGMyNzI2ODFiMmRiMTA3YzMxYzBlMDA2N2NkNDFjOWM3NDg1MGZlNjcyZDYxMzA0Y2M0MGQzNTJlNzMwMGU2YjJiMmJhZGY5OGJkZWEyZjEzNmI0YTc2MWE4NDE0NDBlMWViZGYwNGQyYWJhMzE5Y2RkNjEzOGM2ZmRiNDdlMDc5NzdmYTIxZDc5Y2ZiZDk0MGQxOWNlNjAzNjM1ZGQ2YmI4ZGVlZDkxZjk4NzE3YTI4NGVkMzQyMTA4Yzg2MjgwMmZiMTZiMTUyYjUwYjliNWU2NzM4YzhjMDYyMDJmZDI3NmUwOWI0MTFjMDc2NTBjZGI2ZGMxYWFkNDQ4MTg5N2IxMWY5MTU4MGI3NzY1OWIxYzczOWU4ZGQ2ZWNhNDViMGNkY2Q2MGRhZWI1OWNiNjM3NzEzOGNlMWY4YTA3NzI0NmIyMWJjNjIzYTNmNGMzYTg2OTNlMDE5NjA5YzUxYWI3YTdhYTdlZmRkYTAxY2Q4ZDdhMWM5ODksMTAwMDEsYjdhYzU0NDUzMzA1N2RkNmVkZTczYWFiNDQyNWE4MGUyNDYxMTgyOWE4ZGYyNjFhMDYzNzNlN2RmODkxNjlhZGU2YmI1MWZhNjg0MDNhMDBiZTM1OWFjYWQ3ZGFmMWFmY2FlZDNhNDMxN2RkMTdlOWU5ZjViYzQwNjg0NDY3ZDMzYTJhNGRlZjc2MGVhM2Y1ZDBmZGIxM2U4NWRhZjIwYWM5OGMzNzA5MzA3MzE5MmIxYWNmYjEyZjYwODI2YzIxNTdiZjdhZTgyMDhmMjliYmMwNjQ5YjljNjVjZTYyMTBmMWViZGZiNmYxMDAxMmNiMzJiYjdmNTQ2NDI1ZGUxYzA0NzQ2NzM2ZWU4MzhkYzU0YTc2ZTQ2ZWE1M2MyZTJkNGZmNWZmN2M1YWJiMWJmOGYzMTVlZjk5OGZkOGQ5YzMzMDFhYzhhYjk4MDMxMzgyMThjNGY3MDUyMWJmZDg4ZDk0OTcxMWEzYTc3OWIwZGYxNmRkZTI4Y2NlYWI5YWMwZmQyZjdkYWEwZDUzYzhjMThiZjk0NmEzNjljZjk2MmM1YzhmYzhlMWQ3MDU3OGU4N2Q2MDNlYzlhYjYwZTFiYTg1Nzg3Zjk5MzU2ZGEwMDVkZGVmNjQxMzU0Mjg2NGNiODhhMzE3OTI0YWZkMjNkZDdmOWYzYmQwYTgwNDMxNzE=";
    wx.request({
      url: 'https://39.106.6.6:8443/SCIDE/SCManager',
      data: {
        "action": "executeContract",
        "contractID": "DiamondOperation",
        "operation": "transfer",
        "arg": "{\"cid\": 1 , \"iid\": 1 , \"owner\": 1 , \"receiver\": 1 , \"time\":\"201904201114\", \"url\":\"123.56.150.39\", \"port\":27017, \"dbName\":\"DA_database\", \"usrName\":\"root\", \"pwd\":\"cai12345\"}",
        "privKey": privKey
      },
      dataType: "jsonp",
      success: function(res){
        if (res.data)
        {
          this.setData({
            
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id,
      merchandise:localData.goodsList[options.id]
    });

    var price = new Array(20).fill(0);
    var catagory = new Array(20).fill(0)
    for (var i = 0; i < 20; i++)
    {
      price[i] = i + 0.99;
    }
    for (var i = 0; i < 20; i++) {
      catagory[i] = i + 1;
    }

    
    lineChart = new wxCharts ({
      canvasId: 'lineGraph',
      type: 'line',
      categories: catagory,
      series: [{
        name: '',
        data: price
      }],
      yAxis: {
        title: '价格',
        min: 0
      },
      width: 400,
      height: 200,
      dataLabel: true,
      legend: false,
      dataPointShape: true,
      enableScroll: true,
      extra: {
        lineStyle: 'curve'
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