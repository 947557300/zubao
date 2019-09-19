
<template>
	<view class="login" @tap="login()">
	    登录
	</view>
</template>

<script>
	export default {
		data() {
			return {
			 
			}
		},
		onLoad() {
           
		},
		methods: {
            login(){
				uni.navigateTo({
					url:"../user/user-help/user-help"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	   .login{
		  width:100%;
		  text-align: center; 
	   }
				
	
</style>
