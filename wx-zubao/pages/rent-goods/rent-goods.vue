<template name='listPage'>
	<view>
		<view class="searchtab">
			<goodssearch></goodssearch>
			<goodstab></goodstab>
		</view>
		<goodsList></goodsList>
	</view>
</template>

<script>
	import goodsList from '@/components/goods-list/rent-goods-List/rent-goods-List'
	import goodssearch from '@/components/goods-search/goods-search'
	import goodstab from '@/components/goods-list/goods-tab/goods-tab'
	export default {
		name:'listPage',
		data() {
			return {
			};
		},
		components:{goodsList,goodssearch,goodstab}
	}
</script>

<style>
	.searchtab{
		width: 100%;
		padding-bottom: 10upx;
		background-color: #FFFFFF;
		border-bottom:1upx solid #ececec;
		position: fixed;
		z-index: 99;
	}

</style>
