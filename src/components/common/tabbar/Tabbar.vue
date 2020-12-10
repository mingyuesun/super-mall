<template>
	<div id="tabbar">
    <slot></slot>
	</div>
</template>

<script>
export default {
	name: 'Tabbar'
}
</script>

<style>
#tabbar {
	height: 49px;
	display: flex;
	text-align: center;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	box-shadow: 0 -3px 3px rgba(100,100,100, .2);
	z-index: 10;
	background-color:#fff;
}
</style>
