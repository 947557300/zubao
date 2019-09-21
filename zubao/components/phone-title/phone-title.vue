<template>
	<view class="content">
		<view class="layout" :class="[titles.color?'padding':'']">
		 <view class="title">{{titles.title}}</view>
		 <view class="ftitle">{{titles.ftitle}}</view>	 
		</view>
	</view>
</template>

<script>
	 export default{
		 props:{
			 title:{
				 type:Object,
				 default:{}
			 }
		 },
		 data(){
			 return{
				titles:this.title, 
			 }
		 } 
	 }
</script>

<style lang="scss" scoped>
	    .content{
		  width:100%;
		  &:before{
		  			 display:table;
		  			 content:'';
		  }
		  .padding{
			  margin:60upx auto 72upx !important;
			  color:black !important;
		  }
		  .layout{
			width:88%;
			margin:40upx auto 72upx;
			color:#494949; 
		   .title{
			   font-size:48upx; 
		   }
			.ftitle{
				color:#9b9b9b;
				margin-top:36upx;	
				font-size:28upx;
			}   
		  }	  
		}
</style>
