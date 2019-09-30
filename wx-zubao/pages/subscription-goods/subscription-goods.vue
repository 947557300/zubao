<template name='listPage'>
	<view>
		<view class="searchtab">
			<goodssearch></goodssearch>
			<goodstab></goodstab>
		</view>
		<pgoodsList></pgoodsList>
	</view>
</template>

<script>
	import pgoodsList from '@/components/goods-list/subscription-goods-List/subscription-goods-List'
	import goodssearch from '@/components/goods-search/goods-search'
	import goodstab from '@/components/goods-list/goods-tab/goods-tab'
	export default {
		name:'listPage',
		data() {
			return {
			};
		},
		components:{pgoodsList,goodssearch,goodstab}
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
