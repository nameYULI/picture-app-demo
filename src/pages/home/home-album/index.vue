<!--
 * @Description: 专辑列表+专辑详情
 * @Author: yuli
 * @Date: 2021-01-29 19:56:57
 * @LastEditors: yuli
 * @LastEditTime: 2021-01-30 17:29:46
-->
<template>
  <scroll-view class="album_scroll_view" scroll-y @scrolltolower="handleToLower">
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

    <!-- 列表开始 -->
    <view class="album_list">
      <view class="album_item" v-for="item in album" :key="item.id">
        <view class="album_img">
          <image :src="item.cover"></image>
        </view>
        <view class="album_info">
          <view class="album_name">{{ item.name }}</view>
          <view class="album_desc">{{ item.desc }}</view>
          <view class="album_btn">
            <view class="album_attention">+ 关注</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 列表结束 -->
  </scroll-view>
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
      hasMore: true, //是否还有下一页
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
        //判断是否还有更多数据
        if (result.res.album.length === 0) {
          this.hasMore = false
          return
        }
        if (this.banner.length === 0) {
          this.banner = result.res.banner
        }
        this.album = [...this.album, ...result.res.album]
      })
    },

    //上拉加载逻辑
    handleToLower() {
      if (this.hasMore) {
        this.params.skip += this.params.limit
        this.getList()
      } else {
        uni.showToast({
          title: "没有更多数据了",
          icon: "none",
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.album_scroll_view {
  height: calc(100vh - 36px);
}
swiper {
  height: calc(750rpx / 2.3);
  image {
    height: 100%;
  }
}
.album_list {
  padding: 10rpx;
  .album_item {
    padding: 10rpx 0;
    display: flex;
    border-bottom: 1rpx solid #ccc;
    .album_img {
      flex: 1;
      padding: 10rpx;
      image {
        width: 200rpx;
        height: 150rpx;
      }
    }
    .album_info {
      flex: 2;
      padding: 0 10rpx;
      overflow: hidden;
      .album_name {
        font-size: 30rpx;
        color: #000;
        padding: 10rpx 0;
      }
      .album_desc {
        padding: 10rpx 0;
        font-size: 24rpx;

        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .album_btn {
        display: flex;
        justify-content: flex-end;
        .album_attention {
          color: $color;
          border: 1rpx solid $color;
          padding: 5rpx;
        }
      }
    }
  }
}
</style>
