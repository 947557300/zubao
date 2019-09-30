<template name='sNews'>
	<view>
		<view class="news">
			<text class="news_title">图文介绍</text>
			<view class="fgx"></view>
			<text class="text_title">商品信息</text>
			<view class="text_box">
				<view class="left">
					<text>品牌</text>
					<text>价格</text>
					<text>类型</text>
					<text>尺寸</text>
					<text>重量</text>
				</view>
				<view class="right">
					<text>GUCCI</text>
					<text>80000元</text>
					<text>单肩包/手提包/斜挎包</text>
					<text>长/宽/高24cm*10cm*14cm</text>
					<text>以实际重量为准</text>
				</view>
			</view>
			<view class="img_box" v-for="(item,index) in newsimg" :key='index'>
				<image :src="item.image" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'sNews',
		data() {
			return {
				newsimg:[
					{image:require('@/static/goods/5.jpg')},
					{image:require('@/static/goods/6.jpg')},
					{image:require('@/static/goods/7.jpg')},
					{image:require('@/static/goods/8.jpg')}
				]
			};
		}
	}
</script>

<style lang="scss">
	.news{
			background-color: #FFFFFF;
			width: 100%;
			box-sizing: border-box;
			padding:30upx 24upx;
			margin-top:18upx;
			.news_title{
				font-size: 30upx;
				color: #333333;
			}
			.fgx{
				width: 100%;
				height: 3upx;
				background-color: #dcdcdc;
				margin: 28upx 0;
			}
			.text_title{
				font-size: 25upx;
				color: #666666;
			}
			.text_box{
				margin-top: 20upx;
				display: flex;
				.left{
					margin-right:30upx;
					text{
						display: block;
						font-size: 25upx;
						margin-bottom: 10upx;
						color: #666666;
					}
				}
				.right{
					text{
						display: block;
						font-size: 25upx;
						margin-bottom: 10upx;
						color: #333333;
					}
				}
			}
			.img_box{
				width: 100%;
				margin-top:20upx;
				image{
					width: 100%;
				}
			}
		}

</style>
