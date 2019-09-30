<template name='listPage'>
	<view>
		<view class="searchtab">
			<goodssearch></goodssearch>
		</view>
		<goodsList class="goodslist"></goodsList>
	</view>
</template>

<script>
	import goodsList from '@/components/goods-list/goods-List-page/goods-List.vue'
	import goodssearch from '@/components/goods-search/goods-search.vue'
	export default {
		name:'listPage',
		data() {
			return {
				
			};
		},
		components:{goodsList,goodssearch}
	}
</script>

<style>
	.searchtab{
		width: 100%;
		background-color: #FFFFFF;
		position: fixed;
		z-index: 99;
	}

</style>
