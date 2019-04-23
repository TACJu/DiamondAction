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