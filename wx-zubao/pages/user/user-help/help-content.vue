<template>
	<view>
		<top-tar :backtext="'常见问题-'+list.title"></top-tar>
	    <view>{{list.content}}</view>	
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
			   list:"", 
		   }
	   },
	   onLoad(options){
		  this.list=JSON.parse(options.list);
		  	
	   }
   }
</script>

<style>
</style>
