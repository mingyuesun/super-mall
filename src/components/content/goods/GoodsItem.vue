import { Goods } from "network/detail"
<template>
	<div class="goods-item">
		<div class="goods-num">
			<img :src="goodsItem.goodsLogo" alt="" @load="imageLoad">
			<span>已售{{goodsItem.goodsBuyNum || sellCountFilter}}件</span>
		</div>
		<div class="goods-info">
			<p>{{goodsItem.goodsName}}</p>
			<div>
				<span class="price">￥{{goodsItem.goodsPrice}}</span>
			  <span class="collect">{{goodsItem.goodsFav}}</span>
			</div>
			<div class="old-price">{{goodsItem.goodsOldPrice}}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'GoodsItem',
	props: {
    goodsItem: {
			type: Object,
			default(){
				return {}
			}
		}
	},
	filters: {
		sellCountFilter(value) {
			return value > 10000 ? `${(value/1000).toFixed}(1)万` : value
		}
	},
  methods: {
		imgLoad() {
			this.$bus.$emit('itemImageLoad')
		}
	}
}
</script>

<style scoped>
  .goods-item {
		/* padding-bottom: 40px; */
		width: 48%;
	}

	.goods-num {
		position: relative;
	}

	.goods-num img {
		width: 100%;
		height: 170px;
		border-radius: 5px;
	}

	.goods-num span {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 2%;
		height: 1rem;
		line-height: 1rem;
		z-index: 3;
		color: #fff;
		background-color: rgba(100, 100, 100, .1);
		font-size: .3rem;
		text-overflow: ellipsis;
		padding-left: 4px;
	}
	
	.goods-info {
		font-size: 12px;
		bottom: 5px;
		left: 0;
		right: 0;
		overflow: hidden;
		text-align: center;
	}

	.goods-info p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	  padding: 5px 0;
	}

	.goods-info div {
		display: flex;
		justify-content: space-between;
	}

  .goods-info .price {
    color: var(--color-high-text);
    /* margin-right: 20px; */
  }

	.goods-info .collect {
		position: relative;
	}

	.goods-info .collect::before {
		content: '';
		position: absolute;
		left: -15px;
		top: -1px;
		width: 14px;
		height: 14px;
		background: url("~assets/images/common/collect.svg") 0 0/14px 14px;
	}

	.goods-info .old-price {
		color: gainsboro;
		text-decoration: line-through;
		font-size: 10px;
		padding: 5px 0 20px;
	}
</style>
