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
	created(){
		this.getHomeMultidata()
	},
	mounted(){
    
	},
	methods: {
    getHomeMultidata(){
			getHomeMultidata().then(res => {
				// this.result = res
				this.banners = res.data[1]
				this.recommends = res.data[0]
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

		/* position: fixed; */
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
