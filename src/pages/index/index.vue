<template>
  <div @click="clickHandle">
    <!-- 搜索 -->
    <div class="search">
      <!-- 搜索框 -->
      <div class="input-box">
        <input type="text">
      </div>
      <!-- 搜索结果 -->
      <div class="result"></div>
    </div>

        <!-- 焦点图 -->
    <swiper class="banner" indicator-dots indicator-color="rgba(255, 255, 255, 0.6)" indicator-active-color="#fff">
      <swiper-item v-for="(item, key) in bannerList" :key="key">
        <navigator :url="item.navigator_url">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 导航 -->
    <div class="navs">
      <navigator v-for="(item, key) in navList" :url="item.navigator_url" :key="key">
        <image :src="item.image_src"></image>
      </navigator>

    </div>

    <!-- 楼层 -->
    <div class="floors">
      <div class="floor" v-for="(item, key) in floorList" :key="key">
        <!-- 标题 -->
        <div class="title">
          <image :src="item.floor_title.image_src"></image>
        </div>
        <div class="pics">
          <navigator v-for="(ite, k) in item.product_list" :url="ite.navigator_url" :key="k">
            <image :src="ite.image_src"></image>
          </navigator>
        </div>
      </div>

    </div>
    <span class="gotop" @click="goTop" v-show="!isTop"></span>

  </div>
</template>

<script>
  import request from '@/utils/request';

  export default {
    data () {
      return {
        bannerList: [],
        navList: [],
        floorList: [],
        isTop: true
      }
    },

    methods: {
      //焦点图接口
      async getBanner () {
        // 小程序的所有 API 接口在 mpvue 中使用 mpvue
        // 做为命名空间，即原来的 wx.xxx 变成了 mpvue.xxx
        // 所需要的参数保持不变！！！
        // 举例：wx.request 变为 mpvue.request

        // let that = this;
        // mpvue.request({
        //   url: 'https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata',
        //   method: 'get',
        //   success: function(info) {
        //     console.log(info);
        //     // 更新数据模型
        //     that.bannerList = info.data.message;
        //   }
        // })

        let { message } = await request({
          url: '/api/public/v1/home/swiperdata'
        })
        this.bannerList = message
      },

      //导航接口
      async getNavs () {
        let { message } = await request({
          url: '/api/public/v1/home/catitems'
        });
        this.navList = message;
      },

      // 楼层接口
      async getFloors () {
        let {message} = await request({
          url: '/api/public/v1/home/floordata'
        });
        this.floorList = message;
      },

      //回到顶部
      goTop () {
        //课滚动到指定位置
        mpvue.pageScrollTo({
          scrollTop: 0
        })
      }

    },

    async mounted () {
      // 获取焦点图
      this.getBanner();
      // 获取导航数据
      this.getNavs();
      // 获取楼层数据
      this.getFloors();
    },

    //下拉刷新
    onPullDownRefresh () {
      // 获取焦点图
      this.getBanner();
      // 获取导航数据
      this.getNavs();
      // 获取楼层数据
      this.getFloors();
      //停止下拉效果
      mpvue.stopPullDownRefresh()
    },

    //上拉加载
    onReachBottom () {

    },

    //页面滚动
    onPageScroll (e) {
      this.isTop = e.scrollTop < 100;
    }
  }
</script>

<style scoped lang="less">
// vue 中 less 是可以被支持的
// 前提需要安装 less-loader 并配置
// 在 mpvue 中，使用 less 仍然需要安装 less-loader、less
// 但是不需要配置！！！

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
  /*焦点图*/
  .banner {
    width: 750rpx;
    height: 340rpx;
    navigator {
      width: 100%;
      height: 100%;
    }
  }
  /**/
  .navs {
    display: flex;
    justify-content: space-between;
    padding: 30rpx 42rpx;
  }
  .navs navigator {
    width: 128rpx;
    height: 140rpx;
  }

  /**/
  .floor .title {
    width: 750rpx;
    height: 60rpx;
    padding-top: 24rpx;
    padding-left: 10rpx;
    background-color: #f4f4f4;
  }
  .floor .pics image {
    width: 232rpx;
    height: 188rpx;
    margin-right: 10rpx;
    margin-bottom: 10rpx;
    float: left;
  }
  .floor .pics {
    padding: 22rpx;
    overflow: hidden;
  }
  .floor .pics navigator:nth-child(2n+1) image{
    margin-right: 0;
  }
  .floor .pics navigator:first-child image{
    height: 386rpx;
    margin-right: 10rpx;
  }

  .gotop {
    position: fixed;
    bottom: 70rpx;
    right: 30rpx;

    width: 88rpx;
    height: 88rpx;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
