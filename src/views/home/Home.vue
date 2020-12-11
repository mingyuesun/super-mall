<template>
  <div id="home" class="wrapper">
		<nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
		<tab-control 
		  :titles="this.titles" @tabClick="tabClick" 
			ref="tabControlTop"
			v-show="isTabFixed"
			class="tabControlTop"
	  />
    <scroll 
		  class="content"
		  ref="scroll"
      :probe-type="3"
			:pull-up-load="true"
			@scroll="contentScroll"
			@pullingUp="loadMore"
		>
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <tab-control 
			  :titles="this.titles" @tabClick="tabClick"
				ref="tabControlBottom"
			/>
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import { getHomeMultidata, getHomeGoods } from 'request/home'
// 公共组件
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'
import Scroll from 'components/common/scroll/Scroll'

// 子组件
import HomeSwiper from './childrenComponents/HomeSwiper'
import RecommendView from './childrenComponents/RecommendView'
import FeatureView from './childrenComponents/FeatureView.vue'

import { debounce } from 'common/utils'

export default {
  name: 'Home',
  components: {
    NavBar,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwiper,
    RecommendView,
    FeatureView,
    Scroll
  },
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ['流行', '新款', '精选'],
      sortType: 'syn',
      goods: {
        syn: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] }
      },
			isShowBackTop: false,
			isTabFixed: false,
			saveY: 0,
			tabOffsetTop: 0,
			isLoad: false // 轮播图片是否加载完毕
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.sortType].list
    }
	},
	// 监听打开 
	actived() {
		this.$refs.scroll.refresh()
		this.$refs.scroll.scrollTo(0, this.saveY, 0)
	},
	// 监听离开
	deactived() {
    this.saveY = this.$refs.scroll.scroll.y
	},
  created() {
    this.getHomeMultidata()
    this.getHomeGoods('syn')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
		const refresh = debounce(this.$refs.scroll.refresh, 200)
		// 监听 goods-item 图片加载完成
		this.$bus.$on('itemImageLoad', () => {
			refresh()
		})
	},
  methods: {
		/**
		 * 网络请求相关
		 *  - 获取首页轮播图和好物推荐
		 */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // this.result = res
        this.banners = res.data[1]
        this.recommends = res.data[0]
      })
    },
    async getHomeGoods(type) {
      await getHomeGoods({
        page: this.goods[type].page,
        pageSize: this.pageSize,
        sortType: type
      }).then((res) => {
        this.goods[type].list.push(...res.data)
        this.goods[type].page += 1
      })
		},
		/**
		 *  事件监听相关的方法
		 */
		swiperImageLoad() {
      if (!this.isLoad) {
				this.tabOffsetTop = this.$refs.tabControlBottom.$el.offsetTop
				this.isLoad = true
			}
		},
    tabClick(index) {
      switch (index) {
        case 0:
          this.sortType = 'syn'
          break
        case 1:
          this.sortType = 'new'
          break
        case 2:
          this.sortType = 'sell'
          break
			}
			this.$refs.tabControlTop.currentIndex = index
			this.$refs.tabControlBottom.currentIndex = index
		},
		// 回到顶部
		backClick() {
      this.$refs.scroll.scrollTo(0, 0)
		},
    // 确认显示还是隐藏 回到顶部
		contentScroll(position) {
			// 1.判断 BackTop 是否显示
			this.isShowBackTop = (-position.y) > 1000
			// 2.决定tabControl是否吸顶
			this.isTabFixed = -position.y > this.tabOffsetTop
		},
    // 下拉加载更多
		loadMore() {
      this.getHomeGoods(this.sortType)
		}
  }
}
</script>

<style scoped>
#home {
  /* height: 100vh; */
  /* position: relative; */
  padding: 44px 0 49px;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tabControlTop {
	position: relative;
	z-index: 9;
	margin-top: -0.5px;
	background-color: #fff;
}
</style>
