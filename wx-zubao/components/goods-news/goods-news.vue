<template name="Selected">
	<view class="content">
		<view class="text_box">
			<text class="title">商品信息</text>
			<view class="text_bottom">
				<vrow class="row" :align="'space-between'">
				    <text>品牌</text>         
				    <text>GUCCI</text> 
				</vrow>
				<view class="fgx"></view>
				<vrow class="row" :align="'space-between'">
				    <text>价格</text>        
				    <text>80000元</text>
				</vrow>
				<view class="fgx"></view>
				<vrow class="row" :align="'space-between'">
				    <text>类型</text>          
				    <text>单肩包/手提包/斜挎包</text>
				</vrow>
				<view class="fgx"></view>
				<vrow class="row" :align="'space-between'">
				    <text>尺寸</text>          
				    <text>长/宽/高24cm*10cm*14cm</text> 
				</vrow>
				<view class="fgx"></view>
				<vrow class="row" :align="'space-between'">
				    <text>重量</text>          
				    <text>以实际重量为准</text> 
				</vrow>
			</view>
		</view>
	</view>
</template>

<script>
	import vrow from '@/components/row/row'
	export default {
		name:'Selected',
		data() {
			return {
				
			};
		},
		components: {
		    vrow
		},
	}
</script>

<style lang="scss">
	.content{
		background-color: #FFFFFF;
		width: 100%;
		box-sizing: border-box;
		padding:30upx 24upx;
		.text_box{
			.title{
				font-size: 30upx;
				margin-right: 20upx;
				color: #333333;
			}
			.text_bottom{
				margin-top:30upx ;
				text{
					font-size: 25upx;
					color: #999999;
				}
			}
		}
		.fgx{
			width: 100%;
			height: 3upx;
			background-color: #dcdcdc;
			margin: 28upx 0;
		}
	}

</style>
