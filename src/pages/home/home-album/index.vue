<!--
 * @Description: 专辑列表+专辑详情
 * @Author: yuli
 * @Date: 2021-01-29 19:56:57
 * @LastEditors: yuli
 * @LastEditTime: 2021-01-30 16:24:26
-->
<template>
  <view>
    <!-- swiper实现轮播效果
    一般要加三个属性：
    1 自动轮播autoplay
    2 指示器indicator-dots
    3 衔接轮播circular

    4 swiper:默认高度150px
    5 image：
        默认宽度320px  =>在此项目的基本样式中被重置为100%
        默认高度240px
    6 计算图片的宽度和高度的比例
    7 把图片的比例也写到swiper标签样式
    8 swiper-item:默认宽高都是100%
    -->
    <!-- 轮播图开始 -->
    <view class="album_swiper">
      <swiper autoplay indicator-dots circular>
        <swiper-item v-for="item in banner" :key="item.id">
          <image :src="item.thumb"></image>
        </swiper-item>
      </swiper>
    </view>
    <!-- 轮播图结束 -->
  </view>
</template>
<script>
export default {
  data() {
    return {
      params: {
        limit: 30,
        order: "new",
        skip: 0,
      },
      banner: [], //轮播图列表
      album: [], //专辑列表
    }
  },
  mounted() {
    //修改页面标题
    uni.setNavigationBarTitle({
      title: "专辑",
    })
    this.getList()
  },
  methods: {
    getList() {
      this.request({
        url: "http://157.122.54.189:9088/image/v1/wallpaper/album",
        data: this.params,
      }).then((result) => {
        this.banner = result.res.banner
        this.album = result.res.album
      })
    },
  },
}
</script>
<style lang="scss" scoped>
swiper {
  height: calc(750rpx / 2.3);
  image {
    height: 100%;
  }
}
</style>
