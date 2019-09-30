<template name='mywish'>
	<view>
		<view class="text_box">
			<view class="text">
				<text>您的心愿单空空如也~</text>
				<text>快去许愿吧~</text>
			</view>
			<button type="default" @tap='buttonClick(index, item)'>去许愿</button>
		</view>
	</view>
</template>

<script>
	export default {
		name:'mywish',
		data() {
			return {
				
			};
		},
		methods: {
			buttonClick(index, item) {
				if (uni.report) {
					uni.report(item.text, item.text)
				}
				this.$emit('buttonClick', {
					index,
					content: item
				})
			}
		}
	}
</script>

<style lang="scss">
	.text_box{
		padding: 60upx;
		.text{
			text-align:center;
			text{
				display: block;
				font-size: 30upx;
				color: #999999;
				margin-bottom: 30upx;
			}
		}
		button{
			width: 200upx;
			height: 80upx;
			line-height: 80upx;
			text-align: center;
			margin: 0 auto;
			background:none;
			box-sizing: border-box;
			color:#ea986c;
			font-size: 28upx;
		}
		button:after{
			border:4upx solid #ea986c;
			border-radius: 80upx;
		}
	}

</style>
