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
						icon:require('@/static/goodsdetails/zhuanfa.png'),
						text:'转发'
					},
					{
						icon:require('@/static/goodslist/shoucang.png'),
						text:'心愿单',
						flag:false,
					}],
				buttonGroup:[{
					text: '点击使用',
					backgroundColor: '#ea986c',
					color: '#fff'
				}]
			};
		},
		components: {
			uniGoodsNav
		},
		methods:{
			onClick(e) {
				if(e.index==1){						
					if(this.options[1].flag){
					    this.options[1].icon = require('@/static/goodslist/shoucang.png')
						this.options[1].flag = false
					}else{
						this.options[1].flag = true
						this.options[1].icon = require('@/static/goodslist/shoucang_1.png')
					}
					
				}
				else{
					return
				}
			},
			buttonClick(){
				uni.navigateTo({
				    url:'../../order/rent-order/rent-order-confirm/rent-order-confirm'
				});
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
