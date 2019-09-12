<template>
	 <view>
		 <top-tar  backtext="登录"></top-tar>
		<lo-gin :content="con"></lo-gin>
		
		 
	 </view>
</template>

<script>
 import LoGin from "./components/login.vue"
 import TopTar from "./components/toptar.vue"
    export default{
		components:{
			LoGin,
			TopTar,
		},
		data(){
			return{
				con:{
				  ftitle:"手机快捷登录",
				  stitle:"新用户输入手机号即刻注册",
				  btnname:"登录",
				  wxlogin:true		  
				}
			}
		}
	}
</script>

<style>
</style>
