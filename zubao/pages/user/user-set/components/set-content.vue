<template>
	<view class="content">
	 <view class="msg-content">
		<view class="msg-img flex">
		  <view>头像</view>
		  <image src="../../../../static/login/part5_picture2.png"></image>	  
		</view>
		 <view class="msg-name flex">
			<view class="graytext">昵称</view>
			<view class="name bold">{{list.wxname}}</view> 
		 </view>
		 <view class="flex">
		 			<view class="graytext">性别</view>
		 			<view class="grayer">{{list.sex}}</view> 
		 </view>
		 <view class="flex">
		 			<view class="graytext">微信号</view>
		 			<view class="grayer">{{list.wxnum}}</view> 
		 </view>
		 <view class="flex">
		 			<view class="graytext">手机号</view>
		 			<view class="grayer">{{list.phone}}</view> 
		 </view>
		 <view class="flex">
		 			<view class="graytext">认证状态</view>
		 			<view class="grayer">{{list.rzzt}}</view> 
		 </view>
		 <view v-if="list.rzzt">
		 <view class="flex">
		 			<view class="graytext">姓名</view>
		 			<view class="grayer">黄浩涛</view> 
		 </view>
		 <view class="flex">
		 			<view class="graytext">身份证号</view>
		 			<view class="grayer">4451111111111111111</view> 
		 </view>
		 </view>
		 <view class="gorz" @tap="gorz()" v-if="!list.rzzt">完成实名认证>></view>
	 </view>
	   <view class="outlogin">退出登录</view>
	</view>
</template>

<script>
	export default{
		props:{
			msglist:{
				type:Object,
				default:{}
			}
		},
		data(){
			return{

				list:this.msglist,
				
			
			}
		},
		created(){
			console.log(this.list)
		},
		methods:{
			gorz(){
			 uni.navigateTo({
			     url: '../user-authentication/user-authentication'
			 });
			},
			 
			       
			       
		}
	}
</script>

<style lang="scss" scoped>
	.content{
	   width:100%;
	   font-size:30upx;
	  .msg-content{
		  .flex{
			  display:flex;
			  justify-content:space-between;
			  align-items: center;
			  border-bottom:2upx solid #f2f2f2;
			   padding:34upx 30upx;
		  }
		  .bold{
			  font-weight: bold;
		  }
		  .graytext{
			  color:#4a4a4a;
		  }
		  .grayer{
			  color:#afafaf;
		  }
		.msg-img{
			 padding:20upx 30upx !important;
		  image{
			  width:140upx;
			  height:140upx;
			  border-radius: 50%;
		  }
		 }
		 .gorz{
			 text-align:center;
			 color:#ea838f;
			 margin-top:50upx;
		 }
		} 
	  
	  .outlogin{
		  width:86%;
		  position:fixed;
		  left:7%;
		  bottom:25upx;
		  color:#fff;
		  background:#ea838f;
		  text-align:center;
		  height:100upx;
		  line-height:100upx;
	  }
	  
	  } 
	   	   

</style>
