<template>
	<view class="content">
	  <wy-tab></wy-tab>	
	 <in-duction></in-duction>
	  <cu-rr></cu-rr>
	  <pur-ple></pur-ple>
	  <te-am></te-am>
	  <pe-po></pe-po>
	  <ta-bar></ta-bar>
	</view>
</template>

<script>
	import WyTab from "../../components/wy/bar.vue"
	import InDuction from "../../components/wy/introduction.vue"
	import TaBar from "../../components/wy/tabar.vue"
	import CuRr from  "../../components/wy/curr.vue"
	import PePo from "../../components/wy/pepole.vue"
	import PurPle from "../../components/wy/purple.vue"
	import TeAm from "../../components/wy/team.vue"
	export default {
		components:{
			WyTab,
			InDuction,
			CuRr,
			PePo,
			TaBar,
			PurPle,
			TeAm,
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style class="scss" scoped>
	 .content{
		 width:100%;
		 background:#f2f4f7;
		
		 
	 }
	
</style>
