<template>
	<view class="content">
		 <top-tar  backtext="更换手机号"></top-tar>
	   <phone-title :title="list"></phone-title>
		<view class="check-bottom">
		  <input type="number" v-modle="number" placeholder="请输入当前绑定的完整手机号">
		</view>
		 <view class="btn">下一步</view> 
	</view>
</template>

<script>
import TopTar from "../../login/components/toptar.vue"
import PhoneTitle from "../../../components/phone-title/phone-title"
 export default{
	 components:{
		 TopTar,
		 PhoneTitle,
	 },
	 data(){
		 return{
			 number:"",
			 list:{
				 title:"更换手机号",
				 ftitle:"当前绑定：13111111111",
				 color:false,
			 }
			 
		 }
	 },
	 methods:{
		 
	 }
 }	
</script>

<style lang="scss" scoped>
	.content{
	  width:100%;	
	
	.check-bottom{
	  width:88%;
	  margin:0 auto; 
	  input{
		 height:112upx;
		 font-size:32upx;
		 border-bottom:4upx solid #f2f2f2;  
	  }
	  
	}
	.btn{
			   width:88%;
			   margin:28upx auto 0;
			   height:100upx;
			  line-height:100upx;
			  text-align:center;
			  color:#fff;
			  background:#ea838f;		  
			  font-size:28upx;	   
			   }
	 }
</style>
