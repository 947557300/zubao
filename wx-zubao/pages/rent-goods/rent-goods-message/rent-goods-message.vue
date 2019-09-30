<template>
	<view class="content">
		<view class="box">
			<lunbo></lunbo>
			<Title></title>
			<promise></promise>
			<news></news>
			<comment :img="img" ></comment>
			<goods-details></goods-details>
		</view>
		<view class="bottom">
			<butn></butn>
		</view>
	</view>
</template>

<script>
	import lunbo from '@/components/goods-swiper/goods-swiper'
	import Title from '@/components/goods-tiitle/goods-title'
	import promise from '@/components/goods-promise/goods-promise'
	import news from '@/components/goods-news/goods-news'
	import comment from '@/components/goods-comment/goods-comment'
	import goodsDetails from '@/components/goods-details/goods-details'
	import butn from '@/components/good-bottom-butn/goods-bottom-butn'
	export default {
		data() {
			return {
				
			}
		},
		methods: {

		},
		components:{
			lunbo,Title,promise,news,comment,goodsDetails,butn
		}
	}
</script>

<style>
	.content{
		background-color: #f2f2f2;
	}
	.content .box{
		padding-bottom: 18%;
	}
</style>
