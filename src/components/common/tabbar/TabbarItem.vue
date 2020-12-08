<template>
	<div class="tabbar-item" @click="itemHandler">
    <div v-if="!isActived">
			<slot name="item-icon"></slot>
		</div>
		<div v-else>
			<slot name="item-icon-active"></slot>
		</div>
		<div :style="activeColor">
			<slot name="item-text"></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TabbarItem',
  props: {
		path: String,
		color: {
			type: String,
			default: 'rgb(237, 99, 121)'
		}
	},
	computed: {
		isActived(){
      return this.$route.path.indexOf(this.path) !== -1
		},
		activeColor(){
      return this.isActived ? { color: this.color } : {}
		}
	},
	methods: {
    itemHandler(){
			!this.isActived ? this.$router.replace(this.path): {}
		}
	}
}
</script>

<style>
.tabbar-item {
	flex: 1;
	font-size: 14px;
}

.tabbar-item img {
	width: 24px;
	height: 24px;
	vertical-align: middle;
  margin: 3px 0 2px;
}
</style>
