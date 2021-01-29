/*
 * @Description:封装个人的异步请求，在main.js中引入并且挂载到Vue原型上之后就可以在页面中通过this.request()使用
 * @Author: yuli
 * @Date: 2021-01-29 20:34:26
 * @LastEditors: yuli
 * @LastEditTime: 2021-01-29 20:45:10
 */
export default (params) => {

    //加载中效果
    uni.showLoading({
        title: "加载中"
    })

    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            success(res) {
                resolve(res.data)
            },
            fail(err) {
                reject(err)
            },
            complete() {
                uni.hideLoading();
            }
        })
    })
}