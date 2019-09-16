<template>
      <view>
		 <button open-type="getUserInfo" @getuserinfo="getuserinfo" class="btn"
		 withCredentials="true">登录</button> 
	  </view>
</template>
<script>
	export default{
		data(){
			return{
				
			}
			
		},
		onload(){
			
		},
		methods:{
		  getuserinfo(res){
			 if(!res.detail.iv){
				 uni.showToast({
					 title:"您取消了授权,登录失败",
					 icon:"none"
				 });
				 return false 
			 }
			 uni.login({
				 provider: 'weixin',
				 success: function(loginRes) {
				   console.log(loginRes);
				   }
			 })
			 
			
		  }	
		}
	}
       
</script>

<style lang="scss" scoped>
	     .btn{
		   width:30%;
		   background:red;		 
		 }
		 button::after{
			border:none; 
		 }
</style>
