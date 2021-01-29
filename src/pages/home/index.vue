<!--
 * @Description: 
 * @Author: yuli
 * @Date: 2021-01-29 15:30:35
 * @LastEditors: yuli
 * @LastEditTime: 2021-01-29 17:26:49
-->
<template>
  <view>
    首页
    <text class="iconfont iconvideocamera"></text>
    <uni-badge text="1"></uni-badge>
    <uni-badge text="2" type="primary"></uni-badge>
    <uni-badge text="3" type="success"></uni-badge>
  </view>
</template>
<script>
import { uniBadge } from "@dcloudio/uni-ui"
export default {
  components: { uniBadge },
}
</script>
<style lang="scss"></style>
