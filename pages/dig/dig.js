// pages/dig/dig.js
Page({

  /**
   * Page initial data
   */
  data: {
    query: '',
    select: '',
    items: [
      { name: 'USA', value: '美国', checked: false},
      { name: 'CHN', value: '中国', checked: true },
      { name: 'BRA', value: '巴西', checked: false },
      { name: 'JPN', value: '日本', checked: false },
      { name: 'ENG', value: '英国', checked: false },
      { name: 'TUR', value: '法国', checked: false },
    ]
  },

  valueChange:function(e) {
    var items = this.data.items;
    for (var i = 0; i < items.length; i++) {
      if (items[i].name == this.data.select) {
        for (var j = 0; j < items.length; j++) {
          // console.log("items[j].checked = ", items[j].checked);
          if (items[j].checked && j != i) {
            items[j].checked = false;
          }
        }
        items[i].checked = !(items[i].checked);
        console.log("-----:", items);
        // this.setData(this.data.items[i]);

      }
    }
    this.setData({
      items: items
    });
  },

  radioChange(e) {
    this.setData({
      select: e.detail.value
    })
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      query: options.query,
    })
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