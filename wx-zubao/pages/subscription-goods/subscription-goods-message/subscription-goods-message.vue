<template>
	<view class="content">
		<view class="box">
			<lunbo></lunbo>
			<Title></title>
			<leasenews></leasenews>
			<comment></comment>
			<s-news></s-news>
		</view>
		<view class="bottom">
			<butn></butn>
		</view>
	</view>
</template>

<script>
	import lunbo from '@/components/goods-swiper/goods-swiper'
	import Title from '@/components/goods-tiitle/subscription-goods-title/subscription-goods-title'
	import leasenews from '@/components/goods-leasenews/goods-leasenews'
	import sNews from '@/components/goods-news/subscription-goods-news/subscription-goods-news'
	import comment from '@/components/goods-comment/goods-comment'
	import butn from '@/components/good-bottom-butn/subscription-goods-bottom-butn/subscription-goods-bottom-butn'
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {

		},
		components:{
			lunbo,Title,sNews,leasenews,comment,butn
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
