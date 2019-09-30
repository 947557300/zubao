<template>
	<view class="user-order">
		<view class="user-order-tabBar">
			<view 
				:class="isShow==item.typeId?'tabBar-item-show':'tabBar-item-hide'" 
				v-for="(item,index) in userOrderTabBarData" 
				:key="index"
				@click="ChangeShow(index)"
				>{{item.type}}
			</view>
		</view>
		<view class="user-order-content" v-for="(item,index) in userOrderData" :key='item.index' v-if="isShow==index">
			<view class="order-details">
				<view class="order-details-item" v-for="(item,itemIndex) in item" :key='item.index' @click="goOrderDetails(item.id)">
					<view class="order-details-top">
						<view class="shop-name">
							<text>{{item.shopName}}</text>
							<image src="/static/user/user-order/arrow.png"></image>
						</view>
						<text class="deal-state">{{item.dealState}}</text>
					</view>
					<view class="order-details-middle">
						<image :src="item.commodityImg"></image>
						<view class="middle-product">
							<view class="product-name">{{item.productName}}</view>
							<view class="product-details">{{item.productDetails}}</view>
							<view class="order-details-bottom">¥{{item.price}}</view>
						</view>
					</view>
					<view class="order-details-bottom">
						<view class="remove-oreder" @click="removeOreder(index,itemIndex)">去评价</view>
					</view>
				</view>
			</view>	
			<view class="content-msg" v-if="item.length==0">
				<view class="msg-text">暂无数据</view>
				<view class="msg-refresh" @click="refresh(index)">点击刷新</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		        this.isShow=option.id
		    },
		data() {
			return {
				isShow:0,
				userOrderTabBarData:[
					{
						typeId:0,
						type:"全部订单"
					},
					{
						typeId:1,
						type:"待发货"
					},
					{
						typeId:2,
						type:"体验中"
					},
					{
						typeId:3,
						type:"待归还"
					},
					{
						typeId:4,
						type:"待评价"
					},
				],
				userOrderData:[
					[
						{
							id:0,
							typeId:0,
							shopName:'铁汉优品汇',
							dealState:'交易成功',
							commodityImg:'/static/user/user-order/1.jpg',
							productName:'俄罗斯进口盒装速溶土豆泥份发挖掘大王的噶尔公司发哈二零功能梳理两个绿色回过神来',
							productDetails:'混合味道10盒',
							price:20
						}
					],
					[
						
					],
					[
						{
							id:1,
							typeId:2,
							shopName:'铁汉优品汇',
							dealState:'交易成功',
							commodityImg:'/static/user/user-order/1.jpg',
							productName:'俄罗斯进口盒装速溶土豆泥份发挖掘大王的噶尔公司发哈二零功能梳理两个绿色回过神来',
							productDetails:'混合味道10盒',
							price:20
						},
						{
							id:2,
							typeId:2,
							shopName:'铁汉优品汇',
							dealState:'交易成功',
							commodityImg:'/static/user/user-order/1.jpg',
							productName:'俄罗斯进口盒装速溶土豆泥份发挖掘大王的噶尔公司发哈二零功能梳理两个绿色回过神来',
							productDetails:'混合味道10盒',
							price:20
						}
					],
					[
						{
							id:3,
							typeId:3,
							shopName:'铁汉优品汇',
							dealState:'交易成功',
							commodityImg:'/static/user/user-order/1.jpg',
							productName:'俄罗斯进口盒装速溶土豆泥份发挖掘大王的噶尔公司发哈二零功能梳理两个绿色回过神来',
							productDetails:'混合味道10盒',
							price:20
						}
					],
					[
						{
							id:4,
							typeId:4,
							shopName:'铁汉优品汇',
							dealState:'交易成功',
							commodityImg:'/static/user/user-order/1.jpg',
							productName:'俄罗斯进口盒装速溶土豆泥份发挖掘大王的噶尔公司发哈二零功能梳理两个绿色回过神来',
							productDetails:'混合味道10盒',
							price:20
						},
						{
							id:5,
							typeId:4,
							shopName:'铁汉优品汇',
							dealState:'交易成功',
							commodityImg:'/static/user/user-order/1.jpg',
							productName:'俄罗斯进口盒装速溶土豆泥份发挖掘大王的噶尔公司发哈二零功能梳理两个绿色回过神来',
							productDetails:'混合味道10盒',
							price:20
						},
						{
							id:6,
							typeId:4,
							shopName:'铁汉优品汇',
							dealState:'交易成功',
							commodityImg:'/static/user/user-order/1.jpg',
							productName:'俄罗斯进口盒装速溶土豆泥份发挖掘大王的噶尔公司发哈二零功能梳理两个绿色回过神来',
							productDetails:'混合味道10盒',
							price:20
						}
					]
				]
			}
		},
		methods: {
			refresh(index){
				// uni.request({
				// 	
				// })
			},
			ChangeShow(index){
				this.isShow=index
			},
			removeOreder(index,itemIndex){
				// uni.request({
				// 	
				// })
			},
			goOrderDetails(id){
				uni.navigateTo({
					url:'order-details/order-details'
				})
			}
		}
	}
</script>
<style>
	page {
		background-color:#f9f9f9;
	}
</style>
<style lang="scss" scoped>
@mixin  tabBar-item{
  width: 20%;
  height: 90upx;
  text-align: center;
  line-height: 90upx;
  background-color: #FFFFFF;
}
.user-order{
	.user-order-tabBar{
		display:flex;
		font-size: 24upx;
		.tabBar-item-show{
			border-bottom: #007AFF 4upx solid;
			@include tabBar-item;

		}
		.tabBar-item-hide{
			color:#999999;
			@include tabBar-item;
			border-bottom: #FFFFFF 4upx solid;
		}
	}
	.user-order-content{
		margin-top: 20upx;
		.order-details{
			position: relative;
			margin: 0 auto;
			width: 700upx;
			.order-details-item{
				margin-bottom: 20upx;
				padding:30upx 40upx;
				background-color: #FFFFFF;
				border-radius: 30upx;
				.order-details-top{
					display:flex;
					justify-content: space-between;
					align-items: center;
					.shop-name {
						display: flex;
						align-items: center;
						font-size: 33upx;
						font-weight: 600;
					}
					.shop-name image{
						padding-left: 20upx;
						display: block;
						width: 38upx;
						height: 38upx;
					}
					.deal-state{
						font-size: 26upx;
						color: #ff661a;
					}
				}
				.order-details-middle{
					padding-top: 30upx;
					display:flex;
					justify-content: space-between;
					image{
						display: block;
						width: 180upx;
						height: 180upx;
					}
					.product-name{
						height: 74upx; 
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					.middle-product{
						position: relative;
						width: 400upx;
						font-size: 28upx;
						font-weight:600;
						.product-details{
							font-size: 24upx;
							color: #a1a1a1;
						}
						.order-details-bottom{
							position: absolute;
							right: 0;
							bottom: 0;
							font-size: 30upx;
						}
					}
				}
				.order-details-bottom{
					display: flex;
					justify-content: flex-end;
					.remove-oreder{
						margin-top: 30upx;
						padding: 0 24upx;
						width: 164upx;
						height: 57upx;
						font-size: 26upx;
						text-align: center;
						line-height: 57upx;
						border: 2upx #999999 solid;
						border-radius: 50upx;
					}
				}
			}
		}
		.content-msg{
			position: absolute;
			top:50%;
			left: 0;
			right: 0;
			text-align: center;
			transform: translateY(-50%);
			.msg-text{
				font-size: 26upx;
				color:#999999;
			}
			.msg-refresh{
				display: inline-block;
				margin-top: 20upx;
				padding: 20upx 72upx;
				font-size: 28upx;
				border-radius: 50upx;
				color: #FFFFFF;
				background-color: #1482D1;
			}
		}
	}
}
</style>
