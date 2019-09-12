<template>
	<view class="content">
		<view class="banner">
		 <swiper class="swiper-box" :autoplay="true" :indicator-dots="true" :interval="interval" :circular="circular"
		 :indicator-color="ic" indicator-active-color="blue">
			<swiper-item v-for="(item,index) of banner" :key="index">
				<image :src="item" class="banner-image"></image>
			</swiper-item>  
		 </swiper>	
		 <view class="scan" @tap="scanCode">
		 	<uni-icon type="scan"></uni-icon>
		 </view>
		</view>
		<!--caozuo-->
		<view class="list">
		 <view class="list-cell" v-for="(item,index) of listObj" :key="index">
		  <!--zuobian--> 
		  <view class="list-left">
			 <view class="list-name">
			  <view class="list-top">{{item.liText}}</view>
			  <view class="cz" v-if="item.hint">{{item.hint}}</view>	   
			 </view>
			  <view class="list-js">
				{{item.liEn}}
			  </view> 
		  </view>
		  <!--youbian-->
		   <view class="list-right">
			   	<image :src="item.imgurl" class="list-img" mode="aspectFit"></image>
		   </view>
		 </view>	
		</view>
	</view>
</template>

<script>
	import uniIcon from "../../components/uni-icon.vue"
	export default {
		components: {
			uniIcon
		},
		data() {
			return {
				banner: [
					"https://s2.luckincoffeecdn.com/luckywebrm/images/pimg/about/contact.png",
					"https://s2.luckincoffeecdn.com/luckywebrm/images/pimg/about/model.png",
					"https://s2.luckincoffeecdn.com/luckywebrm/images/index/cooperation/part5_picture2.png",
				],
				circular: true,
				interval: 2000,
				ic:"red",
				listObj: [
					{
						"liText": "现在下单",
						"liEn": "ORDER NOW",
						"imgurl": "../../static/coffee.png",
						"url": "/pages/menu/index"
					},
					{
						"liText": "咖啡钱包",
						"liEn": "COFFEE WALLET",
						"imgurl": "../../static/wallet.png",
						"hint": "充二赠一,充五赠五",
						"url": "/pages/mine/wallet/index"
					},
					{
						"liText": "送Ta咖啡",
						"liEn": "SEND COFFEE",
						"imgurl": "../../static/gift.png",
						"url": "/pages/home/presented"
					},
					{
						"liText": "企业账户",
						"liEn": "ENTERPRISE ACCOUNT",
						"imgurl": "../../static/business.png",
						"url": ""
					}
				]
				
			}
		},
		methods: {
			scanCode(){
			uni.scanCode({
				success:function(res){
				  this.result=res.result	
				},
				fail: function(){}
			})
			}
		}
	}
</script>

<style>
      .swiper-box{
		 height:421upx;
		  
	  }
	  .banner{position: relative;}
	  .banner-image{
		 width:100%; 
	  }
	  	.scan{position: absolute;top: 48upx;right: 30upx;width: 80upx;height: 80upx;color: #fff;background: rgba(0,0,0,0.6);line-height: 74upx;text-align: center;border-radius: 50%;padding-top: 10upx;box-sizing: border-box;}
	  .list{padding: 0 40upx;
	  background: #fff;}
	  .list-cell{
		border-top: 1upx solid #efefef;
		display:flex;
		align-content: center;
		padding:22upx 0 10upx 0;
		justify-content:space-between;
	  }
	  .list-name{
		  display:flex;
		 align-items:center;
		margin-bottom:10upx;	 
	  }
	  .list-top{
		  font-size:34upx;
	  }
	  .list-js{
		font-size: 16upx;
		 color: #5e5e5e
	  }
	  .cz{
		font-size: 16upx;color: #fff;background-color: #e06e11;padding: 0 4upx;border-radius: 3px;height:28upx;
	  }
	  .list-img{width: 48upx;height: 48upx;}
	 .list-right{
		 width: 76upx;height: 76upx;line-height:94upx;text-align: center;border-radius: 50%;border: 1px solid #c6baad;color: #784f2d;margin-right:50upx;
	 } 
</style>
