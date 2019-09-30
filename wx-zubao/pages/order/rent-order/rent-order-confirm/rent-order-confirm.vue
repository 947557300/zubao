<template>
	<view>
		<view class="address">
			<button size="default" v-if="false">添加地址</button>
			<view class="message" @tap="goaddress()">
				<view class="user">
					<view>
						<image src="../../../../static/order/address.png" mode="widthFix"></image>
						<text>收货人：王治国</text>
					</view>
					<view>
						<text>17820456587</text>
						<image src="../../../../static/order/set.png" mode="widthFix"></image>
					</view>
				</view>
				<text class="user-address">广东省广州市天河区天河软件园</text>
			</view>
		</view>
		
		<view class="goods flex-column">
			<view class="title">订单商品</view>
			<text class="weight">商品重量：以实际重量为准</text>
			<view class="goods-message flex-row">
				<image src="../../../../static/goods/1.jpg" mode="widthFix"></image>
				<view class="flex-column goods-text">
					<text>商品名字</text>
					<text style="color: #777777;">商品描述</text>
					<text style="color: #F0AD4E;margin-top: 20upx;">商品价格{{price.dayPrice}}/天</text>
				</view>
			</view>
			<view class="flex-row-between day list">
				<text>选择天数</text>
				<view class="flex-row">
					<view class="btn" size="mini" @click="dayChange(7,0)" :class="{btnBg : dayFlag[0]}">7</view>
					<view class="btn" size="mini" @click="dayChange(15,1)" :class="{btnBg : dayFlag[1]}">15</view>
					<view class="btn" size="mini" @click="dayChange(30,2)" :class="{btnBg : dayFlag[2]}">30</view>
				</view>
			</view>
			<view class="flex-row-between price list">
				<text>体验价格</text>
				<text class="number">{{price.experiencePrice}}元</text>
			</view>
			<view class="flex-row-between deposit">
				<view class="text flex-row">
					<text>押金</text>
					<text style="font-size: 25upx;color: #DDDDDD;">实名认证信用分，达标即可免除押金</text>
				</view>
				<text>10000元</text>
			</view>
		</view>	
		<view class="money">
			<view class="flex-row-between list">
				<text>运费</text>
				<text>5元</text>
			</view>
		</view>
		<view class="insurance">	
			<view class="flex-row-between list">
				<view class="flex-column">
					<text>免赔保险</text>				
					<text  :class="{textdecoration : !switchFlag.flag}" style="color: #ea986c;">10元</text>
				</view>
				<view class="switchView">
					<text style="color:#F0AD4E;font-size: 25upx;">{{switchFlag.text}}</text>
					<switch 
						checked='true' 
						@change="switchChange"  
						color="#ea986c" 
						style="transform:scale(0.7)"
					/>
				</view>				
			</view>
		</view>	
		<view class="bottom">
			<uni-collapse accordion="true">
			    <uni-collapse-item title="优惠券" style='font-size: 25upx;'>
					<view>
						<scroll-view scroll-y="true" style="height: 300upx;">
									<coupon></coupon>
						</scroll-view>
					</view>
			    </uni-collapse-item>
			</uni-collapse>
			<view class="flex-row-between list coupon">
				<text>当前优惠</text>
				<text>满1000减1</text>
			</view>			
			<view class="remarks list flex-row">
				<text class="remarkstext flex">备注:</text>
				<input type="text" value=""  class="inputText"/>
			</view>	
		</view>
		<view class="pay flex-row-between">
			<view>
				<text>总计：{{price.totalPrice}}元</text>
			</view>			
			<button >立即支付</button>
		</view>
	</view>
</template>

<script>
	import coupon from'@/pages/user/user-coupon/user-coupon.vue'
	import './rent-order-confim.scss';
	import {uniCollapse } from '@/components/uni-ui/uni-collapse/uni-collapse.vue';
	import {uniCollapseItem } from '@/components/uni-ui/uni-collapse-item/uni-collapse-item.vue';
	export default {
		components:{
			uniCollapse,uniCollapseItem,coupon,
		},
		data() {
			return {
				price:{
					dayPrice:25,
					experiencePrice:0,
					totalPrice:0,
				},
				dayFlag:[true,false,false],
				switchFlag:{text:'开启',flag:'true'},
			}
		},
		methods: {
			switchChange(e){
				if(e.target.value){
					this.switchFlag.text = '开启'				
				}else{
					this.switchFlag.text = '关闭'
				}
				this.switchFlag.flag = e.target.value
			},
			dayChange(number,index){
				this.dayFlag = [false,false,false]
				this.dayFlag[index] = true
				this.price.experiencePrice = number*this.price.dayPrice
			},
			goaddress:function(){
				uni.navigateTo({
				    url: '../../../user/user-address/user-address'
				});
			},
			
		},
		created() {
			this.price.experiencePrice = 7*this.price.dayPrice;
			this.price.totalPrice = 7*this.price.dayPrice+10000+5+10;
		}
	}
</script>

<style lang="scss">

</style>
