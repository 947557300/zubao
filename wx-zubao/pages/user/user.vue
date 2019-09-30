/**
 * @author  :  王治国
 * @created :  2019/07/016
 * @version :  v1.0
 * @desc    :  个人中心页面
*/
<template>
	<view class="all">
		<view class="user flex">
			 <image @click="goPage('../login/index')"   src="../../static/images/missing-face.png"></image>
			 <view>
				 <view>{{userName}}</view>
				 <view style='color: #777777;'>{{userPhone}}</view>
			 </view>
			 <view class="set"  @click="goPage('user-set/user-set')">
				 <image style="width: 60upx;height: 60upx;" src='../../static/images/set.png'></image>
			 </view>
		</view>
		<view class="assets">
			<view @click="goPage('user-wallet/user-wallet')">
				<view>￥{{money}}</view>
				<text>钱包</text>
			</view>
			<view @click="goPage('user-coupon/user-coupon')">
				<view>{{couponNumber}}张</view>
				<text>优惠券</text>
			</view>
			<view>
				<view>{{claims}}</view>
				<text>债权分</text>
			</view>
		</view>
		<view class="flex order">
			<view class="rent">
				<view class="message">
					<text>租包</text>
					<text @click="goPage('./user-order/user-order')">全部订单</text>
				</view>
				<view class='flex process'>
<!-- 					<view class="flex process_item" hover-class='hover'  @click="goPage('./user-order/user-order')">
						<view class="process_item_item">
							<image src='../../static/images/pay.png'></image>
							<uni-badge
								size='small'
								class="badge" 
								:text="warn" 
								v-if="warn!=0"  
								type="error" 
							></uni-badge>
						</view>						
						<text>待支付</text>
					</view> -->
					<view class="flex process_item" hover-class='hover' @click="goPage('./user-order/user-order?id=1')">
						<view class="process_item_item">
							<image src='../../static/images/send.png'></image>
							<uni-badge
								size='small'
								class="badge"
								:text="warn" 
								v-if="warn!=0"  
								type="error" 
							></uni-badge>
						</view>						
						<text>待发货</text>
					</view>
					<view class="flex process_item" hover-class='hover' @click="goPage('./user-order/user-order?id=2')">
						<view class="process_item_item">
							<image src='../../static/images/Receive.png'></image>
							<uni-badge
								size='small'
								class="badge"
								:text="warn" 
								v-if="warn!=0"  
								type="error" 
							></uni-badge>
						</view>						
						<text>体验中</text>
					</view>
					<view class="flex process_item" hover-class='hover' @click="goPage('./user-order/user-order?id=3')">
						<view class="process_item_item">
							<image src='../../static/images/return.png'></image>
							<uni-badge
								size='small'
								class="badge" 
								:text="warn" 
								v-if="warn!=0"  
								type="error" 
							></uni-badge>
						</view>						
						<text>待归还</text>
					</view>
					<view class="flex process_item" hover-class='hover' @click="goPage('./user-order/user-order?id=4')">
						<view class="process_item_item">
							<image src='../../static/images/refisinh.png'></image>
							<uni-badge
								size='small'
								class="badge" 
								:text="warn" 
								v-if="warn!=0"  
								type="error" 
							></uni-badge>
						</view>						
						<text>待评价</text>
					</view>
				</view>
			</view>
			<view class="purchase">
				<view class="message">
					<text>认购</text>
					<text>全部订单</text>
				</view>
				<view class='flex process'>
					<view class="flex process_item" hover-class='hover'>
						<view class="process_item_item">
							<image src='../../static/images/pay.png'></image>
								<uni-badge
									size='small'
									class="badge"
									:text="warn" 
									v-if="warn!=0"  
									type="error" 
								></uni-badge>
						</view>
						
						<text>待支付</text>
					</view>
					<view class="flex process_item" hover-class='hover'>
						<view class="process_item_item">
							<image src='../../static/images/send.png'></image>
							<uni-badge
								size='small'
								class="badge" 
								:text="warn" 
								v-if="warn!=0"  
								type="error" 
							></uni-badge>
						</view>						
						<text>待发货</text>
					</view>
					<view class="flex process_item" hover-class='hover'>
						<view class="process_item_item">
							<image src='../../static/images/Receive.png'></image>
							<uni-badge
								size='small'
								class="badge"
								:text="warn" 
								v-if="warn!=0"  
								type="error" 
							></uni-badge>
						</view>						
						<text>待收货</text>
					</view>
					<view class="flex process_item" hover-class='hover'>
						<view class="process_item_item">
							<image src='../../static/images/remoney.png'></image>
							<uni-badge
								size='small'
								class="badge"
								:text="warn" 
								v-if="warn!=0"  
								type="error" 
							></uni-badge>
						</view>						
						<text>退款</text>
					</view>				
				</view>				
			</view>
			<view class="list">
				<view class='listItem' hover-class='listhover' @click="goPage('user-wish/user-wish')">
					<text>心愿单</text>
					<view class="flex">
						<uni-badge 
							size='small'
							style="margin-right: 10upx;" 
							:text="warn" 
							v-if="warn!=0"  
							type="error" 
						></uni-badge>
						<image src='../../static/images/go.png'></image>
					</view>					
				</view>
				<hr>
				<view class='listItem' hover-class='listhover' @click="goPage('user-show/user-show')">
					<text>我的晒单</text>
					<image src='../../static/images/go.png'></image>
				</view>
				<view class='listItem' hover-class='listhover' @click="goPage('user-address/user-address')">
					<text>地址管理</text>
					<image src='../../static/images/go.png'></image>
				</view>
				<view class='listItem' hover-class='listhover' @click="goPage('user-help/user-help')">
					<text>常见问题</text>
					<image src='../../static/images/go.png'></image>
				</view>
				<view class='listItem' hover-class='listhover' @click="goPage('customer/customer')">
					<text>联系客服</text>
					<image src='../../static/images/go.png'></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import './user.css'
	import {uniBadge} from '../../components/uni-ui/uni-badge/uni-badge';
	export default {
		components:{
			uniBadge
		},
		data() {
			return {
				claims:100,  //债权分
				userName:'游客',
				userPhone:17820456587,
				money:0,  //钱包余额
				couponNumber:1, //优惠券数量
				warn:2,  //心愿单提醒徽标   现在兼订单徽标
			}
		},
		methods: {
			goPage(url){
				uni.navigateTo({
				    url: url,
				});
			},
		}
	}
</script>

<style scoped>

</style>
