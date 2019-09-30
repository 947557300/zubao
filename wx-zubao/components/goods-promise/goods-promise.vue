<template name='promise'>
	<view>
		<view class="promise">
			<ul class='content'>
				<li>100%正品</li>
				<li>|</li>
				<li>全程顺丰</li>
				<li>|</li>
				<li>医用除菌</li>
				<li>|</li>
				<li>免赔无忧</li>
				<li>|</li>
				<li>押金速退</li>
			</ul>
		</view>
	</view>
</template>

<script>
	export default {
		name:'promise',
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.promise{
		padding: 24upx;
		background: linear-gradient(to right, #ea986c , #ffbe9b);
		.content{
			background: linear-gradient(to right, #ea986c , #ffbe9b);
			list-style: none;
			display: flex;
			justify-content:space-between;
			padding-inline-start:0px;
			li{
				font-size: 25upx;
				color: #FFFFFF;
			}
		}
	}

</style>
