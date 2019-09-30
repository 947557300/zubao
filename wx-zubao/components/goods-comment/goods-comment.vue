<template name="comment">
	<view class="content">
		<view class="title">
			<text class="text_left">商品评论 （152）</text>
			<text class="ck" @tap='gocomment()'>查看所有评价</text>
		</view>
		<view class="fgx"></view>
		<view class="bottom">
			<view class="pd">
				<image :src="touxiang" mode="" class=""></image>
				<view class="content-name">
					<text class="name">张晓明</text>
					<view class="praise">
						<image :src="xingxing1" mode=""></image>
						<image :src="xingxing1" mode=""></image>
						<image :src="xingxing1" mode=""></image>
						<image :src="xingxing" mode=""></image>
						<image :src="xingxing" mode=""></image>
					</view>
				</view>
			</view>
			<text class="comment_text">东西不错，是正品。下次还会在这里买。</text>
			<view class="img">
				<image :src="item.image" 
				       mode="scaleToFill" 
					   v-for='(item,index) in img' 
					   :key='index' 
					   v-if='img.length>0'
					   :class="'img'+img.length">
				</image>
			</view>
			<text class="time">2019-09-23</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:'comment',
		data() {
			return {
				touxiang:require('@/static/goods/10.jpg'),
				xingxing:require('@/static/goodsdetails/xingxing.png'),
				xingxing1:require('@/static/goodsdetails/xingxing1.png'),
				img:[
					{image:require('@/static/goods/9.jpg')},
					{image:require('@/static/goods/9.jpg')},
					{image:require('@/static/goods/9.jpg')},
					// {image:require('@/static/goods/9.jpg')},
					// {image:require('@/static/goods/9.jpg')},
					
				],
			};
		},
		computed:{
			
		},
		methods:{
			gocomment: function (){
				uni.navigateTo({
				    url:'/pages/rent-goods/rent-goods-comment/rent-goods-comment',
				});
			},
		},
	}
</script>

<style lang="scss">
	.content{
		background-color: #FFFFFF;
		width: 100%;
		box-sizing: border-box;
		margin-top: 18upx;
		padding: 25upx 24upx;
		a{
			display: block;
			float: right;
			text-decoration: none;
			
		}
		.title{
			display:flex;
			justify-content: space-between;
			text{
				font-size: 28upx;
				font-family: Mudium;
				color:#333333;
			}
			.title_left{
				display: block;
			}
			.ck{
				color: #ea986c;
				display: block;
			}
			image{
				width: 26upx;
				height: 26upx;
				float: right;
				margin-top: 10upx;
				margin-left: 10upx;
				display: block;
			}
		}
		.fgx{
			width: 100%;
			height: 1upx;
			background-color: #dcdcdc;
			margin-top: 25upx;
			margin-bottom: 30upx;
		}
		.bottom{
			.pd{
				width: 100%;
				display:flex;
				image{
					width: 100upx;
					height: 100upx;
					border-radius: 50%;
					margin-right: 24upx;
				}
				.content-name{
					.name{
						font-size: 28upx;
						color: #333333;
						font-family: Mudium;
						margin-top: 16upx;
					}
					.praise{
						margin-top: 10upx;
						display:flex;
						image{
							width: 22upx;
							height: 22upx;
							margin-right: 10upx;
						}
					}
				}
			}
			.comment_text{
				display: block;
				font-size: 28upx;
				color: #333333;
				font-family: Mudium;
				margin-top: 25upx;
				margin-bottom: 19upx;
			}
			.img{
				margin-bottom: 24upx;
				display:flex;
				justify-content:space-between;
				.img1,.img2{
					width: 330upx;
					height: 330upx;
				}
				.img3{
					width: 220upx;
					height: 220upx;
				}
				.img4{
					width: 165upx;
					height: 165upx;
				}
				.img5{
					width: 132upx;
					height: 132upx;
				}
			}
			.time{
				font-size: 24upx;
				color: #999999;
				font-family: Mudium;
			}
		}
	}

</style>
