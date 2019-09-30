<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true"  :interval="3000" :duration="500" :indicator-color="'#2b262d'" :indicator-active-color="'#ff4d00'" :circular="true">
			<swiper-item v-for="(item,index) in swiperData" :key="index">
				<view class="swiper-item">
					<image :src="item" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="guide">
			<view class="guide-content">
				<view class="guide-title">新手指南</view>
				<view class="guide-list">
					<view class="guide-item">
						<image src="/static/images/index/guide/icon_使用文档.png" mode=""></image>
						<view class="guide-describe">开通会员</view>
					</view>
					<view class="guide-item">
						<image src="/static/images/index/guide/测试申请.png" mode=""></image>
						<view class="guide-describe">选包下单</view>
					</view>
					<view class="guide-item">
						<image src="/static/images/index/guide/货物堆.png" mode=""></image>
						<view class="guide-describe">体验包包</view>
					</view>
					<view class="guide-item">
						<image src="/static/images/index/guide/待办事项.png" mode=""></image>
						<view class="guide-describe">预约归还</view>
					</view>
				</view>
				<view class="guide-learn-more">了解更多</view>
			</view>
		</view>
		<view class="new-goods">
			<view class="new-goods-title">{{newGoods.title}}</view>
			<view class="new-goods-list">
				<view class="new-goods-item" v-for="(item,index) in newGoods.newGoodsArr" :key="index">
					<image :src="item.imgSrc" mode=""></image>
					<view class="new-goods-text">{{item.text}}</view>
				</view>
			</view>
			<view class="new-goods-more">
				<view class="new-goods-more-text">查看更多</view>
				<image src="/static/images/index/guide/downArrow.png" mode=""></image>
			</view>
		</view>
		<view class="special" v-for="(item,index) in special">
			<view class="special-text">
				<view class="special-title">{{item.title}}</view>
				<view class="special-describe">{{item.describe}}</view>
			</view>
			<image class="special-header-img" :src="item.headerImg"></image>
			<view class="configuration-img-list">
				<image :src="item" v-for="(item,index) in item.deploymentDiagram" :key="index"></image>
			</view>
		</view>
		<view class="recommend">
			<view class="recommend-title">{{recommend.title}}</view>
			<view class="recommend-list">
				<view class="recommend-item" v-for="(item,index) in recommend.recommendArr" :key="index">
					<image :src="item.imgSrc"></image>
					<view class="recommend-name">{{item.name}}</view>
					<view class="recommend-price">¥{{item.price}}/天</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperData:[
					'/static/images/index/recommend/1.jpeg',
					'/static/images/index/recommend/2.jpg',
					'/static/images/index/recommend/3.jpg',
				],
				newGoods:{
					title:'上新',
					newGoodsArr:[
						{
							imgSrc:'/static/images/index/recommend/b1.jpg',text:'新品上市',
						},
						{
							imgSrc:'/static/images/index/recommend/b1.jpg',text:'新品上市',
						},
						{
							imgSrc:'/static/images/index/recommend/b1.jpg',text:'新品上市',
						},
						{
							imgSrc:'/static/images/index/recommend/b1.jpg',text:'新品上市',
						},
					]
				},
				special:[
					{
						title:'专题1',
						describe:'专题描述',
						headerImg:'/static/images/index/recommend/2.jpg',
						deploymentDiagram:[
							'/static/images/index/recommend/b1.jpg',
							'/static/images/index/recommend/b1.jpg',
							'/static/images/index/recommend/b1.jpg',
						],
					},
					{
						title:'专题2',
						describe:'专题描述',
						headerImg:'/static/images/index/recommend/2.jpg',
						deploymentDiagram:[
							'/static/images/index/recommend/b1.jpg',
							'/static/images/index/recommend/b1.jpg',
							'/static/images/index/recommend/b1.jpg',
						],
					},
					{
						title:'专题3',
						describe:'专题描述',
						headerImg:'/static/images/index/recommend/2.jpg',
						deploymentDiagram:[
							'/static/images/index/recommend/b1.jpg',
							'/static/images/index/recommend/b1.jpg',
							'/static/images/index/recommend/b1.jpg',
						],
					}
				],
				recommend:{
					title:'推荐',
					recommendArr:[
						{
							imgSrc:'/static/images/index/recommend/b1.jpg',
							name:'Celine',price:16,
						},
						{
							imgSrc:'/static/images/index/recommend/b1.jpg',
							name:'Celine',price:16,
						},
						{
							imgSrc:'/static/images/index/recommend/b1.jpg',
							name:'Celine',price:16,
						},
						{
							imgSrc:'/static/images/index/recommend/b1.jpg',
							name:'Celine',price:16,
						}
					]
				}
			}
		}
	}
</script>

<style>
swiper{
		height: 600upx;
	}
	.swiper-item image{
		display: block;
		width: 100%;
		height: 600upx;
	}
	.guide{
		padding: 20upx 20upx;
		border-top: 20upx #f7f7f9 solid;
	}
	.guide-content{
		width: 100%;
		height: 100%;
		font-size: 22upx;
	}
	.guide-title{
		font-size: 38upx;
		padding-bottom: 31upx;
		text-align: center;
	}
	.guide-list{
		padding: 0 56upx;
		display: flex;
		justify-content: space-between;
	}
	.guide-item{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		width: 120upx;
		height: 170upx;
		color: #252324;
		font-weight: 600;
	}
	.guide-item image{
		display: block;
		width: 100upx;
		height: 100upx;
	}
	.guide-describe{
		width: 100%;
		height: 49upx;
		line-height: 49upx;
		text-align: center;
		background-color: #dcd0d4;
		border-radius: 50upx;
	}
	.guide-learn-more{
		margin:40upx auto 0 auto;
		width: 227upx;
		height: 56upx;
		text-align: center;
		line-height: 56upx;
		border: 1upx #252324 solid;
		border-radius: 50upx;
	}
	.guide-learn-more image{
		width: 20upx;
		height: 20upx;
	}
	.new-goods{
		border-top: 20upx #f7f7f9 solid;
	}
	.new-goods-title{
		padding: 20upx 0;
		font-size: 38upx;
		text-align: center;
	}
	.new-goods-list{
		display: flex;
		flex-wrap: wrap;
	}
	.new-goods-item{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 375upx;
		height: 375upx;
	}
	.new-goods-item image{
		width: 200upx;
		height:200upx;
	}
	.new-goods-text{
		margin: 30upx;
		width: 96upx;
		height: 38upx;
		font-size: 17upx;
		text-align: center;
		line-height: 38upx;
		color :#a88c65;
		border:2upx #a88c65 solid;
	}
	.new-goods-more{
		padding: 20upx;
		font-size: 20upx;
		text-align: center;
		color: #999999;
	}
	.new-goods-more image{
		padding-top: 10upx;
		width: 20upx;
		height: 20upx;
	}
	.special{
		padding: 20upx;
		border-top: 20upx #f7f7f9 solid;
	}
	.special-text{
		padding-bottom: 20upx;
	}
	.special-title{
		font-size: 33upx;
		font-weight: 600;
		color: #4a4a4a;
	}
	.special-describe{
		font-size: 27upx;
		color: #919499;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.special-header-img{
		display: block;
		width: 710upx;
		height: 300upx;
	}
	.configuration-img-list{
		display: flex;
		justify-content: space-between;
		padding-top: 20upx;
	}
	.configuration-img-list image{
		display: block;
		width: 223upx;
		height: 223upx;
	}
	.recommend{
		border-top: 20upx #f7f7f9 solid;
		padding: 20upx;
	}
	.recommend-title{
		padding-bottom: 20upx;
		text-align: center;
	
	}
	.recommend-list{
		display: flex;
		flex-wrap: wrap;
	}
	.recommend-item{
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 50%;
		height: 335upx;
		font-size: 16upx;
	}
	.recommend-item image{
		width: 250upx;
		height: 250upx;
	}
	.recommend-name{
		padding-top: 30upx;
	}
	.recommend-price{
		color: #bea17f;
	}
</style>
