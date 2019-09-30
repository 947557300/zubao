<template name="myvideo">
	<view>
		<view class="uni-padding-wrap uni-common-mt">
		    <view>
		        <video class="myVideo" src="https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4"
		            @error="videoErrorCallback" :enable-danmu='false' :danmu-btn='false' :show-center-play-btn='true' objectFit="contain"></video>
		    </view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'myvideo',
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.myVideo{
		width: 750upx;
		height: 750upx;
	}

</style>
