<template name="butn">
	<view class="content">
		<uni-goods-nav :options="options" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
	</view>
</template>

<script>
	import uniGoodsNav from '@/components/uni-ui/uni-goods-nav/uni-goods-nav'
	export default {
		name:'butn',
		data() {
			return {
				
				options:[
					{
						icon:require('@/static/goodsdetails/shoucang.png'),
						text:'心愿单',
						flag:false,
					},
					{
						icon:require('@/static/goodsdetails/gouwuche.png'),
						text:'购物车',
						info:0
					},
				],
				buttonGroup:[{
					text: '点击购买',
					backgroundColor: '#333333',
					color: '#fff'
				}]
			};
		},
		components: {
			uniGoodsNav
		},
		methods:{
			onClick(e) {
				if(e.index==0){						
					if(this.options[0].flag){
					    this.options[0].icon = require('@/static/goodsdetails/shoucang.png')
						this.options[0].flag = false
					}else{
						this.options[0].flag = true
						this.options[0].icon = require('@/static/goodslist/shoucang (1)_1.png')
					}
					
				}
				else{
					uni.navigateTo({
					    url:'@/components/my-wish-list'
					});
				}
			},
			buttonClick(){
				this.options[1].info++
			}
		}
	}
</script>

<style lang="scss">
	.content{
		padding: 20upx;
		box-sizing: border-box;
		background: #FFFFFF;
		border-top:1upx solid #d0d0d0 ;
		position: fixed;
		width: 100%;
		bottom: 0upx;
	}

</style>
