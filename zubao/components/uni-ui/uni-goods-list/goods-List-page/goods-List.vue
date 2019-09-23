<template name='list'>
	<view>
		<ul>
			<li v-for='item in item' :key='item.id'>
				<a href="#" style='text-decoration: none;'>
					<view class="content">
						<image :src="item.img" mode="widthFix"></image>
						<view class="goodsnews">
							<view class="goosname">
								<text>{{item.brand}}</text><text style="margin-left: 20upx;">{{item.goodsname}}</text>
							</view>
							<text class="money">￥{{item.money}}/天</text>
						</view>
						<!-- <view class="buy">{{goods.buy}}</view> -->
					</view>
				</a>
				<view class="collect">
					<image :src="item.collect ? shoucang : shoucang1 "  @tap="item.collect = !item.collect"></image>
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
				collect:true,
				shoucang:require('@/static/goodslist/shoucang.png'),
				shoucang1:require('@/static/goodslist/shoucang_1.png')
			};
		},
		methods:{
			click(){
				
				
			}
		},
		props:{
			item:{
				type:Array,
				default:() =>[
					{id:1,img:require('@/static/goods/1.jpg'),brand:'GUcci',goodsname:'单肩包',money:1500,buy:'不可买',collect:true},
					{id:2,img:require('@/static/goods/2.jpg'),brand:'GUcci',goodsname:'单肩包',money:1500,buy:'不可买',collect:true},
					{id:3,img:require('@/static/goods/3.jpg'),brand:'GUcci',goodsname:'单肩包',money:1500,buy:'不可买',collect:true},
					{id:4,img:require('@/static/goods/4.jpg'),brand:'GUcci',goodsname:'单肩包',money:1500,buy:'不可买',collect:true},
					{id:5,img:require('@/static/goods/1.jpg'),brand:'GUcci',goodsname:'单肩包',money:1500,buy:'不可买',collect:true},
					{id:6,img:require('@/static/goods/1.jpg'),brand:'GUcci',goodsname:'单肩包',money:1500,buy:'不可买',collect:true},
					{id:7,img:require('@/static/goods/1.jpg'),brand:'GUcci',goodsname:'单肩包',money:1500,buy:'不可买',collect:true},
					
				]
			},
		}
	}
</script>

<style lang="scss">
		ul{
			width:100%;
			padding-top: 13%;
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
					text-align: center;
					image{
						width:100%;
					}
					.goosname{
						margin-bottom:15upx;
						text{
							font-size: 32upx;
							font-family:Microsoft YaHei;
							color: #333333;
							font-weight: bold;
						}
					}
					.money{
						font-size: 30upx;
						color: #ea986c;
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
					width:50upx;
					height: 50upx;
				}
			}
		}

</style>

