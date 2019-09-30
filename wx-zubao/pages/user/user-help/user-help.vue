<template>
	<view>
	 <top-tar  backtext="常见问题"></top-tar>
	  <user-help :helplist="list"></user-help>
    </view>	
</template>

<script>
 import TopTar from "../../login/components/toptar.vue"
 import UserHelp from "./components/help-list.vue" 
       export default{
		   components:{
			   TopTar,
			   UserHelp,
		   },
		    data(){
				return{
					list:[
						{title:"会员卡相关",content:"1"},
						{title:"活动福利",content:"2"},
						{title:"如何租包",content:"3"},
						{title:"商品相关",content:"4"},
						{title:"租期相关",content:"5"},
						{title:"如何还包",content:"6"},
						{title:"更多问题",content:"7",boderb:true},
						
					]
				}
			}
	   }
</script>

<style>
</style>
