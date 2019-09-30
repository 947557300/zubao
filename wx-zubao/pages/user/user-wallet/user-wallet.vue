<template>
	<view>
		<view class="bg">
			<view class="money">
				<text>账号余额</text>
				<text class="moneyNumber">￥{{money}}</text>
			</view>
			<view class="cash">
				<text>提现</text>
			</view>
		</view>
		<view class="recordList">
			<view class="recordItem" v-for="(itme,key) of moneyRecord" :key='key'>
				<image :src="imgurl"></image>
				<view class="itmeText">
					<view class="left">
						<text class="type">{{itme.type}}</text>
						<text class="action">{{itme.action}}</text>
					</view>
					<view class="right">
						<text>{{itme.money}}</text>
						<text class="time">{{itme.time}}</text>
					</view>
				</view>			
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money:100,   //余额
				imgurl:require('../../../static/goods/1.jpg'),  //后期使用cdn地址图片 
				moneyRecord:[

{img:'../../../static/goods/1.jpg',action:'购买品牌包包',type:'支付',time:'2019/09/11 11:11:11',money:-100},
{img:'../../../static/goods/1.jpg',action:'购买品牌包包',type:'支付',time:'2019/09/11 11:11:11',money:-100},
{img:'../../../static/goods/1.jpg',action:'购买品牌包包',type:'支付',time:'2019/09/11 11:11:11',money:-100},
{img:'../../../static/goods/1.jpg',action:'购买品牌包包',type:'支付',time:'2019/09/11 11:11:11',money:-100},								
{img:'../../../static/goods/1.jpg',action:'购买品牌包包',type:'支付',time:'2019/09/11 11:11:11',money:-100},
{img:'../../../static/goods/1.jpg',action:'购买品牌包包',type:'支付',time:'2019/09/11 11:11:11',money:-100},
{img:'../../../static/goods/1.jpg',action:'购买品牌包包',type:'支付',time:'2019/09/11 11:11:11',money:-100},
{img:'../../../static/goods/1.jpg',action:'购买品牌包包',type:'支付',time:'2019/09/11 11:11:11',money:-100},
			]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	page{
		background-color: #DDDDDD;
	}
.bg{
	margin-top: 10upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 10upx;
	width: 700upx;
	margin-left: 25upx;
	height: 300upx;
	background: linear-gradient(to right, rgb(132,223,157), rgba(90,202,170,1));
}
.money{
	margin: 0upx 30upx 0 30upx;
	display: flex;
	justify-content: center;
	flex-direction: column;
}
.cash{
	height: 85%;
	margin: 0 30upx 0 30upx;
	display: flex;
	justify-content: center;
}
.moneyNumber{
	margin-top: 30upx;
	font-size: 28px;
	font-weight: bold;
	background: linear-gradient(to right, rgba(200,176,90,1),  rgba(200,160,90,1));
	-webkit-background-clip: text;
	background-clip: text;
	color: transparent;
}
.recordList{
	display: flex;
	flex-direction: column;
	border-radius: 15upx;
	background-color: #FFFFFF;	
	margin: 30upx 30upx 30upx 30upx;
}
.recordList image{
	border-radius: 50%;
	margin-left: 30upx;
	height: 100upx;
	width: 100upx;
}
.recordItem{
	display: flex;
	align-items: center;
	justify-content: flex-start;
	border-bottom: 1upx solid #ECECEC;
	margin: 10upx;
}
.itmeText{
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.left{
	margin-left: 30upx;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}
.right{
	margin-right: 50upx;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}
.type{	
	font-size: 14px;
	color: #333333;
}
.time{
	font-size: 10px;
	color: #808080;
}
.action{
	font-size: 12px;
	color: #666666;
}
</style>
