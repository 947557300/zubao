<template>
	 <view class="purplecont">
		 <view class="baifen">
		  <view class="ninth-five">
		   <view class="clear"></view>	 
		     <view class="top">
			 <view class="title">从小白到产品经理</view>
			 <view class="name">就业班</view>
			 <image src="../../static/images/boshi.png" class="boshi"></image>
			 <view class="jb"></view>
		     </view>
			 <view class="middle">
			 <view class="goldlist" v-for="(item,index) of goldlist" :key="index">
			  <image class="gold" :src="item.src"></image>
		      <view>{{item.jigou}}</view>
			  <view>{{item.zy}}</view>		 
			 </view>
			 </view>
			<view class="bottom">
			  <view class="bottom-left">
				<view class="jzlist">
				 <image class="jz" src="../../static/images/timg.jpg"></image>
				 <view class="pj">年度精品课程</view>	 
				</view>
				<view class="jzlist">
				 <image class="jz" src="../../static/images/timg.jpg"></image>
				 <view class="pj">年度精品课程</view>	 
				</view>
			  </view>
			  <view class="bottom-right">
				 <image src="../../static/images/11103.jpg"></image>
				 <text>2018金云奖</text> 
			  </view>	  
			</view>	   
		  </view>
		 </view>	 
	 </view>
</template>

<script>
	export default{
		name:"purple",
		data(){
			return{
			  goldlist:[
				 {src:"../../static/images/111_04.jpg",
				  jigou:"本机构好评率No 1",
				  zy:"(云课堂产品专业)"	 
				 },
				 {src:"../../static/images/111_04.jpg",
				  jigou:"本机构学习人数No 1",
				  zy:"(云课堂产品专业)"	 
				 }, 
				 {src:"../../static/images/111_04.jpg",
				  jigou:"本机构好评人数No 1",
				  zy:"(云课堂产品专业)"	 
				 }, 
			  ]	
			}
		}
	}
</script>

<style lang="scss" scoped>
	.purplecont{
	  width:100%;
		background:#fff;
		.clear{
				   content:"";
				   display:table;
		}
		 .baifen{
		   width:92%;
		   margin:0 auto;
		   background:#5e07ae;
		  .ninth-five{
			 width:95%;
			 margin:0 auto;
			 height:685upx; 
		   .top{
			 margin-top:82upx;
			 position:relative;
			  color:#fff;
			 .title{
			  font-size:50upx;
			  margin:55upx 0 5upx 100upx;
			  font-weight:bold;
			  width:62%; 
			 
			 }
			 .name{
				background:#af2722;
				width:110upx;
				height:50upx;
				text-align:center;
			    line-height:50upx;	
				border-radius:25upx;
				 position:absolute;
				 top:-27upx;
				 right:50upx;
				font-size:26upx; 
			 }  
			 .boshi{
				width:45upx;
				height:48upx;
				position:absolute;
				left:304upx;
				top:-17upx; 
			 }
			 .jb{
			  width:62%;
			  height:3upx;
			  margin-left:100upx;		 
			  background:linear-gradient( to right,#6e15ad,#da838b,#6e15ad)	 
			 }
		   }
		   .middle{
			 background:#6226c3;
			 display:flex;
			 align-items:center;
			 justify-content: space-around;
			 color:#f9d133;
			 width:95%;
			 margin:50upx auto;  
			 padding:50upx 0 20upx 0;
			 text-align:center;
			 font-size:17upx; 
			   .goldlist{
				 width:30%;
				 .gold{
				   width:60upx;
				   height:60upx;
				  margin-bottom:20upx;
				 			 
				 }  
			   }
		   }
		   .bottom{
			 display:flex;
			 width:95%;
			 margin:50upx auto 0;
			 justify-content:space-between;
			 .bottom-left{
			  display:flex;
		      width:81%;
			  justify-content: space-between;
			  margin-top:19upx;
			  .jzlist{
				position:relative;
				.jz{
				  width:235upx;
				  height:176upx;		
				}
				 .pj{
				  position:absolute;
				  left:0;
				  top:0;
				  width:110upx;
				  height:36upx;
				   background:#b12822;
				  color:#fff;
				  text-align:center;
				  line-height:36upx;
				  font-size:15upx;
				 z-index:1;										  
				}   
			  }				 
			 }
			  .bottom-right{
				 display:flex;
				 flex-direction:column;
				 align-items:center;
				 image{
				 width:84upx;
				 height:175upx;   
				 }
				 text{
					color:#f9d133;
					font-size:15upx;
					margin-top:5upx; 
				 } 
			  }
		   }
		   }
		   }
	}
</style>
