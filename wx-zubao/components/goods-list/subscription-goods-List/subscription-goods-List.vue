<template name='list'>
	<view>
		<ul class='list'>
			<li v-for='(item,index) in sublist' :key='item.id'>
				<view class="content" @tap='gosgoods()'>
					<image :src="item.img" mode="widthFix"></image>
					<view class="goodsnews">
						<view class="goosname">
							<text>{{item.brand}}</text><text style="margin-left: 20upx; color: #333333;">{{item.goodsname}}</text>
						</view>
						<text class="money">￥{{item.money}}</text>
					</view>
					<!-- <view class="buy">{{goods.buy}}</view> -->
				</view>
				<view class="collect">
					<image :src="item.show ? shoucang : shoucang1 " mode="widthFix"  @tap="tap(index)"></image>
				</view>
			</li>
		</ul>
	</view>
</template>

<script>
	export default {
		name:'list',
		data() {
			return {
				
				sublist:[
					{id:1,img:require('@/static/goods/1.jpg'),brand:'GUcci',goodsname:'单肩包',money:1500,buy:'不可买',show:true},
					{id:2,img:require('@/static/goods/2.jpg'),brand:'GUcci',goodsname:'单肩包',money:1500,buy:'不可买',show:true},
					{id:3,img:require('@/static/goods/3.jpg'),brand:'GUcci',goodsname:'单肩包',money:1500,buy:'不可买',show:true},
					{id:4,img:require('@/static/goods/4.jpg'),brand:'GUcci',goodsname:'单肩包',money:1500,buy:'不可买',show:true},
					{id:5,img:require('@/static/goods/1.jpg'),brand:'GUcci',goodsname:'单肩包',money:1500,buy:'不可买',show:true},
					{id:6,img:require('@/static/goods/1.jpg'),brand:'GUcci',goodsname:'单肩包',money:1500,buy:'不可买',show:true},
					{id:7,img:require('@/static/goods/1.jpg'),brand:'GUcci',goodsname:'单肩包',money:1500,buy:'不可买',show:true},
				],
				collect:true,
				shoucang:require('@/static/goodslist/shoucang (1).png'),
				shoucang1:require('@/static/goodslist/shoucang (1)_1.png')
			};
		},
		props:{
			
			
		},
		methods:{
			tap(index){
				// this.sublist[index].show = ! this.sublist[index].show,
				if(this.sublist[index].show){
					this.sublist[index].show = false
					uni.showToast({
					    title: '您已收藏',
					    duration: 1000,
						icon:'none'
					})
				}
				else{
					this.sublist[index].show = true
					uni.showToast({
					    title: '您已取消收藏',
					    duration: 1000,
						icon:'none'
					})
				}
			},
			gosgoods: function (){
				uni.navigateTo({
				    url:'subscription-goods-message/subscription-goods-message',
				});
			},
		},
	}
</script>

<style lang="scss">
		.list{
			width:100%;
			padding-top: 22%;
			display:flex;
			flex-wrap: wrap;
			justify-content: space-between;
			list-style: none;
			padding-inline-start:0px;
			li{
				width:49.8%;
				position: relative;
				box-sizing: border-box;
				border-right: 1upx solid #ececec;
				border-left:1upx solid #ececec ;
				border-bottom:1upx solid #ececec ;
				padding:30upx;
				.content{
					width:100%;
					// position: relative;
					image{
						width:100%;
					}
					.goosname{
						margin-bottom:15upx;
						text{
							font-size: 25upx;
							font-family:Microsoft YaHei;
							color: #ea986c;
						}
					}
					.money{
						font-size: 30upx;
						color: #333333;
						font-weight: bold;
					}
					.buy{
						position: absolute;
						top:0upx;
						width: 80upx;
						height: 80upx;
						line-height: 80upx;
						text-align: center;
						background-color: #333;
						opacity: 0.3;
						border-radius:50% ;
						right:0upx;
						font-size: 15upx;
						color: #FFFFFF;
					}
				}
			}
			.collect{
				position:absolute;
				top:30upx;
				right:30upx;
				image{
					width:60upx;
				}
			}
		}

</style>

