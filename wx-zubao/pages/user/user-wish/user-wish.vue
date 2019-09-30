<template>
	<view class="content">
        <wishList :item='wishlist' :sgoodslist='ssplist'  @arrayChanged="updataarray" @ssparrayChanged='updatassparry'></wishList>
	</view>
</template>

<script>
	import wishList from '@/components/my-wish/my-wish-list'
	export default {
		data() {
			return {
				
			}
		},
		components:{
			wishList
		},
		
		onLoad() {

		},
		methods: {
			// updataarray:function(index){			
			// 	// console.log(index)
			// 	this.wishlist.splice(index,1)
			// },
			// updatassparry:function(index){
			// 	this.ssplist.splice(index,1)
			// }

		}
	}
</script>

<style>
	page{
		background-color: #f5f5f5;
	}

</style>
