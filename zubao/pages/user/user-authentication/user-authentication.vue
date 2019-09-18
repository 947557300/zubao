<template>
	<view>
		<top-tar backtext="实名认证"></top-tar>
		 <view class="identity">
		  <view class="identity-top">	 
		  <view class="title">上传身份证</view>
		  <view class="ftitle">请使用注册手机号的实名进行认证</view>
		  </view>
		  <view class="imgdiv">
			   <view class="imgnine">
			  <view class="select-img"><image :src="zsrc" @tap="selectimg(0)"></image>
			  <view class="xiangjidiv"><image src="../../../static/user/user-authentication/xiangji.png"></image></view>
			  </view>
			  <view class="select-img"><image :src="fsrc" @tap="selectimg(1)"></image>
			  <view class="xiangjidiv"><image src="../../../static/user/user-authentication/xiangji.png"></image></view>
			  </view>
			  </view>
			 	 
		 </view>
		 <view class="identdiv">
		 <view class="identity-bottom">
			<view class="identity-list">
			 <view class="list-left">姓名</view>
			 <input type="text" class="list-right" v-model="name">	 
			</view>
			 <view class="identity-list">
			  <view class="list-left">手机号</view>
			  <input type="number" class="list-right" v-model="phone">	 
			 </view> 
			 <view class="identity-list">
			  <view class="list-left">身份证</view>
			  <input type="text" class="list-right" v-model="id">	 
			 </view> 
			 <view class="identity-list">
			  <view class="list-left">地址</view>
			  <input type="text" class="list-right" v-model="address">	 
			 </view>
			 <view class="save">租包依法保护你的个人信息安全</view>
		 </view>
		 </view>
		  <view class="btn" @tap="submit()">提交</view>
		 </view>
	</view>
</template>

<script>
	import TopTar from "../../login/components/toptar.vue"
	export default{
		 components:{
		 		TopTar,

		 },
		 data(){
			 return{
				    name:"",
					phone:"",
					id:"",
					address:"",
					zsrc:"../../../static/user/user-authentication/zheng.jpg",
					fsrc:"../../../static/user/user-authentication/fan.jpg"
			 }
		 },
		 methods:{
			 selectimg(index){
				 var that=this;
				 uni.chooseImage({
				 	count:1,
					sizeType:"compressed",
					success:function(res){
						if(index==0){
							that.zsrc=res.tempFilePaths;
						}else{
							that.fsrc=res.tempFilePaths;
						}   
					}
				 })
			 },
			 submit(){
				 if(this.name==""){
				 				 uni.showToast({
				 				     title: '请输入姓名',
				 				     duration: 1000,
				 				 	 icon:"none"
				 				 });
				 				 return  false;
				 };
                if(this.phone==""){
                				 uni.showToast({
                				     title: '请输入手机号',
                				     duration: 1000,
                				 	 icon:"none"
                				 });
                				 return  false;
                }else if(!this.phone==""){
					var phonecheck=/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
					if(!phonecheck.test(this.phone)){
						uni.showToast({
						    title: '请输入正确的手机号',
						    duration: 1000,
							 icon:"none"
						});
						return  false;
					}
				};
                if(this.id==""){
                				 uni.showToast({
                				     title: '请输入身份证',
                				     duration: 1000,
                				 	 icon:"none"
                				 });
                				 return  false;
                }else if(!this.id==""){
					var idcheck= /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
					if(!idcheck.test(this.id)){
						uni.showToast({
						    title: '请输入正确的身份证',
						    duration: 1000,
							 icon:"none"
						});
						return  false;
					}
				};
                if(this.address==""){
                				 uni.showToast({
                				     title: '请输入地址',
                				     duration: 1000,
                				 	 icon:"none"
                				 });
                				 return  false;
                } 
			 }
		 }
	}
</script>

<style lang="scss" scoped>
	.identity{
		width:100%;
		.identity-top{
		 width:90%;
		 margin:0 auto;
		.title{
		 font-size:50upx;
		 color:#515151;
		 margin:20upx 0;	  
		}
		.ftitle{
		 font-size:30upx;
		color:#909090;	 
		}
		}
		.imgdiv{
		  border-bottom:4upx solid #f2f2f2;
		  .imgnine{
			  display:flex;
			  align-items:center;
			  justify-content:space-between;
			  width:90%;
			   margin:75upx auto;
			  
			   image{
				  width:320upx;
				  height:220upx; 
			   }
			   .select-img{
				   position:relative;
				   .xiangjidiv{
				   				 
				   				 position:absolute;
				   				 border-radius:50%;
				   				background-color:rgba(143,143,143,0.8);
				   				 z-index:1;
				   				 width:100upx;
				   				 height:100upx;
				   				 top:65upx;
				   				 left:107.5upx; 
								 pointer-events:none;
				   				image{
				   				  position:relative;
				   				  top:20upx;		
				   				  width:60upx;
				   				  height:60upx;	
								  left:20upx;
								
				   				}
				   }	  
			   }
		  }
		 	  
		}
	    .identdiv{
			width:100%;
			height:500upx;
			overflow:auto;
		.identity-bottom{
			width:90%;
			margin:0 auto;
			color:#4e4e4e;
			font-size:30upx;	
		 .identity-list{
			display:flex;
			justify-content:flex-start;
			align-items:center;
		    padding:50upx 0; 
		     border-bottom:4upx solid #f2f2f2;
			  input{
				  width:80%;
			  }
			.list-left{
			 	margin-right:20upx;
			}
			
		 }
		  .save{
			  text-align:center;
			  margin:50upx 0;
		  }
			
		}
		}
		.btn{
		  width:86%;
		  margin:30upx auto;
		  background:#08c060;
		  text-align:center;
		  height:100upx;
		  color:#fff;
		  line-height:100upx;
		  font-size:30upx;
		}
	}
</style>
