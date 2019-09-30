<template name="Title">
	<view class="content">
		<view class="name">
			<text class="name_text">GUCCI/古驰</text><text>单肩包</text>
		</view>
		<text class="day_money">15元/天</text>
		<text class="retailprice">零售价 ¥80000</text>
	</view>
</template>

<script>
	export default {
		name:'Title',
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.content{
		background-color: #FFFFFF;
		width:100%;
		box-sizing: border-box;
		padding:36upx 24upx 26upx 24upx;
		.name{
			width: 100%;
			margin-bottom: 10upx;
			box-sizing: border-box;
			text{
				font-size:32upx ;
				colo:#333333;
				font-weight: bold;
			}
			.name_text{
				margin-right: 27upx;
				
			}
		}
		.day_money{
			font-size: 35upx;
			color: #ea986c;
		}
		.retailprice{
			display: block;
			font-size: 23upx;
			margin-top: 20upx;
			color: #999999;
			font-family: Regular;
		}
		
		
	}

</style>
