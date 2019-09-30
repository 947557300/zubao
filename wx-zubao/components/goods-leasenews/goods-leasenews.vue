<template name='leasenews'>
	<view>
		<view class="leasenews">
			<view class="title">
				<image :src="img" mode="widthFix"></image><text>出租介绍</text>
			</view>
			<view class="fgx"></view>
			<view class="text_box">
				<text>我是出租介绍内容，我是出租介绍内容，我是出租介绍内容，我是出租介绍内容，我是出租介绍内容,我是出租介绍内容,我是出租介绍内容,我是出租介绍内容,我是出租介绍内容,我是出租介绍内容,我是出租介绍内容,我是出租介绍内容</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'leasenews',
		data() {
			return {
				img:require('@/static/goodsdetails/iconset0330.png')
			};
		}
	}
</script>

<style lang="scss">
	.leasenews{
		background-color: #FFFFFF;
		width: 100%;
		box-sizing: border-box;
		padding:30upx 24upx;
		margin-top:18upx;
		.title{
			display:flex;
			image{
				width: 40upx;
				margin-right: 20upx;
			}
			text{
				font-size: 30upx;
				color: #333333;
			}
		}
		.fgx{
			width: 100%;
			height: 3upx;
			background-color: #dcdcdc;
			margin: 28upx 0;
		}
		.text_box{
			text{
				font-size: 28upx;
				color: #999999;
			}
		}
	}

</style>
