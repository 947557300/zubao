<template>
	<view class="content">
	  <view class="cont-l">
		  <image src="../../static/images/left.png"></image>
	  </view>
	  <view class="cont-r">
		  <image src="../../static/images/xiazai.png" class="small"></image>
		  <image src="../../static/images/fenx.png" ></image>
	  </view>
	</view>
</template>

<script>
	 export default{
		 name:"bar",
		 data(){
			 return{
				 
			 }
		 }
	 }
</script>

<style lang="scss" scoped>
	 .content{
		 width:100%;
		 background:#fff;
	    display:flex;
		justify-content: space-between;
		align-items:center;
		border-bottom:1px solid #e6eaf2;
		.cont-l,.cont-r{
			padding:15upx 10upx 15upx 15upx; 
		 image{
			width:60upx;
			 height:60upx;
			 color:black;
		 }
		}
		.cont-r{
			display:flex;
			align-items: center;
			padding-right:25upx;
		}
		.small{
			   width:54upx !important;
			   height:54upx !important;
				margin-right:56upx;
			 }
		
	 }
</style>
