var openid

//app.js
App({
  globalData: {
    userInfo: null,
    userId: null,
    goodsInfo: [],
    openId: "",
  privKey:"YjgzNTg5MTI5ZjljMDAwZjk4NzAwMDQ3MTE0MjUzZGUxMTUyNGFlYTJjNmIwMzhiZmI3ZjAwNjQ2YTc2MzYwM2I2YjlhNmU3MTM3NmFlYzk1MTkyMTE4NmY4YzA1NzllYzM3MmM1Y2Q4ZjExY2Y2MTVjMDk3OTliM2MwN2Y3OTNjNTVlZThjZmU2OWFlZDQ0ZDYzYjczOWMzM2I3NGM2YjcyOWVjNTYwYTJkZmEwNzhkYmRlMzljNTQxNzE1ZWM0NTgyYTc5OGQ5ZmZlZTMxYzNkOWYwNzY3YTVlNzNhMDRhODYxNzFiYTNlZDRmNjczYmVjNzZhZGJjOGM1ZTRjZTNlMjMwYzgyNWQzN2JkNWM5YjM0Yzk2NjY2MTY3NTYxMmM0ZmY1YWJlMDJkYTg5NzVkNDBmMDZkMWE5YjM1ODhkYWFiNDhjNTdiMzJiMGZjZjhiNDdjYjIwMzQ1YzIzMDA3YzRiNWI2MDQwYTY1ZDY3MWJhZGIxMTg4YzVmOTkxN2I2ZGRiMWM5MzcxNWFmMzI2ZTA2YzkyMjI5NzBkYzZkMzhjYTM4NDU2OWFhYzljYmQ0OTIzNWEyOTdkOWYwMjBmNzA0MmY2NjA1OGFjYmRkNTFiYTQwNTVhMjE3YTk5OTMwZTk0NTk3MjVhYjNiOGM5NzhlMzg3MDAxYWVjYjcsMTAwMDEsNmRjMWYwNDc3OTc0OTExMGI5Y2E1YTRmZmRmN2EwNTMxYmNkMDViODFiZjkzMzY2Y2ZkNjJmNWNhNTk2ODNiZTk4YmM2YmI3MTk4MGM4Y2E0OTYxMTgzMjZjYmFlNjNhNDFjODdjMTU2YmRlYjdjYjExZjRjZjUxNzA2NjZhZGNkMDY4Mjk5ZGRlOTA4NzM5NTFkMGEwYTRmY2E3ODVkMDJiYmU3MDZhOTEwMTVmZjM0MzQ2NThmM2IwNzdhNTc4YTVmM2MwZjM2MmQ2OTM2OWJiNDlhYjM2ZDVjMjNkNmU5MzA5NjRhMzBkNTcwNGY1OTg0MWU3ZThjNmViMmFkNWI4ZGI4ZGNkOTk1Y2IwYjU0NDQ5NjUxMDY2YjczNDAxMzdhMGJiMmEzN2M1MmExYjkwYjk2NWEzODY0OGIxNmFjNDlkZGM4OTMzNWUwY2E1NmU5NWMxMjU0NDI2MjQzMDU0OGIyNjBkODkxY2M3OTcxMGI1MjFmOTQwMTk3ODJjYmQ3ZjEyOGZkNTE2MDI4M2IxZDZhMWI0ZWMyMjNlYjQ0NTk2NTA1ZTgyZDEwN2Y4MDJkMDM0MGJhODEwZjE5YmNjOGQ4ZTk0NmUxODE3MDA3NzI5ODUxMzZiMWQ1ODZmMjhhM2NkOTVlMTFhZTRkZmIwYWJmODM3YmEwOGY5Njk="

  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var that = this;
        var privKey = this.globalData.privKey;
        var code = res.code; //登录凭证
        console.log("code:  ");
        console.log(code);
        if (code) {
          //2、调用获取用户信息接口
          wx.getUserInfo({
            success: function (res) {
              console.log("hello");
              //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
              wx.request({
                url: 'https://diamondaction.internetapi.cn:8443/SCIDE/SCManager', //自己的服务接口地址
                //method: 'post',
                data: {
                  "action": "executeContract",
                  "contractID": "DiamondOperation",
                  "operation": "getOpenId",
                  "arg": code ,
                  "privKey": privKey,
                  //username: res.userInfo.nickName,
                },
                dataType: "jsonp",

                success: function (data) {
                  //4.解密成功后 获取自己服务器返回的结果
                  console.log("openid:::::\n")
                  
                  var code = (JSON.parse(JSON.parse(JSON.parse(JSON.parse(data.data).data).result))).resposeCode
        //.resposeCode
                  
                  console.log(code)
                  //console.log(((JSON.parse(JSON.parse(res.data).data)).data))
                  if (code == 200) {
                    openid = JSON.parse(JSON.parse(JSON.parse(JSON.parse(JSON.parse(data.data).data).result)).response).openid
                    getApp().globalData.openId = openid
                    console.log(that.globalData.openId)
                    //that.globalData.userId = data.data.data
                    //console.log(data.data.data)
                    if (that.employIdCallback) {
                      that.employIdCallback(data.data.data);
                    }
                  } else {
                    
                    console.log('登录失败')
                  }
                },
                fail: function () {
                  console.log('系统错误')
                }
              })
            },
            fail: function () {
              console.log('获取用户信息失败')
            }
          })
        } else {
          console.log('获取用户登录态失败！' + r.errMsg)
        }
      },
      fail: function () {
        console.log('登陆失败')
      }

    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    console.log(this.globalData)
  },
})