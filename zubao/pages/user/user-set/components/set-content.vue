<template>
	<view class="content">
	 <view class="msg-content">
		<view class="msg-img flex" @tap="changeimg()">
		  <view>头像</view>
		  <image :src="userimg"></image>	  
		</view>
		 <view class="msg-name flex" @tap="changnameshow()">
			<view class="graytext">昵称</view>
			<view class="name bold">{{list.wxname}}</view> 
		 </view>
		 <view class="flex" @tap="changsexshow()">
		 			<view class="graytext">性别</view>
		 			<view class="grayer">{{list.sex}}</view> 
		 </view>
		 <view class="flex" @tap="changnumshow()">
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
		 <view v-if="msglist.rzzt">
		 <view class="flex">
		 			<view class="graytext">姓名</view>
		 			<view class="grayer">{{list.name}}</view> 
		 </view>
		 <view class="flex">
		 			<view class="graytext">身份证号</view>
		 			<view class="grayer">{{list.sfz}}</view> 
		 </view>
		 </view>
		 <view class="gorz" @tap="gorz()" v-if="!msglist.rzzt">完成实名认证>></view>
	 </view>
	   <view class="outlogin">退出登录</view>
	  <view class="namecontent fixed" v-if="showname"><!--checkname-->
	    <view class="namebox fiexd-box">
		  <view class="name-top">	
	  	  <view class="name-title bold">修改昵称</view>
		  <input type="text" placeholder="请修改昵称" class="name-input" v-model="checkname">
		  </view>
		  <view class="name-bottom">
			 <view class="no" @tap="changnameno()">取消</view>
			 <view class="yes" @tap="changnameyes()">确定</view>
		  </view>
	    </view>	
	  </view>
	  <view class="checkcontent fixed" v-if="showsex"><!--checksex-->
		  <view class="sexbox fiexd-box">
			 <view class="sex-top">
				 <view class="sex-no graytext" @tap="changsexno()">取消</view>
				 <view class="sex-yes graytext" @tap="changsexyes()">确定</view>
			 </view>
			  <view class="sex-bottom">
				 <radio-group @change="radioChange()">
				 <label class="radio"><radio color="#ea838f" style="transform:scale(0.7)" value="1" :checked="list.sex"/>男</label>
				 <label class="radio"><radio color="#ea838f" style="transform:scale(0.7)" value="0" :checked="!list.sex"/>女</label>
				 
				<!-- <label class="radio"><radio color="#ea838f" style="transform:scale(0.7)" :value="item.value" v-for="(item,index) of sexlist" :key="item.value"/>{{item.name}}</label>-->
				 </radio-group>
			  </view>
		  </view>
	  </view>
	  <view class="numcontent fixed" v-if="shownum"><!--wxnum-->
		  <view class="numbox fiexd-box">
			  <view class="title bold">提示</view>
			  <view class="ftitle grayer">是否解綁微信</view>
			  <view class="changbox">
				  <view class="no bold" @tap="changnumno()">否</view>
				  <view class="yes bold" @tap="changnumyes()">是</view>
			  </view>
		  </view>
	  </view>
	  
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
				userimg:"../../../../static/login/part5_picture2.png",
				showname:false,
				showsex:false,
				shownum:true,
				checkname:"",
				sexlist:[
					{
					value:"1",
					name:"男"
				    },
					{
					value:"0",
					name:"女"
					},
				]
			
			}
		},
		created(){
		  this.list.phone=this.hidden(this.list.phone,3,4);
		  this.list.sfz=this.hidden(this.list.sfz,4,4);
		  this.hiddenrz();
		  this.hiddensex();
		},
		methods:{
			gorz(){
			 uni.navigateTo({
			     url: '../user-authentication/user-authentication'
			 });
			},
			hidden(str,frontLen,endLen) { 
											var start='';
											var str1=str.toString();
											for(var i = 0;i<frontLen;i++) {
												start+=str1[i];
											}
											var len = str1.length-frontLen-endLen;
											 var xing = '';
											 for (var i=0;i<len;i++) {
											 xing+='*';
							                  }
											  var ends=frontLen+len;
											  var end='';
											  for(var i=ends;i<str1.length;i++) {
												 end+=str1[i];
											  }
											return start+xing+end;	
									   },
			hiddenrz(){
				var rzzt=this.list.rzzt;
				if(rzzt==true){
					rzzt="实名认证";
				}else{
					rzzt="未认证";
				};
				this.list.rzzt=rzzt;
			},
			hiddensex(){
				var sex=this.list.sex;
				if(sex==1){
					sex="男"
				}else{
					sex="女"
				};
				this.list.sex=sex;
			},
			changeimg(){
				var that=this;
				uni.chooseImage({
					count:1,
					sizeType:"compressed",
					success:function(res){
						that.userimg=res.tempFilePaths;
					}
				})
			},
			changnameshow(){
				this.showname=true;
			},
		    changnameno(){
				this.showname=false;
			},
		    changnameyes(){
				this.showname=false;
				this.list.wxname=this.checkname;
			},
			changnumshow(){
				this.shownum=true;
			},
			changnumno(){
				this.shownum=false;
			},
			changnumyes(){
				this.shownum=false;
				this.list.wxnum="未定义";
				
			},
		   	changsexshow(){
				this.showsex=true;
			},
			changsexno(){
				this.showsex=false;
			},
		    changsexyes(){
				this.showsex=false;
			},
			radioChange(e){
			 console.log(e.target.value);
			}
			   
		}
	}
</script>

<style lang="scss" scoped>
	.content{
	   width:100%;
	   font-size:30upx;
	   .bold{
	   			  font-weight: bold;
	   }
	   .graytext{
	   			  color:#4a4a4a;
	   }
	   .grayer{
	   			  color:#afafaf;
	   }
	  .msg-content{
		  .flex{
			  display:flex;
			  justify-content:space-between;
			  align-items: center;
			  border-bottom:2upx solid #f2f2f2;
			   padding:34upx 30upx;
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
	  .fixed{
		  width:100%;
		  position:fixed;
		  left:0;
		  top:0;
		  right:0;
		  bottom:0;
		  background:rgba(0,0,0,.3);
		  z-index:998;
	  }
	  .fiexd-box{
		  position:fixed;
		  background:#fff;
		  z-index:999;
	  }
	  .namecontent{
		 .namebox{
		
			width:86%;
			height:31%;
			left:7%;
			top:35%;
			font-size:36upx;
			color:#afafaf;
		   .name-top{
			 width:100%;
			 border-bottom:2upx solid #f2f2f2;
			 text-align:center;
			 .name-title{
				margin:40upx 0;
			    color:black;	
			 }
			 .name-input{
			  border:4upx solid #ea838f;
			  width:80%;
			  height:66upx;
			 text-align:left;
			 padding-left:10upx;
			  margin:0 auto;
			  font-size:30upx;
			  margin-bottom:62upx;		   
			 }
		   }
		 .name-bottom{
			 display:flex;
			 justify-content:space-around;
			 align-items:center;
			 padding:34upx 0;
			 view{
				width:210upx;
				height:64upx;
				text-align:center;
				line-height:64upx;
				font-size:30upx;
				
			 }
			 .no{
				border:2upx solid #9d9d9d;
			 }
			 .yes{
				background:#ea838f;
				color:#fff;
			 }
		 }	
			
		 }
	  }
	   .sexbox{
		  bottom:0;
		  left:0;
		  width:100%;
		  height:25%;
		  .sex-top{
			border-bottom:2upx solid #f2f2f2;
			display:flex;
			justify-content: space-between;
			width:90%;
			margin:50upx auto;
		   padding-bottom:26upx;		
	   }
	   .sex-bottom{
		   margin-top:70upx;
		   radio-group{
			 display:flex;
			 justify-content:space-around;
			 align-items:center;
		   }
	   }
	  }
	   .numbox{
		 width:86%;
		 height:27%;
		 left:7%;
		 top:36.5%;
		 border-radius:20upx;
		 text-align:center;
		 font-size:34upx;
		 overflow:hidden;
		  .title{
			margin:66upx 0 34upx;  
		  }
		  .ftitle{
			margin-bottom:50upx;  
		  }
		  .changbox{
			 display:flex;
			 justify-content:space-between;
			 border-top:2upx solid #f2f2f2; 
			 view{
			  width:50%;
			  height:122upx;
			  line-height:120upx;			 
			 }
			  .no{
				
				border-right:2upx solid #f2f2f2;  
			  }
			  .yes{
				color:#606b81;  
			  } 
		  }
		  
	   }
	   	   
   }
</style>
