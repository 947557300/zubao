<template name='swiper'>
		<view class="content">
				<view class="uni-padding-wrap">
					<swiper class="swiper" indicator-dots="true" indicator-color="#dcdcdc" indicator-active-color="#ea986c" circular='true'>
						<swiper-item>
							<view class="swiper-item">
								<myvideo></myvideo>
							</view>
						</swiper-item>
						<swiper-item v-for="(item,index) in img" :key='index'>
							<view class="swiper-item">
								<image :src="item.image" mode="widthFix"></image>
							</view>
						</swiper-item>
					</swiper>
		        </view>
		    </view>
</template>

<script>
	import myvideo from '@/components/goods-swiper/goods-video/goods-video'
	export default {
		name:'swiper',
		data() {
			return {
				img:[
					{image:require('@/static/goods/5.jpg')},
					{image:require('@/static/goods/6.jpg')},
					{image:require('@/static/goods/7.jpg')},
					{image:require('@/static/goods/8.jpg')},
					{image:require('@/static/goods/5.jpg')}
				]
			};
		},
		 methods: {
		       
		},
		components:{
			myvideo
		}
	}
</script>

<style>
	 .swiper {
	 	height: 750upx;
		background-color: #FFFFFF;
	 }
	 .swiper-item {
	 	display: block;
	   line-height: 750upx;
	 	text-align: center;
	 }
	 .swiper-image{  
	     width:100%;  
	     height:750upx; 
	 }
	 image{
		 width: 100%;
		 height: 750upx;
	 }

</style>