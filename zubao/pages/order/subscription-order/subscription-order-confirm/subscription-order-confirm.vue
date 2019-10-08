<template>
	<view>
			<top-tar backtext="确认订单"></top-tar>
			<order-confirm></order-confirm>
	</view>
</template>

<script>
import TopTar from "../../../login/components/toptar.vue"
import OrderConfirm from "./components/order-confirm"
   export default{
	   components:{
		 TopTar,  
		 OrderConfirm,
	   },
	     data(){
			 return{
				 
			 }
		 }
	   
   }
</script>

<style>
</style>
