<template>
	<view class="goods-comment">
		<view class="show-text"  v-if='list.length==0'>
			<text>这里空空如也~</text>
		</view>
		<view class="comment-box" v-for='(list,index) in list' :key='index'>
			<view class="comment-title">
				<image :src="list.head" mode="" class="head"></image>
				<view class="head-right">
					<text>{{list.name}}</text>
					<view class="grade">
						<image :src="xingxing1"></image>
						<image :src="xingxing1"></image>
						<image :src="xingxing1"></image>
						<image :src="xingxing"></image>
						<image :src="xingxing"></image>
					</view>
				</view>
			</view>
			<text class="comment-text">{{list.text}}</text>
			<view class="comment-img">
				<image :src="item.image"
				       mode="scaleToFill" 
					   v-for='(item,index) in list.img' 
					   :key='index' 
					   v-if='list.img.length>0'
					   :class="'img'+list.img.length">
				</image>
			</view>
			<text class="comment-time">2019-09-23</text>
		</view>
		<view class="comment-footer" v-if='list.length>0'>
			<text>到底啦~</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				xingxing:require('@/static/goodsdetails/xingxing.png'),
				xingxing1:require('@/static/goodsdetails/xingxing1.png'),
				list:[
					{head:require('@/static/goods/12.jpg'),
					name:'张晓明',
					text:'东西不错，是正品。下次还会在这里买。',
					img:[
						{image:require('@/static/goods/9.jpg')},
						// {image:require('@/static/goods/9.jpg')},
						// {image:require('@/static/goods/9.jpg')},
						// {image:require('@/static/goods/9.jpg')},
						// {image:require('@/static/goods/9.jpg')},
						
					]},
					{head:require('@/static/goods/11.jpg'),
					name:'张晓明',
					text:'东西不错，是正品。下次还会在这里买。',
					img:[
						{image:require('@/static/goods/9.jpg')},
						{image:require('@/static/goods/9.jpg')},
						{image:require('@/static/goods/9.jpg')},
						// {image:require('@/static/goods/9.jpg')},
						// {image:require('@/static/goods/9.jpg')},
						
					]},
					{head:require('@/static/goods/10.jpg'),
					name:'张晓明',
					text:'东西不错，是正品。下次还会在这里买。',
					img:[
						{image:require('@/static/goods/9.jpg')},
						{image:require('@/static/goods/9.jpg')},
						// {image:require('@/static/goods/9.jpg')},
						// {image:require('@/static/goods/9.jpg')},
						// {image:require('@/static/goods/9.jpg')},
						
					]},
					{head:require('@/static/goods/10.jpg'),
					name:'张晓明',
					text:'东西不错，是正品。下次还会在这里买。',
					img:[
						{image:require('@/static/goods/9.jpg')},
						{image:require('@/static/goods/9.jpg')},
						{image:require('@/static/goods/9.jpg')},
						{image:require('@/static/goods/9.jpg')},
						// {image:require('@/static/goods/9.jpg')},
						
					]},
					{head:require('@/static/goods/13.jpg'),
					name:'张晓明',
					text:'东西不错，是正品。下次还会在这里买。',
					img:[
						{image:require('@/static/goods/9.jpg')},
						{image:require('@/static/goods/9.jpg')},
						{image:require('@/static/goods/9.jpg')},
						{image:require('@/static/goods/9.jpg')},
						{image:require('@/static/goods/9.jpg')},
						
					]},
				],
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	.goods-comment{
		.show-text{
			margin-top: 30upx;
			text-align:center;
			text{
				font-size: 30upx;
				color: #999999;
			}
		}
		.comment-box{
			background-color:#FFFFFF ;
			padding: 24upx;
			width: 100%;
			box-sizing: border-box;
			margin-top:20upx;
			.comment-title{
				width: 100%;
				display:flex;
				image{
					width: 100upx;
					height: 100upx;
					border-radius: 50%;
					margin-right: 24upx;
				}
				.head-right{
					text{
						font-size: 28upx;
						color: #333333;
						font-family: Mudium;
						margin-top: 16upx;
					}
					.grade{
						margin-top: 10upx;
						display:flex;
						image{
							width: 22upx;
							height: 22upx;
							margin-right: 10upx;
						}
					}
				}
			}
			.comment-text{
				display: block;
				font-size: 28upx;
				color: #333333;
				font-family: Mudium;
				margin-top: 25upx;
				margin-bottom: 19upx;
			}
			.comment-img{
				margin-bottom: 24upx;
				display:flex;
				justify-content:space-between;
				.img1,.img2{
					width: 330upx;
					height: 330upx;
				}
				.img3{
					width: 220upx;
					height: 220upx;
				}
				.img4{
					width: 165upx;
					height: 165upx;
				}
				.img5{
					width: 132upx;
					height: 132upx;
				}
			}
			.comment-time{
				font-size: 24upx;
				color: #999999;
				font-family: Mudium;
			}
		}
		.comment-footer{
			text-align: center;
			width:100%;
			box-sizing:border-box;
			padding:20upx 0;
			text{
				font-size: 25upx;
				color: #999999;
			}
		}
	}

</style>
