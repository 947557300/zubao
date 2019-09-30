<template>
	<view class="goodsshow">
		<view class="show-left">
			<view v-for="(item, index) in showlist" :key="index" class="itemlist" v-if="index%2==0">
				<view class="card">
					<image class="card-img" :src="item.img_src" mode="widthFix"  @tap='gomessage()'></image>
					<!--<text class="card-num-view">{{item.img_num}}P</text>  -->
					<view class="car-title-view">
						<text class="card-title">{{item.title}}</text>
						<view class="card-time">{{item.time}}</view>
						<view class="box">
							<image :src="item.head" mode="widthFix"></image>
							<view class="dianzang">
								<image :src="item.changeicon ? dianzang : dianzangchange" mode="widthFix" @tap='changeicon(index)'></image>
								<view class="num">{{item.num}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="show-right">
			<view v-for="(item, index) in showlist" :key="index" class="itemlist" v-if="index%2==1">
				<view class="card">
					<image class="card-img" :src="item.img_src" mode="widthFix" @tap='gomessage()'></image>
					<!--                    <text class="card-num-view">{{item.img_num}}P</text>  -->
					<view class="car-title-view">
						<text class="card-title">{{item.title}}</text>
						<view class="card-time">{{item.time}}</view>
						<view class="box">
							<image :src="item.head" mode="widthFix"></image>
							<view class="dianzang">
								<image :src="item.changeicon ? dianzang : dianzangchange" mode="widthFix" @tap='changeicon(index)'></image>
								<view class="num">{{item.num}}</view>
							</view>
						</view>
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
				dianzang:require('@/static/show/dianzan-kongxin1.png'),
				dianzangchange:require('@/static/show/dianzan-shixin.png'),
				showlist: [{
						img_src: require('@/static/show/2.jpg'),
						head:require('@/static/goods/12.jpg'),
						title: '这是标这是这是标这是标题这是标题这是标题这是标题这是标题题标题这是标题这是标题这是标题这是标题题',
						time: '2019-10-11 00:00:00',
						changeicon: true,
						touchstart: true,
						num:0
					},
					{
						img_src: require('@/static/show/3.jpg'),
						head:require('@/static/goods/11.jpg'),
						title: '乱写点东西这是标题',
						time: '2019-10-11 00:00:00',
						changeicon: true,
						touchstart: true,
						num:0
					},
					{
						img_src: require('@/static/show/4.jpg'),
						head:require('@/static/goods/10.jpg'),
						title: '测试一下瀑布流',
						time: '2019-10-11 00:00:00',
						changeicon: true,
						touchstart: true,
						num:0
					},
					{
						img_src: require('@/static/show/5.jpg'),
						head:require('@/static/goods/13.jpg'),
						title: '不知道可不可以成功',
						time: '2019-10-11 00:00:00',
						changeicon: true,
						touchstart: true,
						num:0
					},
					{
						img_src: require('@/static/show/4.jpg'),
						head:require('@/static/goods/11.jpg'),
						title: '乱写点东西这是标题',
						time: '2019-10-11 00:00:00',
						changeicon: true,
						touchstart: true,
						num:0
					},
					{
						img_src: require('@/static/show/3.jpg'),
						head:require('@/static/goods/10.jpg'),
						title: '这是标这是这是标这是标题这是标题这是标题这是标题这是标题题标题这是标题这是标题这是标题这是标题题',
						time: '2019-10-11 00:00:00',
						changeicon: true,
						touchstart: true,
						num:0
					},
					{
						img_src: require('@/static/show/2.jpg'),
						head:require('@/static/goods/12.jpg'),
						title: '这是标题',
						time: '2019-10-11 00:00:00',
						changeicon: true,
						touchstart: true,
						num:0
					},
				],
			}
		},
		methods: {
			gomessage(){
				uni.navigateTo({
				    url: './goods-show/goods-show-message/goods-show-message',
				});
			},
			changeicon(index){
				if(this.showlist[index].touchstart){
					this.showlist[index].changeicon = false
					this.showlist[index].num ++
					this.showlist[index].touchstart = false
				}
				else{
					uni.showToast({
					    title: '您已点过赞了',
					    duration: 1000,
						icon:'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.goodsshow {
		display: flex;
		background-color: #DDDDDD;
		align-content: center;
		justify-content: center;
		padding: 0 10upx ;
	 .row {
		flex-direction: row;
	 }
	
	.show-left,
	.show-right {
		position: relative;
		background-color: rbga(111, 0, 0, 0);
		display: inline-block;
		vertical-align: top;
		/* 		display: flex;
		flex-direction: column; */
		width: 48%;
			.itemlist {
				justify-content: center;
				align-items: center;
				overflow: hidden;
				width: 100%;
				background-color: #007AFF;
				border-radius: 20upx;
				background-color: #fff;
				display: inline-block;
				margin: 10upx 0 0 0;				
					.card {
						margin-bottom: 20rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-direction: column;
						width: 100%;
							.card-img {
								width: 100%;
								height: 100%;
							}
							.car-title-view {
								width: 100%;
								display: flex;
								justify-content: center;
								align-items: flex-start;
								flex-direction: column;
									
									.card-title {
										margin: 10upx 20upx 10upx 20upx;
										font-size: 28upx;
										color: #777777;
									}
									.card-time {
										font-size: 25upx;
										color: #CCCCCC;
										margin-left: 20upx;
									}
									.box{
										display:flex;
										box-sizing: border-box;
										width: 100%;
										margin-top: 20upx;
										padding: 20upx;
										justify-content: space-between;
										image{
											width: 40upx;
											height: 40upx;
											border-radius: 50%;
										}
										.dianzang{
											display: flex;
											align-items:center;
											image{
												width: 40upx;
												height: 40upx;
												margin-right: 10upx;
											}
											.num{
												font-size: 25upx;
												color: #CCCCCC;
												display: block;
											}
										}
									}
							}
					}
				}
			}
			
	}
	
	.show-left {
		margin-right: 10upx;
	}
	
	.show-right {
		margin-left: 10upx;
	}
	
</style>
