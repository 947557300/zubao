<template name='details'>
	<view>
		<view class="details">
			<text>细节展示</text>
			<view class="img_box" v-for="(item,index) in img" :key='index'>
				<image :src="item.image" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'details',
		data() {
			return {
				img:[
					{image:require('@/static/goods/5.jpg')},
					{image:require('@/static/goods/6.jpg')},
					{image:require('@/static/goods/7.jpg')},
					{image:require('@/static/goods/8.jpg')},
					{image:require('@/static/goods/5.jpg')}
				]
			};
		}
	}
</script>

<style lang="scss">
	.details{
		width: 100%;
		margin-top: 18upx;
		background-color: #FFFFFF;
		padding:25upx 24upx;
		box-sizing: border-box;
		text{
			font-size: 32upx;
			color: #333333;
		}
		.img_box{
			width: 100%;
		}
	}

</style>
