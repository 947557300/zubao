<template>
	<view class="order-details-item">
		<view class="order-details-top">
			<view class="shop-name">
				<text>铁汉优品汇</text>
				<image src="/static/user/user-order/arrow.png"></image>
			</view>
		</view>
		<view class="order-details-middle">
			<image src="/static/user/user-order/1.jpg"></image>
			<view class="middle-product">
				<view class="product-header">
					<view class="product-name">俄罗斯进口盒装速溶土豆泥份发挖掘大王的噶尔公司发哈二零功能梳理两个绿色回过神来</view>
					<view class="product-price">
						<view>¥52.00</view>
						<view class="product-sum">x1</view>
					</view>
				</view>
				<view class="product-details">
					<text>混合味道10盒</text>
				</view>
				<view class="tag">
					<view>公益捐款0.02元</view>
					<view>破损包退</view>
					<view>5天发货</view>
				</view>
			</view>
		</view>
		<view class="order-details-bottom">
			<view class="remove-oreder">退款</view>
		</view>
		<view class="prices-content">
			<text>订单总价 (含运费)</text>
			<view class="total-prices">
				<text>¥20.<text class="decimal-point">00</text></text>
				<image src="/static/order/arrow.png" @click="showAll()" :class="isShow?'.rotate':''"></image>
			</view>
		</view>
		<view class="prices-details" v-if="isShow">
			<view class="prices-details-item"><text>租金</text><text class="item-price">¥00.30</text></view>
			<view class="prices-details-item"><text>快递费</text><text class="item-price">¥00.30</text></view>
			<view class="prices-details-item"><text>免赔服务费</text><text class="item-price">¥00.30</text></view>
			<view class="prices-details-item"><text>优惠金额</text><text class="item-price">¥00.30</text></view>
			<view class="prices-details-item"><text>押金</text><text class="item-price">¥00.30</text></view>
			<view class="prices-details-item"><text>免押额度</text><text class="item-price">¥00.30</text></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isShow:false
		}
	},
	methods: {
		showAll(){
			this.isShow=!this.isShow
		}
	}
}
</script>

<style lang="scss" scoped>
.order-details-item{
	padding:0 22upx;
	background-color: #FFFFFF;
	border-bottom:20upx #f2f2f2 solid;
	border-radius: 30upx;
	.order-details-top{
		.shop-name {
			padding-top: 32upx;
			display: flex;
			align-items: center;
			font-size: 28upx;
		}
		.shop-name image{
			padding-left: 20upx;
			display: block;
			width: 38upx;
			height: 38upx;
		}
		.deal-state{
			font-size: 26upx;
			color: #ff661a;
		}
	}
	.order-details-middle{
		padding-top: 30upx;
		display:flex;
		image{
			display: block;
			width: 180upx;
			height: 180upx;
		}
		.middle-product{
			margin-left: 26upx;
			position: relative;
			width: 500upx;
			font-size: 25upx;
			.product-header{
				display: flex;
				justify-content: space-between;
				.product-name{
					width: 410upx;
					height: 64upx; 
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
				.product-price{
					text-align: right;
					.product-sum{
						color: #a1a1a1;
					}		
				}
			}
			.product-details{
				margin-top: 6upx;
				display: flex;
				justify-content: space-between;
				font-size: 23upx;
				color: #a1a1a1;
			}
			.tag{
				margin-top: 6upx;
				display: flex;
				font-size: 19upx;
				view{
					margin-right: 10upx;
					padding: 4upx 10upx;
					color: #d9683c;
					background-color: #fbf4ee;
				}
			}
		}
	}
	.order-details-bottom{
		display: flex;
		justify-content: flex-end;
		.remove-oreder{
			padding: 0 24upx;
			width: 107upx;
			height: 57upx;
			font-size: 26upx;
			text-align: center;
			line-height: 57upx;
			color: #565656;
			border: 2upx #999999 solid;
			border-radius: 50upx;
		}
	}
	.prices-content{
		padding: 30upx 0;
		display: flex;
		justify-content: space-between;
		font-size: 28upx;
		color: #5f5f5f;
		.total-prices{
			display: flex;
			align-items: center;
			color: #ff7a32;
			.decimal-point{
				font-size: 24upx;
			}
			image{
				margin-left: 20upx;
				display: block;
				width: 38upx;
				height: 38upx;
			}
			.rotate{
				transform: rotate(180deg);
			}
		}
	}
	.prices-details{
		padding-bottom:20upx;
		.prices-details-item{
			padding: 5upx 0;
			display: flex;
			justify-content: space-between;
			font-size: 24upx;
			color: #5f5f5f;
			.item-price{
				margin-right: 58upx;
			}
		}
	}
}
</style>
