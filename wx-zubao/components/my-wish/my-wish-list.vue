<template name='wishlist'>
	<view>
		<view class="wish-tab">
			<view 
			v-for="(item,index) in tabshow"
			:key='index'
			:class="item.id==isShow? 'tab-show-active': 'tab-show'"
			@tap="showchanges(index)"
			>{{item.text}}
			</view>
		</view>
		<ul v-if=' ! isShow'>
			<li v-for="(item,index) in item" :key="item.id">
				<view class="box" @tap='gogoods()'>
					<image :src="item.img" mode="widthFix"></image>
					<view class="text_box">
						<text class="brand">{{item.brand}}</text>
						<text class="name">{{item.name}}</text>
						<text class="money">￥{{item.money}}</text>
					</view>
				</view>
				<view class="butn">
					<image :src="shoucang1"  @tap="rentlistshow(index)"></image>
				</view>
			</li>
			<wishtext v-if="item.length==0" @buttonClick='gogoodslist()'></wishtext>
		</ul>
		<ul v-if='isShow'>
			<li v-for="(list,index) in sgoodslist" :key="list.id" class='sgoodslist' >
				<view class="box" @tap='gosgoods()'>
					<image :src="list.img" mode="widthFix"></image>
					<view class="text_box">
						<view class="name-box">
							<text class="brand">{{list.brand}}</text>
							<text class="name">{{list.name}}</text>
						</view>
						<text class="money">￥{{list.money}}</text>
					</view>
				</view>
				<view class="butn">
					<image :src="shoucang2"  @tap="rentssplistshow(index)"></image>
				</view>
			</li>
			<wishtext v-if="sgoodslist.length==0" @buttonClick='gosgoodslist()'></wishtext>
		</ul>
	</view>
</template>

<script>
	import wishtext from '@/components/my-wish/my-wish-text'
	export default {
		name:'wishlist',
		data() {
			return {
				shoucang1:require('@/static/goodslist/shoucang_1.png'),
				shoucang2:require('@/static/goodslist/shoucang (1)_1.png'),
				tabshow:[
					{id:0,text:'租包'},
					{id:1,text:'认购'}
				],
				item:[
						{id:1,img:require('@/static/goods/1.jpg'),brand:"GUcci",name:"单肩包",money:180.00,show:true},
						{id:2,img:require('@/static/goods/2.jpg'),brand:"GUcci",name:"单肩包",money:180.00,show:true},
						{id:3,img:require('@/static/goods/3.jpg'),brand:"GUcci",name:"单肩包",money:180.00,show:true},
						{id:4,img:require('@/static/goods/4.jpg'),brand:"GUcci",name:"单肩包",money:180.00,show:true}
				],
				sgoodslist:[
					{id:1,img:require('@/static/goods/1.jpg'),brand:"GUcci",name:"单肩包",money:180.00},
					{id:2,img:require('@/static/goods/2.jpg'),brand:"GUcci",name:"单肩包",money:180.00},
					{id:3,img:require('@/static/goods/3.jpg'),brand:"GUcci",name:"单肩包",money:180.00},
					{id:4,img:require('@/static/goods/4.jpg'),brand:"GUcci",name:"单肩包",money:180.00}
				],
				isShow:0,
			};
		},
		components: {
			wishtext
		},
		props:{
			// item:{
			// 	type:Array,
			// 	default:()=>[]
			// },
			// sgoodslist:{
			// 	type:Array,
			// 	default:()=>[]
			// },
		},
		methods: {
			rentlistshow: function (index){
				this.item.splice(index,1)
			},
			rentssplistshow: function (index){
				this.sgoodslist.splice(index,1)
			},
			gogoods: function (){
				uni.navigateTo({
				    url:'../../rent-goods/rent-goods-message/rent-goods-message',
				});
			},
			gosgoods: function (){
				uni.navigateTo({
				    url:'../../subscription-goods/subscription-goods-message/subscription-goods-message',
				});
			},
			gogoodslist:function(){
				uni.switchTab({
				    url:'/pages/rent-goods/rent-goods',
				});
			},
			gosgoodslist:function(){
				uni.switchTab({
				    url:'/pages/subscription-goods/subscription-goods',
				});
			},
			// changearray:function (index) {
			//     this.$emit("arrayChanged",index)
			// },
			// changessparray:function (index) {
			//     this.$emit("ssparrayChanged",index)
			// },
			showchanges(index){
				this.isShow=index
			}
		},
	}
</script>

<style lang="scss">
	.wish-tab{
		width: 100%;
		z-index: 99;
		box-sizing: border-box;
		background-color: #FFFFFF;
		position: fixed;
		top:0upx;
		display: flex;
		justify-content: space-between;
		.tab-show,.tab-show-active{
			width: 45%;
			height: 80upx;
			text-align: center;
			font-size: 26upx;
			line-height: 80upx;
		}
		.tab-show-active{
			color: #ea986c;
			border-bottom: 2upx solid #ea986c;
		}
	}
	ul{
		list-style: none;
		padding-top: 80upx;
		width: 100%;
		padding-inline-start:0upx;
		li{
			padding: 30upx;
			margin-top: 10upx;
			background-color:#FFFFFF;
			position: relative;
			display: flex;
			width: 100%;
			position: relative;
			border-bottom: 1upx solid #ececec;
			border-top: 1upx solid #ececec;
			height: 140upx;
			image{
				width: 150upx;
				height: 150upx;
				margin-right: 20upx;
			}
			.box{
				width: 100%;
				display: flex;
				.text_box{
					text{
						display: block;
						font-size: 30upx;
					}
					.brand{
						color: #333333;
					}
					.name{
						color: #999999;
						display: inline-block;
					}
					.money{
						color: #ea986c;
						margin-top: 10upx;
					}
				}
			}
			.butn{
				position: absolute;
				top: 70upx;
				right: 80upx;
				image{
					width:50upx;
					height: 50upx;
				}
			}
		}
		.sgoodslist{
			.text_box{
				.name-box{
					margin-top: 30upx;
					display:flex;
					text{
						font-size: 25upx;
					}
					.brand{
						color: #ea986c !important;
						margin-right: 20upx;
					}
					.name{
						color: #333333 !important;
					}
				}
				.money{
					color: #333333 !important;
					font-size: 32upx;
					font-weight: bold;
				}
			}
		}
	}

</style>
