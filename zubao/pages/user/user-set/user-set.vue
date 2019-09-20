<template>
	<view>
		<top-tar backtext="个人中心"></top-tar>
		<set-con :msglist="msglist"></set-con>
	</view>
</template>

<script>
import TopTar from "../../login/components/toptar.vue"
import SetCon from "./components/set-content.vue"
	export default {
		 components:{
			TopTar,
			 SetCon,
		 },
		data() {
			return {
				msglist:{
					wxname:"我要上春晚",
				    sex:1,
					wxnum:"我要上春晚",
					phone:13111111111,
					rzzt:true,
					name:"黄浩涛",
					sfz:445111111111111111,
				}
			}
		},
		methods: {
			
		},
	
	}
</script>

<style>
</style>
