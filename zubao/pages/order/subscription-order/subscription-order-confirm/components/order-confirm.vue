<template>
	<view class="confirm-content">
		<view class="address-content">
		<view class="address">
		 <view class="address-top flex">
			<view>收货人：{{message.name}}</view>
			<view>{{message.phone}}</view> 
		 </view>
		 <view class="address-bottom">{{message.address}}</view>	 
		</view>	
			
		</view>
		<view class="order-content">
		  <view class="order">
			<view class="order-top">
			  订单消息	
			</view>
			<view class="product flex">
			 <view class="product-left">
				<image :src="imglist.img1"></image> 
			 </view>
			  <view class="product-right">
				<view class="black">chloe</view>
				<view class="graytext">drew海瑟小猪包</view>
				<view class="pricecolor">价格:13元/天</view>
			  </view>	 
			</view> 
			  <view class="choose">
			  				   <view class="choose-first flex">
			  					  <view class="">使用债权分抵扣</view>
			  					 <image :src="imglist.img2" v-if="!choosef" @tap="choosefir()"></image>
			  					 <image :src="imglist.img3" v-if="choosef" @tap="choosefir()"></image>
			  				   </view>
			  </view>
			  <view class="choose">
			  				   <view class="choose-first flex">
			  					  <view class="flex">
									  <view>是否出租</view>
									<view class="lease flex" @tap="golease()"><image :src="imglist.img4" class="questions"></image><text>出租业务条例</text></view>  
									</view>
			  					 <image :src="imglist.img2" v-if="!chooses" @tap="choosesen()"></image>
			  					 <image :src="imglist.img3" v-if="chooses" @tap="choosesen()"></image>
			  				   </view>
			  </view>
		  </view>
		</view>
		<view class="views"></view>
		<view class="order-button">
		 <view class="order-div flex">	
		 <view>总计：11111元</view>
	     <view class="button">立即支付</view>
		</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				choosef:true,
				chooses:false,
				message:{
					name:"我要上春晚",
					phone:12345678912,
					address:"刚搜的是肯定就看了时间都是看了多久了开始决定了速度进来我是来看的历史看到了看来是的是的是的是的是的看"
				},
				imglist:{
					img1:require("../../../../../static/order/subscription-order/1.jpg"),
					img2:require("../../../../../static/login/cirle.png"),
					img3:require("../../../../../static/login/ok.png"),
					img4:require("../../../../../static/order/subscription-order/questions.png")
				}
			}
		},
		methods:{
			choosefir(){
				this.choosef=!this.choosef;
			},
			choosesen(){
			 this.chooses=!this.chooses;	
			},
			golease(){
		    uni.navigateTo({
		    	url:"./lease"
		    })		
			}
		}
	}
</script>

<style lang="scss" scoped>
	.confirm-content{
		width:100%;
		background:#f7f7f7;
		font-size:28upx;
		&:before{
					   content:'';
					   display:table;
		}
		
		.flex{
			display:flex;
			align-items: center;;
		}
		.graytext{
		color:#b8b8b8;	
		}
	    .pricecolor{
		 color:#ed8291;
		margin-top:24upx;	 
		}		  
		.address-content{
		  width:100%;
		   background:#fff;
		    padding:28upx 0;
		   margin:20upx 0;
		   .address{
			  width:82%;
			  margin:0 auto;
			  .address-top{
				justify-content: space-between;  
			  }
			  .address-bottom{
				 margin-top:20upx; 
				 overflow: hidden;
				 height:36upx;
				 white-space:nowrap;
				 text-overflow:ellipsis 
			  } 
		   }
		}
		.order-content{
		  width:100%;
		 background:#fff;	  
		  .order{
		  margin:0 auto;  
		    width:94%;
			.order-top{
			  border-bottom:4upx solid #f5f5f5;
			  padding:26upx 0;	  
			}
			.product{
			  padding:6upx;	
			  margin:20upx 0;
			  background:#f7f7f7;
			  image{
				 width:156upx;
				 height:156upx;
				 margin-right:15upx; 
			  }
			 .product-right{
				align-self:flex-start;
			 }
			 .black{
				margin-top:5upx; 
			 }
					   
			}
		  }		
		}
		 .choose{
		   margin:0 auto;
		  .choose-first{
			 justify-content:space-between;
			 border-top:4upx solid #f5f5f5;
			 padding:24upx 0;
			 .lease{
				color:#b8b8b8;
				font-size:20upx; 
			 } 
			 .questions{
				width:24upx;
				 height:24upx;
				 position:relative;
				 right:-10upx;
			 }
			 image{
				width:50upx;
				height:50upx;
				margin-right:10upx; 
			 } 
		  } 		  
		 }	  
		
		.order-button{
	     position:fixed;
		 background:#fff;
		  border-top:2upx solid #f5f5f5;
		 left:0;
		 bottom:0;		  
		  width:100%;
			  .order-div{
			   width:88%;
			   margin:0 auto;
			  color:#ed8291;
			  font-size:40upx;
		      justify-content: space-between;
			  padding:28upx 0; 
			  .button{
				 color:#fff;
				 font-size:30upx;
				 text-align:center;
				 background:#ed8291;
				 padding:26upx 85upx;  
			  }			  
			  }
			  
		}
	}
</style>
