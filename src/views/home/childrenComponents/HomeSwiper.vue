<template>
	<swiper>
		<swiper-item v-for="item in banners" :key="item.link">
      <a>
				<img class="swiper-img" :src="item.slide_show_imgUrl" alt="">
			</a>
		</swiper-item>
	</swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
	name: 'HomeSwiper',
	props: {
    banners: {
			type: Array,
			default(){
				return []
			}
		}
	},
	components: {
		Swiper,
    SwiperItem
	}
}
</script>

<style>
</style>
