<template>
	<view class="message">
		<view class="message-title">订单信息</view>
		<view class="message-detils">
			<view class="message-detils-item">
				<text class="detils-item-left">订单编号</text>
				<text class="detils-item-right">111111111111111111111111111</text>
			</view>
			<view class="message-detils-item">
				<text class="detils-item-left">支付方式</text>
				<text class="detils-item-right">鬼知道</text>
			</view>
			<view class="message-detils-item">
				<text class="detils-item-left">下单时间</text>
				<text class="detils-item-right">2019-1-1 13:25:11</text>
			</view>
			<view class="message-detils-item">
				<text class="detils-item-left">发货时间</text>
				<text class="detils-item-right">2019-1-1 18:00:45</text>
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
.message{
	padding:0 22upx 30upx 22upx;
	border-bottom:20upx #f2f2f2 solid;
	.message-title{
		width: 130upx;
		margin: 30upx 0;
		font-size: 28upx;
		line-height: 30upx;
		text-align: right;
		border-left:5upx #f75600 solid;
	}
	.message-detils{
		font-size: 24upx;
	}
	.message-detils-item{
		padding: 12upx 0 12upx 24upx;
		color: #5f5f5f;
		.detils-item-left{
			display: inline-block;
			width: 144upx;
		}
		.detils-item-right{
			margin-left: 70upx;
		}
	}
}
</style>
