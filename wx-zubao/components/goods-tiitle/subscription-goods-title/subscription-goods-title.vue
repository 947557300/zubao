<template name="Title">
	<view class="content">
		<view class="name">
			<text class="name_text">GUCCI/古驰</text><text>单肩包</text>
		</view>
		<view class="title_bottom">
			<text class="money">¥80000</text>
			<view class="estimate">
				<text class="e_title">预估收益率</text>
				<text style="margin-left: 10upx;">1%</text>
			</view>
		</view>
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
			margin-bottom: 30upx;
			box-sizing: border-box;
			text{
				font-size:32upx ;
				colo:#333333;
				font-weight: bold;
			}
			.name_text{
				margin-right: 27upx;
				color: #ea986c;
				
			}
		}
		.title_bottom{
			display:flex;
			justify-content: space-between;
			.money{
				font-size: 35upx;
				color: #333333;
			}
			.estimate{
				font-size: 25upx;
				// border-radius:10upx ;
				background: linear-gradient(to right, #000000 , #666666);
				color: #FFFFFF;
				padding: 20upx;
			}
		}
		
		
	}

</style>
