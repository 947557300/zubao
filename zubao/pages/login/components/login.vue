<template>
	<view class="login-content">
	   <view class="layout">
		 <view class="login-title">
		  <view class="login-ftitle">{{cont.ftitle}}</view>
		  <view class="login-stitle">{{cont.stitle}}</view>
		 </view>
		<!-- <form @submit="formSubmit">-->
		  <view class="login-input">
			<input type="text" class="input-user" placeholder="请输入手机号" v-model="phone">
			<input type="number" class="input-pwd"  placeholder="请输入验证密码" v-model="yzm">
			<view class="yzm" @tap="yzmcheck()">获取验证码</view>
			
		  </view> 
		  
			<button class="push" @tap="submit()">{{cont.btnname}}</button>
			<view class="agreen">
			<view class="imagetext" @tap="changgreen()">	
			<image src="../../../static/login/cirle.png" v-if="!agreen"></image>
			<image src="../../../static/login/ok.png" v-if="agreen"></image>
			已阅读并同意
			</view>
			 <text class="xieyi">《隐私协议》</text>
			 <text class="xieyi">《用户协议》</text>	 
			</view>
			<!--</form>-->
			 <view class="wxlogin" @tap="changlogin()" v-if="cont.wxlogin">
				<image src="../../../static/login/wx.png"></image>
				<view class="wx">微信登录</view>  
			 </view>
			  
		  </view>
	  	
	 <!--mask-->
	  <view class="lg-informationdiv" v-show="showlg">
		 <view class="lg-information">
		   <view class="infor-background">
			 <view class="infor-content">
			  <view class="ictop">
				<image src="../../../static/login/part5_picture2.png"></image>
				<text class="name">租包</text>
				 <text>申请</text> 
			  </view>
			  <view class="getinfo">获取你的昵称、头像、地区及性别 </view>	 
			  <view class="userinfo">
				<view class="user">
				  <view class="user-left">
					 <image class="user-img" :src="avatarUrl"></image>
					  <view class="myself">
						 <text>微信个人信息</text>
						 <view class="user-name">{{nickNames}}</view> 
					  </view>
				  </view>
				   <view class="user-right">
					  <image src="../../../static/login/true.png"></image> 
				   </view>	  
				</view>  
			  </view>
				<view class="btnlist">
					<view class="no" @tap="yclogin()">取消</view>
				    <view class="yes" @tap="phonebd()">允许</view>	
				</view>
			 </view>  
		   </view>	 
		 </view> 
	  </view>
	</view>
</template>

<script>
	export default {
		props:{
			content:{
				type:Object,
			
			}
		},
		data() {
			return {
				cont:"",
			    agreen:false,
				showlg:false,
				nickNames:"",
				avatarUrl:"",
				color:"#08c05f",
				phone:"",
				yzm:"",
			}
		},
		mounted(){
			this.cont=this.$props.content;
		},
		methods:{
		  changgreen(){
			  this.agreen=!this.agreen;
		  },
		  changlogin(){
			  let that=this;
			 that.showlg=true;
			  uni.login({
			    provider: 'weixin',
			    success: function(loginRes) {
			      console.log(loginRes);
			      // 获取用户信息
			      uni.getUserInfo({
			        provider: 'weixin',
			        success: function (infoRes) {
                      that._data.nickNames = infoRes.userInfo.nickName;  	 		 
					  that._data.avatarUrl= require(infoRes.userInfo.avatarUrl);
			        }
			      });
			    }
			  });
		  },
		  yclogin(){
			 this.showlg=false; 
		  },
		  submit(){
			 if(this.phone==""){
				 uni.showToast({
				     title: '请输入电话号码',
				     duration: 1000,
				 	 icon:"none"
				 });
				 return  false;
			 }
			  if(this.yzm==""){
				  uni.showToast({
				      title: '请输入验证码',
				  	  duration: 1000,
				  	  icon:"none",
				 
				  });
				   return false;	 
			  }
			  if(!this.agreen){
				  uni.showToast({
				      title: '请阅读并同意协议',
				  	  duration: 1000,
				  	  icon:"none"
				  });
				 return false; 
			  };
			  
			  
			  
		  },
		  yzmcheck(){
			   var phonecheck=/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
			   if(!phonecheck.test(this.phone)){
				   uni.showToast({
				       title: '请输入正确的电话号码',
				   					  duration: 1000,
				   					  icon:"none"
				   });
			   }
		  },
		  phonebd(){
			  this.showlg=false;
			  uni.navigateTo({
			      url: './phone-check'
			  });
		  }
		 

		}
	}
</script>

<style lang="scss" scoped>
	   .login-content{
		   background:#fff;
		   width:100%;
		   font-size:35upx; 
		 &:before{
			 display:table;
			 content:'';
		 }
		  .layout{
			width:88%;
			margin:60upx auto 0;
			 .login-title{
				.login-ftitle{
				  font-size:48upx;
					  
				}
				.login-stitle{
				  color:#9b9b9b;
				  margin-top:36upx;	
				  font-size:28upx;	
				}
			 }
			 .login-input{
			   margin-top:72upx;
			   position:relative; 
			   .input-user,.input-pwd{
				  height:112upx;
				  font-size:32upx;
				  border-bottom:4upx solid #f2f2f2;
				   
			   }
			   .yzm{
				  position:absolute;
				  bottom:14upx;
				  right:0;
				  font-size:32upx;
				  padding:20upx 0;
				  color:#494949; 
				  z-index:100;
				   
			   }
			   		   
			 }
			  .push{
				 width:98%;
				 margin:50upx auto 52upx;
				 color:#fff;
				 background:#eb858e;
				 height:100upx;
				 text-align:center;
				 line-height:100upx;
				 font-size:28upx; 
			  }
			  .agreen{
				 display:flex;
				 align-items:center;
				 font-size:24upx; 
				 color:#494949; 
				 image{
				  width:30upx;
				  height:30upx;
				  margin-right:5upx;		 
				 }
				 .imagetext{
					display:flex;
					align-items: center; 
				 }
				 
				 .xieyi{
				color:#eb858e;
			    font-size:22upx;
						 
				 } 
			  }
			  .wxlogin{
				 display:flex;
				 flex-direction: column;
				 align-items: center; 
				 color:#9b9b9b;
				 font-size:28upx;
				 margin:245upx auto 0;		 
				 image{
					width:60upx;
				    height:60upx;	
				 }
				 .wx{
					margin-top:20upx; 
				 } 
			  }
		  }
			
		.lg-information{
		  position:fixed;
		  top:0;
		  left:0;
		  right:0;
		  bottom:0;
		  width:100%;
		  background:rgba(0,0,0,.3);
		  z-index:999;
		  .infor-background{
			 position:fixed;
			 width:100%;
			 height:60%;
			 background:#fff;
			 bottom:0;
			 left:0;
			 &:before{
			 			 display:table;
			 			 content:'';
			 }
			.infor-content{
			  width:88%;
			  margin:50upx auto 0;
			 .ictop{
			   display:flex;
			   align-items:center;
			    font-size:35upx; 
				image{
				  width:62upx;
				  height:62upx;
				  border-radius:50%;
				  }
				  .name{
					 font-weight:bold;
					 font-size:40upx;
					 margin:0 30upx 0 20upx; 
				  }		
				    
			 }
			  .getinfo{
			  		    margin:50upx 0;
			  			font-size:46upx;
			  			font-weight:bold; 
			  }
			  .userinfo{
				border-top:3upx solid #f2f2f2;
				border-bottom:3upx solid #f2f2f2;
				.user{
				  display:flex;
				  align-items:center;
				  justify-content: space-between;
				  padding:20upx 0;
				  .user-left{
				   display:flex;
				   align-items:center;
                   .user-img{
					  width:100upx;
					  height:100upx;
					  margin-right:35upx; 
				   }
				   .myself{
					  font-size:36upx;
					  .user-name{
						 color:#b5b5b5;
						 font-size:30upx;
						 margin-top:10upx;
						  
					  } 
				   }		   
				  }
				  .user-right{
					 width:50upx;
					 height:50upx;
					
	                 image{
						width:50upx;
						height:40upx; 
					 }
				  }
				  }
				  }
				  .btnlist{
				     display:flex;
					 justify-content:space-between;
					 margin-top:110upx;
					 
					 view{
					  width:48%;
					  font-size:40upx;
					  height:90upx;
					  text-align:center;
					  line-height:90upx;
					 border-radius:12upx;				   
					 }
					 .no{
						background:#ededed;
						font-weight:bold;	
					 }
					  .yes{
						  background:#08c05f;
						  color:#fff;
					  }
					   
				  } 
				  			
				  
			     
			  		
			} 
			 
			  
		  } 
		}		
	   }
	
</style>
