<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view />
		<tab-control :titles="this.titles" @tabClick="tabClick"/>
  </div>
</template>

<script>
import { getHomeMultidata } from 'request/home'
// 公共组件
import NavBar from 'components/common/navbar/NavBar'

// 业务组件
import TabControl from 'components/content/tabControl/TabControl'

// 子组件
import HomeSwiper from './childrenComponents/HomeSwiper'
import RecommendView from './childrenComponents/RecommendView'
import FeatureView from './childrenComponents/FeatureView.vue'

export default {
  name: 'Home',
  components: {
		NavBar,
		TabControl,
    HomeSwiper,
    RecommendView,
		FeatureView
  },
  data() {
    return {
      banners: [],
			recommends: [],
			titles: ["流行", "新款", "精选"],
			currentType: 'pop'
    }
  },
  created() {
    this.getHomeMultidata()
  },
  mounted() {},
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // this.result = res
        this.banners = res.data[1]
        this.recommends = res.data[0]
      })
		},
		tabClick(index) {
			switch (index) {
        case 0:
				  this.currentType = 'pop'
				  break
				case 1:
					this.currentType - 'new'
					break
			  case 2:
					this.currentType = 'sell'
					break		
			}
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
</style>
