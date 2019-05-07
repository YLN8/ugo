<template>
<!-- 搜索 -->
  <div class="search">
    <!-- 搜索框 -->
    <div class="input-box">
      <input type="text">
    </div>
    <!-- 搜索结果 -->
    <div class="result"></div>
  </div>
</template>

<style scoped lang="less">
  .search {
    .input-box {
      padding: 21rpx 30rpx;
      background-color: #ea4451;
    }
  }
  .search .input-box input {
    height: 60rpx;
    padding: 0 15rpx;
    background-color: #fff;
    border-radius: 10rpx;
    font-size: 24rpx;
    color: #666;
  }
</style>
