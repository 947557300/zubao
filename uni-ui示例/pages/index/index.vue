<template>
	<view class="uni-padding-wrap uni-common-pb">
		<view class="uni-card" v-for="(list,index) in lists" :key="index">
			<view class="uni-list">
				<view class="uni-list-cell uni-collapse">
					<view class="uni-list-cell-navigate uni-navigate-right" hover-class="uni-list-cell-hover" @click="goDetailPage(list.url)">
						{{list.name}}
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
				lists: [{
						name: "Badge 数字角标",
						url: "badge"
					},
					{
						name: "Calendar 日历",
						url: "calendar"
					},
					{
						name: "Card 卡片",
						url: "card"
					},
					{
						name: "Collapse 折叠面板",
						url: "collapse"
					},
					{
						name: "CountDown 倒计时",
						url: "count-down"
					},
					{
						name: "Drawer 抽屉",
						url: "drawer"
					},
					{
						name: "Fav 收藏按钮",
						url: "fav"
					},
					{
						name: "GoodsNav 商品导航",
						url: "goods-nav"
					},
					{
						name: "Grid 宫格",
						url: "grid"
					},
					{
						name: "Icon 图标",
						url: "icon"
					},
					// #ifndef MP-BAIDU 
					{
						name: "IndexedList 索引列表",
						url: "indexed-list"
					},
					// #endif 
					{
						name: "List 列表",
						url: "list"
					},
					{
						name: "LoadMore 加载更多",
						url: "load-more"
					},
					{
						name: "NavBar 自定义导航栏",
						url: "nav-bar"
					},
					{
						name: "NoticeBar 通告栏",
						url: "notice-bar"
					},
					{
						name: "NumberBox 数字输入框",
						url: "number-box"
					},
					{
						name: "Pagination 分页器",
						url: "pagination"
					},
					{
						name: "PopUp 弹出层",
						url: "popup"
					},
					{
						name: "Rate 评分",
						url: "rate"
					},
					{
						name: "SearchBar 搜索栏",
						url: "search-bar"
					},
					{
						name: "SegmentedControl 分段器",
						url: "segmented-control"
					},
					{
						name: "Steps 步骤条",
						url: "steps"
					},
					{
						name: "SwipeAction 滑动操作",
						url: "swipe-action"
					},
					{
						name: "SwiperDot 轮播图指示点",
						url: "swiper-dot"
					},
					{
						name: "Tag 标签",
						url: "tag"
					},
				]
			};
		},
		onLoad() {
			// #ifdef APP-PLUS
			plus.nativeUI.showWaiting('加载中……');
			// #endif
		},
		onReady() {
			// #ifdef APP-PLUS
			plus.nativeUI.closeWaiting();
			// #endif
		},
		onShareAppMessage() {
			return {
				title: '欢迎体验uni-app',
				path: '/pages/tabBar/extUI/extUI'
			}
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '/pages/about/about'
			});
		},
		methods: {
			goDetailPage(path) {
				uni.navigateTo({
					url: '/pages/extUI/' + path + '/' + path
				});
			}
		}
	}
</script>

<style>
	page {
		height: auto;
		min-height: 100%;
	}

	.uni-card {
		box-shadow: none;
	}

	.uni-list:after {
		height: 0;
	}

	.uni-list:before {
		height: 0;
	}

	.uni-hello-text {
		word-break: break-all;
	}
</style>