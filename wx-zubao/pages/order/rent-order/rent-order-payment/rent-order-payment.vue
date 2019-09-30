<template>
	<view>
		<view class="payment-reminders"><icon type="success" size="26"/>订单支付成功</view>
		<view class="payment-information">
			<view class="payment-information-title">你的支付信息</view>
			<view class="payment-information-details">
				<view class="details-item">
					<view>付款金额</view>
					<text>:</text>
					<view class="price">¥0.00</view>
				</view>
				<view class="details-item"> 
					<view>订单编号</view>
					<text>:</text>
					<view>E20150328095537609524</view>
				</view>
				<view class="details-item">
					<view>支付方式</view>
					<text>:</text>
					<view>赠品0元付款</view>
				</view>
			</view>
		</view>
		<view class="view-order">查看订单详细</view>
		<view></view>
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
<style>
	page {
		background-color:#f9f9f9;
	}
</style>
<style lang="scss" scoped>
.payment-reminders{
	padding: 38upx 0;
	display: flex;
	align-items: center;
	justify-content: center;
	border-bottom: 1upx #eeeeee solid;
	icon{
		padding-right: 19upx;
	}
}
.payment-information{
	background-color: #FFFFFF;
	.payment-information-title{
		margin-left: 20upx;
		padding: 24upx 0;
		font-size: 27upx;
		border-bottom: 1upx #f7f7f7 solid;
	}
	.payment-information-details{
		margin-left: 20upx;
		padding: 19upx 0;
		font-size: 25upx;
		.details-item{
			padding: 7upx 0;
			display: flex;
			align-items: center;
			text{
				padding:0 32upx 0 11upx;
			}
			.price{
				color: #40cf10;
			}
		}
	}
}
.view-order{
	margin: 63upx auto 0 auto;
	width: 709upx;
	height: 85upx;
	color:#a6a6a6;
	font-size:28upx;
	text-align: center;
	line-height: 85upx;
	background-color: #ffffff;
	border-radius: 20upx;
}
</style>
