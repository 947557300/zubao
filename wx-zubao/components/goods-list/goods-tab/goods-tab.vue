<template name='goodtab'>
	<view class="goodstab">
		<ul>
			<li>
				<text>价格</text>
				<image :src="paixu" mode=""></image>
			</li>
			<li>
				<text>时间</text>
				<image :src="paixu" mode=""></image>
			</li>
			<li class="shu">|</li>
			<li class='shaixuan' @tap='showdrawer()'>
				<text>筛选</text>
				<image :src="shaixuan" mode=""></image>
			</li>
		</ul>
		<uni-drawer :visible="visible" mode='right' class="drawer" @close='showdrawer()'>
		    <view style="padding:30upx;">
		        <view class="uni-title">抽屉式导航</view>
		    </view>
		</uni-drawer>
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni-ui/uni-drawer/uni-drawer"
	export default {
		name:'goodtab',
		data() {
			return {
				visible:false,
				paixu:require('@/static/goodstab/paixu.png'),
				shaixuan:require('@/static/goodstab/shaixuan.png')
			};
		},
		 components: {uniDrawer},
		 methods:{
			 showdrawer:function(){
				 this.visible = ! this.visible,
				 console.log(this.visible)
			 }
		 }
	}
</script>

<style lang="scss">
	.goodstab{
		ul{
			width:100%;
			background-color: #FFFFFF;
			list-style: none;
			display: flex;
			padding-inline-start:0px;
			li{
				padding:10upx 60upx;
				display:flex;
				text{
					font-size: 28upx;
					color: #333333;
				}
				image{
					width: 35upx;
					height: 35upx;
					margin-top: 8upx;
					margin-left: 15upx;
				}
			}
			.shaixuan{
				padding: 10upx 0upx;
				margin-left: 30upx;
			}
			.shu{
				padding:10upx 0upx;
				margin-left: 100upx;
				font-size: 28upx;
				color: #999999;
			}
		}
		.drawer{
			opacity: 0.8;
		}
	}

</style>
