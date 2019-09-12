<template>
	<view>
		    <top-tar  backtext="绑定手机"></top-tar>
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
				    ftitle:"绑定手机号码",
				    stitle:"用户输入手机即刻绑定",
				    btnname:"绑定",
				    wxlogin:false		  
				  }
				 
			  }
		  },
		  onLoad(options) {
	 }
	 }
	
</script>

<style>
</style>
