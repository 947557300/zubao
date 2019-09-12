<template>
	<view class="content">
		<view class="contop">
		  <view class="top">
			 <view class="green">介绍</view>
			   <view>目录</view> 
			    <view>评价</view> 
		  </view>
		</view>
		<view class="conname">
			<view class="name-top">从小白到产品经理(2019就业班)</view>
			<view class="name-bottom">
				<view class="bottom-left">
				<view class="xing">
					<image src="../../static/images/xingxing.png" v-for="index of xxcount" :key="index"></image>		
				</view>
				<view class="bottom-lefttext">
					<text class="pf">{{pf}}</text>
					<text>{{pepole}}人学过</text>
				</view>
				</view>
				<view class="graydiv">连载</view>
			</view>
		</view>
		<view class="conprice">
			<view class="price">
				<view class="pl">¥249.00</view>
				<view class="pr">
					<text class="prl">特价</text>
					<text class="prr">优惠仅剩下2天7小时</text>
				</view>
			</view>
			<view class="yprice">380.00</view>
			<view class="vip">
				<view class="vipleft">VIP会员价:<text class="vipleft-right">￥239.00</text></view>
				<view class="vipright">
				 <view class="kt">立即开通</view>	
				<image src="../../static/images/right2.png" class="right"></image>
				</view>
			</view>
		</view>
		<view class="conbottom">
		  <view class="bottom-left">
			 <view class="left-one">惠</view>
			  <view class="left-two">立减:</view>
			  <view class="left-three">￥&nbsp;50.00</view>
		  </view>
		  <view class="bottom-right">领取</view>
		</view>
	    <view class="glay"></view>
	</view>
</template>

<script>
	export default{
		 name:"introduction",
		 data(){
			 return{
				 pf:4.9,
				 pepole:1273,
				 xxcount:5,
			 }
		 }
	}
</script>

<style lang="scss" scoped>
	  .content{
		  width:100%;
		  background:#fff;
		  .contop{
			border-bottom:1px solid #e6eaf2;
			.top{
			margin:0 auto;
			width:75%;
			display:flex;
			justify-content:space-between;
			 view{
				 text-align: center;
				  padding:20upx 0;
				  font-size:34upx;
				  color:#666;
				  font-weight:400;
			 };
			 .green{
				 border-bottom:10upx solid #36b378;
				 color:#333;
			 }
			}
		    }
		   .conname{
			   margin: 0 auto;
				width:92%;
				padding:20upx 0;
			  border-bottom:1px solid #e6eaf2;
			  .name-top{
				  font-size:40upx;
				  font-weight:500upx;
				 color:#333740;	  
			  }
			  .name-bottom{
				  display:flex;
				  justify-content:space-between;
				  align-items:center;
				  .bottom-left{
					  display:flex;
					  margin-top:34upx;
					  align-items:center;
					 .xing{
						 margin-right:10upx;
						image{
						  width:36upx;
						  height:36upx;	  
						}
					 }
					  .bottom-lefttext{
						  font-size:28upx;
						  color:#999999;
						  .pf{
							margin-right:28upx;  
						  }
					  }
				  }
				  .graydiv{
					 padding:5upx 20upx;
					 background:#f2f4f7;
					 font-size:30upx;
					 margin-top:18upx; 
				  }
				  
			  }
			}
			.conprice{
				width:92%;
			    margin: 0 auto;
				padding:20upx 0upx;
				.price{
				display:flex;
				align-items:center;
				.pl{
					font-size:40upx;
					margin-right:20upx;
				}
				.pr{
				  display:flex;
				  border:1px solid  #ff4400;
				  font-size:24upx;
				  margin-top:5upx;
				  .prl{
					 background:#ff4400;
					  color:#fff;
					  padding:5upx 10upx;
					   }
				  .prr{
					 color:#ff4400;
					 padding:5upx 0;
					 }
				}
				
			}
			.yprice{
				color:#c2c5cc;
				font-size:30upx;
				margin:20upx 0;	
				 text-decoration: line-through;
			}
			.vip{
				display:flex;
				background:#ffefe9;
				padding:14upx 20upx;
				justify-content:space-between;
				align-items:center;
				.vipleft{
				 font-size:32upx;
				 .vipleft-right{
					color:#ff4400;
					font-size:29upx; 
				 }	 
				}
				.vipright{ 
                   display:flex;
				   align-items: center;
				   
					background:linear-gradient(to right,#ff323e,#fe6c43);
					color:#fff;
					font-size:28upx;
					height:50upx;
				    line-height:50upx;	
					width:200upx;
					border-radius:34upx;
					text-align:center;
					padding:8upx 0;
					.kt{
					 margin-left:36upx;	
					}
				  .right{
					  width:40upx;
					  height:40upx;
				  }	
				}
			}   
	  }
	  .conbottom{
	  			   display:flex;
	  			   width:97%;
	  			   margin-top: 20upx;
	  			   border-top:1px solid #e6eaf2;
	  				justify-content: space-between;
					font-size:30upx;
					padding:20upx 0;
					margin-left:3%;
					color:#ff4400;
					align-items:center;
	  			  .bottom-left{
	  				 display:flex;
	  				  .left-one{
	  					 color:#fff;
	  					  background:#ff4400;
	  					  text-align: center; 
						   width:44upx;
						   height:44upx;
						   line-height:40upx;
						   font-size:24upx;
	  				  }
	  				  .left-two{
	  					  margin:0 30upx;
	  				  }
	  			  }
				  .bottom-right{
					  margin-right:20upx;
					 border:1px solid #ff4400;
					 width:140upx;
					 text-align: center;
					 padding:10upx 0;
					 border-radius: 10upx;
				  }
	  }
	          .glay{
				  width:100%;
				  height:20upx;
				   background:#f2f4f7;
			  }
	  }
</style>
