<template>
	<div id="home" class="wrapper">
    <nav-bar class="home-nav">
		  <div slot="center">购物街</div>	
		</nav-bar>
		<home-swiper :banners="banners"></home-swiper>
		<recommend-view :recommends="recommends"></recommend-view>	
	</div>
</template>

<script>
import { getHomeMultidata } from 'request/home'
import NavBar from "components/common/navbar/NavBar"
import HomeSwiper from "./childrenComponents/HomeSwiper"
import RecommendView from './childrenComponents/RecommendView'

export default {
	name: 'Home',
	components: { 
		NavBar,
		HomeSwiper,
		RecommendView
	},
	data(){
		return {
			banners: [],
			recommends: [],
		}
	},
	mounted(){
    // this.getHomeMultidata()
	},
	methods: {
    getHomeMultidata(){
			getHomeMultidata().then(res => {
				// this.result = res
				this.banners = res.data.banner.list
				this.recommends = res.data.recommends.list
			})
		}
	}
}
</script>

<style scoped>
  #home {
		height: 100vh;
		position: relative;
	}

	.home-nav {
		background-color: var(--color-tint);
		color: #fff;

		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 0;
	}
</style>
