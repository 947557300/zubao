<template>
	<view>
		<view v-if='data.length==0' class="flexView noData">
			<text>没有优惠券！</text>
			<text>随便逛逛把！</text>
			<button size="mini">去逛逛</button>
		</view>
		<ul>
			<li v-for='(item,index) in data' :key='index'>
				<view class="left">
					<view class="img flexView">
						<image src="../../../static/goods/1.jpg" mode=""></image>	
					</view>	
					<view class="text_box">
						<text style="color: #F0AD4E;font-weight: 500;">{{item.content}}</text>
						<text>{{item.type}}</text>
						<text style="font-size: 22upx;color: #BBBBBB;">{{item.time}}</text>
					</view>
				</view>
				
				<view class="right">
					<view class="flexView box">
						<button class="btn" size="mini">去使用</button>
					</view>					
				</view>
			</li>
		</ul>
	</view>
</template>

<script>
	import './user-coupon.scss'
	export default {
		data() {
			return {
				data:[
					{image_src:'',content:'满10000减1',type:'租包优惠券',time:'2019.8.31-2019.9.31'},
					{image_src:'',content:'满10000减1',type:'认购优惠券',time:'2019.8.31-2019.9.31'},
					{image_src:'',content:'满10000减1',type:'商品优惠券',time:'2019.8.31-2019.9.31'},
					{image_src:'',content:'满10000减1',type:'租包优惠券',time:'2019.8.31-2019.9.31'},
					{image_src:'',content:'满10000减1',type:'认购优惠券',time:'2019.8.31-2019.9.31'},
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss"  scoped>
</style>
