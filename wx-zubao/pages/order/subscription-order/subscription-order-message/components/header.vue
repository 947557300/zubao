<template>
	<view class="order-message-header">
		<view class="header-top">
			<view class="message-title">
				<text>订单详情</text>
				<image src="/static/order/more.png" mode="">
					<view>11</view>
				</image>
			</view>
			<view class="logistics">
				<view class="logistics-status">卖家已发货</view>
				<view class="logistics-describe">还剩1天8时自动确认</view>
			</view>
		</view>
		<view class="header-foot">
			<view class="logistics-details">
				<view class="logistics-details-icon">
					<image src="/static/order/expressage.png"></image>
				</view>
				<view class="logistics-details-text">
					<view class="logistics-site">您已在广州小新塘禾堂三巷1号店完成取件,感谢使用菜鸟驿站,期待再次为你服务</view>
					<view class="logistics-time">2019-09-15 13:49:19</view>
				</view>
			</view>
			<view class="purchaser-details">
				<view class="purchaser-details-icon">
					<image src="/static/order/site.png"></image>
				</view>
				<view class="purchaser-details-text">
					<view class="purchaserinfo">王大娘<text>86-13457545154</text></view>
					<view class="purchaser-site">广东省 少皇帝 八二黑龙江 挖了和法力发文件按我理解法律</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.order-message-header{
	border-bottom:20upx #f2f2f2 solid;
	.header-top{
		height: 369upx;
		background: linear-gradient(to top right, #f99209 , #ff5004); 
		.message-title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 82upx;
			padding-left: 80upx;
			font-size: 35upx;
			font-weight: 600;
			color:#ffffff;
			image{
				position: relative;
				padding-right: 42upx;
				display: block;
				width: 30upx;
				height: 30upx;
				overflow: visible;
				view{
					position: absolute;
					top: -28upx;
					left: 0;
					width: 50upx;
					height: 38upx;
					font-size: 20upx;
					text-align: center;
					line-height: 38upx;
					color: #d8592e;
					background-color: #FFFFFF;
					border-radius: 30upx;
				}
			}
		}
		.logistics{
			margin-top: 87upx;
			padding-left: 80upx;
			color:#ffffff;
			.logistics-status{
				font-size: 31upx;
			}
			.logistics-describe{
				margin-top: 26upx;
				font-size: 24upx;
			}
		}
	}
	.header-foot{
		padding: 0 25upx;
		height: 381upx;
		.logistics-details{
			display:flex;
			align-items: center;
			height:190upx;
			border-bottom:1upx #dddddd solid; 
			.logistics-details-icon{
				margin-right: 25upx;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 67upx;
				height: 67upx;
				background-color: #3797e1;
				border-radius: 50%;
			}
			.logistics-details-text{
				width: 500upx;
				.logistics-site{
					font-size: 28upx;
					line-height: 33upx;
					letter-spacing: 1upx;
					color: #3797e1;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;/*最大行数*/
					overflow: hidden;/*超出部分隐藏*/
				}
				.logistics-time{
					padding-top: 18upx;
					font-size: 22upx;
					// line-height: 24upx;
					color: #9a9a9a;
				}
			}
		}
		.purchaser-details{
			display:flex;
			align-items: center;
			height:190upx;
			.purchaser-details-icon{
				margin-right: 25upx;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 67upx;
				height: 67upx;
				background: linear-gradient(to top right, #f99209 , #ff5004); 
				border-radius: 50%;
			}
			.purchaser-details-text{
				width: 600upx;
				font-size: 28upx;
				font-size: 28upx;
				line-height: 33upx;
				letter-spacing: 1upx;
				.purchaserinfo{	
					text{
						margin-left: 20upx;
						font-size: 24upx;
						color: #9a9a9a;
					}
				}
				.purchaser-site{
					padding-top: 10upx;
				}
			}
		}
		image{
			width: 40upx;
			height: 40upx;
		}
	}
}
</style>
