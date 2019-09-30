<template>
	<view class="index">
		<view class="tab">
			<view
				@click="changeShow(index)"
				v-for="(item,index) in tabItemData"
				:class="isShow==index?'tab-item-active':'tab-item'" 
			>{{item}}</view>
		</view>
		<Recommend v-if="!isShow"></Recommend>
		<goods-show v-if='isShow'></goods-show>
	</view>
</template>

<script>
	import Recommend from './recommend/recommend'
	import goodsShow from './goods-show/goods-show'
	export default {
		components:{
			Recommend,goodsShow
		},
		data() {
			return {
				tabItemData:['推荐','晒单'],
				isShow:0
			}	
		},
		methods:{
			changeShow(index){
				this.isShow=index
			}
		}
	}
</script>

<style>
	.tab{
		display: flex;
		justify-content: space-between;
		margin: 0 auto;
		width: 350upx;
	}
	.tab-item,.tab-item-active{
		width: 100upx;
		height: 80upx;
		text-align: center;
		font-size: 26upx;
		line-height: 80upx;
	}
	.tab-item-active{
		color: #FD2E32;
	}
</style>
