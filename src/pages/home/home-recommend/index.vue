<!--
 * @Description: 
 * @Author: yuli
 * @Date: 2021-01-29 19:54:11
 * @LastEditors: yuli
 * @LastEditTime: 2021-01-30 14:52:04
-->
<template>
  <scroll-view
    scroll-y
    @scrolltolower="handleToLower"
    class="recommend_view"
    v-if="recommends.length > 0"
  >
    <!-- 推荐开始 -->
    <view class="recommend_wrap">
      <view class="recommend_item" v-for="item in recommends" :key="item.id">
        <!-- 注意mode="widthFix"的使用 -->
        <image mode="widthFix" :src="item.thumb"></image>
      </view>
    </view>
    <!-- 推荐结束 -->

    <!-- 月份开始 -->
    <view class="month_wrap">
      <view class="month_title">
        <view class="month_title_info">
          <view class="month_info">
            <text>{{ monthes.DD }}/</text>
            {{ monthes.MM }}月
          </view>
          <view class="month_text">{{ monthes.title }}</view>
        </view>
        <view class="month_title_more">更多></view>
      </view>
      <view class="month_content">
        <view class="month_content_item" v-for="item in monthes.items" :key="item.id">
          <image mode="aspectFill" :src="item.thumb + item.rule.replace('$<Height>', 360)"></image>
        </view>
      </view>
    </view>
    <!-- 月份结束 -->

    <!-- 热门开始 -->
    <view class="hots_wrap">
      <view class="hots_title">
        <text>热门</text>
      </view>
      <view class="hots_content">
        <view class="hot_item" v-for="item in hots" :key="item.id">
          <image mode="widthFix" :src="item.thumb"></image>
        </view>
      </view>
    </view>
    <!-- 热门结束 -->
  </scroll-view>
</template>
<script>
import moment from "moment"
export default {
  data() {
    return {
      Month: moment(Date.now()).format("MM"),
      Day: moment(Date.now()).format("DD"),
      recommends: [], //推荐列表
      monthes: {}, //月份列表
      hots: [],
      params: {
        limit: 30,
        order: "hot",
        skip: 0,
      },
      //是否还有下一页
      hasMore: true,
    }
  },
  mounted() {
    //修改页面标题
    uni.setNavigationBarTitle({
      title: "推荐",
    })
    this.getList()
  },
  methods: {
    //获取接口数据
    getList() {
      this.request({
        url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
        data: this.params,
      }).then((result) => {
        //判断是否还有更多数据
        if (result.res.vertical.length === 0) {
          this.hasMore = false
          return
        }
        if (this.recommends.length === 0) {
          this.recommends = result.res.homepage[1].items
          this.monthes = result.res.homepage[2]
          //将时间戳改成 x号/x月的格式，使用第三方的库 moment.js
          this.monthes.MM = moment(this.monthes.stime).format("MM")
          this.monthes.DD = moment(this.monthes.stime).format("DD")
        }
        this.hots = [...this.hots, ...result.res.vertical]
      })
    },

    //滚动条触底事件
    handleToLower() {
      /**
       * 1.修改参数，skip+=limit
       * 2.重新发送请求 getList()
       * 3.请求回来成功 hots数据的叠加
       */
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
<style lang="scss">
.recommend_view {
  //height:屏幕的高度-顶部的高度
  height: calc(100vh - 36px);
}
.recommend_wrap {
  display: flex;
  flex-wrap: wrap;
  .recommend_item {
    width: 50%;
    border: 3px solid #fff;
  }
}
.month_wrap {
  .month_title {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    .month_title_info {
      color: $color;
      font-size: 30rpx;
      font-weight: 600;
      display: flex;
      .month_info {
        text {
          font-size: 36rpx;
        }
      }
      .month_text {
        font-size: 34rpx;
        color: #666;
        margin-left: 30rpx;
      }
    }
    .month_title_more {
      color: $color;
      font-size: 24rpx;
    }
  }
  .month_content {
    display: flex;
    flex-wrap: wrap;
    .month_content_item {
      width: 33.33%;
      border: 3px solid #fff;
    }
  }
}
.hots_wrap {
  .hots_title {
    padding: 20rpx;
    text {
      border-left: 15rpx solid $color;
      padding-left: 20rpx;
      font-size: 34rpx;
      font-weight: 600;
    }
  }
  .hots_content {
    display: flex;
    flex-wrap: wrap;
    .hot_item {
      width: 33.33%;
      border: 3px solid #fff;
    }
  }
}
</style>
