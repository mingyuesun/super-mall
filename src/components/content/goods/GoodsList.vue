<template>
	<div class="goods">
    <goods-item v-for="item in goods" :key="item.goodsName" :goods-item="item"/>
	</div>
</template>

<script>
import GoodsItem from './GoodsItem'

export default {
	name: 'GoodsList',
	props: {
    goods: {
			type: Array,
			default(){
				return []
			}
		}
	},
	data() {
		return {

		}
	},
	components: {
    GoodsItem
	}
}
</script>

<style>
  .goods {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;

		padding: 2px;
	}
</style>
