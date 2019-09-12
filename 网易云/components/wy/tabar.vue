<template>
	<view class="content">
	  <view class="tarlist">
		  <view class="tar" v-for="(item,index) of list" :key="index" :class="index==moreindex?'moreleft':''">
			<view><image class="tarimg" :src="item.src"></image></view>
			 <view class="tartitle">{{item.title}}</view>
		  </view>
		  <view class="last-tar">
			  +&nbsp;加入学习
		  </view>
		  
	  </view>	
	</view>
</template>

<script>
	export default{
		nam:"tabars",
		data(){
			return{
				moreindex:0,
				list:[
					{
					  src:"../../static/images/zixun.png",
					  title:"咨询",
					},
					{
					  src:"../../static/images/gouwuche.png",
					  title:"购物车",
					},
					{
					  src:"../../static/images/xiangxue.png",
					  title:"想学",
					},
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		width:100%;
		position:fixed;
		bottom:0;
		height:125upx;
		border-top:1px solid #e6eaf2;
		background:#fff;
		overflow:hidden;
		z-index:999;
		.tarlist{
		display:flex;
		align-items:center;
		margin-top:16upx;
		.moreleft{
			margin-left:45upx !important;
		}
		  .tar{
			 display:flex;
			  flex-direction:column;
			  align-items:center;
			  margin:0 30upx;
			  
			  .tarimg{
				  width:50upx;
				  height:50upx;
			  }
			  .tartitle{
				  font-size:28upx;
			  }
			  
		  }
		  .last-tar{
			  color:#fff;
			  background:#ff632a;
			  text-align: center;
			  height:96upx;
			  width:352upx;
			  font-size:34upx;
			  border-radius:50upx;
			  line-height:96upx;
		  }
			  
		}
		
	}
</style>
