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
				<image src="../../../../static/order/subscription-order/1.jpg"></image> 
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
			  					 <image src="../../../../static/login/cirle.png" v-if="!choosef" @tap="choosefir()"></image>
			  					 <image src="../../../../static/login/ok.png" v-if="choosef" @tap="choosefir()"></image>
			  				   </view>
			  </view>
			  <view class="choose">
			  				   <view class="choose-first flex">
			  					  <view class="">是否出租  <image src="../../../../static/order/subscription-order/questions.png" class="questions"></image></view>
			  					 <image src="../../../../static/login/cirle.png" v-if="!chooses" @tap="choosesen()"></image>
			  					 <image src="../../../../static/login/ok.png" v-if="chooses" @tap="choosesen()"></image>
			  				   </view>
			  </view>
		  </view>
		</view>
		<view class="order-button">
		 <view class="order-div flex">	
		 <view>总计:11111元</view>
	     <view class="button">立即支付</view>
		</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				address:true,
				choosef:true,
				chooses:false,
				message:{
					name:"我要上春晚",
					phone:12345678912,
					address:"刚搜的是肯定就看了时间都是看了多久了开始决定了速度进来我是来看的历史看到了看来是的是的是的是的是的看"
				},
				imglist:{
					img1:"../../../../static/order/subscription-order/address.png"
				}
			}
		},
		methods:{
			choosefir(){
				this.choosef=!this.choosef;
			},
			choosesen(){
			 this.chooses=!this.chooses;	
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
			 .questions{
				width:30upx;
				 height:30upx;
				 position:relative;
				 left:7upx;
				 top:9upx; 
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
		 background:#f5f5f5;
		 left:0;
		 bottom:0;		  
		  width:100%;
		  
			  .order-div{
			   width:92%;
			   margin:0 auto;
			  color:#ed8291;
			  font-size:44upx;
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
