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
				    sex:"男",
					wxnum:"我要上春晚",
					phone:"13111111111",
					rzzt:false,
					name:"黄浩涛",
					sfz:445111111111111111,
				}
			}
		},
		methods: {
			hidden(str,frontLen,endLen) {    //str：要进行隐藏的变量  frontLen: 前面需要保留几位    endLen: 后面需要保留几位
								         var len = str.length-frontLen-endLen;
								         var xing = '';
								         for (var i=0;i<len;i++) {
								         xing+='*';
								        }
								         return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
								   }
			
		}
	}
</script>

<style>
</style>
